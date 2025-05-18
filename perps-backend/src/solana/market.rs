use crate::models::error::ApiError;
use crate::models::market::{Market, OracleType, CreateMarketRequest, UpdateFundingRequest};
use crate::config::CONFIG;
use crate::solana::client::get_solana_client;
use crate::solana::idl::{PROGRAM_ID, PerpAccount, OracleSource};
use crate::solana::pda::{find_pda, PerpAccount as PdaAccount};
use crate::solana::oracle::get_oracle_price_by_address;

use log::{info, error, debug, warn};
use anchor_client::solana_client::rpc_client::RpcClient;
use anchor_client::solana_sdk::{
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
    signature::{Keypair, Signature},
    signer::Signer,
    transaction::Transaction,
    commitment_config::CommitmentConfig,
    system_instruction,
};
use std::str::FromStr;
use chrono::Utc;

/// Service for managing markets on the Solana blockchain
pub struct MarketService {
    client: RpcClient,
    payer: Keypair,
}

impl MarketService {
    /// Create a new market service instance
    pub fn new() -> Self {
        // Get an RpcClient
        let client = RpcClient::new(CONFIG.rpc_url.clone());
        
        // Create a keypair from CONFIG
        let payer = Keypair::from_bytes(&CONFIG.keypair.as_ref().to_bytes())
            .expect("Failed to create keypair from bytes");
        
        Self { client, payer }
    }
    
    /// Create a new market on-chain
    pub async fn create_market(&self, request: CreateMarketRequest) -> Result<(Pubkey, Signature), ApiError> {
        info!("Creating market on-chain");
        
        // Generate a random seed for the market
        let market_seed = Pubkey::new_unique();
        
        // Find the market account PDA
        let (market_account, market_bump) = find_pda(
            &PdaAccount::Market,
            &[market_seed.as_ref()],
            &PROGRAM_ID
        );
        
        // Parse oracle pubkey
        let oracle_address = Pubkey::from_str(&request.oracle_address)
            .map_err(|_| ApiError::InvalidRequest("Invalid oracle address".to_string()))?;
        
        // Create the instruction data
        let mut data = vec![0]; // Instruction discriminator for create_market
        
        // Add asset symbol (fixed length of 8 bytes, padded with zeros)
        let mut symbol_bytes = [0u8; 8];
        let symbol_len = request.asset_symbol.len().min(8);
        symbol_bytes[..symbol_len].copy_from_slice(&request.asset_symbol.as_bytes()[..symbol_len]);
        data.extend_from_slice(&symbol_bytes);
        
        // Add market ID (u64 - 8 bytes)
        data.extend_from_slice(&request.market_id.to_le_bytes());
        
        // Add oracle type
        data.push(request.oracle_type);
        
        // Add min margin ratio in basis points (u16 - 2 bytes)
        data.extend_from_slice(&request.min_margin_ratio_bps.to_le_bytes());
        
        // Add fee in basis points (u16 - 2 bytes)
        data.extend_from_slice(&request.fee_bps.to_le_bytes());
        
        // Add max leverage (u8 - 1 byte)
        data.push(request.max_leverage);
        
        // Add min position size (u64 - 8 bytes)
        data.extend_from_slice(&request.min_position_size.to_le_bytes());
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(market_account, false),
            AccountMeta::new_readonly(oracle_address, false),
            AccountMeta::new_readonly(self.payer.pubkey(), false), // Admin key
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
        
        info!("Market created on-chain: {}", signature);
        
        Ok((market_account, signature))
    }
    
    /// Update an existing market on-chain
    pub async fn update_market(&self, market_pubkey: &Pubkey, request: UpdateMarketRequest) -> Result<Signature, ApiError> {
        info!("Updating market on-chain: {}", market_pubkey);
        
        // Create the instruction data
        let mut data = vec![1]; // Instruction discriminator for update_market
        
        // Add maintenance margin fraction if provided
        if let Some(value) = request.maintenance_margin_fraction {
            data.push(1); // Field present flag
            data.extend_from_slice(&value.to_le_bytes());
        } else {
            data.push(0); // Field not present flag
        }
        
        // Add initial margin fraction if provided
        if let Some(value) = request.initial_margin_fraction {
            data.push(1); // Field present flag
            data.extend_from_slice(&value.to_le_bytes());
        } else {
            data.push(0); // Field not present flag
        }
        
        // Add liquidation fee fraction if provided
        if let Some(value) = request.liquidation_fee_fraction {
            data.push(1); // Field present flag
            data.extend_from_slice(&value.to_le_bytes());
        } else {
            data.push(0); // Field not present flag
        }
        
        // Add fee fraction if provided
        if let Some(value) = request.fee_fraction {
            data.push(1); // Field present flag
            data.extend_from_slice(&value.to_le_bytes());
        } else {
            data.push(0); // Field not present flag
        }
        
        // Add max leverage if provided
        if let Some(value) = request.max_leverage {
            data.push(1); // Field present flag
            data.push(value);
        } else {
            data.push(0); // Field not present flag
        }
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(*market_pubkey, false),
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
        
        info!("Market updated on-chain: {}", signature);
        
        Ok(signature)
    }
    
    /// Update market funding rate on-chain
    pub async fn update_funding_rate(&self, market_pubkey: &Pubkey, request: UpdateFundingRequest) -> Result<Signature, ApiError> {
        info!("Updating funding rate for market: {}", market_pubkey);
        
        // Create the instruction data
        let mut data = vec![2]; // Instruction discriminator for update_funding_rate
        
        // Add funding rate (f64 - 8 bytes)
        data.extend_from_slice(&request.funding_rate.to_le_bytes());
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(*market_pubkey, false),
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
        
        info!("Funding rate updated on-chain: {}", signature);
        
        Ok(signature)
    }
    
    /// Toggle market pause state on-chain
    pub async fn toggle_market_pause(&self, market_pubkey: &Pubkey, paused: bool) -> Result<Signature, ApiError> {
        info!("Setting market {} pause state to {}", market_pubkey, paused);
        
        // Create the instruction data
        let mut data = vec![3]; // Instruction discriminator for toggle_market_pause
        
        // Add pause state
        data.push(if paused { 1 } else { 0 });
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
            AccountMeta::new(*market_pubkey, false),
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
        
        info!("Market pause state updated on-chain: {}", signature);
        
        Ok(signature)
    }
    
    /// Update protocol-wide fees on-chain
    pub async fn update_protocol_fees(&self, fee_bps: u16) -> Result<Signature, ApiError> {
        info!("Updating protocol fees to {} bps", fee_bps);
        
        // Create the instruction data
        let mut data = vec![4]; // Instruction discriminator for update_protocol_fees
        
        // Add fee in basis points (u16 - 2 bytes)
        data.extend_from_slice(&fee_bps.to_le_bytes());
        
        // Create the instruction accounts
        let accounts = vec![
            AccountMeta::new(self.payer.pubkey(), true),
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
        
        info!("Protocol fees updated on-chain: {}", signature);
        
        Ok(signature)
    }
    
    /// Get a market from the blockchain
    pub async fn get_market(&self, market_id: &str) -> Result<Market, ApiError> {
        info!("Getting market from chain: {}", market_id);
        
        let market_pubkey = Pubkey::from_str(market_id)
            .map_err(|_| ApiError::InvalidRequest("Invalid market pubkey".to_string()))?;
        
        // Get the market account data
        let account = self.client.get_account_with_commitment(
            &market_pubkey,
            CommitmentConfig::confirmed(),
        )?.value.ok_or_else(|| ApiError::NotFound("Market not found".to_string()))?;
        
        // Parse the account data into a Market struct
        // This is a simplified example parsing - in a real implementation would be more complex
        
        // Check if account belongs to our program
        if account.owner != *PROGRAM_ID {
            return Err(ApiError::InvalidRequest("Not a valid market account".to_string()));
        }
        
        // Basic parsing of market data (simplified)
        // In a real implementation, this would be more detailed based on your account structure
        
        // Skip discriminator
        let mut offset = 8;
        
        // Asset symbol (8 bytes)
        let mut symbol_bytes = [0u8; 8];
        symbol_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let asset_symbol = String::from_utf8_lossy(&symbol_bytes)
            .trim_matches(char::from(0))
            .to_string();
        offset += 8;
        
        // Oracle address (32 bytes)
        let mut oracle_bytes = [0u8; 32];
        oracle_bytes.copy_from_slice(&account.data[offset..(offset + 32)]);
        let oracle = Pubkey::new_from_array(oracle_bytes).to_string();
        offset += 32;
        
        // Oracle type (1 byte)
        let oracle_type = account.data[offset];
        offset += 1;
        
        // Base asset reserve (8 bytes)
        let mut base_reserve_bytes = [0u8; 8];
        base_reserve_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let base_asset_reserve = u64::from_le_bytes(base_reserve_bytes);
        offset += 8;
        
        // Quote asset reserve (8 bytes)
        let mut quote_reserve_bytes = [0u8; 8];
        quote_reserve_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let quote_asset_reserve = u64::from_le_bytes(quote_reserve_bytes);
        offset += 8;
        
        // Funding rate (8 bytes)
        let mut rate_bytes = [0u8; 8];
        rate_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let funding_rate = i64::from_le_bytes(rate_bytes);
        offset += 8;
        
        // Last funding timestamp (8 bytes)
        let mut ts_bytes = [0u8; 8];
        ts_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let last_funding_ts = i64::from_le_bytes(ts_bytes);
        offset += 8;
        
        // Total long size (8 bytes)
        let mut long_size_bytes = [0u8; 8];
        long_size_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let total_long_size = u64::from_le_bytes(long_size_bytes);
        offset += 8;
        
        // Total short size (8 bytes)
        let mut short_size_bytes = [0u8; 8];
        short_size_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let total_short_size = u64::from_le_bytes(short_size_bytes);
        offset += 8;
        
        // Max leverage (1 byte)
        let max_leverage = account.data[offset];
        offset += 1;
        
        // Min margin ratio (2 bytes)
        let mut margin_bytes = [0u8; 2];
        margin_bytes.copy_from_slice(&account.data[offset..(offset + 2)]);
        let min_margin_ratio_bps = u16::from_le_bytes(margin_bytes);
        offset += 2;
        
        // Fee in basis points (2 bytes)
        let mut fee_bytes = [0u8; 2];
        fee_bytes.copy_from_slice(&account.data[offset..(offset + 2)]);
        let fee_bps = u16::from_le_bytes(fee_bytes);
        offset += 2;
        
        // Is active (1 byte)
        let is_active = account.data[offset] != 0;
        offset += 1;
        
        // Authority (32 bytes)
        let mut authority_bytes = [0u8; 32];
        authority_bytes.copy_from_slice(&account.data[offset..(offset + 32)]);
        let authority = Pubkey::new_from_array(authority_bytes).to_string();
        offset += 32;
        
        // Min position size (8 bytes)
        let mut min_size_bytes = [0u8; 8];
        min_size_bytes.copy_from_slice(&account.data[offset..(offset + 8)]);
        let min_position_size = u64::from_le_bytes(min_size_bytes);
        offset += 8;
        
        // Bump (1 byte)
        let bump = account.data[offset];
        
        // Get the current price from oracle
        let mark_price = match get_oracle_price_by_address(&oracle.to_string(), crate::solana::oracle::OracleType::from(oracle_type)).await {
            Ok(price) => price,
            Err(e) => {
                warn!("Failed to get oracle price: {}", e);
                0 // Default price
            }
        };
        
        // Create the Market struct
        let market = Market {
            id: market_id.to_string(),
            asset_symbol,
            oracle: oracle.to_string(),
            oracle_type,
            base_asset_reserve,
            quote_asset_reserve,
            funding_rate,
            last_funding_ts,
            total_long_size,
            total_short_size,
            max_leverage,
            min_margin_ratio_bps,
            fee_bps,
            is_active,
            authority,
            min_position_size,
            bump,
            mark_price,
            price_change_24h: None, // Would need historical data
            volume_24h: None, // Would need historical data
        };
        
        Ok(market)
    }
    
    /// Get protocol statistics
    pub async fn get_protocol_stats(&self) -> Result<ProtocolStats, ApiError> {
        info!("Getting protocol statistics");
        
        // In a real implementation, this would collect data from various on-chain sources
        
        // Placeholder implementation
        Ok(ProtocolStats {
            total_markets: 0,
            total_users: 0,
            total_volume_24h: 0,
            total_open_interest: 0,
            total_fees_collected: 0,
            active_positions: 0,
            liquidations_24h: 0,
        })
    }
}

/// Simplified market update request
#[derive(Debug, Clone)]
pub struct UpdateMarketRequest {
    pub maintenance_margin_fraction: Option<u64>,
    pub initial_margin_fraction: Option<u64>,
    pub liquidation_fee_fraction: Option<u64>,
    pub fee_fraction: Option<u64>,
    pub max_leverage: Option<u8>,
}

/// Protocol statistics model
#[derive(Debug, Clone, serde::Serialize)]
pub struct ProtocolStats {
    pub total_markets: u64,
    pub total_users: u64,
    pub total_volume_24h: u64,
    pub total_open_interest: u64,
    pub total_fees_collected: u64,
    pub active_positions: u64,
    pub liquidations_24h: u64,
}

/// Get a singleton instance of the market service
pub fn get_market_service() -> MarketService {
    MarketService::new()
} 