use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use std::ops::{Div, Mul};
use pyth_sdk_solana::{load_price_feed_from_account_info, Price, PriceFeed};

declare_id!("Eu1XQLF5MewmRJ2VeBms2NtU2vkuamX3KtQ9mEhntucP");

#[program]
pub mod perpgo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let global_state = &mut ctx.accounts.global_state;
        global_state.funding_rate = 0; // Start with 0 funding rate
        global_state.total_volume = 0;
        global_state.admin = ctx.accounts.admin.key();
        global_state.oracle = ctx.accounts.oracle.key();
        global_state.bump = *ctx.bumps.get("global_state").unwrap();
        Ok(())
    }

    pub fn create_user_account(ctx: Context<CreateUserAccount>) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        user_account.owner = ctx.accounts.user.key();
        user_account.open_positions = 0;
        user_account.total_collateral = 0;
        user_account.realized_pnl = 0;
        user_account.bump = *ctx.bumps.get("user_account").unwrap();
        
        Ok(())
    }

    pub fn open_position(
        ctx: Context<OpenPosition>,
        direction: bool, // true for long, false for short
        collateral_amount: u64,
        leverage: u8,
    ) -> Result<()> {
        // Ensure leverage is within bounds
        require!(leverage >= 1 && leverage <= 10, ErrorCode::InvalidLeverage);
        
        // Get price from Pyth oracle
        let price_feed: PriceFeed = load_price_feed_from_account_info(&ctx.accounts.oracle_account).map_err(|_| ErrorCode::OracleError)?;
        let current_timestamp = Clock::get()?.unix_timestamp;
        
        // Get current price with 60-second staleness threshold
        let price_data = price_feed.get_price_no_older_than(current_timestamp, 60).ok_or(ErrorCode::OracleError)?;
        
        // Convert price to the format we need (u64 with 6 decimals)
        let price_as_u64 = convert_pyth_price(price_data)?;
        
        // Transfer collateral from user to program
        anchor_lang::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.user.to_account_info(),
                    to: ctx.accounts.position_account.to_account_info(),
                },
            ),
            collateral_amount,
        )?;
        
        let user = &mut ctx.accounts.user_account;
        let position = &mut ctx.accounts.position_account;
        
        // Set up position data
        position.owner = ctx.accounts.user.key();
        position.direction = direction;
        position.collateral = collateral_amount;
        position.leverage = leverage as u64;
        position.entry_price = price_as_u64;
        position.current_price = price_as_u64;
        
        // Calculate liquidation price
        // For longs: liquidation_price = entry_price * (1 - (1 / leverage) * 0.9)
        // For shorts: liquidation_price = entry_price * (1 + (1 / leverage) * 0.9)
        let leverage_f = leverage as f64;
        let entry_price_f = price_as_u64 as f64;
        let liquidation_price_f = if direction {
            // Long position
            entry_price_f * (1.0 - (1.0 / leverage_f) * 0.9)
        } else {
            // Short position
            entry_price_f * (1.0 + (1.0 / leverage_f) * 0.9)
        };
        
        position.liquidation_price = liquidation_price_f as u64;
        position.is_liquidated = false;
        position.timestamp = Clock::get()?.unix_timestamp as u64;
        position.last_funding_time = position.timestamp;
        position.pnl = 0;
        
        // Update user account
        user.open_positions += 1;
        user.total_collateral += collateral_amount;
        
        Ok(())
    }

    pub fn close_position(ctx: Context<ClosePosition>) -> Result<()> {
        let position = &mut ctx.accounts.position_account;
        let user = &mut ctx.accounts.user_account;
        
        // Ensure position is not already liquidated
        require!(!position.is_liquidated, ErrorCode::PositionLiquidated);
        
        // Get current price from Pyth oracle
        let price_feed: PriceFeed = load_price_feed_from_account_info(&ctx.accounts.oracle_account).map_err(|_| ErrorCode::OracleError)?;
        let current_timestamp = Clock::get()?.unix_timestamp;
        
        // Get current price with 60-second staleness threshold
        let price_data = price_feed.get_price_no_older_than(current_timestamp, 60).ok_or(ErrorCode::OracleError)?;
        
        // Convert price to the format we need (u64 with 6 decimals)
        let exit_price = convert_pyth_price(price_data)?;
        
        // Calculate PnL
        let pnl = calculate_pnl(
            position.direction,
            position.entry_price,
            exit_price,
            position.collateral,
            position.leverage as u8,
        );
        
        // Update user account
        user.open_positions -= 1;
        user.total_collateral -= position.collateral;
        user.realized_pnl += pnl;
        
        // Transfer funds back to user (collateral + PnL)
        let return_amount = if pnl >= 0 {
            position.collateral.saturating_add(pnl as u64)
        } else {
            position.collateral.saturating_sub((-pnl) as u64)
        };
        
        // Transfer lamports back to the user
        **position.to_account_info().try_borrow_mut_lamports()? = position
            .to_account_info()
            .lamports()
            .saturating_sub(return_amount);
            
        **ctx.accounts.owner.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .owner
            .to_account_info()
            .lamports()
            .saturating_add(return_amount);
        
        // Mark position as closed
        position.is_liquidated = true;
        
        Ok(())
    }

    pub fn liquidate_position(ctx: Context<LiquidatePosition>) -> Result<()> {
        let position = &mut ctx.accounts.position_account;
        let user = &mut ctx.accounts.user_account;
        
        // Get current price from Pyth oracle
        let price_feed: PriceFeed = load_price_feed_from_account_info(&ctx.accounts.oracle_account).map_err(|_| ErrorCode::OracleError)?;
        let current_timestamp = Clock::get()?.unix_timestamp;
        
        // Get current price with 60-second staleness threshold
        let price_data = price_feed.get_price_no_older_than(current_timestamp, 60).ok_or(ErrorCode::OracleError)?;
        
        // Convert price to the format we need (u64 with 6 decimals)
        let current_price = convert_pyth_price(price_data)?;
        
        // Check if position should be liquidated
        let should_liquidate = if position.direction {
            // Long position: liquidate if current price <= liquidation price
            current_price <= position.liquidation_price
        } else {
            // Short position: liquidate if current price >= liquidation price
            current_price >= position.liquidation_price
        };
        
        require!(should_liquidate, ErrorCode::CannotLiquidate);
        
        // Update user account
        user.open_positions -= 1;
        
        // Calculate remaining value (if any)
        let remaining_value = position.collateral.saturating_mul(10).saturating_div(100); // 10% of collateral
        
        // Give liquidator a fee
        let liquidator_fee = remaining_value.saturating_div(2); // 50% of remaining value
        
        // Transfer fee to liquidator
        **position.to_account_info().try_borrow_mut_lamports()? = position
            .to_account_info()
            .lamports()
            .saturating_sub(liquidator_fee);
            
        **ctx.accounts.liquidator.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .liquidator
            .to_account_info()
            .lamports()
            .saturating_add(liquidator_fee);
        
        // Return remaining value to user
        let user_return = remaining_value.saturating_sub(liquidator_fee);
        
        **position.to_account_info().try_borrow_mut_lamports()? = position
            .to_account_info()
            .lamports()
            .saturating_sub(user_return);
            
        **ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .user
            .to_account_info()
            .lamports()
            .saturating_add(user_return);
        
        // Mark position as liquidated
        position.is_liquidated = true;
        
        Ok(())
    }

    pub fn update_oracle(ctx: Context<UpdateOracle>, new_oracle: Pubkey) -> Result<()> {
        // Only admin can update the oracle
        require!(
            ctx.accounts.admin.key() == ctx.accounts.global_state.admin,
            ErrorCode::Unauthorized
        );
        
        let global_state = &mut ctx.accounts.global_state;
        global_state.oracle = new_oracle;
        
        Ok(())
    }
}

fn convert_pyth_price(price_data: Price) -> Result<u64> {
    // Handle exponent
    let price_value = price_data.price;
    let exponent = price_data.expo;
    
    // Convert i64 price to u64 with fixed 6 decimal places (our internal format)
    // We're assuming Pyth prices are returned in standard decimals (e.g., 1 USD = 1.0, not 1000000)
    // And we want to convert to our format (1 USD = 1000000)
    
    let target_decimals = 6;
    let current_decimals = -exponent as i32; // Pyth uses negative exponents
    
    if price_value < 0 {
        return Err(ErrorCode::InvalidPrice.into());
    }
    
    let price_u64 = price_value as u64;
    
    if current_decimals < target_decimals {
        // Need to multiply
        let factor = 10u64.pow((target_decimals - current_decimals) as u32);
        Ok(price_u64.saturating_mul(factor))
    } else if current_decimals > target_decimals {
        // Need to divide
        let factor = 10u64.pow((current_decimals - target_decimals) as u32);
        Ok(price_u64.saturating_div(factor))
    } else {
        // Same decimal places, no adjustment needed
        Ok(price_u64)
    }
}

fn calculate_pnl(
    direction: bool,
    entry_price: u64,
    exit_price: u64,
    collateral: u64,
    leverage: u8,
) -> i64 {
    let leverage_u64 = leverage as u64;
    let position_size = collateral.saturating_mul(leverage_u64);
    
    if direction {
        // Long position: (exit_price - entry_price) / entry_price * position_size
        if exit_price > entry_price {
            // Profit
            let price_diff = exit_price.saturating_sub(entry_price);
            let profit_ratio = (price_diff as f64) / (entry_price as f64);
            (profit_ratio * (position_size as f64)) as i64
        } else {
            // Loss
            let price_diff = entry_price.saturating_sub(exit_price);
            let loss_ratio = (price_diff as f64) / (entry_price as f64);
            -((loss_ratio * (position_size as f64)) as i64)
        }
    } else {
        // Short position: (entry_price - exit_price) / entry_price * position_size
        if entry_price > exit_price {
            // Profit
            let price_diff = entry_price.saturating_sub(exit_price);
            let profit_ratio = (price_diff as f64) / (entry_price as f64);
            (profit_ratio * (position_size as f64)) as i64
        } else {
            // Loss
            let price_diff = exit_price.saturating_sub(entry_price);
            let loss_ratio = (price_diff as f64) / (entry_price as f64);
            -((loss_ratio * (position_size as f64)) as i64)
        }
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + 8 + 8 + 32 + 32 + 1, // discriminator + funding_rate + total_volume + admin + oracle + bump
        seeds = [b"global_state"],
        bump
    )]
    pub global_state: Account<'info, GlobalState>,
    
    #[account(mut)]
    pub admin: Signer<'info>,
    
    /// CHECK: This is the oracle public key
    pub oracle: UncheckedAccount<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateUserAccount<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 + 8 + 8 + 1, // discriminator + owner + open_positions + total_collateral + realized_pnl + bump
        seeds = [b"user", user.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct OpenPosition<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 1 + 8 + 8 + 8 + 8 + 1 + 8 + 8 + 8 + 1, // discriminator + owner + direction + collateral + leverage + entry_price + liquidation_price + is_liquidated + timestamp + last_funding_time + pnl + current_price
    )]
    pub position_account: Account<'info, PositionAccount>,
    
    #[account(
        mut,
        seeds = [b"user", user.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// CHECK: Oracle account for price feed
    pub oracle_account: UncheckedAccount<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClosePosition<'info> {
    #[account(
        mut,
        has_one = owner @ ErrorCode::Unauthorized,
        constraint = !position_account.is_liquidated @ ErrorCode::PositionLiquidated
    )]
    pub position_account: Account<'info, PositionAccount>,
    
    #[account(
        mut,
        seeds = [b"user", owner.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    /// CHECK: Oracle account for price feed
    pub oracle_account: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct LiquidatePosition<'info> {
    #[account(
        mut,
        constraint = !position_account.is_liquidated @ ErrorCode::PositionLiquidated
    )]
    pub position_account: Account<'info, PositionAccount>,
    
    #[account(
        mut,
        seeds = [b"user", user.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    /// CHECK: Owner of the position
    #[account(mut)]
    pub user: AccountInfo<'info>,
    
    /// CHECK: Oracle account for price feed
    pub oracle_account: UncheckedAccount<'info>,
    
    #[account(mut)]
    pub liquidator: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateOracle<'info> {
    #[account(
        mut,
        seeds = [b"global_state"],
        bump = global_state.bump
    )]
    pub global_state: Account<'info, GlobalState>,
    
    #[account(mut)]
    pub admin: Signer<'info>,
}

#[account]
pub struct GlobalState {
    pub funding_rate: i64,
    pub total_volume: u64,
    pub admin: Pubkey,
    pub oracle: Pubkey,
    pub bump: u8,
}

#[account]
pub struct UserAccount {
    pub owner: Pubkey,
    pub open_positions: u64,
    pub total_collateral: u64,
    pub realized_pnl: i64,
    pub bump: u8,
}

#[account]
pub struct PositionAccount {
    pub owner: Pubkey,
    pub direction: bool, // true for long, false for short
    pub collateral: u64,
    pub leverage: u64,
    pub entry_price: u64,
    pub current_price: u64,
    pub liquidation_price: u64,
    pub is_liquidated: bool,
    pub timestamp: u64,
    pub last_funding_time: u64,
    pub pnl: i64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid leverage. Must be between 1 and 10")]
    InvalidLeverage,
    #[msg("Position is already liquidated")]
    PositionLiquidated,
    #[msg("Position cannot be liquidated at current price")]
    CannotLiquidate,
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Error getting price from oracle")]
    OracleError,
    #[msg("Invalid price from oracle")]
    InvalidPrice,
}
