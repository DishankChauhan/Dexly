use serde::{Deserialize, Serialize};
use solana_sdk::pubkey::Pubkey;

use crate::models::pubkey_to_string;

// Response model for global state
#[derive(Serialize)]
pub struct GlobalStateResponse {
    pub admin: String,
    pub fee_bps: u16,
    pub is_paused: bool,
    pub total_volume: u64,
    pub total_fees_collected: u64,
    pub address: String,
}

// Create a global state response from on-chain data
impl GlobalStateResponse {
    pub fn from_account(
        address: &Pubkey,
        admin: &Pubkey,
        fee_bps: u16,
        is_paused: bool,
        total_volume: u64,
        total_fees_collected: u64,
    ) -> Self {
        Self {
            admin: pubkey_to_string(admin),
            fee_bps,
            is_paused,
            total_volume,
            total_fees_collected,
            address: pubkey_to_string(address),
        }
    }
}

// Request model for initializing global state
#[derive(Deserialize)]
pub struct InitGlobalStateRequest {
    pub admin: Option<String>,
}

// Request model for updating protocol fees
#[derive(Deserialize)]
pub struct UpdateFeesRequest {
    pub fee_bps: u16,
}

// Request model for pausing the protocol
#[derive(Deserialize)]
pub struct PauseProtocolRequest {
    pub paused: bool,
} 