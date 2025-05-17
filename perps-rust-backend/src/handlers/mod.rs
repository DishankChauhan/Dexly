pub mod admin;
pub mod collateral;
pub mod global_state;
pub mod markets;
pub mod oracle;
pub mod positions;
pub mod users;

use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

use crate::models::error::ApiError;
use crate::utils;

// Helper function to extract wallet pubkey from string
pub fn extract_wallet(wallet_str: &str) -> Result<Pubkey, ApiError> {
    utils::pubkey_from_str(wallet_str)
        .map_err(|e| ApiError::BadRequest(format!("Invalid wallet address: {}", e)))
}

// Helper function to extract address pubkey from string
pub fn extract_pubkey(pubkey_str: &str) -> Result<Pubkey, ApiError> {
    utils::pubkey_from_str(pubkey_str)
        .map_err(|e| ApiError::BadRequest(format!("Invalid public key: {}", e)))
} 