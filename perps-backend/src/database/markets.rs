use crate::models::error::ApiError;
use crate::models::market::{Market};
use crate::solana::oracle::OracleType;
use chrono::{DateTime, Utc};
use log::{info, error};
use sqlx::{PgPool, postgres::PgQueryResult};
use anchor_client::solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

/// Insert a new market into the database
pub async fn insert_market(
    pool: &PgPool,
    market: &Market,
) -> Result<PgQueryResult, ApiError> {
    info!("Inserting market {} into database", market.id);
    
    let result = sqlx::query(
        "INSERT INTO markets (
            id, asset_symbol, oracle_address, oracle_type,
            base_asset_reserve, quote_asset_reserve, funding_rate,
            last_funding_ts, total_long_size, total_short_size,
            max_leverage, min_margin_ratio_bps, fee_bps,
            is_active, authority, min_position_size, bump,
            mark_price, price_change_24h, volume_24h,
            created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)"
    )
    .bind(&market.id)
    .bind(&market.asset_symbol)
    .bind(&market.oracle)
    .bind(market.oracle_type as i32)
    .bind(market.base_asset_reserve as i64)
    .bind(market.quote_asset_reserve as i64)
    .bind(market.funding_rate)
    .bind(market.last_funding_ts)
    .bind(market.total_long_size as i64)
    .bind(market.total_short_size as i64)
    .bind(market.max_leverage as i32)
    .bind(market.min_margin_ratio_bps as i32)
    .bind(market.fee_bps as i32)
    .bind(market.is_active)
    .bind(&market.authority)
    .bind(market.min_position_size as i64)
    .bind(market.bump as i32)
    .bind(market.mark_price as i64)
    .bind(market.price_change_24h)
    .bind(market.volume_24h.map(|v| v as i64))
    .bind(Utc::now())
    .bind(Utc::now())
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update an existing market in the database
pub async fn update_market(
    pool: &PgPool,
    market: &Market,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating market {} in database", market.id);
    
    let result = sqlx::query(
        "UPDATE markets SET 
            asset_symbol = $1,
            oracle_address = $2,
            oracle_type = $3,
            base_asset_reserve = $4,
            quote_asset_reserve = $5,
            funding_rate = $6,
            last_funding_ts = $7,
            total_long_size = $8,
            total_short_size = $9,
            max_leverage = $10,
            min_margin_ratio_bps = $11,
            fee_bps = $12,
            is_active = $13,
            authority = $14,
            min_position_size = $15,
            bump = $16,
            mark_price = $17,
            price_change_24h = $18,
            volume_24h = $19,
            updated_at = $20
         WHERE id = $21"
    )
    .bind(&market.asset_symbol)
    .bind(&market.oracle)
    .bind(market.oracle_type as i32)
    .bind(market.base_asset_reserve as i64)
    .bind(market.quote_asset_reserve as i64)
    .bind(market.funding_rate)
    .bind(market.last_funding_ts)
    .bind(market.total_long_size as i64)
    .bind(market.total_short_size as i64)
    .bind(market.max_leverage as i32)
    .bind(market.min_margin_ratio_bps as i32)
    .bind(market.fee_bps as i32)
    .bind(market.is_active)
    .bind(&market.authority)
    .bind(market.min_position_size as i64)
    .bind(market.bump as i32)
    .bind(market.mark_price as i64)
    .bind(market.price_change_24h)
    .bind(market.volume_24h.map(|v| v as i64))
    .bind(Utc::now())
    .bind(&market.id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update market price in the database
pub async fn update_market_price(
    pool: &PgPool,
    market_id: &str,
    price: u64,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating price for market {} in database", market_id);
    
    let result = sqlx::query(
        "UPDATE markets SET 
            mark_price = $1,
            updated_at = $2
         WHERE id = $3"
    )
    .bind(price as i64)
    .bind(Utc::now())
    .bind(market_id)
    .execute(pool)
    .await?;
    
    // Store price in price history table
    sqlx::query(
        "INSERT INTO price_history (market_id, price, timestamp, source)
         VALUES ($1, $2, $3, $4)"
    )
    .bind(market_id)
    .bind(price as i64)
    .bind(Utc::now())
    .bind("oracle")
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update funding rate in the database
pub async fn update_funding_rate(
    pool: &PgPool,
    market_id: &str,
    funding_rate: i64,
    mark_price: u64,
    index_price: u64,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating funding rate for market {} in database", market_id);
    
    // Update market record
    let result = sqlx::query(
        "UPDATE markets SET 
            funding_rate = $1,
            last_funding_ts = $2,
            updated_at = $3
         WHERE id = $4"
    )
    .bind(funding_rate)
    .bind(Utc::now().timestamp())
    .bind(Utc::now())
    .bind(market_id)
    .execute(pool)
    .await?;
    
    // Store funding rate in history table
    sqlx::query(
        "INSERT INTO funding_rate_history (market_id, funding_rate, timestamp, mark_price, index_price)
         VALUES ($1, $2, $3, $4, $5)"
    )
    .bind(market_id)
    .bind(funding_rate as f64 / 1_000_000.0) // Convert from contract representation to percentage
    .bind(Utc::now())
    .bind(mark_price as i64)
    .bind(index_price as i64)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Toggle market pause state
pub async fn toggle_market_pause(
    pool: &PgPool,
    market_id: &str,
    paused: bool,
) -> Result<PgQueryResult, ApiError> {
    info!("Setting market {} pause state to {}", market_id, paused);
    
    let result = sqlx::query(
        "UPDATE markets SET 
            is_paused = $1,
            updated_at = $2
         WHERE id = $3"
    )
    .bind(paused)
    .bind(Utc::now())
    .bind(market_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Get a market by ID from the database
pub async fn get_market(
    pool: &PgPool,
    market_id: &str,
) -> Result<Market, ApiError> {
    info!("Getting market {} from database", market_id);
    
    let record = sqlx::query!(
        r#"
        SELECT 
            id, asset_symbol, oracle_address as oracle, oracle_type,
            funding_rate, last_funding_ts, mark_price, index_price,
            fee_bps, max_leverage, min_position_size, min_margin_ratio_bps,
            paused, created_at, updated_at
        FROM markets
        WHERE id = $1
        "#,
        market_id
    )
    .fetch_one(pool)
    .await?;
    
    Ok(Market {
        id: record.id,
        asset_symbol: record.asset_symbol,
        oracle: record.oracle,
        oracle_type: record.oracle_type as u8,
        base_asset_reserve: 0,
        quote_asset_reserve: 0,
        funding_rate: record.funding_rate.unwrap_or(0),
        last_funding_ts: record.last_funding_ts.unwrap_or(0),
        total_long_size: 0,
        total_short_size: 0,
        max_leverage: record.max_leverage as u8,
        min_margin_ratio_bps: record.min_margin_ratio_bps as u16,
        fee_bps: record.fee_bps as u16,
        is_active: !record.paused.unwrap_or(false),
        authority: Pubkey::default().to_string(),
        min_position_size: record.min_position_size as u64,
        bump: 0,
        mark_price: record.mark_price.unwrap_or(0) as u64,
        price_change_24h: Some(0.0),
        volume_24h: None,
    })
}

/// Get all markets
pub async fn get_markets(
    pool: &PgPool,
) -> Result<Vec<Market>, ApiError> {
    info!("Getting all markets from database");
    
    let records = sqlx::query!(
        r#"
        SELECT 
            id, asset_symbol, oracle_address as oracle, oracle_type,
            funding_rate, last_funding_ts, mark_price, index_price,
            fee_bps, max_leverage, min_position_size, min_margin_ratio_bps,
            paused
        FROM markets
        WHERE paused = false
        ORDER BY asset_symbol ASC
        "#
    )
    .fetch_all(pool)
    .await?;
    
    let markets = records.into_iter()
        .map(|r| Market {
            id: r.id,
            asset_symbol: r.asset_symbol,
            oracle: r.oracle,
            oracle_type: r.oracle_type as u8,
            base_asset_reserve: 0,
            quote_asset_reserve: 0,
            funding_rate: r.funding_rate.unwrap_or(0),
            last_funding_ts: r.last_funding_ts.unwrap_or(0),
            total_long_size: 0,
            total_short_size: 0,
            max_leverage: r.max_leverage as u8,
            min_margin_ratio_bps: r.min_margin_ratio_bps as u16,
            fee_bps: r.fee_bps as u16,
            is_active: !r.paused.unwrap_or(false),
            authority: Pubkey::default().to_string(),
            min_position_size: r.min_position_size as u64,
            bump: 0,
            mark_price: r.mark_price.unwrap_or(0) as u64,
            price_change_24h: Some(0.0),
            volume_24h: None,
        })
        .collect();
    
    Ok(markets)
}

/// Get market price history
pub async fn get_market_price_history(
    pool: &PgPool,
    market_id: &str,
    start_time: Option<DateTime<Utc>>,
    end_time: Option<DateTime<Utc>>,
    limit: usize,
) -> Result<Vec<(DateTime<Utc>, u64)>, ApiError> {
    info!("Getting price history for market {} from database", market_id);
    
    let mut query = r#"
        SELECT timestamp, price
        FROM price_history
        WHERE market_id = $1
    "#.to_string();
    
    if let Some(_start) = start_time {
        query += " AND timestamp >= $2";
    }
    
    if let Some(_end) = end_time {
        query += " AND timestamp <= $3";
    }
    
    query += " ORDER BY timestamp DESC LIMIT $4";
    
    // Build the query with the appropriate parameters
    let mut q = sqlx::query_as::<_, (DateTime<Utc>, i64)>(&query)
        .bind(market_id);
    
    if let Some(start) = start_time {
        q = q.bind(start);
    }
    
    if let Some(end) = end_time {
        q = q.bind(end);
    }
    
    q = q.bind(limit as i64);
    
    let records = q.fetch_all(pool).await?;
    
    Ok(records.into_iter().map(|(ts, price)| (ts, price as u64)).collect())
}

/// Get market funding rate history
pub async fn get_market_funding_history(
    pool: &PgPool,
    market_id: &str,
    start_time: Option<DateTime<Utc>>,
    end_time: Option<DateTime<Utc>>,
    limit: usize,
) -> Result<Vec<(DateTime<Utc>, f64)>, ApiError> {
    info!("Getting funding rate history for market {} from database", market_id);
    
    let mut query = r#"
        SELECT timestamp, funding_rate
        FROM funding_rate_history
        WHERE market_id = $1
    "#.to_string();
    
    if let Some(_start) = start_time {
        query += " AND timestamp >= $2";
    }
    
    if let Some(_end) = end_time {
        query += " AND timestamp <= $3";
    }
    
    query += " ORDER BY timestamp DESC LIMIT $4";
    
    // Build the query with the appropriate parameters
    let mut q = sqlx::query_as::<_, (DateTime<Utc>, f64)>(&query)
        .bind(market_id);
    
    if let Some(start) = start_time {
        q = q.bind(start);
    }
    
    if let Some(end) = end_time {
        q = q.bind(end);
    }
    
    q = q.bind(limit as i64);
    
    let records = q.fetch_all(pool).await?;
    
    Ok(records)
}

/// Get markets that need funding rate updates
pub async fn get_markets_needing_funding_update(
    pool: &PgPool,
) -> Result<Vec<Market>, ApiError> {
    info!("Getting markets that need funding rate updates");
    
    let now = Utc::now();
    
    let records = sqlx::query!(
        r#"
        SELECT 
            id, asset_symbol, oracle_address as oracle, oracle_type,
            funding_rate, last_funding_ts, mark_price, index_price,
            fee_bps, max_leverage, min_position_size, min_margin_ratio_bps,
            paused
        FROM markets
        WHERE paused = false 
        AND (
            last_funding_ts + $1 < $2
        )
        "#,
        60 * 60, // 1 hour in seconds
        now.timestamp()
    )
    .fetch_all(pool)
    .await?;
    
    let mut markets = Vec::new();
    
    for record in records {
        markets.push(Market {
            id: record.id,
            asset_symbol: record.asset_symbol,
            oracle: record.oracle,
            oracle_type: record.oracle_type as u8,
            base_asset_reserve: 0, // Default since column doesn't exist
            quote_asset_reserve: 0, // Default since column doesn't exist
            funding_rate: record.funding_rate.unwrap_or(0),
            last_funding_ts: record.last_funding_ts.unwrap_or(0),
            total_long_size: 0, // Default since column doesn't exist
            total_short_size: 0, // Default since column doesn't exist
            max_leverage: record.max_leverage as u8,
            min_margin_ratio_bps: record.min_margin_ratio_bps as u16,
            fee_bps: record.fee_bps as u16,
            is_active: !record.paused.unwrap_or(false),
            authority: Pubkey::default().to_string(), // Default since column doesn't exist
            min_position_size: record.min_position_size as u64,
            bump: 0, // Default since column doesn't exist
            mark_price: record.mark_price.unwrap_or(0) as u64,
            price_change_24h: Some(0.0), // Default since column doesn't exist
            volume_24h: None, // Default since column doesn't exist
        });
    }
    
    Ok(markets)
}

/// Get active markets with additional stats (volume, price change, etc.)
pub async fn get_active_markets_with_stats(
    pool: &PgPool,
) -> Result<Vec<Market>, ApiError> {
    info!("Getting active markets with stats from database");
    
    // Get current timestamp
    let now = Utc::now();
    let day_ago = now - chrono::Duration::hours(24);
    let day_ago_ts = day_ago.timestamp();
    
    let records = sqlx::query!(
        r#"
        SELECT 
            m.id, m.asset_symbol, m.oracle_address as oracle, m.oracle_type,
            m.funding_rate, m.last_funding_ts, m.mark_price, m.index_price,
            m.fee_bps, m.max_leverage, m.min_position_size, m.min_margin_ratio_bps,
            m.paused, 
            -- Volume calculation
            COALESCE(SUM(CASE WHEN p.opened_at >= $1 THEN p.size ELSE 0 END), 0) as volume_24h
        FROM 
            markets m
        LEFT JOIN 
            positions p ON m.id = p.market_id
        WHERE 
            m.paused = false
        GROUP BY 
            m.id, m.asset_symbol, m.oracle_address, m.oracle_type,
            m.funding_rate, m.last_funding_ts, m.mark_price, m.index_price,
            m.fee_bps, m.max_leverage, m.min_position_size, m.min_margin_ratio_bps,
            m.paused
        ORDER BY 
            m.asset_symbol ASC
        "#,
        day_ago_ts
    )
    .fetch_all(pool)
    .await?;
    
    let markets = records.into_iter()
        .map(|r| {
            // Price change calculation - default to 0% since we don't have historical pricing
            let price_change_24h = 0.0;
            
            Market {
                id: r.id,
                asset_symbol: r.asset_symbol,
                oracle: r.oracle,
                oracle_type: r.oracle_type as u8,
                base_asset_reserve: 0,
                quote_asset_reserve: 0,
                funding_rate: r.funding_rate.unwrap_or(0),
                last_funding_ts: r.last_funding_ts.unwrap_or(0),
                total_long_size: 0,
                total_short_size: 0,
                max_leverage: r.max_leverage as u8,
                min_margin_ratio_bps: r.min_margin_ratio_bps as u16,
                fee_bps: r.fee_bps as u16,
                is_active: !r.paused.unwrap_or(false),
                authority: Pubkey::default().to_string(),
                min_position_size: r.min_position_size as u64,
                bump: 0,
                mark_price: r.mark_price.unwrap_or(0) as u64,
                price_change_24h: Some(price_change_24h),
                volume_24h: Some(r.volume_24h.map_or(0, |bd| bd.to_string().parse::<u64>().unwrap_or(0))),
            }
        })
        .collect();
    
    Ok(markets)
} 