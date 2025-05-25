use anchor_lang::prelude::*;
use crate::error::PerpsError;

/// Calculate liquidation price for a position
#[inline(never)]
pub fn calculate_liquidation_price(
    is_long: bool,
    entry_price: u64,
    collateral: u64,
    size: u64,
    maintenance_margin_ratio_bps: u16,
) -> Result<u64> {
    // Move values to heap to reduce stack usage
    let entry_price_boxed = Box::new(entry_price);
    let collateral_boxed = Box::new(collateral);
    let size_boxed = Box::new(size);
    let maintenance_margin_ratio_bps_boxed = Box::new(maintenance_margin_ratio_bps);
    
    // Calculate position value
    let position_value = Box::new(*entry_price_boxed * *size_boxed);
    
    // Calculate maintenance margin requirement
    let margin_requirement = Box::new(
        *position_value * *maintenance_margin_ratio_bps_boxed as u64 / 10000
    );
    
    // Calculate liquidation price based on position direction
    let liquidation_price = if is_long {
        // For long positions: entry_price * (1 - (collateral - margin_requirement) / position_value)
        let margin_diff = Box::new(
            collateral_boxed.saturating_sub(*margin_requirement)
        );
        
        let price_drop_ratio = Box::new(
            *margin_diff * 10000 / *position_value
        );
        
        let result = *entry_price_boxed * (10000 - *price_drop_ratio) / 10000;
        result
    } else {
        // For short positions: entry_price * (1 + (collateral - margin_requirement) / position_value)
        let margin_diff = Box::new(
            collateral_boxed.saturating_sub(*margin_requirement)
        );
        
        let price_increase_ratio = Box::new(
            *margin_diff * 10000 / *position_value
        );
        
        let result = *entry_price_boxed * (10000 + *price_increase_ratio) / 10000;
        result
    };
    
    Ok(liquidation_price)
}

/// Calculate PnL for a position
#[inline(never)]
pub fn calculate_pnl(
    is_long: bool,
    entry_price: u64,
    current_price: u64,
    size: u64,
) -> Result<i64> {
    // Move values to heap to reduce stack usage
    let entry_price_boxed = Box::new(entry_price);
    let current_price_boxed = Box::new(current_price);
    let size_boxed = Box::new(size);
    
    // Calculate PnL based on position direction
    let pnl = if is_long {
        // For long positions: (current_price - entry_price) * size
        let price_diff = Box::new(
            current_price_boxed.checked_sub(*entry_price_boxed)
                .ok_or(error!(PerpsError::Overflow))?
        );
        
        let result = *price_diff as i64 * *size_boxed as i64;
        result
    } else {
        // For short positions: (entry_price - current_price) * size
        let price_diff = Box::new(
            entry_price_boxed.checked_sub(*current_price_boxed)
                .ok_or(error!(PerpsError::Overflow))?
        );
        
        let result = *price_diff as i64 * *size_boxed as i64;
        result
    };
    
    Ok(pnl)
}

/// Calculate funding payment
#[inline(never)]
pub fn calculate_funding_payment(
    is_long: bool,
    funding_rate: i64,
    position_value: u64,
    elapsed_time: i64,
) -> Result<i64> {
    // Move values to heap to reduce stack usage
    let funding_rate_boxed = Box::new(funding_rate);
    let position_value_boxed = Box::new(position_value);
    let elapsed_time_boxed = Box::new(elapsed_time);
    let funding_interval_boxed = Box::new(crate::constants::FUNDING_INTERVAL_SECONDS);
    
    // Calculate time ratio (elapsed time / funding interval)
    let time_ratio = Box::new(
        *elapsed_time_boxed * 10000 / *funding_interval_boxed
    );
    
    // Calculate funding payment
    // For long positions: funding_rate * position_value * (elapsed_time / funding_interval)
    // For short positions: -funding_rate * position_value * (elapsed_time / funding_interval)
    let funding_payment = Box::new(
        *funding_rate_boxed * *position_value_boxed as i64 * *time_ratio / 10000 / 10000
    );
    
    // Apply sign based on position direction
    let result = if is_long {
        *funding_payment
    } else {
        -*funding_payment
    };
    
    Ok(result)
}

/// Check if position should be liquidated
#[inline(never)]
pub fn should_liquidate(
    is_long: bool,
    entry_price: u64,
    current_price: u64,
    collateral: u64,
    size: u64,
    maintenance_margin_ratio_bps: u16,
) -> Result<bool> {
    // Move values to heap to reduce stack usage
    let entry_price_boxed = Box::new(entry_price);
    let current_price_boxed = Box::new(current_price);
    let collateral_boxed = Box::new(collateral);
    let size_boxed = Box::new(size);
    let maintenance_margin_ratio_bps_boxed = Box::new(maintenance_margin_ratio_bps);
    
    // If position is in profit or at break-even
    let _entry_position_value = Box::new(*entry_price_boxed * *size_boxed);
    
    // Calculate current position value
    let current_position_value = Box::new(*current_price_boxed * *size_boxed);
    
    // Calculate unrealized PnL
    let pnl = if is_long {
        if *current_price_boxed > *entry_price_boxed {
            Box::new((*current_price_boxed - *entry_price_boxed) * *size_boxed)
        } else {
            Box::new((*entry_price_boxed - *current_price_boxed) * *size_boxed)
        }
    } else {
        if *entry_price_boxed > *current_price_boxed {
            Box::new((*entry_price_boxed - *current_price_boxed) * *size_boxed)
        } else {
            Box::new((*current_price_boxed - *entry_price_boxed) * *size_boxed)
        }
    };
    
    // Calculate effective collateral (collateral +/- unrealized PnL)
    let effective_collateral = if is_long {
        if *current_price_boxed > *entry_price_boxed {
            Box::new(*collateral_boxed + *pnl)
        } else {
            Box::new(collateral_boxed.saturating_sub(*pnl))
        }
    } else {
        if *entry_price_boxed > *current_price_boxed {
            Box::new(*collateral_boxed + *pnl)
        } else {
            Box::new(collateral_boxed.saturating_sub(*pnl))
        }
    };
    
    // Calculate maintenance margin requirement
    let margin_requirement = Box::new(
        *current_position_value * *maintenance_margin_ratio_bps_boxed as u64 / 10000
    );
    
    // Position should be liquidated if effective collateral < margin requirement
    let should_liquidate = *effective_collateral < *margin_requirement;
    
    Ok(should_liquidate)
}

/// Calculate fee amount
#[inline(never)]
pub fn calculate_fee(amount: u64, fee_bps: u16) -> Result<u64> {
    // Move values to heap to reduce stack usage
    let amount_boxed = Box::new(amount);
    let fee_bps_boxed = Box::new(fee_bps as u64);
    
    // Calculate fee amount
    let fee = Box::new(
        *amount_boxed * *fee_bps_boxed / 10000
    );
    
    Ok(*fee)
} 