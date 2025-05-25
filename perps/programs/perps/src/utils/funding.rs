use anchor_lang::prelude::*;
use crate::state::market::Market;
use crate::constants::{MAX_FUNDING_RATE_BPS, MIN_FUNDING_RATE_BPS};

/// Calculate funding rate based on market imbalance
/// 
/// The funding rate is calculated using the formula:
/// funding_rate = k * (long_size - short_size) / (long_size + short_size)
/// 
/// Where:
/// - k is a scaling factor that limits the max rate
/// - (long_size - short_size) / (long_size + short_size) is the imbalance ratio
#[inline(never)]
pub fn calculate_funding_rate(market: &Market) -> Result<i64> {
    let total_size = Box::new(
        market.total_long_size
            .checked_add(market.total_short_size)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
    );
    
    // If no positions, funding rate is 0
    if *total_size == 0 {
        return Ok(0);
    }
    
    let long_size = Box::new(market.total_long_size);
    let short_size = Box::new(market.total_short_size);
    
    // Calculate imbalance (can be positive or negative)
    let imbalance = Box::new(
        (*long_size as i128)
            .checked_sub(*short_size as i128)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
    );
    
    // Calculate imbalance ratio scaled to 1e6 precision
    // imbalance_ratio = imbalance / total_size * 1e6
    let scaling_factor = Box::new(1_000_000i128); // 6 decimal places
    let imbalance_ratio = Box::new(
        (*imbalance)
            .checked_mul(*scaling_factor)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
            .checked_div(*total_size as i128)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
    );
    
    // Apply dampening coefficient (k) to limit max rate
    // For a target max rate of 0.1% per hour (10 bps) when imbalance is at 50%,
    // we need a k of 0.2%
    let dampening_factor = Box::new(20); // 0.02% (or 2 bps)
    
    let dampened_rate = Box::new(
        (*imbalance_ratio)
            .checked_mul(*dampening_factor as i128)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
            .checked_div(10_000) // Convert from scaling_factor to bps
            .ok_or(error!(crate::error::PerpsError::Overflow))?
    );
    
    // Clamp to min/max funding rate bps
    let max_rate = Box::new(MAX_FUNDING_RATE_BPS as i128);
    let min_rate = Box::new(MIN_FUNDING_RATE_BPS as i128);
    
    let clamped_rate = if *dampened_rate > *max_rate {
        *max_rate
    } else if *dampened_rate < *min_rate {
        *min_rate
    } else {
        *dampened_rate
    };
    
    // Convert to i64 for storage in the market account
    Ok(clamped_rate as i64)
}

/// Calculate funding payment for a position based on its size and the market funding rate
#[inline(never)]
pub fn calculate_funding_payment(
    position_size: u64,
    entry_price: u64,
    is_long: bool,
    market_funding_rate: i64,
    time_elapsed: i64
) -> Result<i64> {
    // If no time elapsed, no funding payment
    if time_elapsed <= 0 {
        return Ok(0);
    }
    
    // Convert sizes to boxed values to avoid stack pressure
    let size = Box::new(position_size as i128);
    let price = Box::new(entry_price as i128);
    let rate = Box::new(market_funding_rate as i128);
    let elapsed = Box::new(time_elapsed as i128);
    let interval = Box::new(crate::constants::FUNDING_INTERVAL_SECONDS as i128);
    
    // Calculate notional value with 6 decimal precision
    let notional_value = Box::new(
        (*size)
            .checked_mul(*price)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
            .checked_div(1_000_000) // Price is 6 decimals
            .ok_or(error!(crate::error::PerpsError::Overflow))?
    );
    
    // Calculate funding rate for the elapsed time period
    // funding_payment = notional_value * funding_rate * (time_elapsed / funding_interval)
    
    // Long positions pay positive funding rate and receive negative funding rate
    // Short positions pay negative funding rate and receive positive funding rate
    let payment_direction = if is_long { -1i128 } else { 1i128 };
    let direction = Box::new(payment_direction);
    
    let funding_payment = Box::new(
        (*notional_value)
            .checked_mul(*rate)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
            .checked_mul(*direction)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
            .checked_mul(*elapsed)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
            .checked_div(*interval)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
            .checked_div(10_000) // Rate is in bps (1/10000)
            .ok_or(error!(crate::error::PerpsError::Overflow))?
    );
    
    // Convert to i64 for the payment
    if *funding_payment > i64::MAX as i128 {
        Ok(i64::MAX)
    } else if *funding_payment < i64::MIN as i128 {
        Ok(i64::MIN)
    } else {
        Ok(*funding_payment as i64)
    }
} 