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
  timestamp: number;
  tx_signature?: string; // Solana transaction signature
}

// Price data type
export interface PriceData {
  price: number;
  timestamp: number;
  source?: string; // "pyth" or "simulation"
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