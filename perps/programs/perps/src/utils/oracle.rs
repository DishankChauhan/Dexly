use anchor_lang::prelude::*;
use pyth_sdk_solana::state::load_price_account;
use crate::error::PerpsError;

/// Oracle type enum
#[derive(Clone, Copy, PartialEq)]
pub enum OracleType {
    Pyth = 0,
    Switchboard = 1,
}

impl From<u8> for OracleType {
    fn from(value: u8) -> Self {
        match value {
            0 => OracleType::Pyth,
            1 => OracleType::Switchboard,
            _ => OracleType::Pyth, // Default to Pyth
        }
    }
}

/// Get price from oracle account
#[inline(never)]
pub fn get_price(oracle_account: &AccountInfo, oracle_type: OracleType) -> Result<u64> {
    match oracle_type {
        OracleType::Pyth => get_pyth_price(oracle_account),
        OracleType::Switchboard => {
            msg!("Switchboard oracle support is temporarily disabled");
            Err(error!(PerpsError::OracleError))
        }
    }
}

/// Get price from Pyth oracle
#[inline(never)]
fn get_pyth_price(oracle_account: &AccountInfo) -> Result<u64> {
    // Move oracle data to heap
    let oracle_data = Box::new(oracle_account.try_borrow_data()?);
    
    // Load price feed
    let price_feed = load_price_account(&oracle_data)
        .map_err(|_| error!(PerpsError::OracleError))?;
    
    // Get current price - price is in the agg.price field
    let price = price_feed.agg.price;
    
    // Exponential scaling is in the expo field
    let expo = price_feed.expo;
    
    // Convert price to u64 with proper scaling
    let price_u64 = normalize_price(price, expo)?;
    
    Ok(price_u64)
}

/// Normalize price based on exponent
#[inline(never)]
fn normalize_price(price: i64, exponent: i32) -> Result<u64> {
    // Move values to heap to reduce stack usage
    let price_boxed = Box::new(price);
    let exponent_boxed = Box::new(exponent);
    
    // Handle negative prices (shouldn't happen in normal circumstances)
    if *price_boxed <= 0 {
        return Err(error!(PerpsError::InvalidPrice));
    }
    
    // Convert to u64 with proper scaling
    let price_u64 = Box::new(*price_boxed as u64);
    
    // Apply exponent
    let result = if *exponent_boxed < 0 {
        // Negative exponent means divide
        let divisor = Box::new(10_u64.pow((-*exponent_boxed) as u32));
        *price_u64 / *divisor
    } else {
        // Positive exponent means multiply
        let multiplier = Box::new(10_u64.pow(*exponent_boxed as u32));
        *price_u64 * *multiplier
    };
    
    Ok(result)
} 