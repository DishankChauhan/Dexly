use serde::{Deserialize, Serialize};
use anchor_client::solana_sdk::pubkey::Pubkey;
use chrono::{DateTime, Utc};

/// Oracle type for use in the API
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum OracleType {
    Pyth = 0,
    Switchboard = 1,
}

/// Market data model
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Market {
    /// Market ID (Pubkey as string)
    pub id: String,
    
    /// Asset symbol (e.g., "BTC")
    pub asset_symbol: String,
    
    /// Oracle price feed pubkey
    pub oracle: String,
    
    /// Oracle type (0 = Pyth, 1 = Switchboard)
    pub oracle_type: u8,
    
    /// Base asset reserve (asset amount)
    pub base_asset_reserve: u64,
    
    /// Quote asset reserve (USDC amount)
    pub quote_asset_reserve: u64,
    
    /// Current funding rate (can be positive or negative)
    pub funding_rate: i64,
    
    /// Last timestamp when funding was updated
    pub last_funding_ts: i64,
    
    /// Total long positions size
    pub total_long_size: u64,
    
    /// Total short positions size
    pub total_short_size: u64,
    
    /// Maximum allowed leverage for this market
    pub max_leverage: u8,
    
    /// Minimum margin ratio in basis points
    pub min_margin_ratio_bps: u16,
    
    /// Fee in basis points
    pub fee_bps: u16,
    
    /// Whether the market is active
    pub is_active: bool,
    
    /// Authority that can update market parameters
    pub authority: String,
    
    /// Minimum position size
    pub min_position_size: u64,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
    
    /// Current mark price from oracle (not stored on-chain)
    pub mark_price: u64,
    
    /// 24h price change percentage (not stored on-chain)
    pub price_change_24h: Option<f64>,
    
    /// 24h trading volume (not stored on-chain)
    pub volume_24h: Option<u64>,
}

/// Market creation request
#[derive(Debug, Serialize, Deserialize)]
pub struct CreateMarketRequest {
    /// Asset symbol (e.g., "BTC")
    pub asset_symbol: String,
    
    /// Market ID (numeric identifier)
    pub market_id: u64,
    
    /// Oracle price feed pubkey
    pub oracle_address: String,
    
    /// Oracle type (0 = Pyth, 1 = Switchboard)
    pub oracle_type: u8,
    
    /// Minimum margin ratio in basis points
    pub min_margin_ratio_bps: u16,
    
    /// Fee in basis points
    pub fee_bps: u16,
    
    /// Maximum allowed leverage
    pub max_leverage: u8,
    
    /// Minimum position size
    pub min_position_size: u64,
}

/// Funding rate update request
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateFundingRequest {
    /// New funding rate value
    pub funding_rate: i64,
}

/// Market summary for list view
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MarketSummary {
    /// Market ID
    pub id: String,
    
    /// Asset symbol (e.g., "BTC")
    pub asset_symbol: String,
    
    /// Current mark price
    pub mark_price: u64,
    
    /// 24h price change percentage
    pub price_change_24h: Option<f64>,
    
    /// 24h trading volume
    pub volume_24h: Option<u64>,
    
    /// Current funding rate
    pub funding_rate: i64,
    
    /// Maximum allowed leverage
    pub max_leverage: u8,
    
    /// Open interest in base units
    pub open_interest: u64,
    
    /// Whether the market is active
    pub is_active: bool,
}

/// Response for market list
#[derive(Debug, Serialize)]
pub struct MarketListResponse {
    pub markets: Vec<MarketSummary>,
    pub total: usize,
}

/// Market metrics data
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MarketMetrics {
    /// Market ID
    pub market_id: String,
    
    /// Total volume traded
    pub total_volume: u64,
    
    /// 24h volume
    pub volume_24h: u64,
    
    /// Open interest in base units
    pub open_interest: u64,
    
    /// Open interest in USD
    pub open_interest_usd: u64,
    
    /// Total positions count
    pub total_positions: u64,
    
    /// Current long/short ratio
    pub long_short_ratio: f64,
}

/// Market price data
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MarketPrice {
    /// Market ID
    pub market_id: String,
    
    /// Current mark price
    pub mark_price: u64,
    
    /// Oracle price
    pub oracle_price: u64,
    
    /// Index price (can be different from oracle in some implementations)
    pub index_price: u64,
    
    /// Last updated timestamp
    pub timestamp: i64,
}

/// Funding rate history entry
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FundingRateHistory {
    /// Market ID
    pub market_id: String,
    
    /// Funding rate value
    pub funding_rate: i64,
    
    /// Timestamp when funding rate was updated
    pub timestamp: i64,
} 