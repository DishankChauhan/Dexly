use anchor_lang::prelude::*;

/// Position account to track user's open positions
#[account]
#[derive(Default)]
pub struct Position {
    /// User who owns this position
    pub user: Pubkey,
    
    /// Market this position is for
    pub market: Pubkey,
    
    /// Direction of the position (true = long, false = short)
    pub is_long: bool,
    
    /// Size of the position in base asset units
    pub size: u64,
    
    /// Entry price of the position
    pub entry_price: u64,
    
    /// Collateral amount in quote asset units (e.g., USDC)
    pub collateral: u64,
    
    /// Leverage used for this position
    pub leverage: u8,
    
    /// Timestamp when position was opened
    pub opened_at: i64,
    
    /// Last funding payment timestamp
    pub last_funding_ts: i64,
    
    /// Realized PnL from funding payments
    pub realized_pnl_from_funding: i64,
    
    /// Liquidation price
    pub liquidation_price: u64,
    
    /// Whether position is closed
    pub is_closed: bool,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
}

/// Context for opening a position
#[derive(Accounts)]
#[instruction(
    position_id: u64,
    market_id: u64,
)]
pub struct OpenPositionContext<'info> {
    /// The position account to initialize
    #[account(
        init,
        payer = user,
        space = 8 + // discriminator
               32 + // user
               32 + // market
               1 +  // is_long
               8 +  // size
               8 +  // entry_price
               8 +  // collateral
               1 +  // leverage
               8 +  // opened_at
               8 +  // last_funding_ts
               8 +  // realized_pnl_from_funding
               8 +  // liquidation_price
               1 +  // is_closed
               1,   // bump
        seeds = [crate::constants::seeds::POSITION, user.key().as_ref(), position_id.to_le_bytes().as_ref()],
        bump
    )]
    pub position: Account<'info, Position>,
    
    /// The user account
    #[account(
        mut,
        seeds = [crate::constants::seeds::USER, user.key().as_ref()],
        bump = user_account.bump,
        has_one = user @ crate::error::PerpsError::Unauthorized
    )]
    pub user_account: Account<'info, crate::state::user::User>,
    
    /// The market for this position
    #[account(
        mut,
        seeds = [crate::constants::seeds::MARKET, market_id.to_le_bytes().as_ref()],
        bump = market.bump,
        constraint = market.is_active @ crate::error::PerpsError::MarketInactive
    )]
    pub market: Account<'info, crate::state::market::Market>,
    
    /// The user's signer account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// The oracle account
    /// CHECK: Oracle validation is done in the instruction handler
    pub oracle: AccountInfo<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump,
        constraint = !global_state.emergency_paused @ crate::error::PerpsError::ProtocolPaused
    )]
    pub global_state: Account<'info, crate::state::global::GlobalState>,
    
    /// System program
    pub system_program: Program<'info, System>,
}

/// Context for closing a position
#[derive(Accounts)]
#[instruction(market_id: u64)]
pub struct ClosePositionContext<'info> {
    /// The position account to close
    #[account(
        mut,
        seeds = [crate::constants::seeds::POSITION, user.key().as_ref(), position.key().as_ref()],
        bump = position.bump,
        has_one = user @ crate::error::PerpsError::Unauthorized,
        constraint = !position.is_closed @ crate::error::PerpsError::PositionClosed
    )]
    pub position: Account<'info, Position>,
    
    /// The user account
    #[account(
        mut,
        seeds = [crate::constants::seeds::USER, user.key().as_ref()],
        bump = user_account.bump,
        has_one = user @ crate::error::PerpsError::Unauthorized
    )]
    pub user_account: Account<'info, crate::state::user::User>,
    
    /// The market for this position
    #[account(
        mut,
        seeds = [crate::constants::seeds::MARKET, market_id.to_le_bytes().as_ref()],
        bump = market.bump,
        constraint = position.market == market.key() @ crate::error::PerpsError::MarketNotFound
    )]
    pub market: Account<'info, crate::state::market::Market>,
    
    /// The user's signer account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// The oracle account
    /// CHECK: Oracle validation is done in the instruction handler
    pub oracle: AccountInfo<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump,
        constraint = !global_state.emergency_paused @ crate::error::PerpsError::ProtocolPaused
    )]
    pub global_state: Account<'info, crate::state::global::GlobalState>,
    
    /// System program
    pub system_program: Program<'info, System>,
} 