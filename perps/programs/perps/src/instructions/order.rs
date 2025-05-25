use anchor_lang::prelude::*;
use crate::state::{market::Market, user::User};
use crate::utils::oracle::{OracleType, get_price};
use crate::utils::amm::{update_market_reserves_for_open, calculate_entry_price_with_impact_long, calculate_entry_price_with_impact_short};
use crate::error::PerpsError;
use crate::constants;

/// Order types supported by the protocol
#[derive(Clone, Copy, PartialEq, AnchorSerialize, AnchorDeserialize)]
pub enum OrderType {
    /// Market order - executed immediately at the current price
    Market = 0,
    /// Limit order - executed only at the specified price or better
    Limit = 1,
    /// Stop loss order - executed when price reaches or goes below target (for longs)
    StopLoss = 2,
    /// Take profit order - executed when price reaches or exceeds target (for longs)
    TakeProfit = 3,
}

impl From<u8> for OrderType {
    fn from(value: u8) -> Self {
        match value {
            0 => OrderType::Market,
            1 => OrderType::Limit,
            2 => OrderType::StopLoss,
            3 => OrderType::TakeProfit,
            _ => OrderType::Market,
        }
    }
}

/// Order account to place limit, stop loss, and take profit orders
#[account]
#[derive(Default)]
pub struct Order {
    /// User who placed the order
    pub user: Pubkey,
    
    /// Market this order is for
    pub market: Pubkey,
    
    /// Order type
    pub order_type: u8,
    
    /// Direction of the order (true = long, false = short)
    pub is_long: bool,
    
    /// Size of the order in base asset units
    pub size: u64,
    
    /// Target price for limit/stop loss/take profit orders
    pub price: u64,
    
    /// Collateral amount for the position
    pub collateral: u64,
    
    /// Leverage used for this order
    pub leverage: u8,
    
    /// Whether the order has been filled or cancelled
    pub is_active: bool,
    
    /// Max slippage in basis points (for market orders)
    pub max_slippage_bps: u16,
    
    /// Timestamp when order was placed
    pub created_at: i64,
    
    /// Position ID to create when filled
    pub position_id: u64,
    
    /// Bump seed for PDA derivation
    pub bump: u8,
    
    /// Execution price of the order
    pub execution_price: u64,
    
    /// Fee charged for the order
    pub fee: u64,
}

/// Create and place an order
pub fn place_order(
    ctx: Context<PlaceOrderContext>,
    _order_id: u64,
    _market_id: u64,
    order_type: u8,
    is_long: bool,
    size: u64,
    price: u64,
    collateral: u64,
    leverage: u8,
    max_slippage_bps: u16,
    position_id: u64,
) -> Result<()> {
    // Validate parameters
    require!(
        leverage >= constants::MIN_LEVERAGE && leverage <= constants::MAX_LEVERAGE,
        PerpsError::InvalidLeverage
    );
    
    require!(size > 0, PerpsError::PositionTooSmall);
    require!(collateral > 0, PerpsError::InsufficientFunds);
    require!(max_slippage_bps <= constants::MAX_SLIPPAGE_BPS, PerpsError::InvalidSlippage);
    
    // Check if user has enough collateral
    let user_account = &mut ctx.accounts.user_account;
    require!(
        user_account.collateral_balance >= collateral,
        PerpsError::InsufficientFunds
    );
    
    // Validate order type
    let order_type_enum = OrderType::from(order_type);
    
    // For limit orders, validate price
    if order_type_enum == OrderType::Limit {
        // Fetch current price from oracle
        let market = &ctx.accounts.market;
        let oracle_type = OracleType::from(market.oracle_type);
        let current_price = get_price(&ctx.accounts.oracle, oracle_type)?;
        
        // For limit orders: buy limit should be below market, sell limit should be above market
        if is_long {
            require!(price <= current_price, PerpsError::InvalidPriceInput);
        } else {
            require!(price >= current_price, PerpsError::InvalidPriceInput);
        }
    }
    
    // Create order account
    let order = &mut ctx.accounts.order;
    order.user = ctx.accounts.user.key();
    order.market = ctx.accounts.market.key();
    order.order_type = order_type;
    order.is_long = is_long;
    order.size = size;
    order.price = price;
    order.collateral = collateral;
    order.leverage = leverage;
    order.is_active = true;
    order.max_slippage_bps = max_slippage_bps;
    order.created_at = Clock::get()?.unix_timestamp;
    order.position_id = position_id;
    order.bump = *ctx.bumps.get("order").unwrap();
    
    // Update user account (reduce available collateral)
    user_account.collateral_balance = user_account.collateral_balance
        .checked_sub(collateral)
        .ok_or(error!(PerpsError::Overflow))?;
    
    // For market orders, execute immediately
    if order_type_enum == OrderType::Market {
        // Execute the order directly
        execute_order_direct(
            &mut ctx.accounts.user_account,
            &mut ctx.accounts.market,
            &ctx.accounts.oracle,
            order,
            true
        )?;
    }
    
    msg!(
        "Order placed: type={}, direction={}, size={}, price={}, collateral={}",
        order_type,
        if is_long { "long" } else { "short" },
        size,
        price,
        collateral
    );
    
    Ok(())
}

/// Execute an existing order
pub fn execute_order(accounts: &mut PlaceOrderAccounts, order: &mut Order, is_market_execution: bool) -> Result<()> {
    // Get accounts
    let _user_account = &mut accounts.user_account;
    let market = &mut accounts.market;
    
    // Only proceed if order is active
    if !order.is_active {
        return Err(error!(PerpsError::Unauthorized));
    }
    
    // Get current price from oracle
    let oracle_type = OracleType::from(market.oracle_type);
    let current_price = get_price(&accounts.oracle, oracle_type)?;
    
    // Check if order should be executed based on type
    let should_execute = match OrderType::from(order.order_type) {
        OrderType::Market => true, // Always execute market orders
        OrderType::Limit => {
            // Buy limit: execute if price <= limit price
            // Sell limit: execute if price >= limit price
            if order.is_long {
                current_price <= order.price
            } else {
                current_price >= order.price
            }
        },
        OrderType::StopLoss => {
            // Buy stop: execute if price >= stop price
            // Sell stop: execute if price <= stop price
            if order.is_long {
                current_price <= order.price
            } else {
                current_price >= order.price
            }
        },
        OrderType::TakeProfit => {
            // Buy take profit: execute if price <= take profit price
            // Sell take profit: execute if price >= take profit price
            if order.is_long {
                current_price >= order.price
            } else {
                current_price <= order.price
            }
        }
    };
    
    // Only proceed if order should be executed
    if !should_execute && !is_market_execution {
        return Ok(());
    }
    
    // Check for slippage if it's a market order
    if OrderType::from(order.order_type) == OrderType::Market {
        let max_slippage_bps = Box::new(order.max_slippage_bps as u128);
        let order_price = Box::new(current_price as u128);
        
        // Calculate max allowed price deviation
        let max_deviation = Box::new(
            (*order_price)
                .checked_mul(*max_slippage_bps)
                .ok_or(error!(PerpsError::Overflow))?
                .checked_div(10_000)
                .ok_or(error!(PerpsError::Overflow))?
        );
        
        // Check if current price is within slippage tolerance
        let current_price_u128 = Box::new(current_price as u128);
        
        let price_diff = if *current_price_u128 > *order_price {
            *current_price_u128 - *order_price
        } else {
            *order_price - *current_price_u128
        };
        
        require!(
            price_diff <= *max_deviation,
            PerpsError::SlippageTooHigh
        );
    }
    
    // Calculate position size and entry price
    let position_size = Box::new(order.size);
    let entry_price = Box::new(if is_market_execution {
        current_price // Use current price for market orders
    } else {
        order.price // Use limit price for limit orders
    });
    
    // Calculate liquidation price
    let collateral = Box::new(order.collateral as u128);
    let _leverage = Box::new(order.leverage as u128);
    let _size_value = Box::new(
        (*position_size as u128)
            .checked_mul(*entry_price as u128)
            .ok_or(error!(PerpsError::Overflow))?
            .checked_div(1_000_000) // Price is in 6 decimals
            .ok_or(error!(PerpsError::Overflow))?
    );
    
    // Calculate liquidation threshold
    // For longs: entry_price - (collateral / size)
    // For shorts: entry_price + (collateral / size)
    let collateral_per_size = Box::new(
        (*collateral)
            .checked_mul(1_000_000) // Convert to same decimals as price
            .ok_or(error!(PerpsError::Overflow))?
            .checked_div(*position_size as u128)
            .ok_or(error!(PerpsError::Overflow))?
    );
    
    let margin_buffer = Box::new(
        (*collateral_per_size)
            .checked_mul(constants::MAINTENANCE_MARGIN_RATIO_BPS as u128)
            .ok_or(error!(PerpsError::Overflow))?
            .checked_div(10_000)
            .ok_or(error!(PerpsError::Overflow))?
    );
    
    let entry_price_u128 = Box::new(*entry_price as u128);

    // For longs: entry_price - (collateral / size)
    // For shorts: entry_price + (collateral / size)
    let liquidation_price_u128 = if order.is_long {
        if u128::from(*entry_price) <= *collateral_per_size {
            Box::new(0u128) // Cannot be liquidated if entry price is less than collateral per size
        } else {
            Box::new(entry_price_u128.checked_sub(*collateral_per_size)
                .ok_or(error!(PerpsError::Overflow))?
                .checked_add(*margin_buffer)
                .ok_or(error!(PerpsError::Overflow))?)
        }
    } else {
        Box::new(entry_price_u128.checked_add(*collateral_per_size)
            .ok_or(error!(PerpsError::Overflow))?
            .checked_sub(*margin_buffer)
            .ok_or(error!(PerpsError::Overflow))?)
    };

    // Check for overflow
    if *liquidation_price_u128 > u64::MAX as u128 {
        return Err(error!(PerpsError::Overflow));
    }

    let _liquidation_price = *liquidation_price_u128 as u64;
    
    // Update market with new position
    if order.is_long {
        market.total_long_size = market.total_long_size
            .checked_add(*position_size)
            .ok_or(error!(PerpsError::Overflow))?;
    } else {
        market.total_short_size = market.total_short_size
            .checked_add(*position_size)
            .ok_or(error!(PerpsError::Overflow))?;
    }
    
    // Create position (will be created in a separate instruction)
    // ...
    
    // Mark order as inactive (filled)
    order.is_active = false;
    
    msg!(
        "Order executed: type={}, direction={}, size={}, price={}",
        order.order_type,
        if order.is_long { "long" } else { "short" },
        *position_size,
        if is_market_execution { current_price } else { *entry_price }
    );
    
    Ok(())
}

/// Cancel an existing order
pub fn cancel_order(ctx: Context<CancelOrderContext>) -> Result<()> {
    // Get accounts
    let order = &mut ctx.accounts.order;
    let user_account = &mut ctx.accounts.user_account;
    
    // Ensure order is active
    require!(order.is_active, PerpsError::Unauthorized);
    
    // Mark order as inactive (cancelled)
    order.is_active = false;
    
    // Return collateral to user
    user_account.collateral_balance = user_account.collateral_balance
        .checked_add(order.collateral)
        .ok_or(error!(PerpsError::Overflow))?;
    
    msg!("Order cancelled: {}", order.key());
    
    Ok(())
}

/// Context for placing an order
#[derive(Accounts)]
#[instruction(
    order_id: u64,
    market_id: u64,
)]
pub struct PlaceOrderContext<'info> {
    /// The order account to initialize
    #[account(
        init,
        payer = user,
        space = 8 + // discriminator
               32 + // user
               32 + // market
               1 +  // order_type
               1 +  // is_long
               8 +  // size
               8 +  // price
               8 +  // collateral
               1 +  // leverage
               1 +  // is_active
               2 +  // max_slippage_bps
               8 +  // created_at
               8 +  // position_id
               1,   // bump
        seeds = [crate::constants::seeds::ORDER, user.key().as_ref(), order_id.to_le_bytes().as_ref()],
        bump
    )]
    pub order: Account<'info, Order>,
    
    /// The user account
    #[account(
        mut,
        seeds = [crate::constants::seeds::USER, user.key().as_ref()],
        bump = user_account.bump,
        has_one = user @ PerpsError::Unauthorized
    )]
    pub user_account: Account<'info, User>,
    
    /// The market for this order
    #[account(
        mut,
        seeds = [crate::constants::seeds::MARKET, market_id.to_le_bytes().as_ref()],
        bump = market.bump,
        constraint = market.is_active @ PerpsError::MarketInactive
    )]
    pub market: Account<'info, Market>,
    
    /// The user's signer account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// The oracle account
    /// CHECK: Oracle validation is done in the instruction handler
    pub oracle: AccountInfo<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump,
        constraint = !global_state.emergency_paused @ PerpsError::ProtocolPaused
    )]
    pub global_state: Account<'info, crate::state::global::GlobalState>,
    
    /// System program
    pub system_program: Program<'info, System>,
}

/// Context for cancelling an order
#[derive(Accounts)]
pub struct CancelOrderContext<'info> {
    /// The order account to cancel
    #[account(
        mut,
        seeds = [crate::constants::seeds::ORDER, user.key().as_ref(), order.key().as_ref()],
        bump = order.bump,
        has_one = user @ PerpsError::Unauthorized,
        constraint = order.is_active @ PerpsError::Unauthorized
    )]
    pub order: Account<'info, Order>,
    
    /// The user account
    #[account(
        mut,
        seeds = [crate::constants::seeds::USER, user.key().as_ref()],
        bump = user_account.bump,
        has_one = user @ PerpsError::Unauthorized
    )]
    pub user_account: Account<'info, User>,
    
    /// The user's signer account
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// System program
    pub system_program: Program<'info, System>,
}

/// Context for checking/executing pending orders
#[derive(Accounts)]
#[instruction(market_id: u64)]
pub struct ExecuteOrderContext<'info> {
    /// The order account to execute
    #[account(
        mut,
        seeds = [crate::constants::seeds::ORDER, order.user.as_ref(), order.key().as_ref()],
        bump = order.bump,
        constraint = order.is_active @ PerpsError::Unauthorized
    )]
    pub order: Account<'info, Order>,
    
    /// The user account
    #[account(
        mut,
        seeds = [crate::constants::seeds::USER, order.user.as_ref()],
        bump,
        constraint = user_account.user == order.user @ PerpsError::Unauthorized
    )]
    pub user_account: Account<'info, User>,
    
    /// The market for this order
    #[account(
        mut,
        seeds = [crate::constants::seeds::MARKET, market_id.to_le_bytes().as_ref()],
        bump = market.bump,
        constraint = market.key() == order.market @ PerpsError::MarketNotFound,
        constraint = market.is_active @ PerpsError::MarketInactive
    )]
    pub market: Account<'info, Market>,
    
    /// The executor (can be anyone)
    #[account(mut)]
    pub executor: Signer<'info>,
    
    /// The oracle account
    /// CHECK: Oracle validation is done in the instruction handler
    pub oracle: AccountInfo<'info>,
    
    /// The global state account
    #[account(
        seeds = [crate::constants::seeds::GLOBAL_STATE],
        bump,
        constraint = !global_state.emergency_paused @ PerpsError::ProtocolPaused
    )]
    pub global_state: Account<'info, crate::state::global::GlobalState>,
    
    /// System program
    pub system_program: Program<'info, System>,
}

/// Order execution accounts (reusable reference)
pub struct PlaceOrderAccounts<'info> {
    pub user_account: Account<'info, User>,
    pub market: Account<'info, Market>,
    pub oracle: AccountInfo<'info>,
}

// Execute an existing order using the account data directly
pub fn execute_order_direct(
    _user_account: &mut Account<'_, User>,
    market: &mut Account<'_, Market>,
    oracle: &AccountInfo<'_>,
    order: &mut Order,
    is_market_execution: bool
) -> Result<()> {
    // Only proceed if order is active
    if !order.is_active {
        return Err(error!(PerpsError::Unauthorized));
    }
    
    // Get current price from oracle for reference
    let oracle_type = OracleType::try_from(market.oracle_type)
        .map_err(|_| error!(PerpsError::InvalidOracleType))?;
    
    let oracle_price = get_price(oracle, oracle_type)?;
    let execution_price; // Don't initialize here, assign in each if branch
    
    // If this is a market order, use the AMM price with slippage
    if is_market_execution {
        // Use AMM price with slippage based on position size
        if order.is_long {
            execution_price = calculate_entry_price_with_impact_long(
                market,
                order.size
            )?;
        } else {
            execution_price = calculate_entry_price_with_impact_short(
                market,
                order.size
            )?;
        }
        
        // Check if price deviation is too high
        let oracle_price_box = Box::new(oracle_price as u128);
        let execution_price_box = Box::new(execution_price as u128);
        
        let price_diff = if *execution_price_box > *oracle_price_box {
            execution_price_box.checked_sub(*oracle_price_box)
        } else {
            oracle_price_box.checked_sub(*execution_price_box)
        }.ok_or(error!(PerpsError::Overflow))?;
        
        let price_impact_bps = price_diff
            .checked_mul(10_000)
            .ok_or(error!(PerpsError::Overflow))?
            .checked_div(*oracle_price_box)
            .ok_or(error!(PerpsError::Overflow))?;
            
        // Ensure price impact is within allowable limits
        if price_impact_bps > market.max_price_impact_bps as u128 {
            return Err(error!(PerpsError::PriceImpactTooHigh));
        }
    } else {
        // For limit orders, use the order's specified price
        execution_price = order.price;
        
        // Verify that limit price is reasonable compared to current oracle price
        if order.is_long {
            // For long limit orders, execution price must be less than or equal to oracle price
            if execution_price > oracle_price {
                return Err(error!(PerpsError::PriceTooHigh));
            }
        } else {
            // For short limit orders, execution price must be greater than or equal to oracle price
            if execution_price < oracle_price {
                return Err(error!(PerpsError::PriceTooLow));
            }
        }
    }

    // Calculate fee based on size (not used now, but we'll keep the calculation)
    let _fee = crate::utils::math::calculate_fee(
        order.size,
        constants::PROTOCOL_FEE_BPS
    )?;
    
    // Update order status
    order.is_active = false;
    
    // Update virtual AMM reserves for the market
    if order.is_long {
        // For long orders, decrease base asset reserve
        update_market_reserves_for_open(market, order.size, true)?;
    } else {
        // For short orders, increase base asset reserve
        update_market_reserves_for_open(market, order.size, false)?;
    }
    
    Ok(())
} 