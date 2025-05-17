use serde::{Deserialize, Serialize};
use solana_sdk::pubkey::Pubkey;

use crate::models::pubkey_to_string;

// Position account structure for on-chain data
#[derive(Debug)]
pub struct Position {
    pub user: Pubkey,
    pub market: Pubkey,
    pub is_long: bool,
    pub collateral_amount: u64,
    pub size: u64,
    pub entry_price: u64,
    pub entry_funding_rate: i64,
    pub created_at: i64,
    pub bump: u8,
}

// Response model for a position
#[derive(Serialize)]
pub struct PositionResponse {
    pub address: String,
    pub user: String,
    pub market: String,
    pub is_long: bool,
    pub collateral_amount: u64,
    pub size: u64,
    pub entry_price: u64,
    pub entry_funding_rate: i64,
    pub created_at: i64,
    pub current_price: Option<u64>,
    pub pnl: Option<i64>,
    pub liquidation_price: Option<u64>,
}

// Response model for a list of positions
#[derive(Serialize)]
pub struct PositionListResponse {
    pub positions: Vec<PositionResponse>,
    pub count: usize,
}

impl PositionResponse {
    pub fn from_account(
        address: &Pubkey,
        position: &Position,
        current_price: Option<u64>,
    ) -> Self {
        // Calculate PnL if current price is available
        let pnl = current_price.map(|price| {
            let price_diff = if position.is_long {
                price as i64 - position.entry_price as i64
            } else {
                position.entry_price as i64 - price as i64
            };
            
            // PnL = size * (current_price - entry_price) / entry_price
            (price_diff * position.size as i64) / position.entry_price as i64
        });
        
        // Calculate liquidation price (simplified)
        let liquidation_price = current_price.map(|_| {
            // In a real system, this would use margin ratio, maintenance margin, etc.
            // This is a placeholder calculation
            if position.is_long {
                position.entry_price / 2 // Just an example
            } else {
                position.entry_price * 2 // Just an example
            }
        });
        
        Self {
            address: pubkey_to_string(address),
            user: pubkey_to_string(&position.user),
            market: pubkey_to_string(&position.market),
            is_long: position.is_long,
            collateral_amount: position.collateral_amount,
            size: position.size,
            entry_price: position.entry_price,
            entry_funding_rate: position.entry_funding_rate,
            created_at: position.created_at,
            current_price,
            pnl,
            liquidation_price,
        }
    }
}

// Request model for opening a position
#[derive(Deserialize)]
pub struct OpenPositionRequest {
    pub market_id: u64,
    pub is_long: bool,
    pub collateral_amount: u64,
    pub leverage: u8,
    pub max_slippage_bps: u16,
}

// Request model for closing a position
#[derive(Deserialize)]
pub struct ClosePositionRequest {
    pub position_address: String,
    pub market_id: u64,
    pub max_slippage_bps: u16,
} 