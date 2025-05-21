use anchor_lang::prelude::*;
use crate::constants::ASSET_SYMBOL_SIZE;

/// Market state account for a trading pair
#[account]
#[derive(Default)]
pub struct Market {
    /// Asset symbol (e.g., "BTC")
    pub asset_symbol: [u8; 8],
    
    /// Oracle price feed pubkey
    pub oracle: Pubkey,
    
    /// Oracle type (0 = Pyth, 1 = Switchboard)
    pub oracle_type: u8,
    
    /// Base asset reserve (asset amount)
    pub base_asset_reserve: u64,
    
    /// Quote asset reserve (USDC amount)
    pub quote_asset_reserve: u64,
    
    /// Current funding rate (can be positive or negative)
    pub funding_rate: i64,
    
    /// Last timestamp when funding was updated
    pub last_funding_ts: i64,
    
    /// Total long positions size
    pub total_long_size: u64,
    
    /// Total short positions size
    pub total_short_size: u64,
    
    /// Maximum allowed leverage for this market
    pub max_leverage: u8,
    
    /// Minimum margin ratio in basis points
    pub min_margin_ratio_bps: u16,
    
    /// Fee in basis points
    pub fee_bps: u16,
    
    /// Whether the market is active
    pub is_active: bool,
    
    /// Authority that can update market parameters
    pub authority: Pubkey,
    
    /// Minimum position size
    pub min_position_size: u64,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
    
    /// Maximum price impact in basis points
    pub max_price_impact_bps: u16,
    
    /// K factor to scale the virtual AMM
    pub k_factor: u64,
    
    /// Minimum base asset reserve (safety parameter)
    pub min_base_asset_reserve: u64,
    
    /// Minimum quote asset reserve (safety parameter)
    pub min_quote_asset_reserve: u64,
    
    /// Maximum oracle price deviation allowed (in basis points)
    pub max_oracle_deviation_bps: u16,
}

/// Market account context for initialization
#[derive(Accounts)]
#[instruction(
    asset_symbol: [u8; ASSET_SYMBOL_SIZE],
    market_id: u64,
)]
pub struct InitializeMarket<'info> {
    /// The market account to initialize
    #[account(
        init,
        payer = authority,
        space = 8 + // discriminator
               ASSET_SYMBOL_SIZE + // asset_symbol
               32 + // oracle
               1 +  // oracle_type
               8 +  // base_asset_reserve
               8 +  // quote_asset_reserve
               8 +  // funding_rate
               8 +  // last_funding_ts
               8 +  // total_long_size
               8 +  // total_short_size
               1 +  // max_leverage
               2 +  // min_margin_ratio_bps
               2 +  // fee_bps
               1 +  // is_active
               32 + // authority
               8 +  // min_position_size
               2 +  // max_price_impact_bps
               8 +  // k_factor
               8 +  // min_base_asset_reserve
               8 +  // min_quote_asset_reserve
               2 +  // max_oracle_deviation_bps
               1,   // bump
        seeds = [crate::constants::seeds::MARKET, market_id.to_le_bytes().as_ref()],
        bump
    )]
    pub market: Account<'info, Market>,
    
    /// The oracle account (Pyth or Switchboard)
    /// CHECK: Oracle validation is done in the instruction handler
    pub oracle: AccountInfo<'info>,
    
    /// The authority that can update market parameters
    #[account(mut)]
    pub authority: Signer<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump,
        has_one = admin @ crate::error::PerpsError::Unauthorized
    )]
    pub global_state: Account<'info, crate::state::global::GlobalState>,
    
    /// The admin account
    #[account(constraint = admin.key() == authority.key() @ crate::error::PerpsError::Unauthorized)]
    /// CHECK: Admin is verified by constraint
    pub admin: AccountInfo<'info>,
    
    /// System program
    pub system_program: Program<'info, System>,
} 