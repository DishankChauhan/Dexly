use crate::models::error::ApiError;
use crate::models::position::{Position, PositionStatus};
use chrono::{DateTime, Utc};
use log::{info, error, warn};
use sqlx::{PgPool, postgres::PgQueryResult};
use anchor_client::solana_sdk::pubkey::Pubkey;
use sqlx::types::chrono;
use std::str::FromStr;

/// Insert a new position into the database
pub async fn insert_position(
    pool: &PgPool,
    position: &Position,
) -> Result<PgQueryResult, ApiError> {
    info!("Inserting position {} into database", position.id);
    
    let result = sqlx::query(
        "INSERT INTO positions (
            id, user_id, market_id, size, collateral, entry_price, liquidation_price, 
            is_long, leverage, opened_at, is_closed, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)"
    )
    .bind(&position.id)
    .bind(&position.user)
    .bind(&position.market)
    .bind(position.size as i64)
    .bind(position.collateral as i64)
    .bind(position.entry_price as i64)
    .bind(position.liquidation_price as i64)
    .bind(position.is_long)
    .bind(position.leverage as i32)
    .bind(position.opened_at)
    .bind(position.is_closed)
    .bind(if position.is_closed { "closed" } else { "open" })
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update an existing position in the database
pub async fn update_position(
    pool: &PgPool,
    position: &Position,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating position {} in database", position.id);
    
    let result = sqlx::query(
        "UPDATE positions SET 
            size = $1,
            collateral = $2,
            entry_price = $3,
            liquidation_price = $4,
            is_closed = $5,
            status = $6
         WHERE id = $7"
    )
    .bind(position.size as i64)
    .bind(position.collateral as i64)
    .bind(position.entry_price as i64)
    .bind(position.liquidation_price as i64)
    .bind(position.is_closed)
    .bind(if position.is_closed { "closed" } else { "open" })
    .bind(&position.id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Close a position in the database
pub async fn close_position(
    pool: &PgPool,
    position_id: &str,
    exit_price: u64,
    realized_pnl: i64
) -> Result<PgQueryResult, ApiError> {
    info!("Closing position {} in database with exit price {} and realized PnL {}", 
        position_id, exit_price, realized_pnl);
    
    let result = sqlx::query(
        "UPDATE positions SET 
            is_closed = true,
            mark_price = $1,
            unrealized_pnl = 0
         WHERE id = $2"
    )
    .bind(exit_price as i64)
    .bind(position_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Get a position by ID from the database
pub async fn get_position(
    pool: &PgPool,
    position_id: &str,
) -> Result<Position, ApiError> {
    info!("Getting position {} from database", position_id);
    
    let record = sqlx::query!(
        r#"
        SELECT 
            id, user_id, market_id, size, collateral, entry_price, liquidation_price, 
            is_long, leverage, opened_at, is_closed, status
        FROM positions
        WHERE id = $1
        "#,
        position_id
    )
    .fetch_one(pool)
    .await?;
    
    Ok(Position {
        id: record.id,
        user: record.user_id,
        market: record.market_id,
        size: record.size as u64,
        collateral: record.collateral as u64,
        entry_price: record.entry_price as u64,
        liquidation_price: record.liquidation_price as u64,
        is_long: record.is_long,
        leverage: record.leverage as u8,
        opened_at: record.opened_at as i64,
        last_funding_ts: 0,
        realized_pnl_from_funding: 0,
        is_closed: record.is_closed.unwrap_or(false),
        bump: 0,
        mark_price: 0,
        unrealized_pnl: 0,
        margin_ratio: 0.0,
        funding_rate: 0,
    })
}

/// Get all positions for a user from the database
pub async fn get_user_positions(
    pool: &PgPool,
    user_id: &str,
) -> Result<Vec<Position>, ApiError> {
    info!("Getting positions for user {} from database", user_id);
    
    let records = sqlx::query!(
        r#"
        SELECT 
            id, user_id, market_id, size, collateral, entry_price, liquidation_price, 
            is_long, leverage, opened_at, is_closed, status
        FROM positions
        WHERE user_id = $1
        ORDER BY opened_at DESC
        "#,
        user_id
    )
    .fetch_all(pool)
    .await?;
    
    let mut positions = Vec::new();
    
    for record in records {
        positions.push(Position {
            id: record.id,
            user: record.user_id,
            market: record.market_id,
            size: record.size as u64,
            collateral: record.collateral as u64,
            entry_price: record.entry_price as u64,
            liquidation_price: record.liquidation_price as u64,
            is_long: record.is_long,
            leverage: record.leverage as u8,
            opened_at: record.opened_at as i64,
            last_funding_ts: 0,
            realized_pnl_from_funding: 0,
            is_closed: record.is_closed.unwrap_or(false),
            bump: 0,
            mark_price: 0,
            unrealized_pnl: 0,
            margin_ratio: 0.0,
            funding_rate: 0,
        });
    }
    
    Ok(positions)
}

/// Get active positions for a market from the database
pub async fn get_market_active_positions(
    pool: &PgPool,
    market_id: &str,
) -> Result<Vec<Position>, ApiError> {
    info!("Getting active positions for market {} from database", market_id);
    
    let records = sqlx::query!(
        r#"
        SELECT 
            id, user_id, market_id, size, collateral, entry_price, liquidation_price, 
            is_long, leverage, opened_at, is_closed, status
        FROM positions
        WHERE market_id = $1 AND is_closed = false
        ORDER BY opened_at DESC
        "#,
        market_id
    )
    .fetch_all(pool)
    .await?;
    
    let mut positions = Vec::new();
    
    for record in records {
        positions.push(Position {
            id: record.id,
            user: record.user_id,
            market: record.market_id,
            size: record.size as u64,
            collateral: record.collateral as u64,
            entry_price: record.entry_price as u64,
            liquidation_price: record.liquidation_price as u64,
            is_long: record.is_long,
            leverage: record.leverage as u8,
            opened_at: record.opened_at as i64,
            last_funding_ts: 0,
            realized_pnl_from_funding: 0,
            is_closed: record.is_closed.unwrap_or(false),
            bump: 0,
            mark_price: 0,
            unrealized_pnl: 0,
            margin_ratio: 0.0,
            funding_rate: 0,
        });
    }
    
    Ok(positions)
}

/// Update unrealized PnL for a position
pub async fn update_position_unrealized_pnl(
    pool: &PgPool,
    position_id: &str,
    unrealized_pnl: i64,
    mark_price: u64,
    margin_ratio: f64
) -> Result<PgQueryResult, ApiError> {
    info!("Updating position {}", position_id);
    
    // Since the database doesn't store these calculated values, we'd need to
    // update them in the application layer when fetching positions
    // For now, we'll just update the updated_at timestamp
    let result = sqlx::query(
        "UPDATE positions SET 
            updated_at = $1
         WHERE id = $2"
    )
    .bind(Utc::now())
    .bind(position_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update funding payments for a position
pub async fn update_position_funding(
    pool: &PgPool,
    position_id: &str,
    last_funding_ts: i64,
    realized_pnl_from_funding: i64,
    funding_rate: i64
) -> Result<PgQueryResult, ApiError> {
    info!("Updating funding for position {}", position_id);
    
    // Since the database doesn't store these calculated values, we'd need to
    // update them in the application layer when fetching positions
    // For now, we'll just update the updated_at timestamp
    let result = sqlx::query(
        "UPDATE positions SET 
            updated_at = $1
         WHERE id = $2"
    )
    .bind(Utc::now())
    .bind(position_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Get positions at risk of liquidation
pub async fn get_liquidation_risk_positions(
    pool: &PgPool,
    margin_ratio_threshold: f64,
) -> Result<Vec<Position>, ApiError> {
    info!("Getting positions at risk of liquidation from database (margin ratio < {})", margin_ratio_threshold);
    
    let records = sqlx::query!(
        r#"
        SELECT 
            id, user_id, market_id, size, collateral, entry_price, liquidation_price, 
            is_long, leverage, opened_at, is_closed, status
        FROM positions 
        WHERE is_closed = false AND status = 'open'
        ORDER BY opened_at DESC
        "#
    )
    .fetch_all(pool)
    .await?;
    
    // Filter positions at risk in application code since margin_ratio is calculated, not stored
    let mut positions = Vec::new();
    let margin_ratio_threshold_float = margin_ratio_threshold;
    
    for record in records {
        // Create the position
        let position = Position {
            id: record.id,
            user: record.user_id,
            market: record.market_id, 
            size: record.size as u64,
            collateral: record.collateral as u64,
            entry_price: record.entry_price as u64,
            liquidation_price: record.liquidation_price as u64,
            is_long: record.is_long,
            leverage: record.leverage as u8,
            opened_at: record.opened_at as i64,
            last_funding_ts: 0,
            realized_pnl_from_funding: 0,
            is_closed: record.is_closed.unwrap_or(false),
            bump: 0,
            mark_price: 0,
            unrealized_pnl: 0,
            margin_ratio: 0.0, 
            funding_rate: 0,
        };
        
        // Calculate margin ratio in code and filter
        // This is simplified - in a real app you'd need to fetch market data and calculate
        let margin_ratio = (position.collateral as f64) / (position.size as f64 * position.entry_price as f64 / 1_000_000.0);
        
        if margin_ratio < margin_ratio_threshold_float {
            // Only add positions that are at risk of liquidation
            positions.push(position);
        }
    }
    
    // Sort by margin ratio (simulated here since we're calculating it)
    positions.sort_by(|a, b| {
        let a_ratio = (a.collateral as f64) / (a.size as f64 * a.entry_price as f64 / 1_000_000.0);
        let b_ratio = (b.collateral as f64) / (b.size as f64 * b.entry_price as f64 / 1_000_000.0);
        a_ratio.partial_cmp(&b_ratio).unwrap_or(std::cmp::Ordering::Equal)
    });
    
    Ok(positions)
} 