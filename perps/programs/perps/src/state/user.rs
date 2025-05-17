use anchor_lang::prelude::*;
use crate::constants::MAX_POSITIONS_PER_USER;

/// User account to track user's collateral and positions
#[account]
#[derive(Default)]
pub struct User {
    /// User public key
    pub user: Pubkey,
    
    /// Collateral balance in quote asset units (e.g., USDC)
    pub collateral_balance: u64,
    
    /// Number of open positions
    pub open_positions: u8,
    
    /// Total realized PnL
    pub realized_pnl: i64,
    
    /// Array of position pubkeys (fixed size to avoid stack issues)
    pub positions: [Pubkey; MAX_POSITIONS_PER_USER as usize],
    
    /// Bump seed for PDA derivation
    pub bump: u8,
}

/// Context for creating a user account
#[derive(Accounts)]
pub struct CreateUserContext<'info> {
    /// The user account to initialize
    #[account(
        init,
        payer = user,
        space = 8 + // discriminator
               32 + // user
               8 +  // collateral_balance
               1 +  // open_positions
               8 +  // realized_pnl
               (32 * MAX_POSITIONS_PER_USER as usize) + // positions array
               1,   // bump
        seeds = [crate::constants::seeds::USER, user.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, User>,
    
    /// The user's signer account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// System program
    pub system_program: Program<'info, System>,
}

/// Context for depositing collateral
#[derive(Accounts)]
pub struct DepositCollateralContext<'info> {
    /// The user account
    #[account(
        mut,
        seeds = [crate::constants::seeds::USER, user.key().as_ref()],
        bump = user_account.bump,
        has_one = user @ crate::error::PerpsError::Unauthorized
    )]
    pub user_account: Account<'info, User>,
    
    /// The user's signer account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// The vault account to store collateral
    #[account(
        mut,
        seeds = [crate::constants::seeds::VAULT, collateral_mint.key().as_ref()],
        bump = vault.bump
    )]
    pub vault: Account<'info, crate::state::vault::Vault>,
    
    /// The collateral mint
    /// CHECK: Collateral mint validation is done in the instruction handler
    pub collateral_mint: AccountInfo<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump,
        constraint = !global_state.emergency_paused @ crate::error::PerpsError::ProtocolPaused
    )]
    pub global_state: Account<'info, crate::state::global::GlobalState>,
    
    /// System program
    pub system_program: Program<'info, System>,
    
    /// Token program
    pub token_program: Program<'info, anchor_spl::token::Token>,
}

/// Context for withdrawing collateral
#[derive(Accounts)]
pub struct WithdrawCollateralContext<'info> {
    /// The user account
    #[account(
        mut,
        seeds = [crate::constants::seeds::USER, user.key().as_ref()],
        bump = user_account.bump,
        has_one = user @ crate::error::PerpsError::Unauthorized
    )]
    pub user_account: Account<'info, User>,
    
    /// The user's signer account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// The vault account to withdraw collateral from
    #[account(
        mut,
        seeds = [crate::constants::seeds::VAULT, collateral_mint.key().as_ref()],
        bump = vault.bump
    )]
    pub vault: Account<'info, crate::state::vault::Vault>,
    
    /// The collateral mint
    /// CHECK: Collateral mint validation is done in the instruction handler
    pub collateral_mint: AccountInfo<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump,
        constraint = !global_state.emergency_paused @ crate::error::PerpsError::ProtocolPaused
    )]
    pub global_state: Account<'info, crate::state::global::GlobalState>,
    
    /// System program
    pub system_program: Program<'info, System>,
    
    /// Token program
    pub token_program: Program<'info, anchor_spl::token::Token>,
} 