use crate::models::error::ApiError;
use crate::models::user::{User, UserStats, PnLMetrics, TradingMetrics};
use chrono::{DateTime, Utc};
use log::{info, error};
use sqlx::{PgPool, postgres::PgQueryResult};
use anchor_client::solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

/// Insert a new user into the database
pub async fn insert_user(
    pool: &PgPool,
    user_id: &str,
    user_pubkey: &str,
    bump: u8,
) -> Result<PgQueryResult, ApiError> {
    info!("Creating new user {} in database", user_id);
    
    let result = sqlx::query(
        "INSERT INTO users (
            id, user_pubkey, collateral, realized_pnl, unrealized_pnl, 
            open_positions, bump, created_at, last_login
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
    )
    .bind(user_id)
    .bind(user_pubkey)
    .bind(0i64) // Initial collateral balance
    .bind(0i64) // Initial realized PnL
    .bind::<Option<i64>>(None) // Initial unrealized PnL
    .bind(0i32) // Initial open positions
    .bind(bump as i16) // Bump seed for PDA
    .bind(Utc::now())
    .bind(Utc::now())
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update user collateral balance
pub async fn update_user_collateral(
    pool: &PgPool,
    user_id: &str,
    amount: i64,
    is_addition: bool,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating collateral for user {} by {}{}", user_id, 
           if is_addition { "+" } else { "-" }, amount);
    
    // Use SQL operator to either add or subtract based on is_addition flag
    let operator = if is_addition { "+" } else { "-" };
    
    let query = format!(
        "UPDATE users SET 
            collateral = collateral {} $1,
            last_login = $2
         WHERE id = $3",
        operator
    );
    
    let result = sqlx::query(&query)
        .bind(amount.abs()) // Use absolute value since operator handles sign
        .bind(Utc::now())
        .bind(user_id)
        .execute(pool)
        .await?;
    
    Ok(result)
}

/// Update user's realized PnL
pub async fn update_user_realized_pnl(
    pool: &PgPool,
    user_id: &str,
    pnl: i64,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating realized PnL for user {} by {}", user_id, pnl);
    
    let result = sqlx::query(
        "UPDATE users SET 
            realized_pnl = realized_pnl + $1,
            last_login = $2
         WHERE id = $3"
    )
    .bind(pnl)
    .bind(Utc::now())
    .bind(user_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update user's open positions count
pub async fn update_user_open_positions(
    pool: &PgPool,
    user_id: &str,
    count_change: i32,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating open positions count for user {} by {}", user_id, count_change);
    
    let result = sqlx::query(
        "UPDATE users SET 
            open_positions = open_positions + $1,
            last_login = $2
         WHERE id = $3"
    )
    .bind(count_change)
    .bind(Utc::now())
    .bind(user_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update user's unrealized PnL
pub async fn update_user_unrealized_pnl(
    pool: &PgPool,
    user_id: &str,
    unrealized_pnl: i64,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating unrealized PnL for user {} to {}", user_id, unrealized_pnl);
    
    let result = sqlx::query(
        "UPDATE users SET 
            unrealized_pnl = $1,
            last_login = $2
         WHERE id = $3"
    )
    .bind(unrealized_pnl)
    .bind(Utc::now())
    .bind(user_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update user stats after a trade
pub async fn update_user_trade_stats(
    pool: &PgPool,
    user_id: &str,
    volume: u64,
    fees_paid: u64,
    is_win: bool,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating trade stats for user {}", user_id);
    
    // Get current user stats
    let user = sqlx::query!(
        r#"
        SELECT 
            total_volume, total_fees_paid, total_positions_closed,
            win_rate
        FROM users
        WHERE id = $1
        "#,
        user_id
    )
    .fetch_one(pool)
    .await?;
    
    // Calculate new win rate
    let total_positions = user.total_positions_closed.unwrap_or(0) + 1;
    let current_wins = if let Some(win_rate) = user.win_rate {
        (win_rate as f64 * user.total_positions_closed.unwrap_or_default() as f64).round() as i64
    } else {
        0
    };
    
    let new_wins = if is_win { current_wins + 1 } else { current_wins };
    let new_win_rate = new_wins as f64 / total_positions as f64;
    
    // Update user stats
    let result = sqlx::query(
        "UPDATE users SET 
            total_volume = total_volume + $1,
            total_fees_paid = total_fees_paid + $2,
            total_positions_closed = total_positions_closed + 1,
            win_rate = $3,
            last_login = $4
         WHERE id = $5"
    )
    .bind(volume as i64)
    .bind(fees_paid as i64)
    .bind(new_win_rate)
    .bind(Utc::now())
    .bind(user_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update user liquidation stats
pub async fn update_user_liquidation_stats(
    pool: &PgPool,
    user_id: &str,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating liquidation stats for user {}", user_id);
    
    let result = sqlx::query(
        "UPDATE users SET 
            liquidation_count = liquidation_count + 1,
            last_login = $1
         WHERE id = $2"
    )
    .bind(Utc::now())
    .bind(user_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Update user funding payment stats
pub async fn update_user_funding_stats(
    pool: &PgPool,
    user_id: &str,
    funding_paid: i64,
) -> Result<PgQueryResult, ApiError> {
    info!("Updating funding payment stats for user {}", user_id);
    
    let result = sqlx::query(
        "UPDATE users SET 
            total_funding_paid = total_funding_paid + $1,
            last_login = $2
         WHERE id = $3"
    )
    .bind(funding_paid)
    .bind(Utc::now())
    .bind(user_id)
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Get a user by ID from the database
pub async fn get_user(
    pool: &PgPool,
    user_id: &str,
) -> Result<User, ApiError> {
    info!("Getting user {} from database", user_id);
    
    let record = sqlx::query!(
        r#"
        SELECT 
            id, user_pubkey, collateral, realized_pnl, unrealized_pnl, 
            open_positions, bump, created_at, last_login,
            total_volume, total_fees_paid, total_funding_paid,
            total_positions_closed, liquidation_count, win_rate
        FROM users
        WHERE id = $1
        "#,
        user_id
    )
    .fetch_one(pool)
    .await?;
    
    // Get user's positions
    let positions = sqlx::query!(
        r#"
        SELECT id
        FROM positions 
        WHERE user_id = $1 AND status = 'open'
        ORDER BY opened_at DESC
        "#,
        user_id
    )
    .fetch_all(pool)
    .await?;
    
    let position_ids = positions.into_iter().map(|p| p.id).collect();
    
    // Calculate account equity change over 24 hours
    let day_ago = Utc::now() - chrono::Duration::hours(24);
    let account_stats = sqlx::query!(
        r#"
        SELECT total_account_value
        FROM user_account_snapshots
        WHERE user_id = $1 AND timestamp >= $2
        ORDER BY timestamp ASC
        LIMIT 1
        "#,
        user_id,
        day_ago
    )
    .fetch_optional(pool)
    .await?;
    
    // Safely unwrap values from the record with default values for NULL
    let collateral = record.collateral.unwrap_or(0);
    let realized_pnl = record.realized_pnl.unwrap_or(0);
    let unrealized_pnl = record.unrealized_pnl.unwrap_or(0);
    let user_pubkey = record.user_pubkey.unwrap_or_else(|| "".to_string());
    let open_positions = record.open_positions.unwrap_or(0);
    let bump = record.bump.unwrap_or(0);
    
    let account_equity_change_24h = match account_stats {
        Some(stats) => {
            let current_total = (collateral + unrealized_pnl) as f64;
            let previous_total = stats.total_account_value as f64;
            
            if previous_total > 0.0 {
                Some((current_total - previous_total) / previous_total)
            } else {
                None
            }
        },
        _ => None
    };
    
    Ok(User {
        user: user_pubkey,
        collateral_balance: collateral as u64,
        open_positions: open_positions as u8,
        realized_pnl,
        positions: position_ids,
        bump: bump as u8,
        total_account_value: (collateral + unrealized_pnl).max(0) as u64,
        unrealized_pnl: Some(unrealized_pnl),
        account_equity_change_24h,
    })
}

/// Get user statistics
pub async fn get_user_stats(
    pool: &PgPool,
    user_id: &str,
) -> Result<UserStats, ApiError> {
    info!("Getting stats for user {} from database", user_id);
    
    let record = sqlx::query!(
        r#"
        SELECT 
            id, total_volume, total_fees_paid, total_positions_closed,
            realized_pnl, unrealized_pnl, total_funding_paid,
            win_rate
        FROM users
        WHERE id = $1
        "#,
        user_id
    )
    .fetch_one(pool)
    .await?;
    
    // Get deposits and withdrawals
    let deposits = sqlx::query!(
        r#"
        SELECT COALESCE(SUM(amount)::BIGINT, 0) as total
        FROM transactions
        WHERE user_id = $1 AND transaction_type = 'Deposit' AND status = 'Success'
        "#,
        user_id
    )
    .fetch_one(pool)
    .await?;
    
    let withdrawals = sqlx::query!(
        r#"
        SELECT COALESCE(SUM(amount)::BIGINT, 0) as total
        FROM transactions
        WHERE user_id = $1 AND transaction_type = 'Withdrawal' AND status = 'Success'
        "#,
        user_id
    )
    .fetch_one(pool)
    .await?;
    
    // Get trading metrics - cast to BIGINT to avoid NUMERIC type issues
    let trading_metrics = sqlx::query!(
        r#"
        SELECT 
            COALESCE(AVG(CASE WHEN realized_pnl > 0 THEN realized_pnl END)::BIGINT, 0) as avg_profit,
            COALESCE(AVG(CASE WHEN realized_pnl < 0 THEN realized_pnl END)::BIGINT, 0) as avg_loss
        FROM positions
        WHERE user_id = $1 AND status != 'open'
        "#,
        user_id
    )
    .fetch_one(pool)
    .await?;
    
    // Calculate risk-reward ratio - safely handle unwrapping
    let avg_profit = trading_metrics.avg_profit.unwrap_or(0);
    let avg_loss = trading_metrics.avg_loss.unwrap_or(0);
    
    let risk_reward_ratio = if avg_loss != 0 {
        (avg_profit as f64 / avg_loss.abs() as f64)
    } else {
        0.0
    };
    
    // Streak stats
    let streaks = sqlx::query!(
        r#"
        WITH position_results AS (
            SELECT 
                id,
                realized_pnl > 0 as is_profit,
                closed_at
            FROM positions
            WHERE user_id = $1 AND status != 'open'
            ORDER BY closed_at ASC
        ),
        streak_changes AS (
            SELECT 
                id,
                is_profit,
                closed_at,
                LAG(is_profit) OVER (ORDER BY closed_at) != is_profit OR
                LAG(is_profit) OVER (ORDER BY closed_at) IS NULL as streak_start
            FROM position_results
        ),
        streaks AS (
            SELECT 
                id,
                is_profit,
                SUM(CASE WHEN streak_start THEN 1 ELSE 0 END) OVER (ORDER BY closed_at) as streak_id
            FROM streak_changes
        ),
        streak_lengths AS (
            SELECT 
                streak_id,
                is_profit,
                COUNT(*) as streak_length
            FROM streaks
            GROUP BY streak_id, is_profit
        )
        SELECT 
            MAX(CASE WHEN is_profit THEN streak_length ELSE 0 END) as max_win_streak,
            MAX(CASE WHEN NOT is_profit THEN streak_length ELSE 0 END) as max_lose_streak
        FROM streak_lengths
        "#,
        user_id
    )
    .fetch_one(pool)
    .await?;
    
    // Unwrap all Option values with safe defaults
    let total_deposits = deposits.total.unwrap_or(0) as u64;
    let total_withdrawals = withdrawals.total.unwrap_or(0) as u64;
    
    Ok(UserStats {
        user: record.id,
        total_volume: record.total_volume.unwrap_or(0) as u64,
        total_fees_paid: record.total_fees_paid.unwrap_or(0) as u64,
        total_trades: record.total_positions_closed.unwrap_or(0) as u64,
        pnl_metrics: PnLMetrics {
            total_realized_pnl: record.realized_pnl.unwrap_or(0),
            total_unrealized_pnl: record.unrealized_pnl.unwrap_or(0),
            total_funding_payments: record.total_funding_paid.unwrap_or(0),
            total_deposits,
            total_withdrawals,
        },
        trading_metrics: TradingMetrics {
            win_rate: record.win_rate.unwrap_or(0.0) as f64,
            avg_profit: avg_profit as f64,
            avg_loss: avg_loss as f64,
            risk_reward_ratio,
            longest_win_streak: streaks.max_win_streak.unwrap_or(0) as u32,
            longest_lose_streak: streaks.max_lose_streak.unwrap_or(0) as u32,
        },
    })
}

/// Take a snapshot of user account value for historical tracking
pub async fn record_account_value_snapshot(
    pool: &PgPool,
    user_id: &str,
    total_account_value: u64,
) -> Result<PgQueryResult, ApiError> {
    info!("Recording account value snapshot for user {}", user_id);
    
    let result = sqlx::query(
        "INSERT INTO user_account_snapshots (
            user_id, total_account_value, timestamp
        ) VALUES ($1, $2, $3)"
    )
    .bind(user_id)
    .bind(total_account_value as i64)
    .bind(Utc::now())
    .execute(pool)
    .await?;
    
    Ok(result)
}

/// Get top users by total volume
pub async fn get_top_users_by_volume(
    pool: &PgPool,
    limit: usize,
) -> Result<Vec<(String, u64)>, ApiError> {
    info!("Getting top users by trading volume (limit: {})", limit);
    
    let records = sqlx::query!(
        r#"
        SELECT id, total_volume
        FROM users
        WHERE total_volume > 0
        ORDER BY total_volume DESC
        LIMIT $1
        "#,
        limit as i64
    )
    .fetch_all(pool)
    .await?;
    
    Ok(records.into_iter()
        .map(|r| (r.id, r.total_volume.unwrap_or_default() as u64))
        .collect())
}

/// Get top users by profit
pub async fn get_top_users_by_profit(
    pool: &PgPool,
    limit: usize,
) -> Result<Vec<(String, i64)>, ApiError> {
    info!("Getting top users by profit (limit: {})", limit);
    
    let records = sqlx::query!(
        r#"
        SELECT id, realized_pnl
        FROM users
        WHERE realized_pnl > 0
        ORDER BY realized_pnl DESC
        LIMIT $1
        "#,
        limit as i64
    )
    .fetch_all(pool)
    .await?;
    
    Ok(records.into_iter()
        .map(|r| (r.id, r.realized_pnl.unwrap_or_default()))
        .collect())
}

/// Get top users by win rate (minimum 10 trades)
pub async fn get_top_users_by_win_rate(
    pool: &PgPool,
    limit: usize,
) -> Result<Vec<(String, f64)>, ApiError> {
    info!("Getting top users by win rate (limit: {})", limit);
    
    let records = sqlx::query!(
        r#"
        SELECT id, win_rate
        FROM users
        WHERE total_positions_closed >= 10 AND win_rate IS NOT NULL
        ORDER BY win_rate DESC
        LIMIT $1
        "#,
        limit as i64
    )
    .fetch_all(pool)
    .await?;
    
    Ok(records.into_iter()
        .map(|r| (r.id, r.win_rate.unwrap_or_default() as f64))
        .collect())
} 