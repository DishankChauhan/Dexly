use crate::models::error::ApiError;
use crate::models::order::{Order, OrderType, OrderStatus, PlaceOrderRequest, CancelOrderRequest};
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
use anchor_client::solana_client::rpc_config::{RpcProgramAccountsConfig, RpcAccountInfoConfig};
use anchor_client::solana_client::rpc_filter::{RpcFilterType, Memcmp, MemcmpEncodedBytes};
use anchor_client::solana_sdk::system_program;
use log::{info, error, debug};
use serde::{Deserialize, Serialize};
use std::str::FromStr;
use std::sync::Arc;

/// Service for managing orders on the Solana blockchain
pub struct OrderService {
    client: RpcClient,
    payer: Keypair,
}

impl OrderService {
    /// Create a new order service instance
    pub fn new() -> Self {
        // Get a raw RpcClient instead of SolanaClient
        let client = RpcClient::new(CONFIG.rpc_url.clone());
        
        // Create a new Keypair copied from CONFIG's keypair
        let payer = Keypair::from_bytes(&CONFIG.keypair.to_bytes())
            .expect("Failed to copy keypair");
        
        Self { client, payer }
    }
    
    /// Place a new order on-chain
    pub async fn place_order(&self, request: PlaceOrderRequest) -> std::result::Result<(Pubkey, Signature), ApiError> {
        info!("Placing order on-chain");
        
        // Parse user pubkey
        let user_pubkey = Pubkey::from_str(&request.user)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Parse market pubkey
        let market_id = request.market_id;
        
        // Find the user account PDA
        let (user_account, _) = find_pda(&PerpAccount::User, &[user_pubkey.as_ref()], &PROGRAM_ID);
        
        // Find the market account PDA
        let market_pubkey = pda::get_market_address(market_id, &PROGRAM_ID);
        let (market_account, _) = find_pda(&PerpAccount::Market, &[market_pubkey.as_ref()], &PROGRAM_ID);
        
        // Generate a random seed for the order
        let order_seed = Pubkey::new_unique();
        
        // Find the order account PDA
        let (order_account, order_bump) = find_pda(
            &PerpAccount::Order,
            &[user_pubkey.as_ref(), order_seed.as_ref()],
            &PROGRAM_ID
        );
        
        // Create the instruction data
        let mut data = vec![0]; // Instruction discriminator for place_order
        
        // Add order type
        data.push(request.order_type);
        
        // Add direction (long/short)
        data.push(if request.is_long { 1 } else { 0 });
        
        // Add price (u64 - 8 bytes)
        data.extend_from_slice(&request.price.to_le_bytes());
        
        // Add size (u64 - 8 bytes)
        data.extend_from_slice(&request.size.to_le_bytes());
        
        // Add collateral (u64 - 8 bytes)
        data.extend_from_slice(&request.collateral.to_le_bytes());
        
        // Add leverage (u8 - 1 byte)
        data.push(request.leverage);
        
        // Add max slippage (u16 - 2 bytes)
        data.extend_from_slice(&request.max_slippage_bps.to_le_bytes());
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(user_pubkey, true),
            AccountMeta::new(user_account, false),
            AccountMeta::new(market_account, false),
            AccountMeta::new(order_account, false),
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
        let blockhash = self.client.get_latest_blockhash()
            .map_err(|e| ApiError::NetworkError(format!("Failed to get blockhash: {}", e)))?;
            
        let transaction = Transaction::new_signed_with_payer(
            &[instruction],
            Some(&self.payer.pubkey()),
            &[&self.payer],
            blockhash,
        );
        
        // Send the transaction
        let signature = self.client.send_and_confirm_transaction_with_spinner(&transaction)
            .map_err(|e| ApiError::NetworkError(format!("Failed to send transaction: {}", e)))?;
        
        info!("Order placed on-chain: {}", signature);
        
        Ok((order_account, signature))
    }
    
    /// Cancel an existing order on-chain
    pub async fn cancel_order(&self, request: CancelOrderRequest) -> std::result::Result<Signature, ApiError> {
        info!("Cancelling order on-chain");
        
        // Parse user pubkey
        let user_pubkey = Pubkey::from_str(&request.user)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Parse order pubkey
        let order_pubkey = Pubkey::from_str(&request.order_id)
            .map_err(|_| ApiError::InvalidRequest("Invalid order pubkey".to_string()))?;
        
        // Find the user account PDA
        let (user_account, _) = find_pda(&PerpAccount::User, &[user_pubkey.as_ref()], &PROGRAM_ID);
        
        // Create the instruction data
        let data = vec![1]; // Instruction discriminator for cancel_order
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(user_pubkey, true),
            AccountMeta::new(user_account, false),
            AccountMeta::new(order_pubkey, false),
        ];
        
        // Create the instruction
        let instruction = Instruction {
            program_id: *PROGRAM_ID,
            accounts,
            data,
        };
        
        // Create and sign transaction
        let blockhash = self.client.get_latest_blockhash()
            .map_err(|e| ApiError::NetworkError(format!("Failed to get blockhash: {}", e)))?;
            
        let transaction = Transaction::new_signed_with_payer(
            &[instruction],
            Some(&self.payer.pubkey()),
            &[&self.payer],
            blockhash,
        );
        
        // Send the transaction
        let signature = self.client.send_and_confirm_transaction_with_spinner(&transaction)
            .map_err(|e| ApiError::NetworkError(format!("Failed to send transaction: {}", e)))?;
        
        info!("Order cancelled on-chain: {}", signature);
        
        Ok(signature)
    }
    
    /// Execute an existing order on-chain
    pub async fn execute_order(&self, order_id: &str, executor_id: &str) -> std::result::Result<Signature, ApiError> {
        info!("Executing order on-chain");
        
        // Parse executor pubkey
        let executor_pubkey = Pubkey::from_str(executor_id)
            .map_err(|_| ApiError::InvalidRequest("Invalid executor pubkey".to_string()))?;
        
        // Parse order pubkey
        let order_pubkey = Pubkey::from_str(order_id)
            .map_err(|_| ApiError::InvalidRequest("Invalid order pubkey".to_string()))?;
        
        // Get order account data to extract necessary information
        let order_data = self.client.get_account(&order_pubkey)
            .map_err(|e| ApiError::NetworkError(format!("Failed to get order data: {}", e)))?
            .data;
        
        // Parse user pubkey from order data (this will depend on the actual data structure)
        // For this example, assuming user pubkey is stored at offset 8 for 32 bytes
        let mut user_pubkey_bytes = [0u8; 32];
        user_pubkey_bytes.copy_from_slice(&order_data[8..40]);
        let user_pubkey = Pubkey::new_from_array(user_pubkey_bytes);
        
        // Parse market pubkey from order data (this will depend on the actual data structure)
        // For this example, assuming market pubkey is stored at offset 40 for 32 bytes
        let mut market_pubkey_bytes = [0u8; 32];
        market_pubkey_bytes.copy_from_slice(&order_data[40..72]);
        let market_pubkey = Pubkey::new_from_array(market_pubkey_bytes);
        
        // Extract market_id (u64) from the bytes (assuming it's stored somewhere in the order data)
        let mut market_id_bytes = [0u8; 8];
        market_id_bytes.copy_from_slice(&order_data[72..80]); // Example offset, adjust as needed
        let market_id = u64::from_le_bytes(market_id_bytes);
        
        // Find user account PDA
        let (user_account, _) = find_pda(&PerpAccount::User, &[user_pubkey.as_ref()], &PROGRAM_ID);
        
        // Get oracle info from market
        let (market_account, _) = find_pda(&PerpAccount::Market, &[&market_id.to_le_bytes()], &PROGRAM_ID);
        
        // Get oracle account from market data
        let market_data = self.client.get_account(&market_account)
            .map_err(|e| ApiError::NetworkError(format!("Failed to get market data: {}", e)))?
            .data;
            
        // Parse oracle pubkey from market data (adjust offset based on your structure)
        let mut oracle_pubkey_bytes = [0u8; 32];
        oracle_pubkey_bytes.copy_from_slice(&market_data[40..72]); // Example offset, adjust as needed
        let oracle_pubkey = Pubkey::new_from_array(oracle_pubkey_bytes);
        
        // Get global state
        let (global_state, _) = find_pda(&PerpAccount::GlobalState, &[], &PROGRAM_ID);
        
        // Create the instruction data for execute_order
        let mut data = vec![2]; // Instruction discriminator for execute_order
        
        // Add the market_id to the instruction data
        data.extend_from_slice(&market_id.to_le_bytes());
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(order_pubkey, false),
            AccountMeta::new(user_account, false),
            AccountMeta::new(market_account, false),
            AccountMeta::new(executor_pubkey, true),
            AccountMeta::new_readonly(oracle_pubkey, false),
            AccountMeta::new(global_state, false),
            AccountMeta::new_readonly(anchor_client::solana_sdk::system_program::id(), false),
        ];
        
        // Create the instruction
        let instruction = Instruction {
            program_id: *PROGRAM_ID,
            accounts,
            data,
        };
        
        // Create and sign transaction
        let blockhash = self.client.get_latest_blockhash()
            .map_err(|e| ApiError::NetworkError(format!("Failed to get blockhash: {}", e)))?;
            
        let transaction = Transaction::new_signed_with_payer(
            &[instruction],
            Some(&self.payer.pubkey()),
            &[&self.payer],
            blockhash,
        );
        
        // Send the transaction
        let signature = self.client.send_and_confirm_transaction_with_spinner(&transaction)
            .map_err(|e| ApiError::NetworkError(format!("Failed to send transaction: {}", e)))?;
        
        info!("Order executed on-chain: {}", signature);
        
        Ok(signature)
    }
    
    /// Get an order from the blockchain
    pub async fn get_order(&self, order_id: &str) -> std::result::Result<Order, ApiError> {
        info!("Getting order from chain: {}", order_id);
        
        let order_pubkey = Pubkey::from_str(order_id)
            .map_err(|_| ApiError::InvalidRequest("Invalid order pubkey".to_string()))?;
        
        // Get the order account data
        let account = self.client.get_account_with_commitment(
            &order_pubkey,
            CommitmentConfig::confirmed(),
        )
        .map_err(|e| ApiError::NetworkError(format!("Failed to get order account: {}", e)))?
        .value.ok_or_else(|| ApiError::NotFound("Order not found".to_string()))?;
        
        // Parse the account data into an Order struct
        // This would depend on the actual data structure of your on-chain order accounts
        // For this example, we're showing a simplified parsing approach
        
        // Check if account belongs to our program
        if account.owner != *PROGRAM_ID {
            return Err(ApiError::InvalidRequest("Not a valid order account".to_string()));
        }
        
        // Access the raw data
        let data = account.data;
        
        // Basic parsing of order data (simplified)
        // In a real implementation, you would deserialize this according to your account structure
        
        // Example parsing:
        // Assuming data layout:
        // - discriminator: 8 bytes
        // - user: Pubkey (32 bytes)
        // - market: Pubkey (32 bytes)
        // - order type: 1 byte
        // - is_long: 1 byte (bool)
        // - size: 8 bytes (u64)
        // - price: 8 bytes (u64)
        // - collateral: 8 bytes (u64)
        // - leverage: 1 byte (u8)
        // - status: 1 byte
        // - timestamp: 8 bytes (i64)
        
        // Skip discriminator
        let mut offset = 8;
        
        // User pubkey
        let mut user_bytes = [0u8; 32];
        user_bytes.copy_from_slice(&data[offset..(offset + 32)]);
        let user = Pubkey::new_from_array(user_bytes).to_string();
        offset += 32;
        
        // Market pubkey
        let mut market_bytes = [0u8; 32];
        market_bytes.copy_from_slice(&data[offset..(offset + 32)]);
        let market = Pubkey::new_from_array(market_bytes).to_string();
        offset += 32;
        
        // Order type
        let order_type_byte = data[offset];
        let order_type = match order_type_byte {
            0 => OrderType::Market,
            1 => OrderType::Limit,
            2 => OrderType::StopLoss,
            3 => OrderType::TakeProfit,
            _ => OrderType::Market,
        };
        offset += 1;
        
        // Is long
        let is_long = data[offset] != 0;
        offset += 1;
        
        // Size
        let mut size_bytes = [0u8; 8];
        size_bytes.copy_from_slice(&data[offset..(offset + 8)]);
        let size = u64::from_le_bytes(size_bytes);
        offset += 8;
        
        // Price
        let mut price_bytes = [0u8; 8];
        price_bytes.copy_from_slice(&data[offset..(offset + 8)]);
        let price = u64::from_le_bytes(price_bytes);
        offset += 8;
        
        // Collateral
        let mut collateral_bytes = [0u8; 8];
        collateral_bytes.copy_from_slice(&data[offset..(offset + 8)]);
        let collateral = u64::from_le_bytes(collateral_bytes);
        offset += 8;
        
        // Leverage
        let leverage = data[offset];
        offset += 1;
        
        // Status
        let status_byte = data[offset];
        let status = match status_byte {
            0 => OrderStatus::Open,
            1 => OrderStatus::Filled,
            2 => OrderStatus::Canceled,
            3 => OrderStatus::Expired,
            _ => OrderStatus::Open,
        };
        offset += 1;
        
        // Timestamp
        let mut timestamp_bytes = [0u8; 8];
        timestamp_bytes.copy_from_slice(&data[offset..(offset + 8)]);
        let timestamp = i64::from_le_bytes(timestamp_bytes);
        
        // Create the Order struct
        let order = Order {
            id: order_id.to_string(),
            user,
            market,
            order_type: order_type as u8,
            is_long,
            size,
            price,
            collateral,
            leverage,
            is_active: status == OrderStatus::Open,
            max_slippage_bps: 0, // Default value, should be extracted from data
            created_at: timestamp,
            position_id: 0, // Default value
            bump: 0, // Default value, should be extracted from data
            status,
            mark_price: None,
        };
        
        Ok(order)
    }
    
    /// Get all orders for a user from the blockchain
    pub async fn get_user_orders(&self, user_pubkey: &str) -> std::result::Result<Vec<Order>, ApiError> {
        info!("Getting all orders for user: {}", user_pubkey);
        
        let user = Pubkey::from_str(user_pubkey)
            .map_err(|_| ApiError::InvalidRequest("Invalid user pubkey".to_string()))?;
        
        // Get all program accounts filtered by the user pubkey
        // Note: This assumes the user pubkey is stored at a specific offset in the account data
        // You'll need to adjust this based on your actual data structure
        let accounts = self.client.get_program_accounts_with_config(
            &PROGRAM_ID,
            RpcProgramAccountsConfig {
                filters: Some(vec![
                    RpcFilterType::DataSize(256), // Adjust size as needed
                    RpcFilterType::Memcmp(
                        Memcmp {
                            offset: 8, // Offset where user pubkey starts (after discriminator)
                            bytes: MemcmpEncodedBytes::Binary(
                                bs58::encode(user.to_bytes()).into_string()
                            ),
                            encoding: None,
                        }
                    ),
                ]),
                account_config: RpcAccountInfoConfig {
                    encoding: None,
                    commitment: Some(CommitmentConfig::confirmed()),
                    data_slice: None,
                },
                with_context: None,
            },
        )
        .map_err(|e| ApiError::NetworkError(format!("Failed to get program accounts: {}", e)))?;
        
        let mut orders = Vec::new();
        
        for (pubkey, _account) in accounts {
            // Try to parse as an order
            match self.get_order(&pubkey.to_string()).await {
                Ok(order) => orders.push(order),
                Err(e) => {
                    debug!("Failed to parse order {}: {}", pubkey, e);
                    continue;
                }
            }
        }
        
        Ok(orders)
    }
    
    // Add a method to convert a blockchain order to our model order
    pub async fn to_model_order(&self, address: &str, order: &Order) -> std::result::Result<Order, ApiError> {
        // Simply return a clone of the order for now
        Ok(order.clone())
    }
}

/// Singleton accessor for the OrderService
pub fn get_order_service() -> OrderService {
    OrderService::new()
}