use crate::models::error::ApiError;
use crate::models::user::{User as UserModel, UserStats, DepositCollateralRequest, WithdrawCollateralRequest};
use crate::config::CONFIG;
use crate::solana::client::{SolanaClient, get_solana_client};
use crate::solana::idl::PROGRAM_ID;
use crate::solana::pda;
use crate::solana::pda::{find_pda, PerpAccount};
use anchor_client::anchor_lang::prelude::*;
use anchor_client::solana_sdk::account::Account;
use anchor_client::solana_sdk::pubkey::Pubkey;
use anchor_client::solana_sdk::signature::{Keypair, Signature};
use anchor_client::solana_client::rpc_client::RpcClient;
use anchor_client::solana_sdk::commitment_config::CommitmentConfig;
use anchor_client::solana_sdk::signer::Signer;
use anchor_client::solana_sdk::instruction::{AccountMeta, Instruction};
use anchor_client::solana_sdk::transaction::Transaction;
use anchor_client::solana_sdk::system_instruction;
use anchor_client::solana_sdk::sysvar;
use anchor_client::solana_client::rpc_config::{RpcProgramAccountsConfig, RpcAccountInfoConfig};
use anchor_client::solana_client::rpc_filter::{RpcFilterType, Memcmp, MemcmpEncodedBytes};
use log::{info, error, debug};
use std::str::FromStr;

/// Service for managing user operations on the Solana blockchain
pub struct UserService {
    client: RpcClient,
    payer: Keypair,
}

impl UserService {
    /// Create a new user service instance
    pub fn new() -> Self {
        // Create a new RpcClient directly
        let client = RpcClient::new(CONFIG.rpc_url.clone());
        
        // Create a new Keypair copied from CONFIG's keypair
        let payer = Keypair::from_bytes(&CONFIG.keypair.to_bytes())
            .expect("Failed to copy keypair");
        
        Self { client, payer }
    }
    
    /// Create a new user account on-chain
    pub async fn create_user(&self, user_pubkey_str: &str) -> std::result::Result<Signature, ApiError> {
        info!("Creating user account on-chain");
        
        // Parse user pubkey
        let user_pubkey = Pubkey::from_str(user_pubkey_str)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Find the user account PDA
        let (user_account, user_bump) = find_pda(&PerpAccount::User, &[user_pubkey.as_ref()], &PROGRAM_ID);
        
        // Create the instruction data
        let data = vec![0]; // Instruction discriminator for create_user
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(user_pubkey, true),
            AccountMeta::new(user_account, false),
            AccountMeta::new_readonly(anchor_client::solana_sdk::sysvar::rent::id(), false),
            AccountMeta::new_readonly(anchor_client::solana_sdk::system_program::id(), false),
        ];
        
        // Create the instruction
        let instruction = Instruction {
            program_id: *PROGRAM_ID,
            accounts,
            data,
        };
        
        // Create and sign transaction
        let blockhash = self.client.get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &[instruction],
            Some(&self.payer.pubkey()),
            &[&self.payer],
            blockhash,
        );
        
        // Send the transaction
        let signature = self.client.send_and_confirm_transaction_with_spinner(&transaction)?;
        
        info!("User created on-chain: {} with signature {}", user_pubkey, signature);
        
        Ok(signature)
    }
    
    /// Deposit collateral to a user account on-chain
    pub async fn deposit_collateral(&self, user_pubkey_str: &str, request: DepositCollateralRequest) -> std::result::Result<Signature, ApiError> {
        info!("Depositing {} collateral for user {}", request.amount, user_pubkey_str);
        
        // Parse user pubkey
        let user_pubkey = Pubkey::from_str(user_pubkey_str)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Find the user account PDA
        let (user_account, _) = find_pda(&PerpAccount::User, &[user_pubkey.as_ref()], &PROGRAM_ID);
        
        // Find the vault account PDA
        let (vault_account, _) = find_pda(&PerpAccount::Vault, &[], &PROGRAM_ID);
        
        // Create the instruction data
        let mut data = vec![1]; // Instruction discriminator for deposit_collateral
        
        // Add amount (u64 - 8 bytes)
        data.extend_from_slice(&request.amount.to_le_bytes());
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(user_pubkey, true),
            AccountMeta::new(user_account, false),
            AccountMeta::new(vault_account, false),
            AccountMeta::new_readonly(anchor_client::solana_sdk::system_program::id(), false),
        ];
        
        // Create the instruction
        let instruction = Instruction {
            program_id: *PROGRAM_ID,
            accounts,
            data,
        };
        
        // Create and sign transaction
        let blockhash = self.client.get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &[instruction],
            Some(&self.payer.pubkey()),
            &[&self.payer],
            blockhash,
        );
        
        // Send the transaction
        let signature = self.client.send_and_confirm_transaction_with_spinner(&transaction)?;
        
        info!("Collateral deposited on-chain with signature {}", signature);
        
        Ok(signature)
    }
    
    /// Withdraw collateral from a user account on-chain
    pub async fn withdraw_collateral(&self, user_pubkey_str: &str, request: WithdrawCollateralRequest) -> std::result::Result<Signature, ApiError> {
        info!("Withdrawing {} collateral for user {}", request.amount, user_pubkey_str);
        
        // Parse user pubkey
        let user_pubkey = Pubkey::from_str(user_pubkey_str)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Find the user account PDA
        let (user_account, _) = find_pda(&PerpAccount::User, &[user_pubkey.as_ref()], &PROGRAM_ID);
        
        // Find the vault account PDA
        let (vault_account, _) = find_pda(&PerpAccount::Vault, &[], &PROGRAM_ID);
        
        // Create the instruction data
        let mut data = vec![2]; // Instruction discriminator for withdraw_collateral
        
        // Add amount (u64 - 8 bytes)
        data.extend_from_slice(&request.amount.to_le_bytes());
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(user_pubkey, true),
            AccountMeta::new(user_account, false),
            AccountMeta::new(vault_account, false),
            AccountMeta::new_readonly(anchor_client::solana_sdk::system_program::id(), false),
        ];
        
        // Create the instruction
        let instruction = Instruction {
            program_id: *PROGRAM_ID,
            accounts,
            data,
        };
        
        // Create and sign transaction
        let blockhash = self.client.get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &[instruction],
            Some(&self.payer.pubkey()),
            &[&self.payer],
            blockhash,
        );
        
        // Send the transaction
        let signature = self.client.send_and_confirm_transaction_with_spinner(&transaction)?;
        
        info!("Collateral withdrawn on-chain with signature {}", signature);
        
        Ok(signature)
    }
    
    /// Get a user from the blockchain by public key
    pub async fn get_user(&self, user_pubkey_str: &str) -> std::result::Result<UserModel, ApiError> {
        info!("Getting user from chain: {}", user_pubkey_str);
        
        // Parse user pubkey
        let user_pubkey = Pubkey::from_str(user_pubkey_str)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Find the user account PDA
        let (user_account, _) = find_pda(&PerpAccount::User, &[user_pubkey.as_ref()], &PROGRAM_ID);
        
        // Get the user account data
        let account = self.client.get_account_with_commitment(
            &user_account,
            CommitmentConfig::confirmed(),
        )?.value.ok_or_else(|| ApiError::NotFound("User not found".to_string()))?;
        
        // Check if account belongs to our program
        if account.owner != *PROGRAM_ID {
            return Err(ApiError::InvalidRequest("Not a valid user account".to_string()));
        }
        
        // Very basic parsing (simplified)
        // Skip 8 bytes for discriminator
        let mut offset = 8;
        
        // User pubkey (32 bytes)
        let mut pubkey_bytes = [0u8; 32];
        pubkey_bytes.copy_from_slice(&account.data[offset..(offset + 32)]);
        offset += 32;
        
        // Collateral balance (8 bytes)
        let mut balance_bytes = [0u8; 8];
        balance_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let collateral_balance = u64::from_le_bytes(balance_bytes);
        offset += 8;
        
        // Realized PnL (8 bytes)
        let mut pnl_bytes = [0u8; 8];
        pnl_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let realized_pnl = i64::from_le_bytes(pnl_bytes);
        offset += 8;
        
        // Unrealized PnL (8 bytes - optional)
        let unrealized_pnl = if account.data.len() > offset + 8 {
            let mut upnl_bytes = [0u8; 8];
            upnl_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
            Some(i64::from_le_bytes(upnl_bytes))
        } else {
            None
        };
        
        // Create the User struct
        let user = UserModel {
            user: user_pubkey_str.to_string(),
            collateral_balance,
            realized_pnl,
            positions: vec![], // Would need separate queries to populate
            open_positions: 0, // Would need separate queries to populate
            bump: 0, // Would need to extract from account data
            total_account_value: collateral_balance, // Simplified
            unrealized_pnl,
            account_equity_change_24h: None,
        };
        
        Ok(user)
    }
    
    /// Get user positions from the blockchain
    pub async fn get_user_positions(&self, user_pubkey_str: &str) -> std::result::Result<Vec<(String, bool, u64)>, ApiError> {
        info!("Getting positions for user from chain: {}", user_pubkey_str);
        
        // Parse user pubkey
        let user_pubkey = Pubkey::from_str(user_pubkey_str)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Get all program accounts filtered by the user pubkey
        // This is a simplified example - in a real world scenario, the filtering would be more complex
        // depending on the actual data structure
        let accounts = self.client.get_program_accounts_with_config(
            &PROGRAM_ID,
            anchor_client::solana_client::rpc_config::RpcProgramAccountsConfig {
                filters: Some(vec![
                    anchor_client::solana_client::rpc_filter::RpcFilterType::DataSize(256), // Adjust size as needed
                    anchor_client::solana_client::rpc_filter::RpcFilterType::Memcmp(
                        anchor_client::solana_client::rpc_filter::Memcmp {
                            offset: 8, // Offset where user pubkey starts (after discriminator)
                            bytes: anchor_client::solana_client::rpc_filter::MemcmpEncodedBytes::Binary(
                                bs58::encode(user_pubkey.to_bytes()).into_string()
                            ),
                            encoding: None,
                        }
                    ),
                ]),
                account_config: anchor_client::solana_client::rpc_config::RpcAccountInfoConfig {
                    encoding: None,
                    commitment: Some(CommitmentConfig::confirmed()),
                    data_slice: None,
                },
                with_context: None,
            },
        )?;
        
        let mut positions = Vec::new();
        
        for (pubkey, account) in accounts {
            // Skip accounts that don't match position account pattern
            if account.data.len() < 100 || account.data[0] != 2 { // Assuming 2 is position discriminator
                continue;
            }
            
            // Very basic parsing (simplified)
            // For a real implementation, you would have proper deserialization based on your account structure
            
            // Skip 8 bytes for discriminator
            let mut offset = 8;
            
            // Skip user pubkey (32 bytes)
            offset += 32;
            
            // Skip market pubkey (32 bytes)
            offset += 32;
            
            // Is long (1 byte boolean)
            let is_long = account.data[offset] != 0;
            offset += 1;
            
            // Size (8 bytes)
            let mut size_bytes = [0u8; 8];
            size_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
            let size = u64::from_le_bytes(size_bytes);
            
            positions.push((pubkey.to_string(), is_long, size));
        }
        
        Ok(positions)
    }
    
    /// Get basic user statistics from on-chain data
    pub async fn get_user_stats(&self, user_pubkey_str: &str) -> std::result::Result<UserStats, ApiError> {
        // This is a simplified implementation - in a real world scenario, 
        // you would gather more detailed statistics from various on-chain sources
        
        info!("Getting stats for user from chain: {}", user_pubkey_str);
        
        // First get the basic user account
        let user = self.get_user(user_pubkey_str).await?;
        
        // Parse user pubkey
        let user_pubkey = Pubkey::from_str(user_pubkey_str)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Get positions (simplified)
        let positions = self.get_user_positions(user_pubkey_str).await?;
        
        // Calculate basic stats
        let total_positions_closed = 0; // Would need transaction history to calculate
        let total_volume = 0; // Would need transaction history to calculate
        let total_fees_paid = 0; // Would need transaction history to calculate
        
        // Create user stats (with placeholder values)
        let stats = UserStats {
            user: user_pubkey_str.to_string(),
            total_volume: total_volume,
            total_fees_paid: total_fees_paid,
            total_trades: total_positions_closed,
            pnl_metrics: crate::models::user::PnLMetrics {
                total_realized_pnl: user.realized_pnl,
                total_unrealized_pnl: user.unrealized_pnl.unwrap_or(0),
                total_funding_payments: 0, // Would need funding history to calculate
                total_deposits: 0, // Would need transaction history to calculate
                total_withdrawals: 0, // Would need transaction history to calculate
            },
            trading_metrics: crate::models::user::TradingMetrics {
                win_rate: 0.0, // Would need trade history to calculate
                avg_profit: 0.0, // Would need trade history to calculate
                avg_loss: 0.0, // Would need trade history to calculate
                risk_reward_ratio: 0.0, // Would need trade history to calculate
                longest_win_streak: 0, // Would need trade history to calculate
                longest_lose_streak: 0, // Would need trade history to calculate
            },
        };
        
        Ok(stats)
    }
}

/// Get a singleton instance of the user service
pub fn get_user_service() -> UserService {
    UserService::new()
} 