use anchor_client::solana_sdk::pubkey::Pubkey;
use std::convert::TryInto;
use std::sync::Arc;

use crate::models::error::ApiError;
use crate::solana::client::SolanaClient;
use crate::models::market;
use crate::models::market::OracleType as ModelOracleType;
use crate::solana::client::get_solana_client;
use log::{info, error, debug, warn};
use std::str::FromStr;

// Simple local struct to represent essential Market data
struct MarketData {
    pub oracle: Pubkey,
    pub oracle_type: u8,
}

/// Oracle type enum
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum OracleType {
    Pyth = 0,
    Switchboard = 1,
}

impl From<u8> for OracleType {
    fn from(value: u8) -> Self {
        match value {
            0 => OracleType::Pyth,
            1 => OracleType::Switchboard,
            _ => OracleType::Pyth,
        }
    }
}

impl From<OracleType> for ModelOracleType {
    fn from(value: OracleType) -> Self {
        match value {
            OracleType::Pyth => ModelOracleType::Pyth,
            OracleType::Switchboard => ModelOracleType::Switchboard,
        }
    }
}

impl From<ModelOracleType> for OracleType {
    fn from(value: ModelOracleType) -> Self {
        match value {
            ModelOracleType::Pyth => OracleType::Pyth,
            ModelOracleType::Switchboard => OracleType::Switchboard,
        }
    }
}

/// Get oracle price for a market
pub async fn get_oracle_price(client: &SolanaClient, market_address: &Pubkey) -> Result<u64, ApiError> {
    // Get market account data first
    let account = client.get_account(market_address).await?;
    
    // Basic parsing - extract oracle pubkey and type
    // This is a simplified implementation - in a real project you'd use proper deserialization
    if account.data.len() < 100 {
        return Err(ApiError::InvalidRequest("Invalid market account data".to_string()));
    }
    
    // Skip discriminator (8 bytes) and other fields to get to oracle (assume 32 byte offset)
    let oracle_offset = 40; // This is an example - adjust based on your actual data layout
    let mut oracle_bytes = [0u8; 32];
    oracle_bytes.copy_from_slice(&account.data[oracle_offset..(oracle_offset + 32)]);
    let oracle = Pubkey::new_from_array(oracle_bytes);
    
    // Oracle type is 1 byte after the oracle pubkey
    let oracle_type = account.data[oracle_offset + 32];
    
    let market_data = MarketData {
        oracle,
        oracle_type,
    };
    
    // Get oracle data
    let oracle_account = client.get_account(&market_data.oracle).await?;
    
    // Determine oracle type and get price
    let oracle_type = OracleType::from(market_data.oracle_type);
    
    match oracle_type {
        OracleType::Switchboard => get_switchboard_price_manual(&oracle_account.data),
        OracleType::Pyth => Err(ApiError::OracleError("Pyth oracle support not yet implemented".to_string())),
    }
}

/// Get price from Switchboard oracle manually (without the switchboard-v2 crate)
pub fn get_switchboard_price_manual(data: &[u8]) -> Result<u64, ApiError> {
    // Basic validation
    if data.len() < 100 {
        return Err(ApiError::OracleError("Invalid oracle data length".to_string()));
    }
    
    // The Switchboard v2 AggregatorAccountData structure is complex
    // This is a simplified implementation that extracts just what we need
    
    // For the latest round result - this is a simplification and actual byte offsets may vary
    let result_offset = 16; // Approximate offset to result field
    if data.len() < result_offset + 8 {
        return Err(ApiError::OracleError("Data too short to extract result".to_string()));
    }
    
    let mut result_bytes = [0u8; 8];
    result_bytes.copy_from_slice(&data[result_offset..result_offset+8]);
    let result = i64::from_le_bytes(result_bytes);
    
    // Decimal scale offset - this is an approximation
    let scale_offset = 24; 
    if data.len() < scale_offset + 1 {
        return Err(ApiError::OracleError("Data too short to extract scale".to_string()));
    }
    
    let scale = data[scale_offset] as u8;
    
    // Convert to u64 with 6 decimal precision for our protocol
    let price_u64 = scale_price_to_6_decimals(result, scale);
    
    Ok(price_u64)
}

// Helper function to scale price to 6 decimals
fn scale_price_to_6_decimals(price: i64, scale: u8) -> u64 {
    let target_decimals = 6;
    
    if scale > target_decimals {
        // Scale down
        let factor = 10u64.pow((scale - target_decimals) as u32);
        price.unsigned_abs() / factor
    } else {
        // Scale up
        let factor = 10u64.pow((target_decimals - scale) as u32);
        price.unsigned_abs() * factor
    }
}

/// Oracle price with metadata
pub struct OraclePriceWithMetadata {
    /// Price value (with 6 decimals)
    pub price: u64,
    
    /// Confidence interval
    pub confidence: Option<u64>,
    
    /// Last update timestamp
    pub last_update_ts: i64,
    
    /// Is price valid
    pub is_valid: bool,
}

/// Get the current price from an oracle
pub async fn get_oracle_price_by_address(oracle_address: &str, oracle_type: OracleType) -> Result<u64, ApiError> {
    let oracle_pubkey = Pubkey::from_str(oracle_address)
        .map_err(|_| ApiError::InvalidRequest("Invalid oracle address".to_string()))?;
    
    match oracle_type {
        OracleType::Pyth => get_pyth_price(&oracle_pubkey).await,
        OracleType::Switchboard => get_switchboard_price(&oracle_pubkey).await,
    }
}

/// Get price from a Pyth oracle
async fn get_pyth_price(oracle_pubkey: &Pubkey) -> Result<u64, ApiError> {
    debug!("Getting Pyth price from oracle: {}", oracle_pubkey);
    
    let client = get_solana_client();
    
    // Get the oracle account data
    let account = client.get_account(oracle_pubkey).await?;
    
    // Parse the Pyth oracle data
    // This is a simplified implementation
    if account.data.len() < 100 {
        return Err(ApiError::InvalidRequest("Invalid Pyth oracle account data".to_string()));
    }
    
    // In a real implementation, you would use the pyth_sdk_solana crate to parse the price
    // For this example, we'll simulate parsing with a basic approach
    
    // Price is stored at offset 25 for 8 bytes in Pyth accounts (simplified)
    let mut price_bytes = [0u8; 8];
    price_bytes.copy_from_slice(&account.data[25..33]);
    let price = i64::from_le_bytes(price_bytes);
    
    // Conf is stored at offset 33 for 8 bytes (simplified)
    let mut conf_bytes = [0u8; 8];
    conf_bytes.copy_from_slice(&account.data[33..41]);
    let conf = u64::from_le_bytes(conf_bytes);
    
    // Exponent is stored at offset 41 for 4 bytes (simplified)
    let mut exp_bytes = [0u8; 4];
    exp_bytes.copy_from_slice(&account.data[41..45]);
    let exponent = i32::from_le_bytes(exp_bytes);
    
    debug!("Pyth price data - price: {}, conf: {}, exponent: {}", price, conf, exponent);
    
    // Convert price to a standard format (e.g., 9 decimals)
    // This depends on the exponent from Pyth
    let decimal_adjustment = 9 + exponent; // Pyth usually has negative exponents
    
    let normalized_price = if decimal_adjustment >= 0 {
        (price as u64) * 10u64.pow(decimal_adjustment as u32)
    } else {
        (price as u64) / 10u64.pow((-decimal_adjustment) as u32)
    };
    
    debug!("Normalized price: {}", normalized_price);
    
    Ok(normalized_price)
}

/// Get price from a Switchboard oracle
async fn get_switchboard_price(oracle_pubkey: &Pubkey) -> Result<u64, ApiError> {
    debug!("Getting Switchboard price from oracle: {}", oracle_pubkey);
    
    let client = get_solana_client();
    
    // Get the oracle account data
    let account = client.get_account(oracle_pubkey).await?;
    
    // Use our manual implementation instead of the switchboard-v2 crate
    get_switchboard_price_manual(&account.data)
}

/// Get the current price and confidence interval from an oracle
pub async fn get_oracle_price_with_confidence(
    oracle_address: &str, 
    oracle_type: OracleType
) -> Result<(u64, u64), ApiError> {
    let oracle_pubkey = Pubkey::from_str(oracle_address)
        .map_err(|_| ApiError::InvalidRequest("Invalid oracle address".to_string()))?;
    
    match oracle_type {
        OracleType::Pyth => {
            // For Pyth, we can extract both price and confidence
            let client = get_solana_client();
            let account = client.get_account(&oracle_pubkey).await?;
            
            // This is a simplified implementation
            if account.data.len() < 100 {
                return Err(ApiError::InvalidRequest("Invalid Pyth oracle account data".to_string()));
            }
            
            // Price is stored at offset 25 for 8 bytes
            let mut price_bytes = [0u8; 8];
            price_bytes.copy_from_slice(&account.data[25..33]);
            let price = i64::from_le_bytes(price_bytes);
            
            // Conf is stored at offset 33 for 8 bytes
            let mut conf_bytes = [0u8; 8];
            conf_bytes.copy_from_slice(&account.data[33..41]);
            let conf = u64::from_le_bytes(conf_bytes);
            
            // Exponent is stored at offset 41 for 4 bytes
            let mut exp_bytes = [0u8; 4];
            exp_bytes.copy_from_slice(&account.data[41..45]);
            let exponent = i32::from_le_bytes(exp_bytes);
            
            // Convert to standard format
            let decimal_adjustment = 9 + exponent;
            
            let normalized_price = if decimal_adjustment >= 0 {
                (price as u64) * 10u64.pow(decimal_adjustment as u32)
            } else {
                (price as u64) / 10u64.pow((-decimal_adjustment) as u32)
            };
            
            let normalized_conf = if decimal_adjustment >= 0 {
                conf * 10u64.pow(decimal_adjustment as u32)
            } else {
                conf / 10u64.pow((-decimal_adjustment) as u32)
            };
            
            Ok((normalized_price, normalized_conf))
        },
        OracleType::Switchboard => {
            // For Switchboard, we'll just return the price and a fixed confidence value
            // In a real implementation, you would extract the actual confidence
            let price = get_switchboard_price(&oracle_pubkey).await?;
            let confidence = price / 100; // Using 1% as a simplified confidence value
            
            Ok((price, confidence))
        }
    }
}

/// Get the current price from an oracle address string
pub async fn get_oracle_price_by_string(oracle_address: &str, oracle_type: u8) -> Result<u64, ApiError> {
    let oracle_type_enum = OracleType::from(oracle_type);
    let oracle_pubkey = Pubkey::from_str(oracle_address)
        .map_err(|_| ApiError::InvalidRequest("Invalid oracle address".to_string()))?;
    
    match oracle_type_enum {
        OracleType::Pyth => get_pyth_price(&oracle_pubkey).await,
        OracleType::Switchboard => get_switchboard_price(&oracle_pubkey).await,
    }
} 