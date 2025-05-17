use anchor_client::{
    Client, Cluster, Program
};
use anchor_client::anchor_lang::{
    AccountDeserialize,
    InstructionData, 
    ToAccountMetas
};
use anchor_lang::prelude::*;
use solana_client::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::instruction::Instruction;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::signature::{Keypair, Signature, Signer};
use solana_sdk::transaction::Transaction;
use spl_associated_token_account::get_associated_token_address;
use std::rc::Rc;
use std::sync::Arc;
use once_cell::sync::Lazy;

use crate::config::CONFIG;
use crate::solana::error::SolanaError;
use crate::solana::idl::PERPS_IDL;
use crate::solana::pda;

// Define our own result type to avoid conflicts with anchor's Result
pub type SolanaResult<T> = std::result::Result<T, SolanaError>;

// Lazy static instance of SolanaClient
pub static SOLANA_CLIENT: Lazy<Arc<SolanaClient>> = Lazy::new(|| {
    Arc::new(
        SolanaClient::new(&CONFIG.solana_rpc_url, &CONFIG.admin_keypair)
            .expect("Failed to initialize Solana client")
    )
});

// Helper trait to copy keypairs
trait KeypairExt {
    fn insecure_clone(&self) -> Self;
}

impl KeypairExt for Keypair {
    fn insecure_clone(&self) -> Self {
        Keypair::from_bytes(&self.to_bytes()).expect("Failed to clone keypair")
    }
}

pub struct SolanaClient {
    pub rpc_client: RpcClient,
    pub program: Program,
    pub payer: Keypair,
}

impl SolanaClient {
    pub fn new(rpc_url: &str, payer: &Keypair) -> SolanaResult<Self> {
        let rpc_client = RpcClient::new_with_commitment(
            rpc_url.to_string(),
            CommitmentConfig::confirmed(),
        );
        
        let cluster = Cluster::Custom(rpc_url.to_string(), rpc_url.to_string());
        let payer_clone = payer.insecure_clone();
        
        let client = Client::new_with_options(
            cluster,
            Rc::new(payer_clone.insecure_clone()),
            CommitmentConfig::confirmed(),
        );
        
        let program = client.program(CONFIG.perps_program_id);
        
        Ok(Self {
            rpc_client,
            program,
            payer: payer_clone,
        })
    }
    
    // Get the associated token account for a wallet
    pub fn get_associated_token_address(&self, wallet: &Pubkey, mint: &Pubkey) -> Pubkey {
        get_associated_token_address(wallet, mint)
    }
    
    // Fetch any account from the blockchain
    pub fn fetch_account<T: AccountDeserialize>(&self, address: &Pubkey) -> SolanaResult<T> {
        let account = self.rpc_client
            .get_account(address)
            .map_err(|e| SolanaError::AccountNotFound(format!("Failed to fetch account: {}", e)))?;
            
        let mut data = account.data.as_slice();
        let account_data = T::try_deserialize(&mut data)
            .map_err(|e| SolanaError::AccountDeserializationError(format!("Failed to deserialize account: {}", e)))?;
            
        Ok(account_data)
    }
    
    // Initialize global state
    pub fn init_global_state(&self) -> SolanaResult<Signature> {
        let (global_state_pda, _) = pda::find_global_state_pda();
        
        let instructions = self.program
            .request()
            .accounts(InitializeGlobalStateContext {
                global_state: global_state_pda,
                admin: self.payer.pubkey(),
                system_program: system_program::ID,
            })
            .args(InitializeGlobalState {})
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Initialize a market
    pub fn init_market(
        &self,
        market_id: u64,
        asset_symbol: [u8; 8],
        oracle: Pubkey,
        oracle_type: u8,
        max_leverage: u8,
        min_margin_ratio_bps: u16,
        fee_bps: u16,
        min_position_size: u64,
    ) -> SolanaResult<Signature> {
        let (global_state_pda, _) = pda::find_global_state_pda();
        let (market_pda, _) = pda::find_market_pda(market_id);
        
        let instructions = self.program
            .request()
            .accounts(InitializeMarketContext {
                market: market_pda,
                oracle,
                authority: self.payer.pubkey(),
                global_state: global_state_pda,
                admin: self.payer.pubkey(),
                system_program: system_program::ID,
            })
            .args(InitializeMarket {
                asset_symbol,
                market_id,
                oracle_type,
                max_leverage,
                min_margin_ratio_bps,
                fee_bps,
                min_position_size,
            })
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Create a user account
    pub fn create_user(&self, wallet: &Pubkey) -> SolanaResult<Signature> {
        let (user_pda, _) = pda::find_user_pda(wallet);
        
        let instructions = self.program
            .request()
            .accounts(CreateUserContext {
                user_account: user_pda,
                user: *wallet,
                system_program: system_program::ID,
            })
            .args(CreateUser {})
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Deposit collateral
    pub fn deposit_collateral(
        &self,
        wallet: &Pubkey,
        amount: u64,
    ) -> SolanaResult<Signature> {
        let (user_pda, _) = pda::find_user_pda(wallet);
        let (global_state_pda, _) = pda::find_global_state_pda();
        let (vault_pda, _) = pda::find_vault_pda(&CONFIG.usdc_mint);
        let (vault_authority_pda, _) = pda::find_vault_authority_pda(&CONFIG.usdc_mint);
        let (vault_token_account_pda, _) = pda::find_vault_token_account_pda(&CONFIG.usdc_mint);
        
        let user_token_account = get_associated_token_address(wallet, &CONFIG.usdc_mint);
        
        let instructions = self.program
            .request()
            .accounts(DepositCollateralContext {
                user_account: user_pda,
                user_token_account,
                vault_token_account: vault_token_account_pda,
                vault: vault_pda,
                vault_authority: vault_authority_pda,
                collateral_mint: CONFIG.usdc_mint,
                user: *wallet,
                global_state: global_state_pda,
                token_program: spl_token::ID,
                system_program: system_program::ID,
            })
            .args(DepositCollateral { amount })
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Withdraw collateral
    pub fn withdraw_collateral(
        &self,
        wallet: &Pubkey,
        amount: u64,
    ) -> SolanaResult<Signature> {
        let (user_pda, _) = pda::find_user_pda(wallet);
        let (global_state_pda, _) = pda::find_global_state_pda();
        let (vault_pda, _) = pda::find_vault_pda(&CONFIG.usdc_mint);
        let (vault_authority_pda, _) = pda::find_vault_authority_pda(&CONFIG.usdc_mint);
        let (vault_token_account_pda, _) = pda::find_vault_token_account_pda(&CONFIG.usdc_mint);
        
        let user_token_account = get_associated_token_address(wallet, &CONFIG.usdc_mint);
        
        let instructions = self.program
            .request()
            .accounts(WithdrawCollateralContext {
                user_account: user_pda,
                user_token_account,
                vault_token_account: vault_token_account_pda,
                vault: vault_pda,
                vault_authority: vault_authority_pda,
                collateral_mint: CONFIG.usdc_mint,
                user: *wallet,
                global_state: global_state_pda,
                token_program: spl_token::ID,
                system_program: system_program::ID,
            })
            .args(WithdrawCollateral { amount })
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Open a position
    pub fn open_position(
        &self,
        wallet: &Pubkey,
        position_id: u64,
        market_id: u64,
        is_long: bool,
        collateral_amount: u64,
        leverage: u8,
        max_slippage_bps: u16,
    ) -> SolanaResult<Signature> {
        let (user_pda, _) = pda::find_user_pda(wallet);
        let (market_pda, _) = pda::find_market_pda(market_id);
        let (position_pda, _) = pda::find_position_pda(wallet, position_id);
        let (global_state_pda, _) = pda::find_global_state_pda();
        
        // Fetch the market to get the oracle
        let market = self.fetch_account::<Market>(&market_pda)?;
        
        let instructions = self.program
            .request()
            .accounts(OpenPositionContext {
                position: position_pda,
                user_account: user_pda,
                market: market_pda,
                user: *wallet,
                oracle: market.oracle,
                global_state: global_state_pda,
                system_program: system_program::ID,
            })
            .args(OpenPosition {
                is_long,
                collateral_amount,
                leverage,
                market_id,
                position_id,
                max_slippage_bps,
            })
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Close a position
    pub fn close_position(
        &self,
        wallet: &Pubkey,
        position_address: &Pubkey,
        market_id: u64,
        max_slippage_bps: u16,
    ) -> SolanaResult<Signature> {
        let (user_pda, _) = pda::find_user_pda(wallet);
        let (market_pda, _) = pda::find_market_pda(market_id);
        let (global_state_pda, _) = pda::find_global_state_pda();
        
        // Fetch the market to get the oracle
        let market = self.fetch_account::<Market>(&market_pda)?;
        
        let instructions = self.program
            .request()
            .accounts(ClosePositionContext {
                position: *position_address,
                user_account: user_pda,
                market: market_pda,
                user: *wallet,
                oracle: market.oracle,
                global_state: global_state_pda,
                system_program: system_program::ID,
            })
            .args(ClosePosition {
                market_id,
                max_slippage_bps,
            })
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Pause/unpause the protocol
    pub fn pause_protocol(&self, paused: bool) -> SolanaResult<Signature> {
        let (global_state_pda, _) = pda::find_global_state_pda();
        
        let instructions = self.program
            .request()
            .accounts(PauseProtocolContext {
                global_state: global_state_pda,
                admin: self.payer.pubkey(),
            })
            .args(PauseProtocol { paused })
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Update protocol fees
    pub fn update_fees(&self, new_fee_bps: u16) -> SolanaResult<Signature> {
        let (global_state_pda, _) = pda::find_global_state_pda();
        
        let instructions = self.program
            .request()
            .accounts(UpdateFeesContext {
                global_state: global_state_pda,
                admin: self.payer.pubkey(),
            })
            .args(UpdateFees { fee_bps: new_fee_bps })
            .instructions()
            .map_err(SolanaError::from)?;
            
        let sig = self.send_transaction(&[instructions[0].clone()])?;
        Ok(sig)
    }
    
    // Helper to send a transaction
    fn send_transaction(&self, instructions: &[Instruction]) -> SolanaResult<Signature> {
        let recent_blockhash = self.rpc_client.get_latest_blockhash()
            .map_err(|e| SolanaError::ClientError(format!("Failed to get blockhash: {}", e)))?;
            
        let tx = Transaction::new_signed_with_payer(
            instructions,
            Some(&self.payer.pubkey()),
            &[&self.payer],
            recent_blockhash,
        );
        
        let signature = self.rpc_client.send_and_confirm_transaction(&tx)
            .map_err(|e| SolanaError::TransactionError(format!("Failed to send transaction: {}", e)))?;
            
        Ok(signature)
    }
}

// Anchor structure for Market account
#[derive(Debug, AccountDeserialize)]
pub struct Market {
    pub asset_symbol: [u8; 8],
    pub oracle: Pubkey,
    pub oracle_type: u8,
    pub base_asset_reserve: u64,
    pub quote_asset_reserve: u64,
    pub funding_rate: i64,
    pub last_funding_ts: i64,
    pub total_long_size: u64,
    pub total_short_size: u64,
    pub max_leverage: u8,
    pub min_margin_ratio_bps: u16,
    pub fee_bps: u16,
    pub is_active: bool,
    pub authority: Pubkey,
    pub min_position_size: u64,
    pub bump: u8,
}

// Declare program account structures and instruction data
// These are named perps_backend in the handlers, but we'll use the direct names here
// and implement the proper traits

#[derive(Debug)]
pub struct InitializeGlobalState {}

impl InstructionData for InitializeGlobalState {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![0]; // Anchor instruction discriminator (simplified)
        data
    }
}

#[derive(Debug)]
pub struct InitializeMarket {
    pub asset_symbol: [u8; 8],
    pub market_id: u64,
    pub oracle_type: u8,
    pub max_leverage: u8,
    pub min_margin_ratio_bps: u16,
    pub fee_bps: u16,
    pub min_position_size: u64,
}

impl InstructionData for InitializeMarket {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![1]; // Anchor instruction discriminator (simplified)
        // In a real implementation, you would serialize these fields
        data
    }
}

#[derive(Debug)]
pub struct CreateUser {}

impl InstructionData for CreateUser {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![2]; // Anchor instruction discriminator (simplified)
        data
    }
}

#[derive(Debug)]
pub struct DepositCollateral {
    pub amount: u64,
}

impl InstructionData for DepositCollateral {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![3]; // Anchor instruction discriminator (simplified)
        // In a real implementation, you would serialize these fields
        data
    }
}

#[derive(Debug)]
pub struct WithdrawCollateral {
    pub amount: u64,
}

impl InstructionData for WithdrawCollateral {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![4]; // Anchor instruction discriminator (simplified)
        // In a real implementation, you would serialize these fields
        data
    }
}

#[derive(Debug)]
pub struct OpenPosition {
    pub is_long: bool,
    pub collateral_amount: u64,
    pub leverage: u8,
    pub market_id: u64,
    pub position_id: u64,
    pub max_slippage_bps: u16,
}

impl InstructionData for OpenPosition {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![5]; // Anchor instruction discriminator (simplified)
        // In a real implementation, you would serialize these fields
        data
    }
}

#[derive(Debug)]
pub struct ClosePosition {
    pub market_id: u64,
    pub max_slippage_bps: u16,
}

impl InstructionData for ClosePosition {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![6]; // Anchor instruction discriminator (simplified)
        // In a real implementation, you would serialize these fields
        data
    }
}

#[derive(Debug)]
pub struct PauseProtocol {
    pub paused: bool,
}

impl InstructionData for PauseProtocol {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![7]; // Anchor instruction discriminator (simplified)
        // In a real implementation, you would serialize these fields
        data
    }
}

#[derive(Debug)]
pub struct UpdateFees {
    pub fee_bps: u16,
}

impl InstructionData for UpdateFees {
    fn data(&self) -> Vec<u8> {
        let mut data = vec![8]; // Anchor instruction discriminator (simplified)
        // In a real implementation, you would serialize these fields
        data
    }
}

#[derive(Debug)]
pub struct InitializeGlobalStateContext {
    pub global_state: Pubkey,
    pub admin: Pubkey,
    pub system_program: Pubkey,
}

impl ToAccountMetas for InitializeGlobalStateContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.global_state, false),
            AccountMeta::new_readonly(self.admin, true),
            AccountMeta::new_readonly(self.system_program, false),
        ]
    }
}

#[derive(Debug)]
pub struct InitializeMarketContext {
    pub market: Pubkey,
    pub oracle: Pubkey,
    pub authority: Pubkey,
    pub global_state: Pubkey,
    pub admin: Pubkey,
    pub system_program: Pubkey,
}

impl ToAccountMetas for InitializeMarketContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.market, false),
            AccountMeta::new_readonly(self.oracle, false),
            AccountMeta::new(self.authority, true),
            AccountMeta::new_readonly(self.global_state, false),
            AccountMeta::new_readonly(self.admin, true),
            AccountMeta::new_readonly(self.system_program, false),
        ]
    }
}

#[derive(Debug)]
pub struct CreateUserContext {
    pub user_account: Pubkey,
    pub user: Pubkey,
    pub system_program: Pubkey,
}

impl ToAccountMetas for CreateUserContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.user_account, false),
            AccountMeta::new(self.user, true),
            AccountMeta::new_readonly(self.system_program, false),
        ]
    }
}

#[derive(Debug)]
pub struct DepositCollateralContext {
    pub user_account: Pubkey,
    pub user_token_account: Pubkey,
    pub vault_token_account: Pubkey,
    pub vault: Pubkey,
    pub vault_authority: Pubkey,
    pub collateral_mint: Pubkey,
    pub user: Pubkey,
    pub global_state: Pubkey,
    pub token_program: Pubkey,
    pub system_program: Pubkey,
}

impl ToAccountMetas for DepositCollateralContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.user_account, false),
            AccountMeta::new(self.user_token_account, false),
            AccountMeta::new(self.vault_token_account, false),
            AccountMeta::new_readonly(self.vault, false),
            AccountMeta::new_readonly(self.vault_authority, false),
            AccountMeta::new_readonly(self.collateral_mint, false),
            AccountMeta::new(self.user, true),
            AccountMeta::new_readonly(self.global_state, false),
            AccountMeta::new_readonly(self.token_program, false),
            AccountMeta::new_readonly(self.system_program, false),
        ]
    }
}

#[derive(Debug)]
pub struct WithdrawCollateralContext {
    pub user_account: Pubkey,
    pub user_token_account: Pubkey,
    pub vault_token_account: Pubkey,
    pub vault: Pubkey,
    pub vault_authority: Pubkey,
    pub collateral_mint: Pubkey,
    pub user: Pubkey,
    pub global_state: Pubkey,
    pub token_program: Pubkey,
    pub system_program: Pubkey,
}

impl ToAccountMetas for WithdrawCollateralContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.user_account, false),
            AccountMeta::new(self.user_token_account, false),
            AccountMeta::new(self.vault_token_account, false),
            AccountMeta::new_readonly(self.vault, false),
            AccountMeta::new_readonly(self.vault_authority, false),
            AccountMeta::new_readonly(self.collateral_mint, false),
            AccountMeta::new(self.user, true),
            AccountMeta::new_readonly(self.global_state, false),
            AccountMeta::new_readonly(self.token_program, false),
            AccountMeta::new_readonly(self.system_program, false),
        ]
    }
}

#[derive(Debug)]
pub struct OpenPositionContext {
    pub position: Pubkey,
    pub user_account: Pubkey,
    pub market: Pubkey,
    pub user: Pubkey,
    pub oracle: Pubkey,
    pub global_state: Pubkey,
    pub system_program: Pubkey,
}

impl ToAccountMetas for OpenPositionContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.position, false),
            AccountMeta::new(self.user_account, false),
            AccountMeta::new(self.market, false),
            AccountMeta::new(self.user, true),
            AccountMeta::new_readonly(self.oracle, false),
            AccountMeta::new_readonly(self.global_state, false),
            AccountMeta::new_readonly(self.system_program, false),
        ]
    }
}

#[derive(Debug)]
pub struct ClosePositionContext {
    pub position: Pubkey,
    pub user_account: Pubkey,
    pub market: Pubkey,
    pub user: Pubkey,
    pub oracle: Pubkey,
    pub global_state: Pubkey,
    pub system_program: Pubkey,
}

impl ToAccountMetas for ClosePositionContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.position, false),
            AccountMeta::new(self.user_account, false),
            AccountMeta::new(self.market, false),
            AccountMeta::new(self.user, true),
            AccountMeta::new_readonly(self.oracle, false),
            AccountMeta::new_readonly(self.global_state, false),
            AccountMeta::new_readonly(self.system_program, false),
        ]
    }
}

#[derive(Debug)]
pub struct PauseProtocolContext {
    pub global_state: Pubkey,
    pub admin: Pubkey,
}

impl ToAccountMetas for PauseProtocolContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.global_state, false),
            AccountMeta::new_readonly(self.admin, true),
        ]
    }
}

#[derive(Debug)]
pub struct UpdateFeesContext {
    pub global_state: Pubkey,
    pub admin: Pubkey,
}

impl ToAccountMetas for UpdateFeesContext {
    fn to_account_metas(&self, is_signer: Option<bool>) -> Vec<AccountMeta> {
        let is_signer = is_signer.unwrap_or(false);
        vec![
            AccountMeta::new(self.global_state, false),
            AccountMeta::new_readonly(self.admin, true),
        ]
    }
} 