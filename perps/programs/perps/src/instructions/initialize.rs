use anchor_lang::prelude::*;
use crate::{
    constants::PROTOCOL_FEE_BPS,
};

/// Initialize the protocol global state
#[inline(never)]
pub fn handler(ctx: Context<crate::state::InitializeGlobalContext>) -> Result<()> {
    // Get global state account
    let global_state = &mut ctx.accounts.global_state;
    
    // Get current timestamp
    let clock = Box::new(Clock::get()?);
    let current_ts = clock.unix_timestamp;
    
    // Initialize global state
    global_state.admin = ctx.accounts.admin.key();
    global_state.protocol_fee_bps = PROTOCOL_FEE_BPS;
    global_state.total_volume = 0;
    global_state.total_fees = 0;
    global_state.emergency_paused = false;
    global_state.bump = *ctx.bumps.get("global_state").unwrap();
    
    // Emit event
    emit!(GlobalStateInitializedEvent {
        admin: global_state.admin,
        protocol_fee_bps: global_state.protocol_fee_bps,
        timestamp: current_ts,
    });
    
    Ok(())
}

/// Event emitted when global state is initialized
#[event]
pub struct GlobalStateInitializedEvent {
    /// Admin authority
    pub admin: Pubkey,
    
    /// Protocol fee in basis points
    pub protocol_fee_bps: u16,
    
    /// Timestamp when global state was initialized
    pub timestamp: i64,
} 