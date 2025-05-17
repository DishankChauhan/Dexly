use anchor_lang::prelude::*;

/// Global state account for protocol-wide settings
#[account]
#[derive(Default)]
pub struct GlobalState {
    /// Admin authority
    pub admin: Pubkey,
    
    /// Protocol fee in basis points
    pub protocol_fee_bps: u16,
    
    /// Total volume traded
    pub total_volume: u64,
    
    /// Total fees collected
    pub total_fees: u64,
    
    /// Emergency pause flag
    pub emergency_paused: bool,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
}

/// Context for initializing global state
#[derive(Accounts)]
pub struct InitializeGlobalContext<'info> {
    /// The global state account to initialize
    #[account(
        init,
        payer = admin,
        space = 8 + // discriminator
               32 + // admin
               2 +  // protocol_fee_bps
               8 +  // total_volume
               8 +  // total_fees
               1 +  // emergency_paused
               1,   // bump
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump
    )]
    pub global_state: Account<'info, GlobalState>,
    
    /// The admin account
    #[account(mut)]
    pub admin: Signer<'info>,
    
    /// System program
    pub system_program: Program<'info, System>,
}

/// Context for updating global parameters
#[derive(Accounts)]
pub struct UpdateGlobalParamsContext<'info> {
    /// The global state account
    #[account(
        mut,
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump = global_state.bump,
        has_one = admin @ crate::error::PerpsError::Unauthorized
    )]
    pub global_state: Account<'info, GlobalState>,
    
    /// The admin account
    #[account(mut)]
    pub admin: Signer<'info>,
}

/// Context for emergency pause
#[derive(Accounts)]
pub struct EmergencyPauseContext<'info> {
    /// The global state account
    #[account(
        mut,
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump = global_state.bump,
        has_one = admin @ crate::error::PerpsError::Unauthorized
    )]
    pub global_state: Account<'info, GlobalState>,
    
    /// The admin account
    #[account(mut)]
    pub admin: Signer<'info>,
} 