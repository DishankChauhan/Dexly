use crate::models::error::ApiError;
use crate::models::order::{Order, OrderStatus, OrderType};
use chrono::{DateTime, Utc};
use log::{info, error};
use sqlx::{PgPool, postgres::PgQueryResult, Row};
use anchor_client::solana_sdk::pubkey::Pubkey;
use sqlx::types::chrono;
use std::str::FromStr;

/// Insert a new order into the database
pub async fn insert_order(
    pool: &PgPool,
    order: &Order,
) -> Result<PgQueryResult, ApiError> {
    info!("Inserting order {} into database", order.id);
    
    let status = serde_json::to_string(&order.status)?;
    
    let result = sqlx::query(
        "INSERT INTO orders (
            id, user_id, market_id, order_type, is_long, size, price, 
            collateral, leverage, is_active, max_slippage_bps, created_at, position_id,
            bump, status, mark_price, timestamp
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)"
    )
    .bind(&order.id)
    .bind(&order.user)
    .bind(&order.market)
    .bind(order.order_type as i32)
    .bind(order.is_long)
    .bind(order.size as i64)
    .bind(order.price as i64)
    .bind(order.collateral as i64)
    .bind(order.leverage as i32)
    .bind(order.is_active)
    .bind(order.max_slippage_bps as i32)
    .bind(order.created_at)
    .bind(order.position_id as i64)
    .bind(order.bump as i16)
    .bind(status)
    .bind(order.mark_price.map(|p| p as i64))
    .bind(Utc::now())
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update an existing order in the database
pub async fn update_order(
    pool: &PgPool,
    order: &Order,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating order {} in database", order.id);
    
    let status = serde_json::to_string(&order.status)?;
    
    let result = sqlx::query(
        "UPDATE orders SET 
            status = $1,
            updated_at = $2
         WHERE id = $3"
    )
    .bind(status)
    .bind(Utc::now())
    .bind(&order.id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Fill an order in the database
pub async fn fill_order(
    pool: &PgPool,
    order_id: &str,
    fill_price: u64,
    position_id: &str,
) -> Result<PgQueryResult, ApiError> {
    info!("Marking order {} as filled in database", order_id);
    
    let result = sqlx::query(
        "UPDATE orders SET 
            status = $1,
            updated_at = $2,
            filled_at = $3,
            fill_price = $4,
            position_id = $5
         WHERE id = $6"
    )
    .bind(OrderStatus::Filled.to_string())
    .bind(Utc::now())
    .bind(Utc::now())
    .bind(fill_price as i64)
    .bind(position_id)
    .bind(order_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Cancel an order in the database
pub async fn cancel_order(
    pool: &PgPool,
    order_id: &str,
) -> Result<PgQueryResult, ApiError> {
    info!("Marking order {} as cancelled in database", order_id);
    
    let result = sqlx::query(
        "UPDATE orders SET 
            status = $1,
            is_active = false,
            timestamp = $2
         WHERE id = $3"
    )
    .bind(OrderStatus::Canceled.to_string())
    .bind(Utc::now())
    .bind(order_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Get an order by ID from the database
pub async fn get_order(
    pool: &PgPool,
    order_id: &str,
) -> Result<Order, ApiError> {
    info!("Getting order {} from database", order_id);
    
    let record = sqlx::query!(
        r#"
        SELECT 
            id, user_id, market_id, order_type, is_long, size, price, 
            collateral, leverage, is_active, status, filled_at, canceled_at, created_at
        FROM orders
        WHERE id = $1
        "#,
        order_id
    )
    .fetch_one(pool)
    .await?;
    
    let status_value = record.status.unwrap_or(0) as u8;
    let status = match status_value {
        0 => OrderStatus::Open,
        1 => OrderStatus::Filled,
        2 => OrderStatus::Canceled,
        3 => OrderStatus::Expired,
        _ => OrderStatus::Open,
    };
    
    Ok(Order {
        id: record.id,
        user: record.user_id,
        market: record.market_id,
        order_type: record.order_type as u8,
        is_long: record.is_long,
        size: record.size as u64,
        price: record.price as u64,
        collateral: record.collateral as u64,
        leverage: record.leverage as u8,
        is_active: record.is_active.unwrap_or(false),
        max_slippage_bps: 0, // Default value
        created_at: record.created_at,
        position_id: 0, // Default value
        bump: 0, // Default value
        status,
        mark_price: None,
    })
}

/// Get all orders for a user from the database
pub async fn get_user_orders(
    pool: &PgPool,
    user_id: &str,
) -> Result<Vec<Order>, ApiError> {
    info!("Getting orders for user {} from database", user_id);
    
    let records = sqlx::query!(
        r#"
        SELECT 
            id, user_id, market_id, order_type, is_long, size, price, 
            collateral, leverage, is_active, status, filled_at, canceled_at, created_at
        FROM orders
        WHERE user_id = $1
        ORDER BY created_at DESC
        "#,
        user_id
    )
    .fetch_all(pool)
    .await?;
    
    let mut orders = Vec::new();
    
    for record in records {
        let status_value = record.status.unwrap_or(0) as u8;
        let status = match status_value {
            0 => OrderStatus::Open,
            1 => OrderStatus::Filled,
            2 => OrderStatus::Canceled,
            3 => OrderStatus::Expired,
            _ => OrderStatus::Open,
        };
        
        orders.push(Order {
            id: record.id,
            user: record.user_id,
            market: record.market_id,
            order_type: record.order_type as u8,
            is_long: record.is_long,
            size: record.size as u64,
            price: record.price as u64,
            collateral: record.collateral as u64,
            leverage: record.leverage as u8,
            is_active: record.is_active.unwrap_or(false),
            max_slippage_bps: 0, // Default value
            created_at: record.created_at,
            position_id: 0, // Default value
            bump: 0, // Default value
            status,
            mark_price: None,
        });
    }
    
    Ok(orders)
}

/// Get all active orders for a market from the database
pub async fn get_market_orders(
    pool: &PgPool,
    market_id: &str,
) -> Result<Vec<Order>, ApiError> {
    info!("Getting orders for market {} from database", market_id);
    
    let records = sqlx::query!(
        r#"
        SELECT 
            id, user_id, market_id, order_type, is_long, size, price, 
            collateral, leverage, is_active, status, filled_at, canceled_at, created_at
        FROM orders
        WHERE market_id = $1 AND is_active = true
        ORDER BY created_at DESC
        "#,
        market_id
    )
    .fetch_all(pool)
    .await?;
    
    let mut orders = Vec::new();
    
    for record in records {
        let status_value = record.status.unwrap_or(0) as u8;
        let status = match status_value {
            0 => OrderStatus::Open,
            1 => OrderStatus::Filled,
            2 => OrderStatus::Canceled,
            3 => OrderStatus::Expired,
            _ => OrderStatus::Open,
        };
        
        orders.push(Order {
            id: record.id,
            user: record.user_id,
            market: record.market_id,
            order_type: record.order_type as u8,
            is_long: record.is_long,
            size: record.size as u64,
            price: record.price as u64,
            collateral: record.collateral as u64,
            leverage: record.leverage as u8,
            is_active: record.is_active.unwrap_or(false),
            max_slippage_bps: 0, // Default value
            created_at: record.created_at,
            position_id: 0, // Default value
            bump: 0, // Default value
            status,
            mark_price: None,
        });
    }
    
    Ok(orders)
}

/// Get orders waiting to be executed (for a specific market or all markets)
pub async fn get_executable_orders(
    pool: &PgPool,
    market_id: Option<&str>,
    current_price: u64,
) -> Result<Vec<Order>, ApiError> {
    info!("Getting executable orders from database");
    
    // Base query to find executable orders
    let mut query = r#"
        SELECT 
            id, user_id, market_id, order_type, is_long, size, price, 
            collateral, leverage, is_active, max_slippage_bps, created_at, position_id,
            bump, status, mark_price
        FROM orders
        WHERE is_active = true 
    "#.to_string();
    
    // Add market filter if specified
    if let Some(mid) = market_id {
        query += " AND market_id = $1";
    }
    
    query += " ORDER BY created_at ASC";
    
    // Execute the query
    let records = if let Some(mid) = market_id {
        sqlx::query(&query)
            .bind(mid)
            .fetch_all(pool)
            .await?
    } else {
        sqlx::query(&query)
            .fetch_all(pool)
            .await?
    };
    
    let mut orders = Vec::new();
    
    for record in records {
        let order_type = record.get::<i32, _>("order_type") as u8;
        let is_long = record.get::<bool, _>("is_long");
        let price = record.get::<i64, _>("price") as u64;
        let status_value = record.get::<Option<i32>, _>("status").unwrap_or(0) as u8;
        let status = match status_value {
            0 => OrderStatus::Open,
            1 => OrderStatus::Filled,
            2 => OrderStatus::Canceled,
            3 => OrderStatus::Expired,
            _ => OrderStatus::Open,
        };
        
        // Filter orders based on market conditions
        let should_include = match order_type {
            0 => true, // Market order - always include
            1 => { // Limit order
                if is_long {
                    current_price <= price  // Buy when price <= limit
                } else {
                    current_price >= price  // Sell when price >= limit
                }
            },
            2 => { // StopLoss
                if is_long {
                    current_price <= price  // Long stop when price falls below stop
                } else {
                    current_price >= price  // Short stop when price rises above stop
                }
            },
            3 => { // TakeProfit
                if is_long {
                    current_price >= price  // Long TP when price rises above target
                } else {
                    current_price <= price  // Short TP when price falls below target
                }
            },
            _ => false,
        };
        
        if should_include {
            orders.push(Order {
                id: record.get("id"),
                user: record.get("user_id"),
                market: record.get("market_id"),
                order_type,
                is_long,
                size: record.get::<i64, _>("size") as u64,
                price,
                collateral: record.get::<i64, _>("collateral") as u64,
                leverage: record.get::<i32, _>("leverage") as u8,
                is_active: record.get::<bool, _>("is_active"),
                max_slippage_bps: record.get::<i32, _>("max_slippage_bps") as u16,
                created_at: record.get::<i64, _>("created_at"),
                position_id: record.get::<i64, _>("position_id") as u64,
                bump: record.get::<i16, _>("bump") as u8,
                status,
                mark_price: record.get::<Option<i64>, _>("mark_price").map(|p| p as u64),
            });
        }
    }
    
    Ok(orders)
}

/// Clean up expired orders
pub async fn cancel_expired_orders(
    pool: &PgPool,
) -> Result<u64, ApiError> {
    info!("Cancelling expired orders");
    
    let now = Utc::now();
    
    let result = sqlx::query(
        "UPDATE orders SET 
            status = $1,
            is_active = false,
            timestamp = $2
         WHERE is_active = true 
         AND created_at + 86400 < $3" // 24 hours expiry
    )
    .bind(OrderStatus::Expired.to_string())
    .bind(now)
    .bind(now.timestamp())
    .execute(pool)
    .await?;
    
    Ok(result.rows_affected())
} 