use anchor_lang::prelude::*;
use pyth_sdk_solana::{load_price_feed_from_account_info, PriceFeed};
use std::ops::Deref;

/// Supported oracle types
#[derive(Clone, Copy, PartialEq, AnchorSerialize, AnchorDeserialize)]
pub enum OracleType {
    Pyth = 0,
    Switchboard = 1,
    Mock = 2,
}

impl From<u8> for OracleType {
    fn from(value: u8) -> Self {
        match value {
            0 => OracleType::Pyth,
            1 => OracleType::Switchboard,
            2 => OracleType::Mock,
            _ => OracleType::Mock,
        }
    }
}

/// Get price from oracle with proper stack management
#[inline(never)]
pub fn get_price(oracle_account: &AccountInfo, oracle_type: OracleType) -> Result<u64> {
    match oracle_type {
        OracleType::Pyth => get_pyth_price(oracle_account),
        OracleType::Switchboard => get_switchboard_price(oracle_account),
        OracleType::Mock => get_mock_price(oracle_account),
    }
}

/// Get price from Pyth oracle
#[inline(never)]
fn get_pyth_price(oracle_account: &AccountInfo) -> Result<u64> {
    // Move price feed to heap
    let price_feed_result = Box::new(load_price_feed_from_account_info(oracle_account));
    let price_feed = price_feed_result.map_err(|_| {
        msg!("Failed to load Pyth price feed");
        error!(crate::error::PerpsError::InvalidOracle)
    })?;
    
    // Get current price
    let current_price_data = Box::new(price_feed.get_price_unchecked());
    
    // Check if price is valid
    if current_price_data.price < 0 {
        msg!("Pyth price is negative");
        return Err(error!(crate::error::PerpsError::InvalidOraclePrice));
    }
    
    // Check if price confidence is reasonable (within 1% of price)
    let price_confidence = Box::new(current_price_data.conf as i64);
    let price_value = Box::new(current_price_data.price);
    let max_confidence_ratio = Box::new(100); // 1%
    
    if *price_confidence * *max_confidence_ratio > *price_value.abs() {
        msg!("Pyth price confidence too low");
        return Err(error!(crate::error::PerpsError::InvalidOraclePrice));
    }
    
    // Check if price is stale (> 5 minutes old)
    let current_slot = Box::new(Clock::get()?.slot);
    let publish_slot = Box::new(current_price_data.publish_slot);
    let max_staleness = Box::new(300 * 2); // ~5 minutes in slots (assuming 2 slots/sec)
    
    if *current_slot - *publish_slot > *max_staleness {
        msg!("Pyth price is stale");
        return Err(error!(crate::error::PerpsError::StaleOraclePrice));
    }
    
    // Convert price to u64 with 6 decimals
    let exponent = Box::new(current_price_data.expo);
    let mut price = Box::new(*price_value as u64);
    
    // Adjust for price feed exponent to get to 6 decimals
    if *exponent < -6 {
        for _ in 0..(-6 - *exponent) {
            *price /= 10;
        }
    } else if *exponent > -6 {
        for _ in 0..(*exponent + 6) {
            *price *= 10;
        }
    }
    
    Ok(*price)
}

/// Get price from Switchboard oracle
#[inline(never)]
fn get_switchboard_price(oracle_account: &AccountInfo) -> Result<u64> {
    // Load the Switchboard aggregator account data
    let data = oracle_account.try_borrow_data()?;
    
    // Ensure data is at least of minimal size needed
    if data.len() < 8 + 4 + 32 { // minimum size for valid Switchboard feed
        msg!("Invalid Switchboard account data size");
        return Err(error!(crate::error::PerpsError::InvalidOracle));
    }
    
    // Parse the latest result value
    // Switchboard data structure has the latest result value at a specific offset
    // For actual implementation, this would use proper Switchboard SDK
    // This is a simplified implementation for demonstration
    let latest_result_offset = 8 + 4 + 32; // simplified offset
    
    // Read the mantissa (i128)
    let mut mantissa_bytes = [0u8; 16];
    if latest_result_offset + 16 <= data.len() {
        mantissa_bytes.copy_from_slice(&data[latest_result_offset..latest_result_offset + 16]);
    } else {
        msg!("Invalid Switchboard data: can't read mantissa");
        return Err(error!(crate::error::PerpsError::InvalidOracle));
    }
    
    let mantissa = Box::new(i128::from_le_bytes(mantissa_bytes));
    
    // Read the scale (u32)
    let mut scale_bytes = [0u8; 4];
    if latest_result_offset + 16 + 4 <= data.len() {
        scale_bytes.copy_from_slice(&data[latest_result_offset + 16..latest_result_offset + 16 + 4]);
    } else {
        msg!("Invalid Switchboard data: can't read scale");
        return Err(error!(crate::error::PerpsError::InvalidOracle));
    }
    
    let scale = Box::new(u32::from_le_bytes(scale_bytes));
    
    // Check if price is negative
    if *mantissa < 0 {
        msg!("Switchboard price is negative");
        return Err(error!(crate::error::PerpsError::InvalidOraclePrice));
    }
    
    // Check for staleness by reading the timestamp
    let timestamp_offset = latest_result_offset + 16 + 4 + 4; // after mantissa and scale and some padding
    
    let mut timestamp_bytes = [0u8; 8];
    if timestamp_offset + 8 <= data.len() {
        timestamp_bytes.copy_from_slice(&data[timestamp_offset..timestamp_offset + 8]);
    } else {
        msg!("Invalid Switchboard data: can't read timestamp");
        return Err(error!(crate::error::PerpsError::InvalidOracle));
    }
    
    let timestamp = Box::new(i64::from_le_bytes(timestamp_bytes));
    let current_timestamp = Box::new(Clock::get()?.unix_timestamp);
    let max_staleness = Box::new(300); // 5 minutes in seconds
    
    if *current_timestamp - *timestamp > *max_staleness {
        msg!("Switchboard price is stale");
        return Err(error!(crate::error::PerpsError::StaleOraclePrice));
    }
    
    // Convert price to u64 with 6 decimals
    let mut price = Box::new(*mantissa as u64);
    
    // Adjust for decimal places to get to 6 decimals
    let target_decimals = Box::new(6);
    
    if *scale > *target_decimals {
        for _ in 0..(*scale - *target_decimals) {
            *price /= 10;
        }
    } else if *scale < *target_decimals {
        for _ in 0..(*target_decimals - *scale) {
            *price *= 10;
        }
    }
    
    Ok(*price)
}

/// Get price from Mock oracle - useful for testing
#[inline(never)]
fn get_mock_price(oracle_account: &AccountInfo) -> Result<u64> {
    let mock_price = Box::new(50_000_000_000u64); // $50,000 with 6 decimals

    // Try to read from account data if available
    if !oracle_account.data_is_empty() {
        let data = oracle_account.try_borrow_data()?;
        if data.len() >= 8 {
            let price_bytes = Box::new([data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]]);
            *mock_price = u64::from_le_bytes(*price_bytes);
        }
    }
    
    Ok(*mock_price)
} 