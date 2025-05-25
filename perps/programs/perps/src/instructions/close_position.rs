use anchor_lang::prelude::*;
use crate::utils::oracle::{get_price, OracleType};
use crate::utils::math::{calculate_pnl, calculate_fee};
use crate::utils::funding::calculate_funding_payment;
use crate::utils::amm::{calculate_price_with_impact, update_market_reserves_for_close};
use crate::error::PerpsError;

/// Close an existing position
#[inline(never)]
pub fn handler(
    ctx: Context<crate::state::ClosePositionContext>,
    market_id: u64,
    max_slippage_bps: u16,
) -> Result<()> {
    // Move parameters to heap to reduce stack usage
    let _market_id_boxed = Box::new(market_id);
    let max_slippage_bps_boxed = Box::new(max_slippage_bps);
    
    // Validate slippage tolerance
    require!(
        *max_slippage_bps_boxed <= crate::constants::MAX_SLIPPAGE_BPS,
        PerpsError::InvalidSlippage
    );
    
    // Get accounts
    let position = &mut ctx.accounts.position;
    let market = &mut ctx.accounts.market;
    let user_account = &mut ctx.accounts.user_account;
    
    // Ensure position is not already closed
    require!(
        !position.is_closed,
        PerpsError::PositionClosed
    );
    
    // Get oracle price for reference
    let oracle_type = OracleType::from(market.oracle_type);
    let oracle_price = get_price(&ctx.accounts.oracle, oracle_type)?;
    
    // Calculate exit price with AMM impact
    let exit_price = calculate_price_with_impact(
        market,
        position.size,
        !position.is_long, // Inverse for closing (buy for short, sell for long)
        oracle_price
    )?;
    
    // Update market reserves based on position closing
    update_market_reserves_for_close(
        market,
        position.size,
        position.is_long
    )?;
    
    // Get current timestamp
    let clock = Box::new(Clock::get()?);
    let current_ts = clock.unix_timestamp;
    
    // Calculate time elapsed since last funding payment
    let time_elapsed = Box::new(current_ts - position.last_funding_ts);
    
    // Calculate position value
    let position_value = Box::new(position.size * exit_price);
    
    // Calculate funding payment since last update
    let position_size = position.size;
    let entry_price = position.entry_price;
    let funding_payment = calculate_funding_payment(
        position_size,
        entry_price,
        position.is_long,
        market.funding_rate,
        *time_elapsed
    )?;
    
    // Calculate PnL using AMM exit price
    let pnl = calculate_pnl(
        position.is_long,
        position.entry_price,
        exit_price,
        position.size,
    )?;
    
    // Calculate total PnL (including funding)
    let total_pnl = Box::new(pnl + funding_payment);
    
    // Calculate fee
    let fee_amount = calculate_fee(*position_value, market.fee_bps)?;
    
    // Calculate return amount
    let return_amount = if *total_pnl > 0 {
        Box::new(position.collateral + *total_pnl as u64 - fee_amount)
    } else {
        Box::new(position.collateral.saturating_sub(-*total_pnl as u64).saturating_sub(fee_amount))
    };
    
    // Update market state for size tracking
    if position.is_long {
        market.total_long_size = market.total_long_size
            .checked_sub(position.size)
            .ok_or(error!(PerpsError::Overflow))?;
    } else {
        market.total_short_size = market.total_short_size
            .checked_sub(position.size)
            .ok_or(error!(PerpsError::Overflow))?;
    }
    
    // Update user account
    // Find position index in user's positions array
    let mut position_index = user_account.open_positions;
    for i in 0..user_account.open_positions {
        if user_account.positions[i as usize] == position.key() {
            position_index = i;
            break;
        }
    }
    
    // Remove position from user's positions array by replacing with last position
    if position_index < user_account.open_positions - 1 {
        let last_index = user_account.open_positions - 1;
        user_account.positions[position_index as usize] = user_account.positions[last_index as usize];
    }
    
    // Update user's realized PnL
    user_account.realized_pnl = user_account.realized_pnl
        .checked_add(*total_pnl)
        .ok_or(error!(PerpsError::Overflow))?;
    
    // Decrement open positions count
    user_account.open_positions -= 1;
    
    // Mark position as closed
    position.is_closed = true;
    
    // Emit event
    emit!(PositionClosedEvent {
        user: ctx.accounts.user.key(),
        market: market.key(),
        position: position.key(),
        exit_price,
        pnl: *total_pnl,
        fee: fee_amount,
        return_amount: *return_amount,
        timestamp: current_ts,
    });
    
    Ok(())
}

/// Event emitted when a position is closed
#[event]
pub struct PositionClosedEvent {
    /// User who closed the position
    pub user: Pubkey,
    
    /// Market the position is in
    pub market: Pubkey,
    
    /// Position account
    pub position: Pubkey,
    
    /// Exit price of the position
    pub exit_price: u64,
    
    /// Total PnL (including funding)
    pub pnl: i64,
    
    /// Fee paid
    pub fee: u64,
    
    /// Amount returned to user
    pub return_amount: u64,
    
    /// Timestamp when position was closed
    pub timestamp: i64,
} 