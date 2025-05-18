use anchor_client::{
    anchor_lang::system_program,
    Client, Cluster, Program
};
use anchor_client::solana_client::rpc_config::{RpcSendTransactionConfig, RpcAccountInfoConfig};
use anchor_client::solana_client::rpc_filter::{RpcFilterType, Memcmp, MemcmpEncodedBytes};
use anchor_client::solana_sdk::account::Account;
use anchor_client::solana_client::rpc_client::RpcClient;
use anchor_client::solana_sdk::{
    commitment_config::CommitmentConfig,
    pubkey::Pubkey,
    signature::{Keypair, Signature},
    transaction::Transaction,
};
use std::sync::Arc;
use log::{info, error, debug};
use crate::models::error::ApiError;
use crate::config::CONFIG;
use async_trait::async_trait;
use std::convert::TryFrom;
use anyhow::Result;
use once_cell::sync::OnceCell;
use std::time::Duration;
use std::str::FromStr;

/// Solana client for interacting with the perps contract
pub struct SolanaClient {
    /// RPC client for Solana
    pub rpc_client: Arc<RpcClient>,
    
    /// Anchor client for Solana
    pub anchor_client: Client,
    
    /// Signer keypair
    pub keypair: Arc<Keypair>,
    
    /// Program ID
    pub program_id: Pubkey,
}

impl SolanaClient {
    /// Create a new Solana client
    pub fn new() -> Self {
        let rpc_url = CONFIG.rpc_url.clone();
        let keypair = CONFIG.keypair.clone();
        let program_id = Pubkey::from_str(&CONFIG.program_id)
            .expect("Invalid program ID in configuration");
        
        let cluster = Cluster::Custom(rpc_url.clone(), CONFIG.ws_url.clone().unwrap_or_default());
        
        // Create a new RPC client with timeout and commitment
        let rpc_client = Arc::new(RpcClient::new_with_timeout_and_commitment(
            rpc_url.clone(),
            Duration::from_secs(30),
            CommitmentConfig::confirmed(),
        ));
        
        // We need to use Rc instead of Arc for anchor-client
        let anchor_client = Client::new_with_options(
            cluster,
            std::rc::Rc::new(Keypair::from_bytes(&keypair.to_bytes()).unwrap()),
            CommitmentConfig::confirmed(),
        );
        
        SolanaClient {
            rpc_client,
            anchor_client,
            keypair,
            program_id,
        }
    }
    
    /// Get the perps program
    pub fn program(&self) -> Program {
        self.anchor_client.program(self.program_id)
    }
    
    /// Send a transaction
    pub async fn send_transaction(&self, transaction: Transaction) -> Result<Signature, ApiError> {
        let signature = self.rpc_client
            .send_and_confirm_transaction_with_spinner_and_config(
                &transaction,
                CommitmentConfig::confirmed(),
                RpcSendTransactionConfig {
                    skip_preflight: false,
                    preflight_commitment: Some(CommitmentConfig::confirmed().commitment),
                    encoding: None,
                    max_retries: Some(10),
                },
            )
            .map_err(|e| ApiError::TransactionError(format!("Failed to send transaction: {}", e)))?;
            
        info!("Transaction sent: {}", signature);
        Ok(signature)
    }
    
    /// Get an account
    pub async fn get_account(&self, address: &Pubkey) -> Result<Account, ApiError> {
        self.rpc_client
            .get_account_with_commitment(address, CommitmentConfig::confirmed())
            .map_err(|e| ApiError::SolanaClientError(format!("Failed to get account: {}", e)))?
            .value
            .ok_or_else(|| ApiError::NotFound(format!("Account not found: {}", address)))
    }
    
    /// Check if an account exists
    pub async fn account_exists(&self, address: &Pubkey) -> Result<bool, ApiError> {
        Ok(self.rpc_client
            .get_account_with_commitment(address, CommitmentConfig::confirmed())
            .map_err(|e| ApiError::SolanaClientError(format!("Failed to check account: {}", e)))?
            .value
            .is_some())
    }
    
    /// Get multiple accounts
    pub async fn get_multiple_accounts(&self, addresses: &[Pubkey]) -> Result<Vec<Option<Account>>, ApiError> {
        let response = self.rpc_client
            .get_multiple_accounts_with_commitment(addresses, CommitmentConfig::confirmed())
            .map_err(|e| ApiError::SolanaClientError(format!("Failed to get multiple accounts: {}", e)))?;
        Ok(response.value)
    }
    
    /// Get program accounts
    pub async fn get_program_accounts(&self, filters: Vec<RpcFilterType>) -> Result<Vec<(Pubkey, Account)>, ApiError> {
        let config = anchor_client::solana_client::rpc_config::RpcProgramAccountsConfig {
            filters: Some(filters),
            account_config: RpcAccountInfoConfig {
                encoding: None,
                data_slice: None,
                commitment: Some(CommitmentConfig::confirmed()),
            },
            with_context: None,
        };
        
        self.rpc_client
            .get_program_accounts_with_config(&self.program_id, config)
            .map_err(|e| ApiError::SolanaClientError(format!("Failed to get program accounts: {}", e)))
    }
    
    /// Get program accounts with a specific discriminator
    pub async fn get_program_accounts_with_discriminator(&self, discriminator: [u8; 8]) -> Result<Vec<(Pubkey, Account)>, ApiError> {
        let filters = vec![
            RpcFilterType::Memcmp(Memcmp {
                offset: 0,
                bytes: MemcmpEncodedBytes::Base58(bs58::encode(discriminator).into_string()),
                encoding: None,
            }),
        ];
        
        self.get_program_accounts(filters).await
    }
    
    /// Get program accounts with a specific discriminator and secondary filter
    pub async fn get_program_accounts_with_filters(
        &self, 
        discriminator: [u8; 8],
        additional_filters: Vec<RpcFilterType>
    ) -> Result<Vec<(Pubkey, Account)>, ApiError> {
        let mut filters = vec![
            RpcFilterType::Memcmp(Memcmp {
                offset: 0,
                bytes: MemcmpEncodedBytes::Base58(bs58::encode(discriminator).into_string()),
                encoding: None,
            }),
        ];
        
        filters.extend(additional_filters);
        
        self.get_program_accounts(filters).await
    }
    
    /// Get account data with specific discriminator
    pub async fn get_account_data<T: anchor_client::anchor_lang::AccountDeserialize>(
        &self,
        address: &Pubkey
    ) -> Result<T, ApiError> {
        let account = self.get_account(address).await?;
        
        T::try_deserialize(&mut account.data.as_slice())
            .map_err(|e| ApiError::SolanaClientError(format!("Failed to deserialize account data: {}", e)))
    }
    
    /// Get the current slot
    pub async fn get_slot(&self) -> Result<u64, ApiError> {
        self.rpc_client.get_slot()
            .map_err(|e| ApiError::SolanaClientError(format!("Failed to get slot: {}", e)))
    }
}

/// Lazy static instance of the Solana client
pub fn get_solana_client() -> SolanaClient {
    SolanaClient::new()
}

// Global RPC client instance
static SOLANA_CLIENT: OnceCell<RpcClient> = OnceCell::new();

/// Initialize the Solana RPC client
pub async fn init_solana_client() -> Result<(), ApiError> {
    info!("Initializing Solana client with RPC URL: {}", CONFIG.rpc_url);
    
    // Configure timeout and commitment level
    let timeout = Duration::from_secs(30);
    let commitment_config = CommitmentConfig::confirmed();
    
    // Create the RPC client
    let client = RpcClient::new_with_timeout_and_commitment(
        CONFIG.rpc_url.clone(),
        timeout,
        commitment_config,
    );
    
    // Test the connection
    match client.get_version() {
        Ok(version) => {
            info!("Connected to Solana node. Version: {}", version.solana_core);
            
            // Set the global instance
            if SOLANA_CLIENT.set(client).is_err() {
                error!("Failed to set global Solana client instance");
                return Err(ApiError::InternalError("Failed to set global Solana client".to_string()));
            }
            
            Ok(())
        },
        Err(e) => {
            error!("Failed to connect to Solana node: {}", e);
            Err(ApiError::NetworkError(format!("Solana RPC connection error: {}", e)))
        }
    }
}

/// Get the Solana RPC client
pub fn get_solana_client_rpc() -> RpcClient {
    match SOLANA_CLIENT.get() {
        Some(client) => RpcClient::new_with_timeout_and_commitment(
            CONFIG.rpc_url.clone(),
            Duration::from_secs(30),
            CommitmentConfig::confirmed(),
        ),
        None => {
            // Default initialization if not already initialized
            let timeout = Duration::from_secs(30);
            let commitment_config = CommitmentConfig::confirmed();
            
            debug!("Creating new Solana client instance with default settings");
            
            let client = RpcClient::new_with_timeout_and_commitment(
                CONFIG.rpc_url.clone(),
                timeout,
                commitment_config,
            );
            
            // Try to set it for next time, but use it regardless
            let _ = SOLANA_CLIENT.set(client);
            // Create a new instance to return
            RpcClient::new_with_timeout_and_commitment(
                CONFIG.rpc_url.clone(),
                timeout,
                commitment_config,
            )
        }
    }
}

/// Get the current slot
pub async fn get_current_slot() -> Result<u64, ApiError> {
    let client = get_solana_client_rpc();
    
    match client.get_slot() {
        Ok(slot) => Ok(slot),
        Err(e) => Err(ApiError::SolanaClientError(format!("Failed to get current slot: {}", e))),
    }
}

/// Get the current block time
pub async fn get_current_block_time() -> Result<i64, ApiError> {
    let client = get_solana_client_rpc();
    let slot = client.get_slot()
        .map_err(|e| ApiError::SolanaClientError(format!("Failed to get slot: {}", e)))?;
    
    match client.get_block_time(slot) {
        Ok(time) => Ok(time),
        Err(e) => Err(ApiError::SolanaClientError(format!("Failed to get block time: {}", e))),
    }
}

/// Convert a slot to a block time
pub async fn slot_to_block_time(slot: u64) -> Result<i64, ApiError> {
    let client = get_solana_client_rpc();
    
    match client.get_block_time(slot) {
        Ok(time) => Ok(time),
        Err(e) => Err(ApiError::SolanaClientError(format!("Failed to convert slot to block time: {}", e))),
    }
} 