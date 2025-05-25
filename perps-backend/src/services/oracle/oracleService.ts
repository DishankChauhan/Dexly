import { Connection, PublicKey } from '@solana/web3.js';
import { PythOracleService } from './pythOracleService.js';
import config from '../../config/index.js';
import prisma from '../../db/prisma.js';
import Decimal from 'decimal.js';

export interface PriceData {
  price: number;
  confidence: number;
  timestamp: number;
  status: 'trading' | 'halted' | 'auction' | 'unknown';
  source: 'pyth' | 'switchboard' | 'fallback';
}

export interface MarketPriceUpdate {
  marketId: string;
  markPrice: number;
  indexPrice: number;
  timestamp: number;
  confidence: number;
}

/**
 * Comprehensive oracle service that aggregates price data from multiple sources
 */
export class OracleService {
  private pythService: PythOracleService;
  private connection: Connection;
  private priceCache: Map<string, PriceData> = new Map();
  private cacheTimeout: number = 30000; // 30 seconds cache
  private priceSubscriptions: Map<string, number> = new Map();

  constructor(connection: Connection) {
    this.connection = connection;
    this.pythService = new PythOracleService(connection);
  }

  /**
   * Get current price for a market with fallback logic
   * @param marketSymbol Market symbol (e.g., 'SOL-PERP', 'BTC-PERP')
   * @returns Aggregated price data from best available source
   */
  async getMarketPrice(marketSymbol: string): Promise<PriceData> {
    const cacheKey = `market_${marketSymbol}`;
    
    // Check cache first
    const cachedPrice = this.getCachedPrice(cacheKey);
    if (cachedPrice) {
      return cachedPrice;
    }

    let priceData: PriceData;

    try {
      // Try Pyth first (primary oracle)
      const pythPrice = await this.pythService.getMarketPrice(marketSymbol);
      priceData = {
        ...pythPrice,
        source: 'pyth'
      };
      
      // Validate price data
      if (!this.isValidPriceData(priceData)) {
        throw new Error('Invalid price data from Pyth');
      }
    } catch (pythError) {
      console.warn(`Pyth oracle failed for ${marketSymbol}:`, pythError);
      
      try {
        // Fallback to Switchboard (if implemented)
        priceData = await this.getSwitchboardPrice(marketSymbol);
        priceData.source = 'switchboard';
      } catch (switchboardError) {
        console.warn(`Switchboard oracle failed for ${marketSymbol}:`, switchboardError);
        
        // Final fallback to last known good price or default
        priceData = await this.getFallbackPrice(marketSymbol);
        priceData.source = 'fallback';
      }
    }

    // Cache the result
    this.setCachedPrice(cacheKey, priceData);
    
    // Store price history in database
    await this.storePriceHistory(marketSymbol, priceData);

    return priceData;
  }

  /**
   * Get prices for multiple markets efficiently
   * @param marketSymbols Array of market symbols
   * @returns Map of market symbol to price data
   */
  async getMultipleMarketPrices(marketSymbols: string[]): Promise<Map<string, PriceData>> {
    const pricePromises = marketSymbols.map(async (symbol) => {
      try {
        const price = await this.getMarketPrice(symbol);
        return { symbol, price, success: true };
      } catch (error) {
        console.error(`Failed to get price for ${symbol}:`, error);
        return { 
          symbol, 
          price: await this.getFallbackPrice(symbol), 
          success: false 
        };
      }
    });

    const results = await Promise.allSettled(pricePromises);
    const priceMap = new Map<string, PriceData>();

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        priceMap.set(result.value.symbol, result.value.price);
      }
    });

    return priceMap;
  }

  /**
   * Get index price for a market (external oracle price)
   * @param marketSymbol Market symbol
   * @returns Index price from external oracles
   */
  async getIndexPrice(marketSymbol: string): Promise<number> {
    const priceData = await this.getMarketPrice(marketSymbol);
    return priceData.price;
  }

  /**
   * Start real-time price updates for a market
   * @param marketSymbol Market symbol to track
   * @param callback Callback function for price updates
   */
  async startPriceUpdates(
    marketSymbol: string, 
    callback: (priceUpdate: MarketPriceUpdate) => void
  ): Promise<void> {
    const subscriptionKey = `updates_${marketSymbol}`;
    
    // Cancel existing subscription if any
    if (this.priceSubscriptions.has(subscriptionKey)) {
      this.stopPriceUpdates(marketSymbol);
    }

    // Start new subscription
    const subscriptionId = await this.pythService.subscribeToPriceUpdates(
      this.marketSymbolToOracleSymbol(marketSymbol),
      async (pythPriceData) => {
        try {
          const marketUpdate: MarketPriceUpdate = {
            marketId: marketSymbol,
            markPrice: pythPriceData.price, // In a full implementation, this would be calculated from vAMM
            indexPrice: pythPriceData.price,
            timestamp: pythPriceData.timestamp,
            confidence: pythPriceData.confidence
          };

          // Update cache
          this.setCachedPrice(`market_${marketSymbol}`, {
            ...pythPriceData,
            source: 'pyth'
          });

          // Store in database
          await this.storePriceHistory(marketSymbol, {
            ...pythPriceData,
            source: 'pyth'
          });

          callback(marketUpdate);
        } catch (error) {
          console.error(`Error processing price update for ${marketSymbol}:`, error);
        }
      }
    );

    this.priceSubscriptions.set(subscriptionKey, subscriptionId);
  }

  /**
   * Stop price updates for a market
   * @param marketSymbol Market symbol to stop tracking
   */
  stopPriceUpdates(marketSymbol: string): void {
    const subscriptionKey = `updates_${marketSymbol}`;
    const subscriptionId = this.priceSubscriptions.get(subscriptionKey);
    
    if (subscriptionId) {
      this.pythService.unsubscribeFromPriceUpdates(subscriptionId);
      this.priceSubscriptions.delete(subscriptionKey);
    }
  }

  /**
   * Get cached price if still valid
   * @param cacheKey Cache key
   * @returns Cached price data or null if expired
   */
  private getCachedPrice(cacheKey: string): PriceData | null {
    const cached = this.priceCache.get(cacheKey);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.cacheTimeout;
    if (isExpired) {
      this.priceCache.delete(cacheKey);
      return null;
    }

    return cached;
  }

  /**
   * Set cached price
   * @param cacheKey Cache key
   * @param priceData Price data to cache
   */
  private setCachedPrice(cacheKey: string, priceData: PriceData): void {
    this.priceCache.set(cacheKey, priceData);
  }

  /**
   * Validate price data for sanity checks
   * @param priceData Price data to validate
   * @returns Boolean indicating if price data is valid
   */
  private isValidPriceData(priceData: PriceData): boolean {
    return (
      priceData.price > 0 &&
      priceData.confidence >= 0 &&
      priceData.timestamp > 0 &&
      Date.now() - priceData.timestamp < 300000 // Not older than 5 minutes
    );
  }

  /**
   * Get Switchboard price (placeholder for future implementation)
   * @param marketSymbol Market symbol
   * @returns Price data from Switchboard
   */
  private async getSwitchboardPrice(marketSymbol: string): Promise<PriceData> {
    // TODO: Implement Switchboard oracle integration
    // For now, throw error to trigger fallback
    throw new Error('Switchboard oracle not implemented yet');
  }

  /**
   * Get fallback price from database or reasonable default
   * @param marketSymbol Market symbol
   * @returns Fallback price data
   */
  private async getFallbackPrice(marketSymbol: string): Promise<PriceData> {
    try {
      // Try to get last known good price from database
      const lastPrice = await prisma.priceHistory.findFirst({
        where: { 
          marketId: marketSymbol,
          // Only use recent prices (within last hour)
          timestamp: { 
            gte: BigInt(Date.now() - 3600000) 
          }
        },
        orderBy: { timestamp: 'desc' }
      });

      if (lastPrice) {
        return {
          price: Number(lastPrice.indexPrice),
          confidence: 0.1, // Low confidence for stale data
          timestamp: Date.now(),
          status: 'unknown',
          source: 'fallback'
        };
      }
    } catch (error) {
      console.error('Error fetching fallback price from database:', error);
    }

    // Ultimate fallback to reasonable default prices
    const defaultPrices: { [key: string]: number } = {
      'SOL-PERP': 150,
      'BTC-PERP': 45000,
      'ETH-PERP': 3000
    };

    return {
      price: defaultPrices[marketSymbol] || 100,
      confidence: 0.1,
      timestamp: Date.now(),
      status: 'unknown',
      source: 'fallback'
    };
  }

  /**
   * Store price history in database
   * @param marketSymbol Market symbol
   * @param priceData Price data to store
   */
  private async storePriceHistory(marketSymbol: string, priceData: PriceData): Promise<void> {
    try {
      await prisma.priceHistory.create({
        data: {
          id: `${marketSymbol}_${Date.now()}`,
          marketId: marketSymbol,
          markPrice: new Decimal(priceData.price),
          indexPrice: new Decimal(priceData.price),
          timestamp: BigInt(priceData.timestamp),
        }
      });
    } catch (error) {
      // Don't throw error for database issues, just log
      console.error('Error storing price history:', error);
    }
  }

  /**
   * Convert market symbol to oracle symbol
   * @param marketSymbol Market symbol (e.g., 'SOL-PERP')
   * @returns Oracle symbol (e.g., 'SOL/USD')
   */
  private marketSymbolToOracleSymbol(marketSymbol: string): string {
    const baseAsset = marketSymbol.replace('-PERP', '');
    return `${baseAsset}/USD`;
  }

  /**
   * Health check for oracle service
   * @returns Object containing health status of all oracle providers
   */
  async healthCheck(): Promise<{
    overall: boolean;
    pyth: boolean;
    switchboard: boolean;
    cache: boolean;
  }> {
    const pythHealth = await this.pythService.healthCheck();
    const switchboardHealth = false; // TODO: implement when Switchboard is added
    const cacheHealth = this.priceCache.size >= 0; // Basic cache health check

    return {
      overall: pythHealth || switchboardHealth,
      pyth: pythHealth,
      switchboard: switchboardHealth,
      cache: cacheHealth
    };
  }

  /**
   * Get supported markets from all oracle providers
   * @returns Array of supported market symbols
   */
  getSupportedMarkets(): string[] {
    const pythMarkets = this.pythService.getSupportedMarkets()
      .map(symbol => symbol.replace('/USD', '-PERP'));
    
    return pythMarkets;
  }

  /**
   * Clear all cached prices (useful for testing or debugging)
   */
  clearCache(): void {
    this.priceCache.clear();
  }

  /**
   * Stop all price subscriptions and cleanup
   */
  shutdown(): void {
    // Stop all active subscriptions
    for (const [marketSymbol] of this.priceSubscriptions) {
      const cleanMarketSymbol = marketSymbol.replace('updates_', '');
      this.stopPriceUpdates(cleanMarketSymbol);
    }
    
    // Clear cache
    this.clearCache();
  }
} 