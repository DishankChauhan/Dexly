use anchor_client::solana_client::rpc_filter::{RpcFilterType, Memcmp, MemcmpEncodedBytes};
use anchor_client::solana_sdk::account::Account;
use anchor_client::solana_sdk::{
    instruction::Instruction,
    pubkey::Pubkey,
    signature::{Keypair, Signature},
    transaction::Transaction,
    system_program,
};
use std::str::FromStr;
use borsh::{BorshDeserialize, BorshSerialize};
use serde::{Deserialize, Serialize};
use crate::models::error::ApiError;
use crate::solana::client::{SolanaClient, get_solana_client};
use crate::solana::pda;
use crate::solana::pda::{find_pda, PerpAccount};
use crate::models::position::{Position as PositionModel, OpenPositionRequest, ClosePositionRequest};
use crate::solana::oracle;
use crate::config::CONFIG;
use crate::solana::idl::PROGRAM_ID;
use anchor_client::anchor_lang::AccountDeserialize;
use anchor_client::anchor_lang::prelude::ToAccountMetas;
use anchor_client::anchor_lang::prelude::AccountMeta;
use anchor_client::anchor_lang::prelude::*;

use log::{info, error, debug, warn};
use anchor_client::solana_sdk::{
    signer::Signer,
    commitment_config::CommitmentConfig,
    system_instruction,
};
use bs58;
use chrono;

/// Position account data deserialized from the contract
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Position {
    /// User who owns this position
    pub user: Pubkey,
    
    /// Market this position is for
    pub market: Pubkey,
    
    /// Direction of the position (true = long, false = short)
    pub is_long: bool,
    
    /// Size of the position in base asset units
    pub size: u64,
    
    /// Entry price of the position
    pub entry_price: u64,
    
    /// Collateral amount in quote asset units (e.g., USDC)
    pub collateral: u64,
    
    /// Leverage used for this position
    pub leverage: u8,
    
    /// Timestamp when position was opened
    pub opened_at: i64,
    
    /// Last funding payment timestamp
    pub last_funding_ts: i64,
    
    /// Realized PnL from funding payments
    pub realized_pnl_from_funding: i64,
    
    /// Liquidation price
    pub liquidation_price: u64,
    
    /// Whether position is closed
    pub is_closed: bool,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
}

// Implement AccountDeserialize for Position
impl AccountDeserialize for Position {
    fn try_deserialize(buf: &mut &[u8]) -> std::result::Result<Self, anchor_client::anchor_lang::error::Error> {
        let position = borsh::BorshDeserialize::deserialize(buf)
            .map_err(|e| anchor_client::anchor_lang::error::Error::from(e))?;
        Ok(position)
    }
    
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> std::result::Result<Self, anchor_client::anchor_lang::error::Error> {
        let position = borsh::BorshDeserialize::deserialize(buf)
            .map_err(|e| anchor_client::anchor_lang::error::Error::from(e))?;
        Ok(position)
    }
}

// Implement BorshDeserialize for Position
impl borsh::BorshDeserialize for Position {
    fn deserialize(buf: &mut &[u8]) -> std::io::Result<Self> {
        let user = borsh::BorshDeserialize::deserialize(buf)?;
        let market = borsh::BorshDeserialize::deserialize(buf)?;
        let is_long = borsh::BorshDeserialize::deserialize(buf)?;
        let size = borsh::BorshDeserialize::deserialize(buf)?;
        let entry_price = borsh::BorshDeserialize::deserialize(buf)?;
        let collateral = borsh::BorshDeserialize::deserialize(buf)?;
        let leverage = borsh::BorshDeserialize::deserialize(buf)?;
        let opened_at = borsh::BorshDeserialize::deserialize(buf)?;
        let last_funding_ts = borsh::BorshDeserialize::deserialize(buf)?;
        let realized_pnl_from_funding = borsh::BorshDeserialize::deserialize(buf)?;
        let liquidation_price = borsh::BorshDeserialize::deserialize(buf)?;
        let is_closed = borsh::BorshDeserialize::deserialize(buf)?;
        let bump = borsh::BorshDeserialize::deserialize(buf)?;
        
        Ok(Position {
            user,
            market,
            is_long,
            size,
            entry_price,
            collateral,
            leverage,
            opened_at,
            last_funding_ts,
            realized_pnl_from_funding,
            liquidation_price,
            is_closed,
            bump,
        })
    }
}

// Implement BorshSerialize for Position
impl borsh::BorshSerialize for Position {
    fn serialize<W: std::io::Write>(&self, writer: &mut W) -> std::io::Result<()> {
        borsh::BorshSerialize::serialize(&self.user, writer)?;
        borsh::BorshSerialize::serialize(&self.market, writer)?;
        borsh::BorshSerialize::serialize(&self.is_long, writer)?;
        borsh::BorshSerialize::serialize(&self.size, writer)?;
        borsh::BorshSerialize::serialize(&self.entry_price, writer)?;
        borsh::BorshSerialize::serialize(&self.collateral, writer)?;
        borsh::BorshSerialize::serialize(&self.leverage, writer)?;
        borsh::BorshSerialize::serialize(&self.opened_at, writer)?;
        borsh::BorshSerialize::serialize(&self.last_funding_ts, writer)?;
        borsh::BorshSerialize::serialize(&self.realized_pnl_from_funding, writer)?;
        borsh::BorshSerialize::serialize(&self.liquidation_price, writer)?;
        borsh::BorshSerialize::serialize(&self.is_closed, writer)?;
        borsh::BorshSerialize::serialize(&self.bump, writer)?;
        Ok(())
    }
}

/// Position service
pub struct PositionService {
    client: SolanaClient,
    payer: Keypair,
}

impl PositionService {
    /// Create a new position service
    pub fn new() -> Self {
        let client = get_solana_client();
        
        // Create a clone of the keypair 
        let payer = Keypair::from_bytes(&CONFIG.keypair.as_ref().to_bytes())
            .expect("Failed to clone keypair");
        
        Self { client, payer }
    }
    
    /// Get a position by its address
    pub async fn get_position(&self, position_address: &Pubkey) -> std::result::Result<Position, ApiError> {
        self.client.get_account_data::<Position>(position_address).await
    }
    
    /// Get all positions for a user
    pub async fn get_user_positions(&self, user: &Pubkey) -> std::result::Result<Vec<(Pubkey, Position)>, ApiError> {
        let discriminator = [157, 217, 224, 149, 145, 23, 59, 30]; // Position account discriminator
        
        let user_filter = RpcFilterType::Memcmp(Memcmp {
            offset: 8, // After discriminator
            bytes: MemcmpEncodedBytes::Base58(bs58::encode(user.to_bytes()).into_string()),
            encoding: None,
        });
        
        let accounts = self.client
            .get_program_accounts_with_filters(discriminator, vec![user_filter])
            .await?;
            
        let mut positions = Vec::new();
        
        for (address, account) in accounts {
            let position = parse_position_data(&account.data)?;
                
            positions.push((address, position));
        }
        
        Ok(positions)
    }
    
    /// Open a new position
    pub async fn open_position(&self, req: OpenPositionRequest, user: &Pubkey) -> std::result::Result<Signature, ApiError> {
        info!("Opening position on-chain");
        
        let _program = self.client.program();
        let program_id = self.client.program_id;
        
        let position_address = pda::get_position_address(user, req.position_id, &program_id);
        let user_address = pda::get_user_address(user, &program_id);
        let market_address = pda::get_market_address(req.market_id, &program_id);
        
        // Get market to find oracle
        let market = self.client.get_account_data::<Market>(&market_address).await?;
        let oracle = market.oracle;
        
        let global_state_address = pda::get_global_state_address(&program_id);
        
        let accounts = open_position_accounts(
            position_address,
            user_address,
            market_address,
            *user,
            oracle,
            global_state_address,
        );
        
        // Using the anchor-client's request builder
        let instruction = Instruction {
            program_id,
            accounts,
            data: create_open_position_data(
                req.is_long,
                req.collateral_amount,
                req.leverage,
                req.market_id,
                req.position_id,
                req.max_slippage_bps,
            ),
        };
        
        let latest_blockhash = self.client.rpc_client
            .get_latest_blockhash()
            .map_err(|e| ApiError::SolanaClientError(format!("Failed to get recent blockhash: {}", e)))?;
            
        let tx = Transaction::new_signed_with_payer(
            &[instruction],
            Some(&self.payer.pubkey()),
            &[&self.payer],
            latest_blockhash,
        );
        
        self.client.send_transaction(tx).await
    }
    
    /// Close a position
    pub async fn close_position(&self, req: ClosePositionRequest, user: &Pubkey) -> std::result::Result<Signature, ApiError> {
        info!("Closing position on-chain: {}", req.position);
        
        let _program = self.client.program();
        let program_id = self.client.program_id;
        
        let position_address = Pubkey::from_str(&req.position)
            .map_err(|_| ApiError::InvalidRequest("Invalid position address".to_string()))?;
        let user_address = pda::get_user_address(user, &program_id);
        let market_address = pda::get_market_address(req.market_id, &program_id);
        
        // Get market to find oracle
        let market = self.client.get_account_data::<Market>(&market_address).await?;
        let oracle = market.oracle;
        
        let global_state_address = pda::get_global_state_address(&program_id);
        
        let accounts = close_position_accounts(
            position_address,
            user_address,
            market_address,
            *user,
            oracle,
            global_state_address,
        );
        
        // Using the anchor-client's request builder
        let instruction = Instruction {
            program_id,
            accounts,
            data: create_close_position_data(
                req.market_id,
                req.max_slippage_bps,
            ),
        };
        
        let latest_blockhash = self.client.rpc_client
            .get_latest_blockhash()
            .map_err(|e| ApiError::SolanaClientError(format!("Failed to get recent blockhash: {}", e)))?;
            
        let tx = Transaction::new_signed_with_payer(
            &[instruction],
            Some(&self.payer.pubkey()),
            &[&self.payer],
            latest_blockhash,
        );
        
        self.client.send_transaction(tx).await
    }
    
    /// Calculate unrealized PnL for a position
    pub async fn calculate_unrealized_pnl(&self, position: &Position) -> std::result::Result<i64, ApiError> {
        let oracle_price = oracle::get_oracle_price(&self.client, &position.market).await?;
        
        let entry_notional = (position.size as i128) * (position.entry_price as i128);
        let current_notional = (position.size as i128) * (oracle_price as i128);
        
        let pnl = if position.is_long {
            // Long: current - entry
            current_notional - entry_notional
        } else {
            // Short: entry - current
            entry_notional - current_notional
        };
        
        // Convert to i64
        Ok((pnl / 1_000_000) as i64) // Assuming 6 decimal places
    }
    
    /// Convert a contract position to a model position
    pub async fn to_model_position(&self, address: &Pubkey, position: &Position) -> std::result::Result<PositionModel, ApiError> {
        // Get oracle price
        let oracle_price = oracle::get_oracle_price(&self.client, &position.market).await?;
        
        // Calculate unrealized PnL
        let pnl = self.calculate_unrealized_pnl(position).await?;
        
        // Get market data for additional info
        let market = self.client.get_account_data::<Market>(&position.market).await?;
        
        // Calculate margin ratio
        let entry_notional = (position.size as f64) * (position.entry_price as f64);
        let margin_ratio = (position.collateral as f64) / entry_notional;
        
        // Convert funding rate from contract format to human readable - note the i64 conversion
        let funding_rate = market.funding_rate;
        
        Ok(PositionModel {
            id: address.to_string(),
            user: position.user.to_string(),
            market: position.market.to_string(),
            is_long: position.is_long,
            size: position.size,
            entry_price: position.entry_price,
            collateral: position.collateral,
            leverage: position.leverage,
            opened_at: position.opened_at,
            last_funding_ts: position.last_funding_ts,
            realized_pnl_from_funding: position.realized_pnl_from_funding,
            liquidation_price: position.liquidation_price,
            is_closed: position.is_closed,
            bump: position.bump,
            mark_price: oracle_price,
            unrealized_pnl: pnl,
            margin_ratio,
            funding_rate,
        })
    }
}

/// Generate account metadata for opening a position
fn open_position_accounts(
    position: Pubkey,
    user_account: Pubkey,
    market: Pubkey,
    user: Pubkey,
    oracle: Pubkey,
    global_state: Pubkey,
) -> Vec<anchor_client::solana_sdk::instruction::AccountMeta> {
    vec![
        AccountMeta::new(anchor_client::solana_sdk::system_program::id(), false),
        AccountMeta::new(position, false),
        AccountMeta::new(user_account, false),
        AccountMeta::new(market, false),
        AccountMeta::new_readonly(user, true),
        AccountMeta::new_readonly(oracle, false),
        AccountMeta::new(global_state, false),
    ]
}

/// Create open position data
fn create_open_position_data(
    is_long: bool,
    collateral_amount: u64,
    leverage: u8,
    market_id: u64,
    position_id: u64,
    max_slippage_bps: u16,
) -> Vec<u8> {
    // Define a struct to match the contract's expected arguments
    #[derive(anchor_client::anchor_lang::AnchorSerialize)]
    struct OpenPositionArgs {
        pub is_long: bool,
        pub collateral_amount: u64,
        pub leverage: u8,
        pub market_id: u64,
        pub position_id: u64,
        pub max_slippage_bps: u16,
    }
    
    let args = OpenPositionArgs {
        is_long,
        collateral_amount,
        leverage,
        market_id,
        position_id,
        max_slippage_bps,
    };
    
    let mut data = Vec::new();
    args.serialize(&mut data).unwrap();
    data
}

/// Generate account metadata for closing a position
fn close_position_accounts(
    position: Pubkey,
    user_account: Pubkey,
    market: Pubkey,
    user: Pubkey,
    oracle: Pubkey,
    global_state: Pubkey,
) -> Vec<anchor_client::solana_sdk::instruction::AccountMeta> {
    vec![
        AccountMeta::new(anchor_client::solana_sdk::system_program::id(), false),
        AccountMeta::new(position, false),
        AccountMeta::new(user_account, false),
        AccountMeta::new(market, false),
        AccountMeta::new_readonly(user, true),
        AccountMeta::new_readonly(oracle, false),
        AccountMeta::new(global_state, false),
    ]
}

/// Create close position data
fn create_close_position_data(
    market_id: u64,
    max_slippage_bps: u16,
) -> Vec<u8> {
    // Define a struct to match the contract's expected arguments
    #[derive(anchor_client::anchor_lang::AnchorSerialize)]
    struct ClosePositionArgs {
        pub market_id: u64,
        pub max_slippage_bps: u16,
    }
    
    let args = ClosePositionArgs {
        market_id,
        max_slippage_bps,
    };
    
    let mut data = Vec::new();
    args.serialize(&mut data).unwrap();
    data
}

/// Market account data deserialized from the contract
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Market {
    /// Asset symbol (e.g., "BTC")
    pub asset_symbol: [u8; 8],
    
    /// Oracle price feed pubkey
    pub oracle: Pubkey,
    
    /// Oracle type (0 = Pyth, 1 = Switchboard)
    pub oracle_type: u8,
    
    /// Current funding rate
    pub funding_rate: i64,
}

// Implement AccountDeserialize for Market
impl AccountDeserialize for Market {
    fn try_deserialize(buf: &mut &[u8]) -> std::result::Result<Self, anchor_client::anchor_lang::error::Error> {
        let market = borsh::BorshDeserialize::deserialize(buf)
            .map_err(|e| anchor_client::anchor_lang::error::Error::from(e))?;
        Ok(market)
    }
    
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> std::result::Result<Self, anchor_client::anchor_lang::error::Error> {
        let market = borsh::BorshDeserialize::deserialize(buf)
            .map_err(|e| anchor_client::anchor_lang::error::Error::from(e))?;
        Ok(market)
    }
}

// Implement BorshDeserialize for Market
impl borsh::BorshDeserialize for Market {
    fn deserialize(buf: &mut &[u8]) -> std::io::Result<Self> {
        let asset_symbol = borsh::BorshDeserialize::deserialize(buf)?;
        let oracle = borsh::BorshDeserialize::deserialize(buf)?;
        let oracle_type = borsh::BorshDeserialize::deserialize(buf)?;
        let funding_rate = borsh::BorshDeserialize::deserialize(buf)?;
        
        Ok(Market {
            asset_symbol,
            oracle,
            oracle_type,
            funding_rate,
        })
    }
}

// Implement BorshSerialize for Market
impl borsh::BorshSerialize for Market {
    fn serialize<W: std::io::Write>(&self, writer: &mut W) -> std::io::Result<()> {
        borsh::BorshSerialize::serialize(&self.asset_symbol, writer)?;
        borsh::BorshSerialize::serialize(&self.oracle, writer)?;
        borsh::BorshSerialize::serialize(&self.oracle_type, writer)?;
        borsh::BorshSerialize::serialize(&self.funding_rate, writer)?;
        Ok(())
    }
}

/// Parse position data from raw account data
fn parse_position_data(data: &[u8]) -> std::result::Result<Position, ApiError> {
    // Skip the 8-byte discriminator
    Position::try_from_slice(&data[8..])
        .map_err(|e| ApiError::SolanaClientError(format!("Failed to parse position data: {}", e)))
} 