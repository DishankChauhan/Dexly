-- Add missing columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS total_positions_closed INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS total_funding_paid BIGINT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS unrealized_pnl BIGINT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_pubkey TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bump INTEGER DEFAULT 0;

-- Add user_account_snapshots table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_account_snapshots (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    total_account_value BIGINT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update positions table to use text status instead of integer
ALTER TABLE positions
DROP COLUMN IF EXISTS status,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'open';

-- Fix any null values in user fields
UPDATE users SET 
  total_positions_closed = 0 WHERE total_positions_closed IS NULL;
  
UPDATE users SET 
  win_rate = 0 WHERE win_rate IS NULL;
  
-- Rename created_at to timestamp in transactions if needed
-- Note: This isn't actually needed based on our schema check, but SQL will ignore if columns don't exist
ALTER TABLE transactions 
  RENAME COLUMN created_at TO timestamp; 