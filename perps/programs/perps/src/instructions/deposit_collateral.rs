use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::{
    state::{User, Vault},
    error::PerpsError,
};

/// Deposit collateral into user account
#[inline(never)]
pub fn handler(
    ctx: Context<DepositCollateralContext>,
    amount: u64,
) -> Result<()> {
    // Move parameters to heap to reduce stack usage
    let amount_boxed = Box::new(amount);
    
    // Validate amount
    require!(
        *amount_boxed > 0,
        PerpsError::InsufficientFunds
    );
    
    // Get accounts
    let user_account = &mut ctx.accounts.user_account;
    let vault = &mut ctx.accounts.vault;
    
    // Transfer tokens from user to vault
    let cpi_accounts = Transfer {
        from: ctx.accounts.user_token_account.to_account_info(),
        to: ctx.accounts.vault_token_account.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    
    token::transfer(cpi_ctx, *amount_boxed)?;
    
    // Update user account
    user_account.collateral_balance = user_account.collateral_balance
        .checked_add(*amount_boxed)
        .ok_or(error!(PerpsError::Overflow))?;
    
    // Update vault account
    vault.total_deposits = vault.total_deposits
        .checked_add(*amount_boxed)
        .ok_or(error!(PerpsError::Overflow))?;
    
    // Get current timestamp
    let current_ts = Clock::get()?.unix_timestamp;
    
    // Emit event
    emit!(CollateralDepositedEvent {
        user: ctx.accounts.user.key(),
        mint: ctx.accounts.collateral_mint.key(),
        amount: *amount_boxed,
        timestamp: current_ts,
    });
    
    Ok(())
}

/// Context for depositing collateral - minimal stack usage
#[derive(Accounts)]
pub struct DepositCollateralContext<'info> {
    /// The user account
    #[account(mut)]
    pub user_account: Account<'info, User>,
    
    /// The user's token account
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    
    /// The vault token account
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    
    /// The vault account
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    
    /// The vault authority
    /// CHECK: This is a PDA used as the authority for the vault
    pub vault_authority: AccountInfo<'info>,
    
    /// The collateral mint
    pub collateral_mint: Account<'info, token::Mint>,
    
    /// The user's account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// The global state account
    pub global_state: Account<'info, crate::state::GlobalState>,
    
    /// Token program
    pub token_program: Program<'info, Token>,
    
    /// System program
    pub system_program: Program<'info, System>,
}

/// Event emitted when collateral is deposited
#[event]
pub struct CollateralDepositedEvent {
    /// User who deposited collateral
    pub user: Pubkey,
    
    /// Mint of the collateral token
    pub mint: Pubkey,
    
    /// Amount deposited
    pub amount: u64,
    
    /// Timestamp when collateral was deposited
    pub timestamp: i64,
} 