use anchor_lang::prelude::*;
use crate::{
    state::{Market},
    error::PerpsError,
    constants::{FUNDING_INTERVAL_SECONDS, MAX_FUNDING_RATE_BPS, MIN_FUNDING_RATE_BPS},
};

/// Update funding rate for a market
#[inline(never)]
pub fn handler(
    ctx: Context<UpdateFundingContext>,
    market_id: u64,
) -> Result<()> {
    // Move parameters to heap to reduce stack usage
    let _market_id_boxed = Box::new(market_id);
    
    // Get market account
    let market = &mut ctx.accounts.market;
    
    // Get current timestamp
    let clock = Box::new(Clock::get()?);
    let current_ts = clock.unix_timestamp;
    
    // Check if enough time has passed since last funding update
    let time_since_last_update = Box::new(current_ts - market.last_funding_ts);
    require!(
        *time_since_last_update >= FUNDING_INTERVAL_SECONDS,
        PerpsError::FundingUpdateTooSoon
    );
    
    // Calculate new funding rate based on market imbalance
    let (new_funding_rate, skew_percentage) = calculate_funding_rate(market)?;
    
    // Update market state
    market.funding_rate = new_funding_rate;
    market.last_funding_ts = current_ts;
    
    // Emit event
    emit!(FundingUpdatedEvent {
        market: market.key(),
        funding_rate: new_funding_rate,
        long_size: market.total_long_size,
        short_size: market.total_short_size,
        skew_percentage,
        timestamp: current_ts,
    });
    
    Ok(())
}

/// Calculate funding rate based on market imbalance
#[inline(never)]
fn calculate_funding_rate(market: &Market) -> Result<(i64, i64)> {
    // Move values to heap to reduce stack usage
    let total_long_size = Box::new(market.total_long_size);
    let total_short_size = Box::new(market.total_short_size);
    
    // If either side is empty, return zero funding rate
    if *total_long_size == 0 || *total_short_size == 0 {
        return Ok((0, 0));
    }
    
    // Calculate market skew
    let (larger, smaller, is_long_larger) = if *total_long_size > *total_short_size {
        (*total_long_size, *total_short_size, true)
    } else {
        (*total_short_size, *total_long_size, false)
    };
    
    // Calculate skew percentage (larger / smaller - 1) * 10000 for basis points
    let skew_percentage = Box::new(
        ((larger * 10000) / smaller - 10000) as i64
    );
    
    // Cap skew percentage at MAX_FUNDING_RATE_BPS
    let capped_skew = Box::new(
        std::cmp::min(*skew_percentage, MAX_FUNDING_RATE_BPS as i64)
    );
    
    // Apply sign based on which side is larger
    let funding_rate = if is_long_larger {
        *capped_skew // Longs pay shorts
    } else {
        -*capped_skew // Shorts pay longs
    };
    
    // Ensure funding rate is within bounds
    let bounded_rate = Box::new(
        std::cmp::min(
            std::cmp::max(funding_rate, MIN_FUNDING_RATE_BPS as i64),
            MAX_FUNDING_RATE_BPS as i64
        )
    );
    
    Ok((*bounded_rate, *skew_percentage))
}

/// Context for updating funding rate
#[derive(Accounts)]
#[instruction(market_id: u64)]
pub struct UpdateFundingContext<'info> {
    /// The market account to update
    #[account(
        mut,
        seeds = [crate::constants::seeds::MARKET, market_id.to_le_bytes().as_ref()],
        bump = market.bump,
        constraint = market.is_active @ PerpsError::MarketInactive
    )]
    pub market: Account<'info, Market>,
    
    /// The user's account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump,
        constraint = !global_state.emergency_paused @ PerpsError::ProtocolPaused
    )]
    pub global_state: Account<'info, crate::state::GlobalState>,
}

/// Event emitted when funding rate is updated
#[event]
pub struct FundingUpdatedEvent {
    /// Market that was updated
    pub market: Pubkey,
    
    /// New funding rate
    pub funding_rate: i64,
    
    /// Total long positions size
    pub long_size: u64,
    
    /// Total short positions size
    pub short_size: u64,
    
    /// Skew percentage
    pub skew_percentage: i64,
    
    /// Timestamp when funding was updated
    pub timestamp: i64,
} 