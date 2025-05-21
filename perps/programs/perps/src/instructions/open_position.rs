use anchor_lang::prelude::*;
use crate::utils::oracle::{get_price, OracleType};
use crate::utils::math::{calculate_fee, calculate_liquidation_price};
use crate::utils::amm::{calculate_price_with_impact, update_market_reserves_for_open};
use crate::error::PerpsError;
use crate::constants::{MAX_LEVERAGE, MIN_LEVERAGE};

/// Open a new position
#[inline(never)]
pub fn handler(
    ctx: Context<crate::state::OpenPositionContext>,
    is_long: bool,
    collateral_amount: u64,
    leverage: u8,
    market_id: u64,
    position_id: u64,
    max_slippage_bps: u16,
) -> Result<()> {
    // Move parameters to heap to reduce stack usage
    let is_long_boxed = Box::new(is_long);
    let collateral_amount_boxed = Box::new(collateral_amount);
    let leverage_boxed = Box::new(leverage);
    let _market_id_boxed = Box::new(market_id);
    let _position_id_boxed = Box::new(position_id);
    let max_slippage_bps_boxed = Box::new(max_slippage_bps);
    
    // Validate leverage
    require!(
        *leverage_boxed >= MIN_LEVERAGE && *leverage_boxed <= MAX_LEVERAGE,
        PerpsError::InvalidLeverage
    );
    
    // Validate collateral amount
    require!(
        *collateral_amount_boxed > 0,
        PerpsError::InsufficientFunds
    );
    
    // Validate slippage tolerance
    require!(
        *max_slippage_bps_boxed <= crate::constants::MAX_SLIPPAGE_BPS,
        PerpsError::InvalidSlippage
    );
    
    // Get market and user accounts
    let market = &mut ctx.accounts.market;
    let user_account = &mut ctx.accounts.user_account;
    let position = &mut ctx.accounts.position;
    
    // Check if user has reached max positions
    require!(
        user_account.open_positions < crate::constants::MAX_POSITIONS_PER_USER,
        PerpsError::MaxPositionsReached
    );
    
    // Check if market is active
    require!(
        market.is_active,
        PerpsError::MarketInactive
    );
    
    // Get oracle price
    let oracle_type = OracleType::from(market.oracle_type);
    let oracle_price = get_price(&ctx.accounts.oracle, oracle_type)?;
    
    // Calculate position size based on collateral and leverage
    let position_size = Box::new(
        *collateral_amount_boxed * *leverage_boxed as u64 / oracle_price
    );
    
    // Validate position size
    require!(
        *position_size >= market.min_position_size,
        PerpsError::PositionTooSmall
    );
    
    // Calculate entry price with AMM impact
    let entry_price = calculate_price_with_impact(
        market,
        *position_size,
        *is_long_boxed,
        oracle_price,
    )?;
    
    // Update market reserves based on position
    update_market_reserves_for_open(
        market,
        *position_size,
        *is_long_boxed,
    )?;
    
    // Calculate liquidation price
    let liquidation_price = calculate_liquidation_price(
        *is_long_boxed,
        entry_price, // Use AMM price instead of oracle price
        *collateral_amount_boxed,
        *position_size,
        market.min_margin_ratio_bps,
    )?;
    
    // Calculate fee
    let fee_amount = calculate_fee(*collateral_amount_boxed, market.fee_bps)?;
    
    // Update market state for size tracking
    if *is_long_boxed {
        market.total_long_size = market.total_long_size
            .checked_add(*position_size)
            .ok_or(error!(PerpsError::Overflow))?;
    } else {
        market.total_short_size = market.total_short_size
            .checked_add(*position_size)
            .ok_or(error!(PerpsError::Overflow))?;
    }
    
    // Get current timestamp
    let clock = Box::new(Clock::get()?);
    let current_ts = clock.unix_timestamp;
    
    // Initialize position
    position.user = ctx.accounts.user.key();
    position.market = market.key();
    position.is_long = *is_long_boxed;
    position.size = *position_size;
    position.entry_price = entry_price;
    position.collateral = *collateral_amount_boxed - fee_amount;
    position.leverage = *leverage_boxed;
    position.opened_at = current_ts;
    position.last_funding_ts = current_ts;
    position.realized_pnl_from_funding = 0;
    position.liquidation_price = liquidation_price;
    position.is_closed = false;
    position.bump = *ctx.bumps.get("position").unwrap();
    
    // Update user account
    let position_index = user_account.open_positions as usize;
    user_account.positions[position_index] = position.key();
    user_account.open_positions += 1;
    
    // Emit event
    emit!(PositionOpenedEvent {
        user: ctx.accounts.user.key(),
        market: market.key(),
        position: position.key(),
        is_long: *is_long_boxed,
        size: *position_size,
        collateral: *collateral_amount_boxed - fee_amount,
        entry_price,
        leverage: *leverage_boxed,
        liquidation_price,
        fee: fee_amount,
        timestamp: current_ts,
    });
    
    Ok(())
}

/// Event emitted when a position is opened
#[event]
pub struct PositionOpenedEvent {
    /// User who opened the position
    pub user: Pubkey,
    
    /// Market the position is in
    pub market: Pubkey,
    
    /// Position account
    pub position: Pubkey,
    
    /// Direction of the position (true = long, false = short)
    pub is_long: bool,
    
    /// Size of the position in base asset units
    pub size: u64,
    
    /// Collateral amount in quote asset units
    pub collateral: u64,
    
    /// Entry price of the position
    pub entry_price: u64,
    
    /// Leverage used for this position
    pub leverage: u8,
    
    /// Liquidation price
    pub liquidation_price: u64,
    
    /// Fee paid
    pub fee: u64,
    
    /// Timestamp when position was opened
    pub timestamp: i64,
} 