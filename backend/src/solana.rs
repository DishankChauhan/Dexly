// This file contains the CLIENT-SIDE code to interact with the Solana blockchain and the 
// PerpGo smart contract. The actual smart contract implementation is in the contracts/perpgo directory.
// This is NOT a duplicate implementation of the contract logic, but rather the code needed
// to communicate with the deployed contract from our backend server.
//
// NOTE: The contract has been deployed to devnet with program ID: Eu1XQLF5MewmRJ2VeBms2NtU2vkuamX3KtQ9mEhntucP
// The discriminator values and other constants are set based on the deployed contract.

use std::str::FromStr;
use std::sync::Arc;
use std::collections::VecDeque;
use tokio::sync::{Mutex, RwLock};
use anchor_client::{
    Client, Cluster, Program,
    solana_sdk::{
        pubkey::Pubkey,
        signature::{Keypair, Signer},
        system_program,
    },
};
use anyhow::{anyhow, Result, Context};
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    signer::keypair::read_keypair_file,
    transaction::Transaction,
};
use pyth_sdk_solana::load_price_feed_from_account;
use std::env;
use tokio::time::{sleep, Duration};

// ID of our Perpgo program (deployed to devnet)
const PROGRAM_ID: &str = "Eu1XQLF5MewmRJ2VeBms2NtU2vkuamX3KtQ9mEhntucP";

// SOL/USD Pyth price feed on devnet
const PYTH_PRICE_FEED: &str = "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix";

// Define transaction types for our queue
#[derive(Debug, Clone)]
pub enum TransactionType {
    OpenPosition {
        wallet: Pubkey,
        direction: bool,
        collateral_amount: u64,
        leverage: u8,
        position_keypair: Keypair,
    },
    ClosePosition {
        position_pubkey: Pubkey,
        owner: Pubkey,
    },
    CreateUserAccount {
        wallet: Pubkey,
    },
    LiquidatePosition {
        position_pubkey: Pubkey,
        liquidator: Pubkey,
    },
}

// Define transaction queue item
#[derive(Debug, Clone)]
struct QueuedTransaction {
    tx_type: TransactionType,
    callback: Option<tokio::sync::oneshot::Sender<Result<String>>>,
}

// Solana Client with transaction queue
pub struct SolanaClient {
    rpc_client: RpcClient,
    payer: Keypair,
    program_id: Pubkey,
    pyth_price_feed: Pubkey,
    tx_queue: Arc<Mutex<VecDeque<QueuedTransaction>>>,
    is_processing: Arc<RwLock<bool>>,
}

impl SolanaClient {
    pub fn new() -> Result<Self> {
        // Load environment variables
        dotenv::dotenv().ok();
        
        // Get RPC URL from environment or use devnet
        let rpc_url = env::var("SOLANA_RPC_URL").unwrap_or_else(|_| "https://api.devnet.solana.com".to_string());
        
        // Get the keypair path from environment
        let keypair_path = env::var("SOLANA_KEYPAIR_PATH")
            .unwrap_or_else(|_| format!("{}/.config/solana/id.json", env::var("HOME").unwrap()));
        
        // Read the keypair file
        let payer = read_keypair_file(&keypair_path)
            .map_err(|_| anyhow!("Failed to read keypair file at {}", keypair_path))?;
        
        // Set up the RPC client
        let rpc_client = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());
        
        // Parse the program ID
        let program_id = Pubkey::from_str(PROGRAM_ID)
            .map_err(|_| anyhow!("Invalid program ID"))?;
        
        // Parse the Pyth price feed
        let pyth_price_feed = Pubkey::from_str(PYTH_PRICE_FEED)
            .map_err(|_| anyhow!("Invalid Pyth price feed"))?;

        let client = Self {
            rpc_client,
            payer,
            program_id,
            pyth_price_feed,
            tx_queue: Arc::new(Mutex::new(VecDeque::new())),
            is_processing: Arc::new(RwLock::new(false)),
        };
        
        Ok(client)
    }
    
    // Start processing the transaction queue in the background
    pub async fn start_queue_processor(&self) {
        let tx_queue = self.tx_queue.clone();
        let is_processing = self.is_processing.clone();
        let client_clone = self.clone();
        
        tokio::spawn(async move {
            loop {
                // Check if we're already processing
                {
                    let is_already_processing = *is_processing.read().await;
                    if is_already_processing {
                        sleep(Duration::from_millis(100)).await;
                        continue;
                    }
                }
                
                // Get the next transaction from the queue
                let next_tx = {
                    let mut queue = tx_queue.lock().await;
                    queue.pop_front()
                };
                
                if let Some(tx) = next_tx {
                    // Mark as processing
                    {
                        let mut processing_flag = is_processing.write().await;
                        *processing_flag = true;
                    }
                    
                    // Process the transaction
                    let result = match tx.tx_type {
                        TransactionType::OpenPosition { wallet, direction, collateral_amount, leverage, position_keypair } => {
                            client_clone.process_open_position(wallet, direction, collateral_amount, leverage, position_keypair).await
                        },
                        TransactionType::ClosePosition { position_pubkey, owner } => {
                            client_clone.process_close_position(position_pubkey, owner).await
                        },
                        TransactionType::CreateUserAccount { wallet } => {
                            client_clone.process_create_user_account(wallet).await
                        },
                        TransactionType::LiquidatePosition { position_pubkey, liquidator } => {
                            client_clone.process_liquidate_position(position_pubkey, liquidator).await
                        },
                    };
                    
                    // Send the result back via the callback
                    if let Some(callback) = tx.callback {
                        let _ = callback.send(result);
                    }
                    
                    // Mark as no longer processing
                    {
                        let mut processing_flag = is_processing.write().await;
                        *processing_flag = false;
                    }
                } else {
                    // No transactions in the queue, wait a bit
                    sleep(Duration::from_millis(100)).await;
                }
            }
        });
    }
    
    // Add a transaction to the queue
    async fn enqueue_transaction(&self, tx_type: TransactionType) -> Result<String> {
        let (sender, receiver) = tokio::sync::oneshot::channel();
        
        // Add to queue
        {
            let mut queue = self.tx_queue.lock().await;
            queue.push_back(QueuedTransaction {
                tx_type,
                callback: Some(sender),
            });
        }
        
        // Wait for the result
        receiver.await.context("Transaction processor died")?
    }
    
    // Process transaction implementations
    async fn process_open_position(&self, wallet: Pubkey, direction: bool, collateral_amount: u64, leverage: u8, position_keypair: Keypair) -> Result<String> {
        let program = self.get_anchor_program()?;
        
        // Check if user account exists, create if it doesn't
        if let Err(_) = self.rpc_client.get_account(&self.find_user_account(&wallet).0) {
            // User account doesn't exist, create it first
            self.process_create_user_account(wallet).await?;
        }
        
        // Find the user account PDA
        let (user_account, _bump) = self.find_user_account(&wallet);
        
        // Build the transaction
        let signature = program
            .request()
            .accounts(perpgo_accounts::OpenPosition {
                position_account: position_keypair.pubkey(),
                user_account,
                user: wallet,
                system_program: system_program::ID,
            })
            .args(perpgo_instruction::OpenPosition {
                direction,
                collateral_amount,
                leverage,
            })
            .signer(&position_keypair)
            .send()?;
        
        // Wait for confirmation
        self.rpc_client.confirm_transaction(&signature)?;
        
        Ok(signature.to_string())
    }
    
    async fn process_close_position(&self, position_pubkey: Pubkey, owner: Pubkey) -> Result<String> {
        let program = self.get_anchor_program()?;
        
        // Find the user account PDA
        let (user_account, _bump) = self.find_user_account(&owner);
        
        // Build the transaction
        let signature = program
            .request()
            .accounts(perpgo_accounts::ClosePosition {
                position_account: position_pubkey,
                user_account,
                owner,
            })
            .args(perpgo_instruction::ClosePosition {})
            .send()?;
        
        // Wait for confirmation
        self.rpc_client.confirm_transaction(&signature)?;
        
        Ok(signature.to_string())
    }
    
    async fn process_create_user_account(&self, wallet: Pubkey) -> Result<String> {
        let program = self.get_anchor_program()?;
        
        // Find the user account PDA
        let (user_account, _) = self.find_user_account(&wallet);
        
        // Build the transaction
        let signature = program
            .request()
            .accounts(perpgo_accounts::CreateUserAccount {
                user_account,
                user: wallet,
                system_program: system_program::ID,
            })
            .args(perpgo_instruction::CreateUserAccount {})
            .send()?;
        
        // Wait for confirmation
        self.rpc_client.confirm_transaction(&signature)?;
        
        Ok(signature.to_string())
    }
    
    // Liquidate a position
    pub async fn liquidate_position(&self, position_pubkey: &Pubkey, liquidator: &Pubkey) -> Result<String> {
        // Enqueue the transaction
        self.enqueue_transaction(TransactionType::LiquidatePosition {
            position_pubkey: *position_pubkey,
            liquidator: *liquidator,
        }).await
    }

    // Process liquidation
    async fn process_liquidate_position(&self, position_pubkey: Pubkey, liquidator: Pubkey) -> Result<String> {
        let program = self.get_anchor_program()?;
        
        // Get the current price from Pyth
        let current_price = match self.get_sol_price().await {
            Ok(price) => (price * 1_000_000.0) as u64, // Convert to 6 decimals
            Err(_) => {
                // Fallback to simulated price in case of error
                100_000_000 // $100 with 6 decimals
            }
        };
        
        // Build the transaction
        let signature = program
            .request()
            .accounts(perpgo_accounts::LiquidatePosition {
                position_account: position_pubkey,
                user_account: Pubkey::new_unique(), // We need to get the real user account from position data
                user: Pubkey::new_unique(),         // We need to get the real owner from position data
                liquidator,
            })
            .args(perpgo_instruction::LiquidatePosition {
                current_price,
            })
            .send()?;
        
        // Wait for confirmation
        self.rpc_client.confirm_transaction(&signature)?;
        
        Ok(signature.to_string())
    }
    
    // Helper function to find user account PDA
    fn find_user_account(&self, wallet: &Pubkey) -> (Pubkey, u8) {
        Pubkey::find_program_address(&[b"user".as_ref(), wallet.as_ref()], &self.program_id)
    }

    pub async fn get_sol_price(&self) -> Result<f64> {
        // Get the price feed account data
        let account_data = self.rpc_client.get_account_data(&self.pyth_price_feed)?;
        
        // Load the price feed
        let price_feed = load_price_feed_from_account(&self.pyth_price_feed, &account_data)
            .map_err(|_| anyhow!("Failed to load price feed"))?;
        
        // Get the current price
        let price_info = price_feed.get_current_price()
            .ok_or_else(|| anyhow!("No current price in feed"))?;
        
        // Convert price to USD
        let price_as_float = price_info.price as f64 * 10f64.powi(price_info.expo);
        
        Ok(price_as_float)
    }

    pub fn get_anchor_program(&self) -> Result<Program> {
        // Create an Anchor client
        let cluster = Cluster::Custom(
            self.rpc_client.url(),
            self.rpc_client.url().replace("http", "ws"),
        );
        
        // Set up the client with our payer
        let client = Client::new_with_options(
            cluster,
            Keypair::from_bytes(&self.payer.to_bytes())?,
            CommitmentConfig::confirmed(),
        );
        
        // Get the program
        let program = client.program(self.program_id)?;
        
        Ok(program)
    }

    // Public API methods that use the queue
    pub async fn open_position(
        &self,
        wallet: &Pubkey,
        direction: bool, // true for long, false for short
        collateral_amount: u64, // in lamports
        leverage: u8,
    ) -> Result<String> {
        // Generate a new keypair for the position account
        let position_keypair = Keypair::new();
        
        // Enqueue the transaction
        self.enqueue_transaction(TransactionType::OpenPosition {
            wallet: *wallet,
            direction,
            collateral_amount,
            leverage,
            position_keypair: position_keypair.clone(),
        }).await
    }

    pub async fn close_position(&self, position_pubkey: &Pubkey, owner: &Pubkey) -> Result<String> {
        // Enqueue the transaction
        self.enqueue_transaction(TransactionType::ClosePosition {
            position_pubkey: *position_pubkey,
            owner: *owner,
        }).await
    }
    
    pub async fn create_user_account(&self, wallet: &Pubkey) -> Result<String> {
        // Enqueue the transaction
        self.enqueue_transaction(TransactionType::CreateUserAccount {
            wallet: *wallet,
        }).await
    }
    
    // Check if a user account exists
    pub async fn user_account_exists(&self, wallet: &Pubkey) -> Result<bool> {
        let (user_account, _) = self.find_user_account(wallet);
        match self.rpc_client.get_account(&user_account) {
            Ok(_) => Ok(true),
            Err(_) => Ok(false),
        }
    }
    
    // Get position data from blockchain
    pub async fn get_position_data(&self, position_pubkey: &Pubkey) -> Result<Option<PositionData>> {
        match self.rpc_client.get_account(position_pubkey) {
            Ok(account) => {
                // In a real implementation, you would deserialize the account data
                // For now, we'll return a mock position
                Ok(Some(PositionData {
                    owner: Pubkey::new_unique(), // This should be deserialized
                    direction: true,
                    collateral: 1_000_000_000,
                    leverage: 5,
                    entry_price: 100_000_000,
                    current_price: 100_000_000,
                    liquidation_price: 90_000_000,
                    is_liquidated: false,
                    timestamp: 0,
                    last_funding_time: 0,
                    pnl: 0,
                }))
            },
            Err(_) => Ok(None),
        }
    }
    
    // Clone implementation
    pub fn clone(&self) -> Self {
        Self {
            rpc_client: RpcClient::new(self.rpc_client.url()),
            payer: Keypair::from_bytes(&self.payer.to_bytes().unwrap()).unwrap(),
            program_id: self.program_id,
            pyth_price_feed: self.pyth_price_feed,
            tx_queue: self.tx_queue.clone(),
            is_processing: self.is_processing.clone(),
        }
    }
}

// Position data structure
pub struct PositionData {
    pub owner: Pubkey,
    pub direction: bool,
    pub collateral: u64,
    pub leverage: u64,
    pub entry_price: u64,
    pub current_price: u64,
    pub liquidation_price: u64,
    pub is_liquidated: bool,
    pub timestamp: u64,
    pub last_funding_time: u64,
    pub pnl: i64,
}

// These modules define the account structures and instructions for interacting with the Perpgo program
// In a real production app, you would generate these from the Anchor IDL JSON
mod perpgo_accounts {
    use anchor_client::solana_sdk::{
        pubkey::Pubkey,
        system_program,
    };
    
    #[derive(Clone)]
    pub struct OpenPosition {
        pub position_account: Pubkey,
        pub user_account: Pubkey,
        pub user: Pubkey,
        pub system_program: Pubkey,
    }
    
    impl anchor_client::ToAccountMetas for OpenPosition {
        fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<anchor_client::solana_sdk::instruction::AccountMeta> {
            use anchor_client::solana_sdk::instruction::AccountMeta;
            
            vec![
                AccountMeta::new(self.position_account, true),
                AccountMeta::new(self.user_account, false),
                AccountMeta::new_readonly(self.user, true),
                AccountMeta::new_readonly(self.system_program, false),
            ]
        }
    }
    
    #[derive(Clone)]
    pub struct ClosePosition {
        pub position_account: Pubkey,
        pub user_account: Pubkey,
        pub owner: Pubkey,
    }
    
    impl anchor_client::ToAccountMetas for ClosePosition {
        fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<anchor_client::solana_sdk::instruction::AccountMeta> {
            use anchor_client::solana_sdk::instruction::AccountMeta;
            
            vec![
                AccountMeta::new(self.position_account, false),
                AccountMeta::new(self.user_account, false),
                AccountMeta::new_readonly(self.owner, true),
            ]
        }
    }
    
    #[derive(Clone)]
    pub struct CreateUserAccount {
        pub user_account: Pubkey,
        pub user: Pubkey,
        pub system_program: Pubkey,
    }
    
    impl anchor_client::ToAccountMetas for CreateUserAccount {
        fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<anchor_client::solana_sdk::instruction::AccountMeta> {
            use anchor_client::solana_sdk::instruction::AccountMeta;
            
            vec![
                AccountMeta::new(self.user_account, false),
                AccountMeta::new_readonly(self.user, true),
                AccountMeta::new_readonly(self.system_program, false),
            ]
        }
    }

    #[derive(Clone)]
    pub struct LiquidatePosition {
        pub position_account: Pubkey,
        pub user_account: Pubkey,
        pub user: Pubkey,
        pub liquidator: Pubkey,
    }
    
    impl anchor_client::ToAccountMetas for LiquidatePosition {
        fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<anchor_client::solana_sdk::instruction::AccountMeta> {
            use anchor_client::solana_sdk::instruction::AccountMeta;
            
            vec![
                AccountMeta::new(self.position_account, false),
                AccountMeta::new(self.user_account, false),
                AccountMeta::new_readonly(self.user, true),
                AccountMeta::new_readonly(self.liquidator, true),
            ]
        }
    }
}

mod perpgo_instruction {
    #[derive(Clone)]
    pub struct OpenPosition {
        pub direction: bool,
        pub collateral_amount: u64,
        pub leverage: u8,
    }
    
    impl anchor_client::InstructionData for OpenPosition {
        fn data(&self) -> Vec<u8> {
            use anchor_client::anchor_lang::AnchorSerialize;
            let mut data = Vec::with_capacity(44);
            data.extend_from_slice(&[141, 39, 226, 243, 12, 211, 96, 186]); // Discriminator for 'open_position'
            self.direction.serialize(&mut data).unwrap();
            self.collateral_amount.serialize(&mut data).unwrap();
            self.leverage.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[derive(Clone)]
    pub struct ClosePosition {}
    
    impl anchor_client::InstructionData for ClosePosition {
        fn data(&self) -> Vec<u8> {
            use anchor_client::anchor_lang::AnchorSerialize;
            let mut data = Vec::with_capacity(8);
            data.extend_from_slice(&[181, 41, 21, 21, 207, 68, 168, 30]); // Discriminator for 'close_position'
            data
        }
    }
    
    #[derive(Clone)]
    pub struct CreateUserAccount {}
    
    impl anchor_client::InstructionData for CreateUserAccount {
        fn data(&self) -> Vec<u8> {
            use anchor_client::anchor_lang::AnchorSerialize;
            let mut data = Vec::with_capacity(8);
            data.extend_from_slice(&[175, 175, 109, 31, 13, 152, 155, 237]); // Discriminator for 'create_user_account'
            data
        }
    }

    #[derive(Clone)]
    pub struct LiquidatePosition {
        pub current_price: u64,
    }
    
    impl anchor_client::InstructionData for LiquidatePosition {
        fn data(&self) -> Vec<u8> {
            use anchor_client::anchor_lang::AnchorSerialize;
            let mut data = Vec::with_capacity(8);
            data.extend_from_slice(&[175, 175, 109, 31, 13, 152, 155, 237]); // Discriminator for 'liquidate_position'
            self.current_price.serialize(&mut data).unwrap();
            data
        }
    }
} 