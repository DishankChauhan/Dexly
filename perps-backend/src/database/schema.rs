use log::{info, error};
use sqlx::{postgres::PgPool, Error};

/// Create all required database tables if they don't exist
pub async fn create_tables(pool: &PgPool) -> Result<(), Error> {
    // Create positions table
    create_positions_table(pool).await?;
    
    // Create orders table
    create_orders_table(pool).await?;
    
    // Create markets table
    create_markets_table(pool).await?;
    
    // Create users table
    create_users_table(pool).await?;
    
    // Create events table
    create_events_table(pool).await?;
    
    // Create funding rate history table
    create_funding_rate_history_table(pool).await?;
    
    // Create price history table
    create_price_history_table(pool).await?;
    
    // Create transactions table
    create_transactions_table(pool).await?;
    
    Ok(())
}

/// Create positions table
async fn create_positions_table(pool: &PgPool) -> Result<(), Error> {
    info!("Creating positions table if not exists");
    
    // Create the table
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS positions (
            id VARCHAR(44) PRIMARY KEY,
            user_id VARCHAR(44) NOT NULL,
            market_id VARCHAR(44) NOT NULL,
            size BIGINT NOT NULL,
            collateral BIGINT NOT NULL,
            entry_price BIGINT NOT NULL,
            liquidation_price BIGINT NOT NULL,
            is_long BOOLEAN NOT NULL,
            leverage INTEGER NOT NULL,
            last_funding_ts BIGINT NOT NULL,
            realized_pnl_from_funding BIGINT NOT NULL,
            is_closed BOOLEAN NOT NULL DEFAULT FALSE,
            bump SMALLINT NOT NULL,
            mark_price BIGINT,
            unrealized_pnl BIGINT,
            margin_ratio FLOAT,
            funding_rate BIGINT,
            opened_at TIMESTAMPTZ NOT NULL,
            closed_at TIMESTAMPTZ,
            closed_price BIGINT,
            is_liquidated BOOLEAN DEFAULT FALSE,
            realized_pnl BIGINT,
            fees_paid BIGINT,
            status VARCHAR(20) NOT NULL
        )"
    )
    .execute(pool)
    .await?;
    
    // Create indexes
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS positions_user_id_idx ON positions (user_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS positions_market_id_idx ON positions (market_id)"
    )
    .execute(pool)
    .await?;
    
    Ok(())
}

/// Create orders table
async fn create_orders_table(pool: &PgPool) -> Result<(), Error> {
    info!("Creating orders table if not exists");
    
    // Create the table
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(44) PRIMARY KEY,
            user_id VARCHAR(44) NOT NULL,
            market_id VARCHAR(44) NOT NULL,
            order_type INTEGER NOT NULL,
            is_long BOOLEAN NOT NULL,
            size BIGINT NOT NULL,
            price BIGINT NOT NULL,
            collateral BIGINT NOT NULL,
            leverage INTEGER NOT NULL,
            is_active BOOLEAN NOT NULL,
            max_slippage_bps INTEGER NOT NULL,
            created_at BIGINT NOT NULL,
            position_id BIGINT NOT NULL,
            bump SMALLINT NOT NULL,
            status VARCHAR(20) NOT NULL,
            mark_price BIGINT,
            timestamp TIMESTAMPTZ NOT NULL
        )"
    )
    .execute(pool)
    .await?;
    
    // Create indexes
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders (user_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS orders_market_id_idx ON orders (market_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status)"
    )
    .execute(pool)
    .await?;
    
    Ok(())
}

/// Create markets table
async fn create_markets_table(pool: &PgPool) -> Result<(), Error> {
    info!("Creating markets table if not exists");
    
    // Create the table
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS markets (
            id VARCHAR(44) PRIMARY KEY,
            asset_symbol VARCHAR(20) NOT NULL,
            oracle VARCHAR(44) NOT NULL,
            oracle_type INTEGER NOT NULL,
            base_asset_reserve BIGINT NOT NULL,
            quote_asset_reserve BIGINT NOT NULL,
            funding_rate BIGINT NOT NULL,
            last_funding_ts BIGINT NOT NULL,
            total_long_size BIGINT NOT NULL,
            total_short_size BIGINT NOT NULL,
            max_leverage INTEGER NOT NULL,
            min_margin_ratio_bps INTEGER NOT NULL,
            fee_bps INTEGER NOT NULL,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            authority VARCHAR(44) NOT NULL,
            min_position_size BIGINT NOT NULL,
            bump INTEGER NOT NULL,
            mark_price BIGINT NOT NULL,
            price_change_24h FLOAT,
            volume_24h BIGINT,
            created_at TIMESTAMPTZ NOT NULL,
            updated_at TIMESTAMPTZ NOT NULL
        )"
    )
    .execute(pool)
    .await?;
    
    // Create index
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS markets_asset_symbol_idx ON markets (asset_symbol)"
    )
    .execute(pool)
    .await?;
    
    Ok(())
}

/// Create users table
async fn create_users_table(pool: &PgPool) -> Result<(), Error> {
    info!("Creating users table if not exists");
    
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(44) PRIMARY KEY,
            user_pubkey VARCHAR(44) NOT NULL,
            collateral_balance BIGINT NOT NULL,
            realized_pnl BIGINT NOT NULL,
            unrealized_pnl BIGINT,
            open_positions INTEGER NOT NULL,
            bump SMALLINT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL,
            updated_at TIMESTAMPTZ NOT NULL,
            total_volume BIGINT NOT NULL DEFAULT 0,
            total_fees_paid BIGINT NOT NULL DEFAULT 0,
            total_funding_paid BIGINT NOT NULL DEFAULT 0,
            total_positions_closed INTEGER NOT NULL DEFAULT 0,
            total_liquidations INTEGER NOT NULL DEFAULT 0,
            win_rate FLOAT
        )"
    )
    .execute(pool)
    .await?;
    
    Ok(())
}

/// Create events table
async fn create_events_table(pool: &PgPool) -> Result<(), Error> {
    info!("Creating events table if not exists");
    
    // Create the table
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            event_type VARCHAR(30) NOT NULL,
            signature VARCHAR(88),
            user_id VARCHAR(44),
            market_id VARCHAR(44),
            position_id VARCHAR(44),
            order_id VARCHAR(44),
            data JSONB,
            created_at TIMESTAMPTZ NOT NULL,
            slot BIGINT,
            block_time BIGINT
        )"
    )
    .execute(pool)
    .await?;
    
    // Create indexes
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS events_event_type_idx ON events (event_type)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS events_user_id_idx ON events (user_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS events_market_id_idx ON events (market_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS events_position_id_idx ON events (position_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS events_order_id_idx ON events (order_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS events_slot_idx ON events (slot)"
    )
    .execute(pool)
    .await?;
    
    Ok(())
}

/// Create funding rate history table
async fn create_funding_rate_history_table(pool: &PgPool) -> Result<(), Error> {
    info!("Creating funding_rate_history table if not exists");
    
    // Create the table
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS funding_rate_history (
            id SERIAL PRIMARY KEY,
            market_id VARCHAR(44) NOT NULL,
            funding_rate FLOAT NOT NULL,
            timestamp TIMESTAMPTZ NOT NULL,
            mark_price BIGINT NOT NULL,
            index_price BIGINT NOT NULL
        )"
    )
    .execute(pool)
    .await?;
    
    // Create indexes
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS funding_rate_market_idx ON funding_rate_history (market_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS funding_rate_timestamp_idx ON funding_rate_history (timestamp)"
    )
    .execute(pool)
    .await?;
    
    Ok(())
}

/// Create price history table
async fn create_price_history_table(pool: &PgPool) -> Result<(), Error> {
    info!("Creating price_history table if not exists");
    
    // Create the table
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS price_history (
            id SERIAL PRIMARY KEY,
            market_id VARCHAR(44) NOT NULL,
            price BIGINT NOT NULL,
            timestamp TIMESTAMPTZ NOT NULL,
            source VARCHAR(20) NOT NULL
        )"
    )
    .execute(pool)
    .await?;
    
    // Create indexes
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS price_history_market_idx ON price_history (market_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS price_history_timestamp_idx ON price_history (timestamp)"
    )
    .execute(pool)
    .await?;
    
    Ok(())
}

/// Create transactions table
async fn create_transactions_table(pool: &PgPool) -> Result<(), Error> {
    info!("Creating transactions table if not exists");
    
    // Create the table
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS transactions (
            signature VARCHAR(88) PRIMARY KEY,
            user_id VARCHAR(44) NOT NULL,
            transaction_type VARCHAR(30) NOT NULL,
            amount BIGINT,
            fee BIGINT,
            status VARCHAR(20) NOT NULL,
            data JSONB,
            timestamp TIMESTAMPTZ NOT NULL,
            slot BIGINT,
            block_time BIGINT
        )"
    )
    .execute(pool)
    .await?;
    
    // Create indexes
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS transactions_user_idx ON transactions (user_id)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS transactions_type_idx ON transactions (transaction_type)"
    )
    .execute(pool)
    .await?;
    
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS transactions_timestamp_idx ON transactions (timestamp)"
    )
    .execute(pool)
    .await?;
    
    Ok(())
} 