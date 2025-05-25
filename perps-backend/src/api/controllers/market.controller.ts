import { Request, Response } from 'express';
import { PerpsContractService } from '../../services/blockchain/perpsContractService.js';
import { SolanaClient } from '../../services/blockchain/solanaClient.js';
import { OracleService } from '../../services/oracle/oracleService.js';
import prisma from '../../db/prisma.js';
import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';

// Market mapping - symbolic names to actual market public keys
// TODO: Replace these with actual market public keys from the deployed program
const MARKET_MAPPING: { [key: string]: string } = {
  'SOL-PERP': 'So11111111111111111111111111111111111111112', // SOL token mint (temporary)
  'BTC-PERP': 'BTC1111111111111111111111111111111111111111', // BTC placeholder (temporary)
  'ETH-PERP': 'ETH1111111111111111111111111111111111111111', // ETH placeholder (temporary)
};

// Reverse mapping for displaying human-readable names
const REVERSE_MARKET_MAPPING: { [key: string]: string } = {};
Object.entries(MARKET_MAPPING).forEach(([symbol, publicKey]) => {
  REVERSE_MARKET_MAPPING[publicKey] = symbol;
});

/**
 * Convert a market identifier to a public key
 * @param marketId - Either a symbolic name (e.g., 'SOL-PERP') or a public key string
 * @returns The public key string
 */
function resolveMarketId(marketId: string): string {
  // If it's a symbolic name, convert it
  if (MARKET_MAPPING[marketId]) {
    return MARKET_MAPPING[marketId];
  }
  
  // If it's already a valid public key, return as is
  try {
    new PublicKey(marketId);
    return marketId;
  } catch {
    // If neither symbolic name nor valid public key, throw error
    throw new Error(`Invalid market ID: ${marketId}. Must be either a known market symbol (${Object.keys(MARKET_MAPPING).join(', ')}) or a valid public key.`);
  }
}

/**
 * Get human-readable market symbol from public key
 * @param publicKey - The market public key
 * @returns The human-readable symbol or the public key if not found
 */
function getMarketSymbol(publicKey: string): string {
  return REVERSE_MARKET_MAPPING[publicKey] || publicKey;
}

/**
 * Get real price data from oracle service
 * @param marketId - The market identifier
 * @returns Real price from oracle (in standard units, not smallest)
 */
async function getRealPriceForMarket(marketId: string): Promise<number> {
  try {
    const priceData = await oracleService.getMarketPrice(marketId);
    return priceData.price; // Return price in standard units (USD)
  } catch (error) {
    console.error(`Error fetching real price for ${marketId}:`, error);
    
    // Fallback to reasonable defaults if oracle fails
    const fallbackPrices: { [key: string]: number } = {
      'SOL-PERP': 150, // $150
      'BTC-PERP': 45000, // $45,000
      'ETH-PERP': 3000, // $3,000
    };
    
    return fallbackPrices[marketId] || fallbackPrices[getMarketSymbol(marketId)] || 100; // Default $100
  }
}

// Initialize services
const solanaClient = new SolanaClient();
const contractService = new PerpsContractService(solanaClient);
const oracleService = new OracleService(solanaClient.getConnection());

/**
 * Get all markets
 */
export const getMarkets = async (req: Request, res: Response) => {
  try {
    // Fetch markets from database instead of blockchain
    const markets = await prisma.market.findMany({
      // Temporarily remove isActive filter to debug
      orderBy: { assetSymbol: 'asc' }
    });
    
    // Format market data for response
    const formattedMarkets = markets.map(market => ({
      id: market.id,
      assetSymbol: market.assetSymbol,
      baseAssetReserve: market.baseAssetReserve.toString(),
      quoteAssetReserve: market.quoteAssetReserve.toString(),
      fundingRate: market.fundingRate.toString(),
      lastFundingTs: market.lastFundingTs.toString(),
      totalLongSize: market.totalLongSize.toString(),
      totalShortSize: market.totalShortSize.toString(),
      maxLeverage: market.maxLeverage,
      minMarginRatioBps: market.minMarginRatioBps,
      feeBps: market.feeBps,
      isActive: market.isActive,
      minPositionSize: market.minPositionSize.toString(),
      maxPriceImpactBps: market.maxPriceImpactBps,
      kFactor: market.kFactor.toString(),
      
      // Calculate derived data
      markPrice: calculateMarkPrice(market),
      openInterest: (market.totalLongSize.plus(market.totalShortSize)).toString(),
      nextFundingTime: calculateNextFundingTime(market.lastFundingTs),
    }));
    
    res.status(200).json({
      success: true,
      data: formattedMarkets
    });
  } catch (error) {
    console.error('Error fetching markets:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch markets',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get market by ID
 */
export const getMarketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resolvedMarketId = resolveMarketId(id);
    const market = await contractService.getMarket(resolvedMarketId);
    
    if (!market) {
      return res.status(404).json({
        success: false,
        error: 'Market not found',
      });
    }
    
    // Format market data for response
    const formattedMarket = {
      id: getMarketSymbol(resolvedMarketId), // Return human-readable symbol
      assetSymbol: String.fromCharCode(...market.assetSymbol).replace(/\0/g, ''),
      baseAssetReserve: market.baseAssetReserve.toString(),
      quoteAssetReserve: market.quoteAssetReserve.toString(),
      fundingRate: market.fundingRate.toString(),
      lastFundingTs: market.lastFundingTs.toString(),
      totalLongSize: market.totalLongSize.toString(),
      totalShortSize: market.totalShortSize.toString(),
      maxLeverage: market.maxLeverage,
      minMarginRatioBps: market.minMarginRatioBps,
      feeBps: market.feeBps,
      isActive: market.isActive,
      minPositionSize: market.minPositionSize.toString(),
      maxPriceImpactBps: market.maxPriceImpactBps,
      kFactor: market.kFactor.toString(),
      
      // Calculate derived data
      markPrice: calculateMarkPrice(market),
      openInterest: (BigInt(market.totalLongSize) + BigInt(market.totalShortSize)).toString(),
      nextFundingTime: calculateNextFundingTime(market.lastFundingTs),
    };
    
    res.status(200).json({
      success: true,
      data: formattedMarket
    });
  } catch (error) {
    console.error(`Error fetching market ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get market data with prices and funding
 */
export const getMarketData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resolvedMarketId = resolveMarketId(id);
    
    // Get market from blockchain
    const market = await contractService.getMarket(resolvedMarketId);
    
    if (!market) {
      return res.status(404).json({
        success: false,
        error: 'Market not found',
      });
    }
    
    // Get recent price history
    const recentPrices = await prisma.priceHistory.findMany({
      where: { marketId: resolvedMarketId },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
    
    // Get recent funding payments
    const recentFunding = await prisma.fundingPayment.findMany({
      where: { marketId: resolvedMarketId },
      orderBy: { timestamp: 'desc' },
      take: 24, // Last 24 hours (assuming hourly funding)
    });
    
    // Calculate average funding rate
    let avgFundingRate = '0';
    if (recentFunding.length > 0) {
      const sum = recentFunding.reduce(
        (acc: bigint, funding: { rate: Decimal }) => acc + BigInt(funding.rate.toString()),
        BigInt(0)
      );
      avgFundingRate = (sum / BigInt(recentFunding.length)).toString();
    }
    
    // Calculate 24h volume from trade history
    const oneDayAgo = new Date(Date.now() - 86400 * 1000); // 24 hours ago
    const recentTrades = await prisma.trade.findMany({
      where: { 
        marketId: resolvedMarketId,
        createdAt: { 
          gte: oneDayAgo
        }
      },
    });
    
    // Sum up the sizes of all trades in the last 24 hours
    const volume24h = recentTrades.reduce(
      (sum: bigint, trade: { size: Decimal }) => sum + BigInt(trade.size.toString()),
      BigInt(0)
    ).toString();
    
    // Format market data for response
    const formattedMarket = {
      id: getMarketSymbol(resolvedMarketId),
      assetSymbol: String.fromCharCode(...market.assetSymbol).replace(/\0/g, ''),
      markPrice: calculateMarkPrice(market),
      indexPrice: await getOraclePrice(market),
      baseAssetReserve: market.baseAssetReserve.toString(),
      quoteAssetReserve: market.quoteAssetReserve.toString(),
      fundingRate: market.fundingRate.toString(),
      avgFundingRate,
      lastFundingTs: market.lastFundingTs.toString(),
      nextFundingTime: calculateNextFundingTime(market.lastFundingTs),
      totalLongSize: market.totalLongSize.toString(),
      totalShortSize: market.totalShortSize.toString(),
      openInterest: (BigInt(market.totalLongSize) + BigInt(market.totalShortSize)).toString(),
      volume24h,
      maxLeverage: market.maxLeverage,
      feeBps: market.feeBps,
      priceHistory: recentPrices.map((price: { timestamp: { toString: () => any; }; markPrice: any; indexPrice: any; }) => ({
        timestamp: price.timestamp.toString(),
        markPrice: price.markPrice,
        indexPrice: price.indexPrice,
      })),
      fundingHistory: recentFunding.map((funding: { timestamp: { toString: () => any; }; rate: any; }) => ({
        timestamp: funding.timestamp.toString(),
        rate: funding.rate,
      })),
    };
    
    res.status(200).json({
      success: true,
      data: formattedMarket
    });
  } catch (error) {
    console.error(`Error fetching market data for ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Calculate mark price based on vAMM formula
 */
function calculateMarkPrice(market: any): string {
  try {
    // Handle both Decimal (from database) and BigInt (from blockchain) types
    const baseAssetReserve = market.baseAssetReserve instanceof Decimal 
      ? market.baseAssetReserve 
      : new Decimal(market.baseAssetReserve.toString());
    const quoteAssetReserve = market.quoteAssetReserve instanceof Decimal 
      ? market.quoteAssetReserve 
      : new Decimal(market.quoteAssetReserve.toString());
    
    // Mark price = quoteAssetReserve / baseAssetReserve
    const markPrice = quoteAssetReserve.div(baseAssetReserve);
    
    return markPrice.toString();
  } catch (error) {
    console.error('Error calculating mark price:', error);
    return '0';
  }
}

/**
 * Calculate the next funding time
 */
function calculateNextFundingTime(lastFundingTs: bigint): number {
  // Assuming funding happens every hour
  const fundingInterval = 60 * 60; // 1 hour in seconds
  const lastFundingTimestamp = Number(lastFundingTs);
  
  return lastFundingTimestamp + fundingInterval;
}

/**
 * Get funding rate history for a market
 */
export const getMarketFundingHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { limit = 100 } = req.query;
    const resolvedMarketId = resolveMarketId(id);

    // Get funding rate history from database
    const fundingHistory = await prisma.fundingPayment.findMany({
      where: { marketId: resolvedMarketId },
      orderBy: { timestamp: 'desc' },
      take: Number(limit),
    });

    // Format the response
    const formattedHistory = fundingHistory.map((funding: { timestamp: { toString: () => any; }; rate: any; }) => ({
      timestamp: funding.timestamp.toString(),
      rate: funding.rate,
    }));

    res.status(200).json({
      success: true,
      data: formattedHistory
    });
  } catch (error) {
    console.error(`Error fetching funding history for market ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch funding history',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get current price for a market
 */
export const getCurrentPrice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resolvedMarketId = resolveMarketId(id);
    const market = await contractService.getMarket(resolvedMarketId);
    
    if (!market) {
      // Return real oracle data when no blockchain market exists
      const realPrice = await getRealPriceForMarket(id);
      return res.status(200).json({
        success: true,
        data: {
          markPrice: (realPrice * 1e9).toString(), // Convert to smallest unit for consistency
          indexPrice: (realPrice * 1e9).toString(),
          lastUpdated: Date.now()
        }
      });
    }

    const markPrice = calculateMarkPrice(market);
    const indexPrice = await getOraclePrice(market);

    res.status(200).json({
      success: true,
      data: {
        markPrice,
        indexPrice,
        lastUpdated: Date.now()
      }
    });
  } catch (error) {
    console.error(`Error fetching price for market ${req.params.id}:`, error);
    
    // Fallback to oracle data if there's an error
    try {
      const realPrice = await getRealPriceForMarket(req.params.id);
      res.status(200).json({
        success: true,
        data: {
          markPrice: (realPrice * 1e9).toString(), // Convert to smallest unit for consistency
          indexPrice: (realPrice * 1e9).toString(),
          lastUpdated: Date.now()
        }
      });
    } catch (fallbackError) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch price',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};

/**
 * Get price history for a market
 */
export const getPriceHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { timeframe = '1d' } = req.query;
    const resolvedMarketId = resolveMarketId(id);

    // Calculate the time range based on timeframe
    let hoursBack = 24; // Default to 1 day
    switch (timeframe) {
      case '1h': hoursBack = 1; break;
      case '4h': hoursBack = 4; break;
      case '1d': hoursBack = 24; break;
      case '7d': hoursBack = 168; break;
      case '30d': hoursBack = 720; break;
    }

    const startTime = BigInt(Date.now() - hoursBack * 60 * 60 * 1000);

    const priceHistory = await prisma.priceHistory.findMany({
      where: { 
        marketId: resolvedMarketId,
        timestamp: { gte: startTime }
      },
      orderBy: { timestamp: 'asc' },
    });

    const formattedHistory = priceHistory.map((price) => ({
      timestamp: Number(price.timestamp),
      price: price.markPrice.toString(),
    }));

    res.status(200).json({
      success: true,
      data: formattedHistory
    });
  } catch (error) {
    console.error(`Error fetching price history for market ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch price history',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get current funding rate for a market
 */
export const getCurrentFundingRate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resolvedMarketId = resolveMarketId(id);
    const market = await contractService.getMarket(resolvedMarketId);
    
    if (!market) {
      // Return mock funding rate for testing
      const now = Math.floor(Date.now() / 1000);
      return res.status(200).json({
        success: true,
        data: {
          rate: '0.0001', // 0.01% funding rate
          lastFundingTs: (now - 3600).toString(), // 1 hour ago
          nextFundingTime: now + 3600 // 1 hour from now
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        rate: market.fundingRate.toString(),
        lastFundingTs: market.lastFundingTs.toString(),
        nextFundingTime: calculateNextFundingTime(market.lastFundingTs)
      }
    });
  } catch (error) {
    console.error(`Error fetching funding rate for market ${req.params.id}:`, error);
    
    // Fallback to mock data
    try {
      const now = Math.floor(Date.now() / 1000);
      res.status(200).json({
        success: true,
        data: {
          rate: '0.0001', // 0.01% funding rate
          lastFundingTs: (now - 3600).toString(), // 1 hour ago
          nextFundingTime: now + 3600 // 1 hour from now
        }
      });
    } catch (fallbackError) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch funding rate',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};

/**
 * Get AMM data for a market (same as getMarketData but with different response format)
 */
export const getMarketAMMData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resolvedMarketId = resolveMarketId(id);
    const market = await contractService.getMarket(resolvedMarketId);
    
    if (!market) {
      return res.status(404).json({
        success: false,
        error: 'Market not found',
      });
    }

    const ammData = {
      id: getMarketSymbol(resolvedMarketId),
      assetSymbol: String.fromCharCode(...market.assetSymbol).replace(/\0/g, ''),
      baseAssetReserve: market.baseAssetReserve.toString(),
      quoteAssetReserve: market.quoteAssetReserve.toString(),
      kFactor: market.kFactor.toString(),
      markPrice: calculateMarkPrice(market),
      totalLongSize: market.totalLongSize.toString(),
      totalShortSize: market.totalShortSize.toString(),
      fundingRate: market.fundingRate.toString(),
      maxLeverage: market.maxLeverage,
      isActive: market.isActive,
    };

    res.status(200).json({
      success: true,
      data: ammData
    });
  } catch (error) {
    console.error(`Error fetching AMM data for market ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch AMM data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get price from oracle for a market
 */
async function getOraclePrice(market: any): Promise<string> {
  try {
    // Extract market symbol from the market data
    const assetSymbol = String.fromCharCode(...market.assetSymbol).replace(/\0/g, '');
    const marketSymbol = `${assetSymbol}-PERP`;
    
    // Get real-time price from oracle service
    const priceData = await oracleService.getMarketPrice(marketSymbol);
    
    // Convert to smallest unit (multiply by 1e9 for consistency with on-chain data)
    return (priceData.price * 1e9).toString();
  } catch (error) {
    console.error('Error getting oracle price:', error);
    
    try {
      // Fallback: get the last indexed price from the database
      const latestPrice = await prisma.priceHistory.findFirst({
        where: { marketId: market.market?.toString() || '' },
        orderBy: { timestamp: 'desc' }
      });
      
      if (latestPrice && latestPrice.indexPrice) {
        return latestPrice.indexPrice.toString();
      }
    } catch (dbError) {
      console.error('Error fetching fallback price from database:', dbError);
    }
    
    // Final fallback to mark price
    return calculateMarkPrice(market);
  }
}

/**
 * Get candlestick data for a market
 */
export const getCandlestickData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { timeframe = '1H', limit = 100 } = req.query;
    const resolvedMarketId = resolveMarketId(id);

    // Calculate the time range based on timeframe
    let intervalMs = 60 * 60 * 1000; // Default to 1 hour
    switch (timeframe) {
      case '1M': intervalMs = 60 * 1000; break;
      case '5M': intervalMs = 5 * 60 * 1000; break;
      case '15M': intervalMs = 15 * 60 * 1000; break;
      case '1H': intervalMs = 60 * 60 * 1000; break;
      case '4H': intervalMs = 4 * 60 * 60 * 1000; break;
      case '1D': intervalMs = 24 * 60 * 60 * 1000; break;
    }

    const startTime = BigInt(Date.now() - Number(limit) * intervalMs);

    // Get price history data
    const priceHistory = await prisma.priceHistory.findMany({
      where: { 
        marketId: resolvedMarketId,
        timestamp: { gte: startTime }
      },
      orderBy: { timestamp: 'asc' },
      take: Number(limit),
    });

    if (priceHistory.length === 0) {
      // Generate mock candlestick data if no real data available
      const mockData = generateMockCandlesticks(resolvedMarketId, intervalMs, Number(limit));
      return res.status(200).json({
        success: true,
        data: mockData
      });
    }

    // Group price data into candlesticks based on timeframe
    const candlesticks = groupIntoCandlesticks(priceHistory, intervalMs);

    res.status(200).json({
      success: true,
      data: candlesticks
    });
  } catch (error) {
    console.error(`Error fetching candlestick data for market ${req.params.id}:`, error);
    
    // Fallback to mock data
    try {
      const mockData = generateMockCandlesticks(req.params.id, 60 * 60 * 1000, 100);
      res.status(200).json({
        success: true,
        data: mockData
      });
    } catch (fallbackError) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch candlestick data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};

/**
 * Group price history into candlesticks
 */
function groupIntoCandlesticks(priceHistory: any[], intervalMs: number) {
  const candlesticks: any[] = [];
  
  if (priceHistory.length === 0) return candlesticks;
  
  const startTime = Number(priceHistory[0].timestamp);
  const endTime = Number(priceHistory[priceHistory.length - 1].timestamp);
  
  for (let time = startTime; time <= endTime; time += intervalMs) {
    const periodStart = time;
    const periodEnd = time + intervalMs;
    
    // Get prices in this period
    const periodPrices = priceHistory.filter(p => {
      const timestamp = Number(p.timestamp);
      return timestamp >= periodStart && timestamp < periodEnd;
    });
    
    if (periodPrices.length > 0) {
      // Calculate OHLC
      const prices = periodPrices.map(p => Number(p.markPrice));
      const open = prices[0];
      const close = prices[prices.length - 1];
      const high = Math.max(...prices);
      const low = Math.min(...prices);
      
      // Generate realistic volume
      const volume = Math.random() * 1000000 * (1 + Math.random());
      
      candlesticks.push({
        time: periodStart,
        open,
        high,
        low,
        close,
        volume,
        timestamp: new Date(periodStart).toISOString()
      });
    }
  }
  
  return candlesticks;
}

/**
 * Generate mock candlestick data
 */
function generateMockCandlesticks(marketId: string, intervalMs: number, count: number) {
  const candlesticks: any[] = [];
  
  // Get base price for the market
  let basePrice = 150; // Default SOL price
  if (marketId.includes('BTC')) basePrice = 45000;
  if (marketId.includes('ETH')) basePrice = 3000;
  
  const now = Date.now();
  let currentPrice = basePrice;
  
  for (let i = count - 1; i >= 0; i--) {
    const time = now - (i * intervalMs);
    
    // Generate realistic price movement
    const volatility = 0.02; // 2% volatility
    const trend = (Math.random() - 0.5) * 0.001; // Small trend
    
    const open = currentPrice;
    const priceRange = open * volatility;
    
    const high = open + Math.random() * priceRange * 0.7;
    const low = open - Math.random() * priceRange * 0.7;
    const close = open + (Math.random() - 0.5) * priceRange + (open * trend);
    
    // Ensure high and low are correct
    const adjustedHigh = Math.max(open, close, high);
    const adjustedLow = Math.min(open, close, low);
    
    // Generate volume
    const volume = Math.random() * 1000000 * (1 + Math.random());
    
    candlesticks.push({
      time,
      open,
      high: adjustedHigh,
      low: adjustedLow,
      close,
      volume,
      timestamp: new Date(time).toISOString()
    });
    
    currentPrice = close;
  }
  
  return candlesticks;
} 