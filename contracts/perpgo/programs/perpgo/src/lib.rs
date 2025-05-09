use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod perpgo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let global_state = &mut ctx.accounts.global_state;
        global_state.funding_rate = 0; // Start with 0 funding rate
        global_state.total_volume = 0;
        global_state.admin = ctx.accounts.admin.key();
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
        
        // In a real implementation, we would:
        // 1. Transfer collateral from user to program
        // 2. Get price from Pyth oracle
        // 3. Calculate position size, entry price, liquidation price
        // 4. Store position data
        
        let user = &mut ctx.accounts.user_account;
        let position = &mut ctx.accounts.position_account;
        
        // For now, mock implementation
        position.owner = ctx.accounts.user.key();
        position.direction = direction;
        position.collateral = collateral_amount;
        position.leverage = leverage as u64;
        position.entry_price = 100_000_000; // Mock price in lamports
        position.liquidation_price = if direction {
            90_000_000 // For long positions
        } else {
            110_000_000 // For short positions
        };
        position.is_liquidated = false;
        
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
        
        // In a real implementation, we would:
        // 1. Get current price from Pyth oracle
        // 2. Calculate PnL
        // 3. Transfer funds back to user
        // 4. Update user stats
        
        // For now, mock implementation
        let exit_price = 105_000_000; // Mock exit price
        let pnl = if position.direction {
            // Long position
            ((exit_price - position.entry_price) as i64 * position.collateral as i64 * position.leverage as i64) / position.entry_price as i64
        } else {
            // Short position
            ((position.entry_price - exit_price) as i64 * position.collateral as i64 * position.leverage as i64) / position.entry_price as i64
        };
        
        // Update user account
        user.open_positions -= 1;
        user.total_collateral -= position.collateral;
        user.realized_pnl += pnl;
        
        // Mark position as closed (in a real implementation, we might delete it or archive it)
        position.is_liquidated = true;
        
        Ok(())
    }

    pub fn liquidate_position(ctx: Context<LiquidatePosition>) -> Result<()> {
        let position = &mut ctx.accounts.position_account;
        let user = &mut ctx.accounts.user_account;
        
        // In a real implementation, we would:
        // 1. Check if position should be liquidated based on current price
        // 2. Process liquidation, potentially with a fee to liquidator
        
        // For now, mock implementation
        position.is_liquidated = true;
        user.open_positions -= 1;
        user.total_collateral -= position.collateral;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = admin, space = 8 + 8 + 8 + 32)]
    pub global_state: Account<'info, GlobalState>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct OpenPosition<'info> {
    #[account(init, payer = user, space = 8 + 32 + 1 + 8 + 8 + 8 + 8 + 1)]
    pub position_account: Account<'info, PositionAccount>,
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClosePosition<'info> {
    #[account(mut, has_one = owner @ ErrorCode::Unauthorized)]
    pub position_account: Account<'info, PositionAccount>,
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct LiquidatePosition<'info> {
    #[account(mut)]
    pub position_account: Account<'info, PositionAccount>,
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
    pub liquidator: Signer<'info>,
}

#[account]
pub struct GlobalState {
    pub funding_rate: i64,
    pub total_volume: u64,
    pub admin: Pubkey,
}

#[account]
pub struct UserAccount {
    pub owner: Pubkey,
    pub open_positions: u64,
    pub total_collateral: u64,
    pub realized_pnl: i64,
}

#[account]
pub struct PositionAccount {
    pub owner: Pubkey,
    pub direction: bool, // true for long, false for short
    pub collateral: u64,
    pub leverage: u64,
    pub entry_price: u64,
    pub liquidation_price: u64,
    pub is_liquidated: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid leverage. Must be between 1 and 10")]
    InvalidLeverage,
    #[msg("Position is already liquidated")]
    PositionLiquidated,
    #[msg("Unauthorized")]
    Unauthorized,
}
