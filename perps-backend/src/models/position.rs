use serde::{Deserialize, Serialize};
use anchor_client::solana_sdk::pubkey::Pubkey;
use chrono::{DateTime, Utc};

/// Represents a trading position
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Position {
    /// Unique position ID (Pubkey as string)
    pub id: String,
    
    /// User who owns this position
    pub user: String,
    
    /// Market this position is for
    pub market: String,
    
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
    
    /// Current mark price (from oracle)
    pub mark_price: u64,
    
    /// Unrealized PnL at current mark price
    pub unrealized_pnl: i64,
    
    /// Current position margin ratio
    pub margin_ratio: f64,
    
    /// Current funding rate
    pub funding_rate: i64,
}

/// Request for opening a position
#[derive(Debug, Deserialize)]
pub struct OpenPositionRequest {
    /// User public key
    pub user: String,
    
    /// Market ID to open position in
    pub market_id: u64,
    
    /// Position ID (numeric identifier)
    pub position_id: u64,
    
    /// Direction of the position (true = long, false = short)
    pub is_long: bool,
    
    /// Amount of collateral to use
    pub collateral_amount: u64,
    
    /// Leverage to use
    pub leverage: u8,
    
    /// Maximum allowable slippage in basis points
    pub max_slippage_bps: u16,
}

/// Request for closing a position
#[derive(Debug, Deserialize)]
pub struct ClosePositionRequest {
    /// User public key
    pub user: String,
    
    /// Market ID this position is in
    pub market_id: u64,
    
    /// Position ID to close
    pub position: String,
    
    /// Maximum allowable slippage in basis points
    pub max_slippage_bps: u16,
}

/// Response for position list
#[derive(Debug, Serialize)]
pub struct PositionListResponse {
    pub positions: Vec<Position>,
    pub total: usize,
}

/// Position status enum
#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq)]
pub enum PositionStatus {
    Open,
    Closed,
    Liquidated,
}

/// Position history entry
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PositionHistory {
    /// Position ID
    pub position_id: String,
    
    /// User who owns this position
    pub user: String,
    
    /// Market this position was in
    pub market: String,
    
    /// Direction of the position (true = long, false = short)
    pub is_long: bool,
    
    /// Size of the position in base asset units
    pub size: u64,
    
    /// Entry price of the position
    pub entry_price: u64,
    
    /// Exit price (if closed)
    pub exit_price: Option<u64>,
    
    /// Collateral amount in quote asset units
    pub collateral: u64,
    
    /// Leverage used for this position
    pub leverage: u8,
    
    /// Position status
    pub status: PositionStatus,
    
    /// Timestamp when position was opened
    pub opened_at: DateTime<Utc>,
    
    /// Timestamp when position was closed (if applicable)
    pub closed_at: Option<DateTime<Utc>>,
    
    /// Realized PnL after closing
    pub realized_pnl: Option<i64>,
    
    /// Funding fees paid
    pub funding_fees_paid: i64,
} 