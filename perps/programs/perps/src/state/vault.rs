use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;
use anchor_spl::token::Token;

/// Collateral types supported by the protocol
#[derive(Clone, Copy, PartialEq, AnchorSerialize, AnchorDeserialize)]
pub enum CollateralType {
    USDC = 0,
    SOL = 1,
}

impl From<u8> for CollateralType {
    fn from(value: u8) -> Self {
        match value {
            0 => CollateralType::USDC,
            1 => CollateralType::SOL,
            _ => CollateralType::USDC,
        }
    }
}

impl CollateralType {
    /// Get the decimal precision for this collateral type
    pub fn decimals(&self) -> u8 {
        match self {
            CollateralType::USDC => 6, // 6 decimals for USDC
            CollateralType::SOL => 9,  // 9 decimals for SOL
        }
    }
    
    /// Get the initial LTV (loan-to-value) in basis points for this collateral
    pub fn initial_ltv_bps(&self) -> u16 {
        match self {
            CollateralType::USDC => 9000, // 90% for USDC
            CollateralType::SOL => 8000,  // 80% for SOL (more volatile)
        }
    }
    
    /// Get the liquidation threshold LTV in basis points
    pub fn liquidation_threshold_bps(&self) -> u16 {
        match self {
            CollateralType::USDC => 9500, // 95% for USDC
            CollateralType::SOL => 8500,  // 85% for SOL
        }
    }
}

/// Vault account to store user collateral
#[account]
#[derive(Default)]
pub struct Vault {
    /// Mint of the token (e.g., USDC mint)
    pub mint: Pubkey,
    
    /// Authority of the vault (program PDA)
    pub authority: Pubkey,
    
    /// Token account owned by the vault authority
    pub token_account: Pubkey,
    
    /// Total deposits in the vault
    pub total_deposits: u64,
    
    /// Type of collateral stored in this vault
    pub collateral_type: u8,
    
    /// Oracle account for price feed (for non-stablecoin collateral)
    pub oracle: Pubkey,
    
    /// Oracle type (0 = Pyth, 1 = Switchboard)
    pub oracle_type: u8,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
    
    /// Bump seed for vault authority PDA
    pub authority_bump: u8,
}

impl Vault {
    /// Get the value of collateral in USD (with 6 decimals)
    pub fn get_usd_value(&self, amount: u64, oracle_account: &AccountInfo) -> Result<u64> {
        let collateral_type = CollateralType::from(self.collateral_type);
        
        match collateral_type {
            CollateralType::USDC => {
                // USDC is already in USD with 6 decimals
                Ok(amount)
            },
            CollateralType::SOL => {
                // For SOL, convert to USD using oracle price
                let oracle_type = crate::utils::oracle::OracleType::from(self.oracle_type);
                let sol_price = crate::utils::oracle::get_price(oracle_account, oracle_type)?;
                
                // SOL has 9 decimals, sol_price has 6 decimals, result should have 6 decimals
                // amount * sol_price / 10^9
                let amount_u128 = Box::new(amount as u128);
                let price_u128 = Box::new(sol_price as u128);
                
                let value = Box::new(
                    (*amount_u128)
                        .checked_mul(*price_u128)
                        .ok_or(error!(crate::error::PerpsError::Overflow))?
                        .checked_div(1_000_000_000) // 9 decimals for SOL
                        .ok_or(error!(crate::error::PerpsError::Overflow))?
                );
                
                if *value > u64::MAX as u128 {
                    return Err(error!(crate::error::PerpsError::Overflow));
                }
                
                Ok(*value as u64)
            }
        }
    }
}

/// Fee vault to collect protocol fees
#[account]
#[derive(Default)]
pub struct FeeVault {
    /// Mint of the fee token (e.g., USDC mint)
    pub mint: Pubkey,
    
    /// Authority that can withdraw fees
    pub authority: Pubkey,
    
    /// Token account owned by the vault
    pub token_account: Pubkey,
    
    /// Total fees collected
    pub total_fees: u64,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
}

/// Context for initializing a vault
#[derive(Accounts)]
pub struct InitializeVaultContext<'info> {
    /// The vault account to initialize
    #[account(
        init,
        payer = authority,
        space = 8 + // discriminator
               32 + // mint
               32 + // authority
               32 + // token_account
               8 +  // total_deposits
               1 +  // collateral_type
               32 + // oracle
               1 +  // oracle_type
               1 +  // bump
               1,   // authority_bump
        seeds = [crate::constants::seeds::VAULT, mint.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    
    /// The authority account
    #[account(mut)]
    pub authority: Signer<'info>,
    
    /// The mint account
    pub mint: Account<'info, anchor_spl::token::Mint>,
    
    /// The vault token account
    #[account(
        init,
        payer = authority,
        token::mint = mint,
        token::authority = vault_authority,
        seeds = [b"vault_token_account", mint.key().as_ref()],
        bump
    )]
    pub vault_token_account: Account<'info, TokenAccount>,
    
    /// The vault authority
    /// CHECK: This is a PDA used as the authority for the vault
    #[account(
        seeds = [crate::constants::seeds::VAULT_AUTHORITY, mint.key().as_ref()],
        bump
    )]
    pub vault_authority: AccountInfo<'info>,
    
    /// The oracle account for non-stablecoin collateral
    /// CHECK: Oracle validation is done in the instruction handler
    pub oracle: AccountInfo<'info>,
    
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
    
    /// Token program
    pub token_program: Program<'info, Token>,
    
    /// System program
    pub system_program: Program<'info, System>,
    
    /// Rent sysvar
    pub rent: Sysvar<'info, Rent>,
}

/// Context for initializing a fee vault
#[derive(Accounts)]
pub struct InitializeFeeVaultContext<'info> {
    /// The fee vault account to initialize
    #[account(
        init,
        payer = authority,
        space = 8 + // discriminator
               32 + // mint
               32 + // authority
               32 + // token_account
               8 +  // total_fees
               1,   // bump
        seeds = [crate::constants::seeds::FEE_VAULT, mint.key().as_ref()],
        bump
    )]
    pub fee_vault: Account<'info, FeeVault>,
    
    /// The authority account
    #[account(mut)]
    pub authority: Signer<'info>,
    
    /// The mint account
    pub mint: Account<'info, anchor_spl::token::Mint>,
    
    /// The fee vault token account
    #[account(
        init,
        payer = authority,
        token::mint = mint,
        token::authority = authority,
        seeds = [b"fee_token_account", mint.key().as_ref()],
        bump
    )]
    pub fee_token_account: Account<'info, TokenAccount>,
    
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
    
    /// Token program
    pub token_program: Program<'info, Token>,
    
    /// System program
    pub system_program: Program<'info, System>,
    
    /// Rent sysvar
    pub rent: Sysvar<'info, Rent>,
} 