import { PublicKey } from '@solana/web3.js';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User & Auth Types
export interface User {
  publicKey: string;
  address: string;
}

export interface AuthenticatedRequest {
  user?: User;
}

// Market Types
export interface Market {
  id: string;
  assetSymbol: string;
  baseAssetReserve: string;
  quoteAssetReserve: string;
  fundingRate: string;
  lastFundingTs: string;
  totalLongSize: string;
  totalShortSize: string;
  maxLeverage: number;
  minMarginRatioBps: number;
  feeBps: number;
  isActive: boolean;
  minPositionSize: string;
  maxPriceImpactBps: number;
  kFactor: string;
  markPrice?: number;
  indexPrice?: number;
  priceChange24h?: number;
  volume24h?: number;
}

// Position Types
export interface Position {
  id: string;
  userKey: string;
  marketId: string;
  isLong: boolean;
  size: string;
  entryPrice: string;
  collateral: string;
  leverage: number;
  openedAt: string;
  lastFundingTs: string;
  realizedPnlFromFunding: string;
  liquidationPrice: string;
  isClosed: boolean;
  unrealizedPnl?: string;
  currentPrice?: string;
  marginRatio?: number;
  healthFactor?: number;
}

// Trade Types
export interface Trade {
  id: string;
  userId: string;
  marketId: string;
  positionId: string;
  orderType: 'MARKET' | 'LIMIT';
  isLong: boolean;
  size: string;
  price: string;
  fee: string;
  timestamp: string;
  txHash?: string;
}

export enum TradeDirection {
  Long = 1,
  Short = 0
}

// PnL Types
export interface PnLSummary {
  totalPnl: number;
  unrealizedPnl: number;
  realizedPnl: number;
  fundingPnl: number;
  totalVolume: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  currentPositions: number;
}

export interface HistoricalPnL {
  date: string;
  dailyPnl: number;
  cumulativePnl: number;
  volume: number;
  trades: number;
  realizedPnl: number;
  unrealizedPnl: number;
  fundingPnl: number;
}

// Portfolio Types
export interface PortfolioOverview {
  totalPortfolioValue: number;
  totalPnl: number;
  totalPnlPercentage: number;
  collateralInUse: number;
  availableBalance: number;
  totalMarginUsed: number;
  marginUtilization: number;
  openPositions: number;
  positionsAtRisk: number;
  averageLeverage: number;
  estimatedLiquidationValue: number;
}

export interface TradingStatistics {
  totalTrades: number;
  totalVolume: number;
  averageTradeSize: number;
  winRate: number;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winningStreaks: number;
  losingStreaks: number;
  averageHoldTime: number;
  tradingFrequency: number;
  bestTrade: number;
  worstTrade: number;
  totalFees: number;
  marketsTraded: string[];
}

// Chart Types
export interface PriceCandle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PriceData {
  price: number;
  confidence: number;
  timestamp: number;
  status: 'trading' | 'halted' | 'auction' | 'unknown';
  source: 'pyth' | 'switchboard' | 'fallback';
}

// Order Types
export interface OrderParams {
  marketId: string;
  direction: TradeDirection;
  size: string;
  price?: string;
  collateral: string;
  leverage: number;
  orderType: 'MARKET' | 'LIMIT';
}

export interface TradeSimulation {
  entryPrice: string;
  liquidationPrice: string;
  fee: string;
  slippage: number;
  maxLeverage: number;
  collateralRequired: string;
  estimatedPnl: {
    at5PercentUp: string;
    at10PercentUp: string;
    at5PercentDown: string;
    at10PercentDown: string;
  };
  fundingRate: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  address: string;
  totalPnl: number;
  totalPnlPercentage: number;
  totalVolume: number;
  winRate: number;
  totalTrades: number;
  rank: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  txHash?: string;
  autoClose?: boolean;
}

// WebSocket Types
export interface WSMessage {
  type: 'price_update' | 'position_update' | 'funding_update' | 'liquidation' | 'trade_executed';
  data: any;
  timestamp: number;
}

// Component Props Types
export interface TradeInputs {
  marketId: string;
  direction: TradeDirection;
  size: string;
  leverage: number;
  orderType: 'MARKET' | 'LIMIT';
  limitPrice?: string;
}

export interface WalletContextType {
  isConnected: boolean;
  publicKey: PublicKey | null;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Loading States
export interface LoadingState {
  markets: boolean;
  positions: boolean;
  portfolio: boolean;
  pnl: boolean;
  stats: boolean;
  orders: boolean;
  simulation: boolean;
}

// Error Types
export interface ErrorState {
  markets: string | null;
  positions: string | null;
  portfolio: string | null;
  pnl: string | null;
  stats: string | null;
  orders: string | null;
  simulation: string | null;
} 