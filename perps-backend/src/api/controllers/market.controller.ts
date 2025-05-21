import { Request, Response } from 'express';
import { PerpsContractService } from '../../services/blockchain/perpsContractService.js';
import { SolanaClient } from '../../services/blockchain/solanaClient.js';
import prisma from '../../db/prisma.js';
import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';

// Initialize services
const solanaClient = new SolanaClient();
const contractService = new PerpsContractService(solanaClient);

/**
 * Get all markets
 */
export const getMarkets = async (req: Request, res: Response) => {
  try {
    const markets = await contractService.getMarkets();
    
    // Format market data for response
    const formattedMarkets = markets.map(market => ({
      id: market.oracle.toString(), // Using oracle as a unique identifier
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
    const market = await contractService.getMarket(id);
    
    if (!market) {
      return res.status(404).json({
        success: false,
        error: 'Market not found',
      });
    }
    
    // Format market data for response
    const formattedMarket = {
      id, // This might need to be adjusted based on actual data
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
    
    // Get market from blockchain
    const market = await contractService.getMarket(id);
    
    if (!market) {
      return res.status(404).json({
        success: false,
        error: 'Market not found',
      });
    }
    
    // Get recent price history
    const recentPrices = await prisma.priceHistory.findMany({
      where: { marketId: id },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
    
    // Get recent funding payments
    const recentFunding = await prisma.fundingPayment.findMany({
      where: { marketId: id },
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
        marketId: id,
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
      id,
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
  const baseAssetReserve = BigInt(market.baseAssetReserve);
  const quoteAssetReserve = BigInt(market.quoteAssetReserve);
  
  // Mark price = quoteAssetReserve / baseAssetReserve
  const markPrice = (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
  
  return markPrice.toString();
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
 * Get price from oracle for a market
 */
async function getOraclePrice(market: any): Promise<string> {
  try {
    const oraclePubkey = market.oracle as PublicKey;
    const oracleType = market.oracleType as number;
    
    // If we have a fundingRateService instance, we could use it to get the oracle price
    // For now, get the last indexed price from the database as a fallback
    const latestPrice = await prisma.priceHistory.findFirst({
      where: { marketId: market.market.toString() },
      orderBy: { timestamp: 'desc' }
    });
    
    if (latestPrice && latestPrice.indexPrice) {
      return latestPrice.indexPrice.toString();
    }
    
    // If no price data exists, fall back to mark price
    return calculateMarkPrice(market);
  } catch (error) {
    console.error('Error getting oracle price:', error);
    // Fallback to mark price
    return calculateMarkPrice(market);
  }
} 