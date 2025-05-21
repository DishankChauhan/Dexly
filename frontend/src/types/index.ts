// Position type
export interface Position {
  id: string;
  wallet: string;
  direction: 'long' | 'short';
  size: number;
  leverage: number;
  entry_price: number;
  current_price: number;
  liquidation_price: number;
  pnl: number;
  pnl_percentage: number;
  unrealized_funding: number;
  realized_funding: number;
  timestamp: number;
  tx_signature?: string; // Solana transaction signature
  status: 'open' | 'closed' | 'liquidated';
  market_id: string;
  collateral: number;
}

// Price data type
export interface PriceData {
  price: number;
  timestamp: number;
  source?: string; // "pyth" or "simulation"
  price_change_24h?: number;
  price_change_24h_percentage?: number;
}

// Orderbook entry type
export interface OrderbookEntry {
  price: number;
  size: number;
}

// Orderbook data type
export interface OrderbookData {
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
  timestamp: number;
}

// AMM data type
export interface AMMData {
  base_asset_reserve: number;
  quote_asset_reserve: number;
  k_factor: number;
  min_base_asset_reserve: number;
  min_quote_asset_reserve: number;
  max_price_impact_bps: number;
  max_oracle_deviation_bps: number;
}

// Market type
export interface Market {
  id: string;
  asset_symbol: string;
  oracle: string;
  oracle_type: number;
  funding_rate: number;
  last_funding_ts: number;
  mark_price: number;
  index_price?: number;
  max_leverage: number;
  min_margin_ratio_bps: number;
  fee_bps: number;
  is_active: boolean;
  min_position_size: number;
  price_change_24h?: number;
  volume_24h?: number;
  amm_data?: AMMData;
}

// Price impact data
export interface PriceImpactData {
  size: number;
  price_impact: number;
  price_impact_percent: number;
  execution_price: number;
  direction: 'long' | 'short';
}

// Historical funding rate data point
export interface FundingRateDataPoint {
  timestamp: number;
  rate: number;
  mark_price: number;
  index_price: number;
}

// User stats data
export interface UserStats {
  total_volume: number;
  total_fees_paid: number;
  total_trades: number;
  total_realized_pnl: number;
  total_unrealized_pnl: number;
  total_funding_payments: number;
  win_rate: number;
  avg_profit: number;
  avg_loss: number;
  risk_reward_ratio: number;
  longest_win_streak: number;
  longest_lose_streak: number;
}

// Transaction history entry
export interface TransactionHistory {
  id: string;
  wallet: string;
  type: 'deposit' | 'withdrawal' | 'trade' | 'funding' | 'liquidation';
  amount: number;
  timestamp: number;
  tx_signature: string;
  status: 'success' | 'pending' | 'failed';
  details?: string;
} 