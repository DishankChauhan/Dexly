use serde::{Deserialize, Serialize};
use solana_sdk::pubkey::Pubkey;

use crate::models::pubkey_to_string;
use crate::solana::client::Market;

// Response model for a market
#[derive(Serialize)]
pub struct MarketResponse {
    pub address: String,
    pub asset_symbol: String,
    pub oracle: String,
    pub oracle_type: u8,
    pub max_leverage: u8,
    pub fee_bps: u16,
    pub min_margin_ratio_bps: u16,
    pub min_position_size: u64,
    pub base_asset_reserve: u64,
    pub quote_asset_reserve: u64,
    pub total_long_size: u64,
    pub total_short_size: u64,
    pub funding_rate: i64,
    pub last_funding_ts: i64,
    pub is_active: bool,
}

// Response model for a list of markets
#[derive(Serialize)]
pub struct MarketListResponse {
    pub markets: Vec<MarketResponse>,
    pub count: usize,
}

impl MarketResponse {
    pub fn from_account(address: &Pubkey, market: &Market) -> Self {
        Self {
            address: pubkey_to_string(address),
            asset_symbol: String::from_utf8_lossy(&market.asset_symbol).trim_end_matches('\0').to_string(),
            oracle: pubkey_to_string(&market.oracle),
            oracle_type: market.oracle_type,
            max_leverage: market.max_leverage,
            fee_bps: market.fee_bps,
            min_margin_ratio_bps: market.min_margin_ratio_bps,
            min_position_size: market.min_position_size,
            base_asset_reserve: market.base_asset_reserve,
            quote_asset_reserve: market.quote_asset_reserve,
            total_long_size: market.total_long_size,
            total_short_size: market.total_short_size,
            funding_rate: market.funding_rate,
            last_funding_ts: market.last_funding_ts,
            is_active: market.is_active,
        }
    }
}

// Request model for initializing a market
#[derive(Deserialize)]
pub struct InitMarketRequest {
    pub market_id: u64,
    pub asset_symbol: String,
    pub oracle: String,
    pub oracle_type: u8,
    pub max_leverage: u8,
    pub min_margin_ratio_bps: u16,
    pub fee_bps: u16,
    pub min_position_size: u64,
} 