import { PublicKey } from '@solana/web3.js';

// Market state interface
export interface Market {
  market: PublicKey;
  oracle: PublicKey;
  assetSymbol: Uint8Array;
  oracleType: number;
  baseAssetReserve: bigint;
  quoteAssetReserve: bigint;
  fundingRate: bigint;
  lastFundingTs: bigint;
  totalLongSize: bigint;
  totalShortSize: bigint;
  maxLeverage: number;
  minMarginRatioBps: number;
  feeBps: number;
  isActive: boolean;
  authority: PublicKey;
  minPositionSize: bigint;
  maxPriceImpactBps: number;
  kFactor: bigint;
  minBaseAssetReserve: bigint;
  minQuoteAssetReserve: bigint;
  maxOracleDeviationBps: number;
  bump?: number;
}

// Position state interface
export interface Position {
  id: string;
  user: PublicKey;
  market: PublicKey;
  isLong: boolean;
  size: bigint;
  collateral: bigint;
  entryPrice: bigint;
  leverage: number;
  liquidationPrice: bigint;
  openedAt: bigint;
  closedAt: bigint;
  lastFundingTs: bigint;
  isClosed: boolean;
  realizedPnlFromFunding: bigint;
  status?: PositionStatus;
}

// User state interface
export interface User {
  user: PublicKey;
  collateralBalance: bigint;
  openPositions: number;
  positions: PublicKey[];
  realizedPnl: bigint;
  bump: number;
}

// Trade direction enum
export enum TradeDirection {
  Long = 0,
  Short = 1
}

// Order type enum
export enum OrderType {
  Market = 0,
  Limit = 1,
  StopLoss = 2, 
  TakeProfit = 3
}

// Oracle types
export enum OracleType {
  Pyth = 0,
  Switchboard = 1,
  Mock = 2
}

// Position status
export enum PositionStatus {
  Open = 'open',
  Closed = 'closed',
  Liquidated = 'liquidated'
}

// Types for trade simulation
export interface SimulateTradeParams {
  marketId: string;
  direction: TradeDirection;
  size: bigint;
  collateral: bigint;
  leverage: number;
}

export interface SimulateTradeResult {
  entryPrice: bigint;
  liquidationPrice: bigint;
  fee: bigint;
  slippage: number;
  maxLeverage: number;
  collateralRequired: bigint;
  estimatedPnl: {
    at5PercentUp: bigint;
    at10PercentUp: bigint;
    at5PercentDown: bigint;
    at10PercentDown: bigint;
  };
  fundingRate: bigint;
}

// Types for positions
export interface OpenPositionParams {
  marketId: string;
  direction: TradeDirection;
  size: bigint;
  collateral: bigint;
  leverage: number;
  userKey: string;
}

export interface ClosePositionParams {
  positionId: string;
  userKey: string;
  maxSlippageBps?: number;
}

// Types for market data
export interface MarketData {
  marketId: string;
  assetSymbol: string;
  markPrice: bigint;
  indexPrice: bigint;
  fundingRate: bigint;
  nextFundingTime: number;
  totalLongSize: bigint;
  totalShortSize: bigint;
  openInterest: bigint;
  volume24h: bigint;
}

// Events interface
export interface LiquidationEvent {
  positionId: string;
  marketId: string;
  user: string;
  liquidator: string;
  liquidationPrice: bigint;
  collateralReturned: bigint;
  fee: bigint;
  timestamp: bigint;
}

export interface FundingEvent {
  marketId: string;
  fundingRate: bigint;
  markPrice: bigint;
  indexPrice: bigint;
  timestamp: bigint;
}

export interface TradeEvent {
  positionId: string;
  marketId: string;
  user: string;
  direction: TradeDirection;
  size: bigint;
  price: bigint;
  collateral: bigint;
  leverage: number;
  fee: bigint;
  timestamp: bigint;
}

// Order interface
export interface Order {
  id: string;
  user: PublicKey;
  market: PublicKey;
  orderType: OrderType;
  isLong: boolean;
  size: bigint;
  price: bigint;
  collateral: bigint;
  leverage: number;
  isActive: boolean;
  maxSlippageBps: number;
  createdAt: bigint;
  positionId: string;
  executionPrice?: bigint;
  fee?: bigint;
}

// Liquidation interface
export interface Liquidation {
  id: string;
  positionId: string;
  marketId: string;
  liquidator: string;
  liquidationPrice: string;
  collateralReturned: string;
  fee: string;
  txHash: string;
  timestamp: string;
}

// vAMM configuration for performance optimization
export interface VAMMConfig {
  baseAssetReserve: bigint;
  quoteAssetReserve: bigint;
  kFactor: bigint;
  maxPriceImpactBps: number;
  minBaseAssetReserve: bigint;
  minQuoteAssetReserve: bigint;
  maxOracleDeviationBps: number;
}

// Position database model
export interface PositionModel {
  id: string;
  user: string;
  marketId: string;
  isLong: boolean;
  size: string;
  collateral: string;
  entryPrice: string;
  liquidationPrice: string;
  leverage: number;
  openedAt: string;
  closedAt: string | null;
  lastFundingTs: string;
  isClosed: boolean;
  realizedPnlFromFunding: string;
  txHash: string | null;
  status: string;
}

// Funding payment model
export interface FundingPayment {
  id: string;
  marketId: string;
  positionId: string;
  amount: string;
  rate: string;
  timestamp: string;
}

// Funding settlement model
export interface FundingSettlement {
  id: string;
  marketId: string;
  timestamp: string;
  rate: string;
  totalAmount: string;
  longAmount: string;
  shortAmount: string;
  positionCount: number;
}

// Liquidation attempt model
export interface LiquidationAttempt {
  id: string;
  positionId: string;
  marketId: string;
  timestamp: string;
  currentPrice: string;
  liquidationPrice: string;
  status: 'ATTEMPTED' | 'SUCCESS' | 'FAILED';
}

// System health record
export interface SystemHealth {
  id: string;
  component: string;
  status: string;
  metrics: string;
  timestamp: string;
} 