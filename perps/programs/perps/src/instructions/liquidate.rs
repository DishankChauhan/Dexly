use anchor_lang::prelude::*;
use crate::state::{market::Market, position::Position, user::User};
use crate::utils::oracle::{get_price, OracleType};
use crate::utils::math::{calculate_pnl, calculate_fee, should_liquidate};
use crate::error::PerpsError;
use crate::constants::LIQUIDATION_FEE_BPS;

/// Liquidate an undercollateralized position
#[inline(never)]
pub fn handler(
    ctx: Context<LiquidateContext>,
    market_id: u64,
) -> Result<()> {
    // Move parameters to heap to reduce stack usage
    let _market_id_boxed = Box::new(market_id);
    
    // Get accounts
    let position = &mut ctx.accounts.position;
    let market = &mut ctx.accounts.market;
    let user_account = &mut ctx.accounts.user_account;
    
    // Ensure position is not already closed
    require!(
        !position.is_closed,
        PerpsError::PositionClosed
    );
    
    // Get current price from oracle
    let oracle_type = OracleType::from(market.oracle_type);
    let current_price = get_price(&ctx.accounts.oracle, oracle_type)?;
    
    // Check if position should be liquidated
    let should_liquidate_result = should_liquidate(
        position.is_long,
        position.entry_price,
        current_price,
        position.collateral,
        position.size,
        market.min_margin_ratio_bps,
    )?;
    
    // Require that position should be liquidated
    require!(
        should_liquidate_result,
        PerpsError::CannotLiquidate
    );
    
    // Get current timestamp
    let clock = Box::new(Clock::get()?);
    let current_ts = clock.unix_timestamp;
    
    // Calculate PnL
    let pnl = calculate_pnl(
        position.is_long,
        position.entry_price,
        current_price,
        position.size,
    )?;
    
    // Calculate remaining collateral
    let remaining_collateral = if pnl > 0 {
        Box::new(position.collateral + pnl as u64)
    } else {
        Box::new(position.collateral.saturating_sub(-pnl as u64))
    };
    
    // Calculate liquidation fee
    let liquidation_fee = calculate_fee(*remaining_collateral, LIQUIDATION_FEE_BPS)?;
    
    // Calculate user return amount (remaining collateral - liquidation fee)
    let user_return = Box::new(
        remaining_collateral.saturating_sub(liquidation_fee)
    );
    
    // Update market state
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
        .checked_add(pnl)
        .ok_or(error!(PerpsError::Overflow))?;
    
    // Decrement open positions count
    user_account.open_positions -= 1;
    
    // Mark position as closed
    position.is_closed = true;
    
    // Emit event
    emit!(PositionLiquidatedEvent {
        user: ctx.accounts.user.key(),
        liquidator: ctx.accounts.liquidator.key(),
        market: market.key(),
        position: position.key(),
        liquidation_price: current_price,
        pnl,
        liquidation_fee,
        user_return: *user_return,
        timestamp: current_ts,
    });
    
    Ok(())
}

/// Context for liquidating a position
#[derive(Accounts)]
#[instruction(market_id: u64)]
pub struct LiquidateContext<'info> {
    /// The position account to liquidate
    #[account(
        mut,
        constraint = !position.is_closed @ PerpsError::PositionClosed
    )]
    pub position: Account<'info, Position>,
    
    /// The user account
    #[account(
        mut,
        seeds = [crate::constants::seeds::USER, user.key().as_ref()],
        bump = user_account.bump,
        has_one = user @ PerpsError::Unauthorized
    )]
    pub user_account: Account<'info, User>,
    
    /// The market for this position
    #[account(
        mut,
        seeds = [crate::constants::seeds::MARKET, market_id.to_le_bytes().as_ref()],
        bump = market.bump,
        constraint = position.market == market.key() @ PerpsError::MarketNotFound
    )]
    pub market: Account<'info, Market>,
    
    /// The user's account
    /// CHECK: This is the position owner
    #[account(mut)]
    pub user: AccountInfo<'info>,
    
    /// The oracle account
    /// CHECK: Oracle validation is done in the instruction handler
    pub oracle: AccountInfo<'info>,
    
    /// The liquidator's account
    #[account(mut)]
    pub liquidator: Signer<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump
    )]
    pub global_state: Account<'info, crate::state::GlobalState>,
    
    /// System program
    pub system_program: Program<'info, System>,
}

/// Event emitted when a position is liquidated
#[event]
pub struct PositionLiquidatedEvent {
    /// User who owned the position
    pub user: Pubkey,
    
    /// Liquidator who triggered the liquidation
    pub liquidator: Pubkey,
    
    /// Market the position is in
    pub market: Pubkey,
    
    /// Position account
    pub position: Pubkey,
    
    /// Liquidation price
    pub liquidation_price: u64,
    
    /// PnL at liquidation
    pub pnl: i64,
    
    /// Liquidation fee
    pub liquidation_fee: u64,
    
    /// Amount returned to user
    pub user_return: u64,
    
    /// Timestamp when position was liquidated
    pub timestamp: i64,
} 