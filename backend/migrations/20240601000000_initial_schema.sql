-- Create positions table
CREATE TABLE IF NOT EXISTS positions (
    id UUID PRIMARY KEY,
    wallet TEXT NOT NULL,
    direction TEXT NOT NULL CHECK (direction IN ('long', 'short')),
    size DECIMAL NOT NULL,
    leverage DECIMAL NOT NULL,
    entry_price DECIMAL NOT NULL,
    liquidation_price DECIMAL NOT NULL,
    pnl DECIMAL NOT NULL DEFAULT 0,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on wallet for faster lookups
CREATE INDEX IF NOT EXISTS idx_positions_wallet ON positions(wallet);

-- Create users table to store user metadata
CREATE TABLE IF NOT EXISTS users (
    wallet TEXT PRIMARY KEY,
    total_collateral DECIMAL NOT NULL DEFAULT 0,
    realized_pnl DECIMAL NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 