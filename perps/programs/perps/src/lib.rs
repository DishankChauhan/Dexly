use anchor_lang::prelude::*;
use switchboard_v2::{AggregatorAccountData, SwitchboardDecimal};
use std::convert::TryInto;

// Module declarations
pub mod constants;
pub mod error;
pub mod state;
pub mod utils;
pub mod instructions;

// Re-export program sub-modules and errors
pub use crate::instructions::*;
pub use crate::state::*;
pub use crate::error::*;

// Expose Anchor-generated client-account modules at the crate root
#[doc(hidden)]
pub mod __client_accounts_deposit_collateral_context {
    pub use crate::instructions::deposit_collateral::__client_accounts_deposit_collateral_context::*;
}

#[doc(hidden)]
pub mod __client_accounts_withdraw_collateral_context {
    pub use crate::instructions::withdraw_collateral::__client_accounts_withdraw_collateral_context::*;
}

#[doc(hidden)]
pub mod __client_accounts_liquidate_context {
    pub use crate::instructions::liquidate::__client_accounts_liquidate_context::*;
}

#[doc(hidden)]
pub mod __client_accounts_update_funding_context {
    pub use crate::instructions::update_funding::__client_accounts_update_funding_context::*;
}

#[doc(hidden)]
pub mod __client_accounts_place_order_context {
    pub use crate::instructions::order::__client_accounts_place_order_context::*;
}

#[doc(hidden)]
pub mod __client_accounts_cancel_order_context {
    pub use crate::instructions::order::__client_accounts_cancel_order_context::*;
}

#[doc(hidden)]
pub mod __client_accounts_execute_order_context {
    pub use crate::instructions::order::__client_accounts_execute_order_context::*;
}

// Anchor program ID
declare_id!("5YTxWRCWmTsy8JWCncwwKRKQguaigqNXxsDZLAqEJ7LB");

// Context structs
#[derive(Accounts)]
pub struct GetOraclePrice<'info> {
    /// CHECK: This is the oracle account
    pub oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct InitializeGlobalState<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + 32 + 2 + 8 + 8 + 1 + 1,
        seeds = [constants::seeds::GLOBAL_STATE],
        bump
    )]
    pub global_state: Account<'info, state::global::GlobalState>,
    #[account(mut)] pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateUserContext<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 + 1 + 8 + (32 * constants::MAX_POSITIONS_PER_USER as usize) + 1,
        seeds = [constants::seeds::USER, user.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, state::user::User>,
    #[account(mut)] pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(asset_symbol: [u8;8], market_id: u64)]
pub struct InitializeMarketContext<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 32 + 1 + 8 + 8 + 8 + 8 + 8 + 8 + 1 + 2 + 2 + 1 + 32 + 8 + 1,
        seeds = [constants::seeds::MARKET, market_id.to_le_bytes().as_ref()],
        bump
    )]
    pub market: Account<'info, state::market::Market>,
    /// CHECK: validated in handler
    pub oracle: AccountInfo<'info>,
    #[account(mut)] pub authority: Signer<'info>,
    #[account(seeds=[constants::seeds::GLOBAL_STATE], bump, has_one=admin @ error::PerpsError::Unauthorized)]
    pub global_state: Account<'info, state::global::GlobalState>,
    #[account(constraint = admin.key() == authority.key() @ error::PerpsError::Unauthorized)]
    pub admin: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeVaultContext<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 32 + 8 + 1 + 32 + 1 + 1 + 1,
        seeds = [constants::seeds::VAULT, mint.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, state::vault::Vault>,
    #[account(mut)] pub authority: Signer<'info>,
    pub mint: Account<'info, anchor_spl::token::Mint>,
    #[account(
        init,
        payer = authority,
        token::mint = mint,
        token::authority = vault_authority,
        seeds = [b"vault_token_account", mint.key().as_ref()],
        bump
    )]
    pub vault_token_account: Account<'info, anchor_spl::token::TokenAccount>,
    #[account(seeds=[constants::seeds::VAULT_AUTHORITY, mint.key().as_ref()], bump)]
    /// CHECK: PDA authority
    pub vault_authority: AccountInfo<'info>,
    /// CHECK: validated in handler
    pub oracle: AccountInfo<'info>,
    #[account(seeds=[constants::seeds::GLOBAL_STATE], bump, has_one=admin @ error::PerpsError::Unauthorized)]
    pub global_state: Account<'info, state::global::GlobalState>,
    #[account(constraint = admin.key() == authority.key() @ error::PerpsError::Unauthorized)]
    pub admin: AccountInfo<'info>,
    pub token_program: Program<'info, anchor_spl::token::Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

// Context re-exports
pub use state::position::{OpenPositionContext, ClosePositionContext};
pub use instructions::liquidate::LiquidateContext;
pub use instructions::update_funding::UpdateFundingContext;
pub use instructions::deposit_collateral::DepositCollateralContext;
pub use instructions::withdraw_collateral::WithdrawCollateralContext;
pub use instructions::order::{PlaceOrderContext, CancelOrderContext, ExecuteOrderContext};

// Program entrypoint
#[program]
pub mod perps {
    use super::*;
    use crate::instructions::order_handlers;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Initialized perps program");
        Ok(())
    }

    pub fn get_switchboard_price(ctx: Context<GetOraclePrice>) -> Result<()> {
        let data = ctx.accounts.oracle.try_borrow_data().map_err(|_| error!(PerpsError::OracleError))?;
        let feed = AggregatorAccountData::new_from_bytes(&data).map_err(|_| error!(PerpsError::OracleError))?;
        let sb_decimal: SwitchboardDecimal = feed.get_result().map_err(|_| error!(PerpsError::OracleError))?;
        let price_f64: f64 = sb_decimal.try_into().map_err(|_| error!(PerpsError::OracleError))?;
        let price_u64 = (price_f64 * 1_000_000.0) as u64;
        msg!("Switchboard price: {} (scaled {})", price_f64, price_u64);
        Ok(())
    }

    pub fn initialize_global_state(ctx: Context<InitializeGlobalState>) -> Result<()> {
        let gs = &mut ctx.accounts.global_state;
        gs.admin = ctx.accounts.admin.key();
        gs.protocol_fee_bps = constants::PROTOCOL_FEE_BPS;
        gs.total_volume = 0;
        gs.total_fees = 0;
        gs.emergency_paused = false;
        gs.bump = *ctx.bumps.get("global_state").unwrap();
        msg!("Initialized global state");
        Ok(())
    }

    pub fn create_user(ctx: Context<CreateUserContext>) -> Result<()> {
        let ua = &mut ctx.accounts.user_account;
        ua.user = ctx.accounts.user.key();
        ua.collateral_balance = 0;
        ua.open_positions = 0;
        ua.realized_pnl = 0;
        ua.positions = [Pubkey::default(); constants::MAX_POSITIONS_PER_USER as usize];
        ua.bump = *ctx.bumps.get("user_account").unwrap();
        msg!("Created user account");
        Ok(())
    }

    pub fn initialize_market(
        ctx: Context<InitializeMarketContext>,
        asset_symbol: [u8;8],
        _market_id: u64,
        oracle_type: u8,
        max_leverage: u8,
        min_margin_ratio_bps: u16,
        fee_bps: u16,
        min_position_size: u64,
        max_price_impact_bps: u16,
        k_factor: u64,
    ) -> Result<()> {
        require!(max_leverage >= constants::MIN_LEVERAGE && max_leverage <= constants::MAX_LEVERAGE, error::PerpsError::InvalidLeverage);
        require!(min_margin_ratio_bps >= constants::MAINTENANCE_MARGIN_RATIO_BPS, error::PerpsError::InvalidMarginRatio);
        require!(fee_bps <= constants::PROTOCOL_FEE_BPS * 10, error::PerpsError::InvalidFee);
        require!(max_price_impact_bps <= 1000, error::PerpsError::InvalidPriceImpact); // Max 10% price impact
        
        // Get oracle price to set initial reserves
        let oracle_type_enum = crate::utils::oracle::OracleType::from(oracle_type);
        let initial_price = crate::utils::oracle::get_price(&ctx.accounts.oracle, oracle_type_enum)?;
        
        // Calculate initial reserves based on k_factor and initial price
        // For balanced pool, use sqrt(k) * sqrt(price) for base and sqrt(k) / sqrt(price) for quote
        let k = if k_factor == 0 { 10_000_000_000_000_000_000 } else { k_factor };
        let base_asset_reserve = 1_000_000_000_000; // 1 trillion units (adjust based on asset decimals)
        let quote_asset_reserve = (base_asset_reserve as u128 * initial_price as u128 / 1_000_000) as u64;
        
        let mkt = &mut ctx.accounts.market;
        mkt.asset_symbol = asset_symbol;
        mkt.oracle = ctx.accounts.oracle.key();
        mkt.oracle_type = oracle_type;
        mkt.base_asset_reserve = base_asset_reserve;
        mkt.quote_asset_reserve = quote_asset_reserve;
        mkt.funding_rate = 0;
        mkt.last_funding_ts = Clock::get()?.unix_timestamp;
        mkt.total_long_size = 0;
        mkt.total_short_size = 0;
        mkt.max_leverage = max_leverage;
        mkt.min_margin_ratio_bps = min_margin_ratio_bps;
        mkt.fee_bps = fee_bps;
        mkt.is_active = true;
        mkt.authority = ctx.accounts.authority.key();
        mkt.min_position_size = min_position_size;
        mkt.max_price_impact_bps = max_price_impact_bps;
        mkt.k_factor = k;
        mkt.min_base_asset_reserve = base_asset_reserve / 100; // 1% of initial
        mkt.min_quote_asset_reserve = quote_asset_reserve / 100; // 1% of initial
        mkt.max_oracle_deviation_bps = 1000; // Default 10% maximum deviation
        mkt.bump = *ctx.bumps.get("market").unwrap();
        msg!("Initialized market for asset: {:?} with virtual AMM", asset_symbol);
        Ok(())
    }

    pub fn initialize_vault(
        ctx: Context<InitializeVaultContext>,
        collateral_type: u8,
        oracle_type: u8,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let _ = state::vault::CollateralType::from(collateral_type);
        vault.mint = ctx.accounts.mint.key();
        vault.authority = ctx.accounts.vault_authority.key();
        vault.token_account = ctx.accounts.vault_token_account.key();
        vault.total_deposits = 0;
        vault.collateral_type = collateral_type;
        vault.oracle = ctx.accounts.oracle.key();
        vault.oracle_type = oracle_type;
        vault.bump = *ctx.bumps.get("vault").unwrap();
        vault.authority_bump = *ctx.bumps.get("vault_authority").unwrap();
        msg!("Initialized vault for mint: {}", vault.mint);
        Ok(())
    }

    pub fn deposit_collateral(ctx: Context<DepositCollateralContext>, amount: u64) -> Result<()> {
        instructions::deposit_collateral_handler(ctx, amount)
    }

    pub fn withdraw_collateral(ctx: Context<WithdrawCollateralContext>, amount: u64) -> Result<()> {
        instructions::withdraw_collateral_handler(ctx, amount)
    }

    pub fn open_position(
        ctx: Context<OpenPositionContext>,
        is_long: bool,
        collateral_amount: u64,
        leverage: u8,
        market_id: u64,
        position_id: u64,
        max_slippage_bps: u16,
    ) -> Result<()> {
        instructions::open_position_handler(ctx, is_long, collateral_amount, leverage, market_id, position_id, max_slippage_bps)
    }

    pub fn close_position(ctx: Context<ClosePositionContext>, market_id: u64, max_slippage_bps: u16) -> Result<()> {
        instructions::close_position_handler(ctx, market_id, max_slippage_bps)
    }

    pub fn update_funding(ctx: Context<UpdateFundingContext>, market_id: u64) -> Result<()> {
        instructions::update_funding_handler(ctx, market_id)
    }

    pub fn liquidate_position(ctx: Context<LiquidateContext>, market_id: u64) -> Result<()> {
        instructions::liquidate_handler(ctx, market_id)
    }

    pub fn place_order(
        ctx: Context<PlaceOrderContext>,
        order_id: u64,
        market_id: u64,
        order_type: u8,
        is_long: bool,
        size: u64,
        price: u64,
        collateral: u64,
        leverage: u8,
        max_slippage_bps: u16,
        position_id: u64,
    ) -> Result<()> {
        order_handlers::place_order(ctx, order_id, market_id, order_type, is_long, size, price, collateral, leverage, max_slippage_bps, position_id)
    }

    pub fn cancel_order(ctx: Context<CancelOrderContext>) -> Result<()> {
        order_handlers::cancel_order(ctx)
    }

    pub fn execute_order(ctx: Context<ExecuteOrderContext>, _market_id: u64) -> Result<()> {
        // Execute the order using the direct function that doesn't have lifetime issues
        crate::instructions::order::execute_order_direct(
            &mut ctx.accounts.user_account,
            &mut ctx.accounts.market,
            &ctx.accounts.oracle,
            &mut ctx.accounts.order,
            false
        )
    }
}
