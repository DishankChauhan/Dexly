use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::{
    state::{User, Vault},
    error::PerpsError,
    constants::INITIAL_MARGIN_RATIO_BPS,
};

/// Withdraw collateral from user account
#[inline(never)]
pub fn handler(
    ctx: Context<WithdrawCollateralContext>,
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
    
    // Check if user has enough collateral
    require!(
        user_account.collateral_balance >= *amount_boxed,
        PerpsError::InsufficientFunds
    );
    
    // Check if user has open positions
    if user_account.open_positions > 0 {
        // Check if user has enough remaining collateral to cover positions
        let remaining_collateral = Box::new(
            user_account.collateral_balance.checked_sub(*amount_boxed)
                .ok_or(error!(PerpsError::Overflow))?
        );
        
        // For each position, check if there's enough collateral
        // This is a simplified check - in a real implementation, you would need
        // to check each position's margin requirements
        let required_collateral = Box::new(
            user_account.open_positions as u64 * INITIAL_MARGIN_RATIO_BPS as u64 * 1000 / 10000
        );
        
        require!(
            *remaining_collateral >= *required_collateral,
            PerpsError::InsufficientCollateral
        );
    }
    
    // Transfer tokens from vault to user
    let mint_key = ctx.accounts.collateral_mint.key();
    let vault_authority_seeds = &[
        crate::constants::seeds::VAULT_AUTHORITY,
        mint_key.as_ref(),
        &[vault.authority_bump],
    ];
    
    let signer = &[&vault_authority_seeds[..]];
    
    let cpi_accounts = Transfer {
        from: ctx.accounts.vault_token_account.to_account_info(),
        to: ctx.accounts.user_token_account.to_account_info(),
        authority: ctx.accounts.vault_authority.to_account_info(),
    };
    
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    
    token::transfer(cpi_ctx, *amount_boxed)?;
    
    // Update user account
    user_account.collateral_balance = user_account.collateral_balance
        .checked_sub(*amount_boxed)
        .ok_or(error!(PerpsError::Overflow))?;
    
    // Update vault account
    vault.total_deposits = vault.total_deposits
        .checked_sub(*amount_boxed)
        .ok_or(error!(PerpsError::Overflow))?;
    
    // Get current timestamp
    let current_ts = Clock::get()?.unix_timestamp;
    
    // Emit event
    emit!(CollateralWithdrawnEvent {
        user: ctx.accounts.user.key(),
        mint: ctx.accounts.collateral_mint.key(),
        amount: *amount_boxed,
        timestamp: current_ts,
    });
    
    Ok(())
}

/// Context for withdrawing collateral
#[derive(Accounts)]
pub struct WithdrawCollateralContext<'info> {
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

/// Event emitted when collateral is withdrawn
#[event]
pub struct CollateralWithdrawnEvent {
    /// User who withdrew collateral
    pub user: Pubkey,
    
    /// Mint of the collateral token
    pub mint: Pubkey,
    
    /// Amount withdrawn
    pub amount: u64,
    
    /// Timestamp when collateral was withdrawn
    pub timestamp: i64,
} 