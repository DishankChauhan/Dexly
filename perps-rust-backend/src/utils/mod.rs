use solana_sdk::pubkey::Pubkey;
use solana_sdk::signature::Keypair;
use std::str::FromStr;
use std::time::{SystemTime, UNIX_EPOCH};

// Convert string to Pubkey
pub fn pubkey_from_str(pubkey_str: &str) -> Result<Pubkey, String> {
    Pubkey::from_str(pubkey_str).map_err(|e| format!("Invalid public key: {}", e))
}

// Get current timestamp in seconds
pub fn current_timestamp() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs() as i64
}

// Format amount from lamports/native token to human-readable format
pub fn format_amount(amount: u64, decimals: u8) -> f64 {
    (amount as f64) / (10u64.pow(decimals as u32) as f64)
}

// Parse amount from human-readable format to lamports/native token
pub fn parse_amount(amount: f64, decimals: u8) -> u64 {
    (amount * (10u64.pow(decimals as u32) as f64)) as u64
} 