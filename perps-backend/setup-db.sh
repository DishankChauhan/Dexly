#!/bin/bash

# Exit on error
set -e

echo "Setting up perps_db database..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL client not found. Please install PostgreSQL."
    exit 1
fi

# Create database if it doesn't exist
echo "Creating database if it doesn't exist..."
psql -c "SELECT 1 FROM pg_database WHERE datname = 'perps_db'" | grep -q 1 || psql -c "CREATE DATABASE perps_db"

# Connect to the database and set up schema
echo "Setting up schema..."
psql -d perps_db -c "
-- Create tables if they don't exist

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    email TEXT,
    avatar_url TEXT,
    collateral BIGINT DEFAULT 0,
    open_positions INTEGER DEFAULT 0,
    realized_pnl BIGINT DEFAULT 0,
    total_volume BIGINT DEFAULT 0,
    total_fees_paid BIGINT DEFAULT 0,
    win_count INTEGER DEFAULT 0,
    loss_count INTEGER DEFAULT 0,
    win_rate REAL DEFAULT 0,
    liquidation_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Markets table
CREATE TABLE IF NOT EXISTS markets (
    id TEXT PRIMARY KEY,
    asset_symbol TEXT NOT NULL,
    oracle_address TEXT NOT NULL,
    oracle_type INTEGER NOT NULL,
    funding_rate BIGINT DEFAULT 0,
    last_funding_ts BIGINT DEFAULT 0,
    mark_price BIGINT DEFAULT 0,
    index_price BIGINT DEFAULT 0,
    fee_bps INTEGER NOT NULL,
    max_leverage INTEGER NOT NULL,
    min_position_size BIGINT NOT NULL,
    min_margin_ratio_bps INTEGER NOT NULL,
    paused BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Positions table
CREATE TABLE IF NOT EXISTS positions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    market_id TEXT NOT NULL REFERENCES markets(id),
    is_long BOOLEAN NOT NULL,
    size BIGINT NOT NULL,
    entry_price BIGINT NOT NULL,
    collateral BIGINT NOT NULL,
    leverage INTEGER NOT NULL,
    liquidation_price BIGINT NOT NULL,
    opened_at BIGINT NOT NULL,
    closed_at BIGINT,
    exit_price BIGINT,
    realized_pnl BIGINT,
    is_closed BOOLEAN DEFAULT FALSE,
    status INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    market_id TEXT NOT NULL REFERENCES markets(id),
    order_type INTEGER NOT NULL,
    is_long BOOLEAN NOT NULL,
    size BIGINT NOT NULL,
    price BIGINT NOT NULL,
    collateral BIGINT NOT NULL,
    leverage INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    status INTEGER DEFAULT 0,
    filled_at BIGINT,
    canceled_at BIGINT,
    created_at BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Market price history
CREATE TABLE IF NOT EXISTS market_prices (
    id SERIAL PRIMARY KEY,
    market_id TEXT NOT NULL REFERENCES markets(id),
    mark_price BIGINT NOT NULL,
    index_price BIGINT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Funding rate history
CREATE TABLE IF NOT EXISTS funding_rates (
    id SERIAL PRIMARY KEY,
    market_id TEXT NOT NULL REFERENCES markets(id),
    funding_rate BIGINT NOT NULL,
    mark_price BIGINT NOT NULL,
    index_price BIGINT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    signature TEXT,
    user_id TEXT,
    market_id TEXT,
    position_id TEXT,
    order_id TEXT,
    data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    slot BIGINT,
    block_time BIGINT
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    signature TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    transaction_type TEXT NOT NULL,
    amount BIGINT NOT NULL,
    fee BIGINT DEFAULT 0,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data JSONB
);
"

echo "Database setup complete!" 