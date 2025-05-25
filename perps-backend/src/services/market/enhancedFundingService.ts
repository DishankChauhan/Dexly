import { PerpsContractService } from '../blockchain/perpsContractService.js';
import { SolanaClient } from '../blockchain/solanaClient.js';
import { WebSocketService } from '../websocket/websocketService.js';
import { FundingRateService } from './fundingRateService.js';
import { Market, PositionModel } from '../../models/perps.js';
import { Decimal } from 'decimal.js';
import prisma from '../../db/prisma.js';
import config from '../../config/index.js';

/**
 * Enhanced funding rate service for improved accuracy and automatic settlement
 */
export class EnhancedFundingService {
  private fundingRateService: FundingRateService;
  private contractService: PerpsContractService;
  private solanaClient: SolanaClient;
  private wsService: WebSocketService | null = null;
  
  // Service state
  private lastSettlementTimes: Map<string, number> = new Map(); // marketId -> timestamp
  private fundingRateHistory: Map<string, { rate: bigint, timestamp: number }[]> = new Map(); // marketId -> history
  private isProcessing: boolean = false;
  
  constructor(
    fundingRateService: FundingRateService,
    contractService: PerpsContractService,
    solanaClient: SolanaClient,
    wsService?: WebSocketService
  ) {
    this.fundingRateService = fundingRateService;
    this.contractService = contractService;
    this.solanaClient = solanaClient;
    this.wsService = wsService || null;
  }
  
  /**
   * Calculate time-weighted average funding rate
   * This smooths out funding rate spikes for more stable rates
   */
  async calculateTimeWeightedFundingRate(marketId: string, windowMs: number = 3600000): Promise<bigint> {
    try {
      // Get current timestamp
      const now = Date.now();
      const cutoffTime = now - windowMs;
      
      // Get existing funding rate history or initialize new array
      let history = this.fundingRateHistory.get(marketId) || [];
      
      // Clean up old rates outside of window
      history = history.filter(entry => entry.timestamp >= cutoffTime);
      
      // Calculate current funding rate
      const currentRate = await this.fundingRateService.calculateFundingRate(marketId);
      
      // Add to history
      history.push({ rate: currentRate, timestamp: now });
      this.fundingRateHistory.set(marketId, history);
      
      // If we have only one entry, return it
      if (history.length === 1) {
        return currentRate;
      }
      
      // Calculate time-weighted average
      let totalWeight = 0;
      let weightedSum = new Decimal(0);
      
      for (let i = 1; i < history.length; i++) {
        const prevEntry = history[i - 1];
        const currEntry = history[i];
        
        // Weight is time between entries
        const weight = currEntry.timestamp - prevEntry.timestamp;
        totalWeight += weight;
        
        // Use average rate between adjacent entries
        const avgRate = new Decimal(prevEntry.rate.toString())
          .plus(new Decimal(currEntry.rate.toString()))
          .dividedBy(2);
        
        weightedSum = weightedSum.plus(avgRate.times(weight));
      }
      
      // Get weighted average
      const timeWeightedRate = totalWeight > 0
        ? weightedSum.dividedBy(totalWeight)
        : new Decimal(currentRate.toString());
      
      // Return as bigint (round to nearest integer)
      return BigInt(Math.round(timeWeightedRate.toNumber()));
    } catch (error) {
      console.error(`Error calculating time-weighted funding rate for market ${marketId}:`, error);
      // Fall back to standard funding rate calculation
      return this.fundingRateService.calculateFundingRate(marketId);
    }
  }
  
  /**
   * Apply funding payments to all positions in a market
   * With enhanced error handling and transaction batching
   */
  async applyFundingToMarket(marketId: string): Promise<boolean> {
    if (this.isProcessing) {
      console.log(`Funding settlement already in progress, skipping market ${marketId}`);
      return false;
    }
    
    try {
      this.isProcessing = true;
      console.log(`Starting enhanced funding settlement for market ${marketId}`);
      
      // Get last settlement time or use current time minus interval
      const lastSettlement = this.lastSettlementTimes.get(marketId) || (Date.now() - config.FUNDING_INTERVAL_MS);
      const now = Date.now();
      const elapsedMs = now - lastSettlement;
      
      // Skip if not enough time has passed (at least 15 minutes)
      const minIntervalMs = Math.min(15 * 60 * 1000, config.FUNDING_INTERVAL_MS / 4);
      if (elapsedMs < minIntervalMs) {
        console.log(`Skipping funding settlement for market ${marketId}: last settlement was ${elapsedMs / 1000} seconds ago`);
        return false;
      }
      
      // Get market info
      const market = await this.contractService.getMarket(marketId);
      if (!market) {
        throw new Error(`Market ${marketId} not found`);
      }
      
      // Get all active positions
      const positions = await prisma.position.findMany({
        where: {
          marketId,
          isClosed: false,
        },
      });
      
      if (positions.length === 0) {
        console.log(`No open positions for market ${marketId}, skipping funding settlement`);
        return true;
      }
      
      // Calculate time-weighted funding rate
      const fundingRate = await this.calculateTimeWeightedFundingRate(marketId);
      
      // Get market price for calculating position values
      const markPrice = (market.quoteAssetReserve * BigInt(1e9)) / market.baseAssetReserve;
      
      // Track total funding paid/received
      let totalFundingAmount = new Decimal(0);
      let longFundingAmount = new Decimal(0);
      let shortFundingAmount = new Decimal(0);
      
      // Process in batches of 25 positions
      const batchSize = 25;
      for (let i = 0; i < positions.length; i += batchSize) {
        const batch = positions.slice(i, i + batchSize);
        
        // Process batch
        const updatePromises = batch.map(async (position) => {
          try {
            // Calculate funding payment similar to the original service
            const isLong = position.isLong;
            const positionSize = new Decimal(position.size.toString());
            const fundingRateDecimal = new Decimal(fundingRate.toString()).div(new Decimal(10000));
            
            // Calculate position value
            const positionValue = positionSize.mul(new Decimal(markPrice.toString()));
            
            // Calculate funding amount for the elapsed time
            const scaledElapsedTime = new Decimal(elapsedMs).div(config.FUNDING_INTERVAL_MS);
            let fundingAmount: Decimal;
            
            if (isLong) {
              // Longs pay positive funding, receive negative funding
              fundingAmount = positionValue.mul(fundingRateDecimal).mul(scaledElapsedTime).div(new Decimal(100));
              longFundingAmount = longFundingAmount.plus(fundingAmount);
            } else {
              // Shorts pay negative funding, receive positive funding
              fundingAmount = positionValue.mul(fundingRateDecimal).mul(scaledElapsedTime).div(new Decimal(100)).negated();
              shortFundingAmount = shortFundingAmount.plus(fundingAmount);
            }
            
            // Update total
            totalFundingAmount = totalFundingAmount.plus(fundingAmount);
            
            // Update position with realized PnL from funding
            const currentRealizedPnl = new Decimal(position.realizedPnlFromFunding.toString());
            const newRealizedPnl = currentRealizedPnl.minus(fundingAmount);
            
            // Update in database
            await prisma.position.update({
              where: { id: position.id },
              data: {
                realizedPnlFromFunding: parseFloat(newRealizedPnl.toString()),
                lastFundingTs: BigInt(Math.floor(now / 1000)),
              },
            });
            await prisma.fundingPayment.create({
              data: {
                id: `funding-${position.id}-${now}`,
                marketId,
                positionId: position.id,
                amount: fundingAmount.toString(),
                rate: fundingRate.toString(),
                timestamp: BigInt(Math.floor(now / 1000)),
              },
            });
            
            return {
              positionId: position.id,
              fundingAmount: fundingAmount.toString(),
              success: true
            };
          } catch (error) {
            console.error(`Error processing funding for position ${position.id}:`, error);
            return {
              positionId: position.id,
              error: error instanceof Error ? error.message : 'Unknown error',
              success: false
            };
          }
        });
        
        const results = await Promise.all(updatePromises);
        const successCount = results.filter(r => r.success).length;
        console.log(`Processed batch ${i / batchSize + 1}: ${successCount}/${batch.length} positions successful`);
      }
      
      // Update on-chain funding rate
      try {
        await this.contractService.updateFunding(marketId);
        console.log(`Updated on-chain funding rate for market ${marketId}`);
      } catch (error) {
        console.error(`Failed to update on-chain funding rate for market ${marketId}:`, error);
      }
      
      // Record funding settlement event
      await prisma.fundingSettlement.create({
        data: {
          id: `settlement-${marketId}-${now}`,
          marketId,
          timestamp: Math.floor(now / 1000).toString(),
          rate: fundingRate.toString(),
          totalAmount: totalFundingAmount.toString(),
          longAmount: longFundingAmount.toString(),
          shortAmount: shortFundingAmount.toString(),
          positionCount: positions.length,
        },
      });
      
      // Update last settlement time
      this.lastSettlementTimes.set(marketId, now);
      
      // Broadcast funding settlement via WebSocket if available
      if (this.wsService) {
        this.wsService.broadcastEvent('funding_settlement', {
          marketId,
          fundingRate: fundingRate.toString(),
          totalAmount: totalFundingAmount.toString(),
          positionCount: positions.length,
          timestamp: now
        });
      }
      
      console.log(`Completed funding settlement for market ${marketId}. Processed ${positions.length} positions`);
      return true;
    } catch (error) {
      console.error(`Error applying funding to market ${marketId}:`, error);
      return false;
    } finally {
      this.isProcessing = false;
    }
  }
  
  /**
   * Optimize vAMM parameters based on market conditions
   * This helps reduce price impact and improve liquidity
   */
  async optimizeMarketParameters(marketId: string): Promise<boolean> {
    try {
      const market = await this.contractService.getMarket(marketId);
      if (!market) {
        throw new Error(`Market ${marketId} not found`);
      }
      
      // Get position size data
      const totalLongSize = market.totalLongSize || BigInt(0);
      const totalShortSize = market.totalShortSize || BigInt(0);
      const totalPositionSize = totalLongSize + totalShortSize;
      
      // Check if optimization is needed
      if (totalPositionSize < BigInt(config.VAMM_MIN_LIQUIDITY)) {
        console.log(`Skipping vAMM optimization for market ${marketId}: insufficient position size`);
        return false;
      }
      
      // Get market price data
      const baseAssetReserve = market.baseAssetReserve;
      const quoteAssetReserve = market.quoteAssetReserve;
      const markPrice = (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
      
      // Get oracle price for reference
      const oraclePrice = await this.fundingRateService.getOraclePrice(market);
      
      // Calculate deviation
      const deviation = this.calculatePriceDeviation(markPrice, oraclePrice);
      
      // If deviation is too high, adjust vAMM parameters
      if (deviation > market.maxOracleDeviationBps / 2) {
        console.log(`High price deviation detected for market ${marketId}: ${deviation} bps`);
        
        // TODO: Implement on-chain vAMM parameter adjustment
        // This would involve calling a smart contract function to adjust liquidity
        // For now, we'll just log the intent
        
        console.log(`Would optimize vAMM parameters for market ${marketId} to reduce deviation`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error optimizing market parameters for ${marketId}:`, error);
      return false;
    }
  }
  
  /**
   * Calculate price deviation in basis points
   */
  private calculatePriceDeviation(price1: bigint, price2: bigint): number {
    const diff = price1 > price2 ? price1 - price2 : price2 - price1;
    const baseDenominator = price2; // Use oracle price as base
    const deviation = Number((diff * BigInt(10000)) / baseDenominator);
    return deviation;
  }
  
  /**
   * Get funding rate statistics for a market
   */
  async getFundingStats(marketId: string): Promise<any> {
    try {
      // Get recent funding payments
      const recentPayments = await prisma.fundingPayment.findMany({
        where: {
          marketId,
          timestamp: {
            gte: BigInt(Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000)),
          },
        },
        orderBy: {
          timestamp: 'desc',
        },
      });
      
      // Calculate statistics
      const totalPayments = recentPayments.length;
      
      // Calculate total and average funding
      let totalAmount = new Decimal(0);
      for (const payment of recentPayments) {
        totalAmount = totalAmount.plus(new Decimal(payment.amount));
      }
      
      const avgAmount = totalPayments > 0
        ? totalAmount.dividedBy(totalPayments)
        : new Decimal(0);
      
      // Get latest funding rate
      const currentFundingRate = await this.calculateTimeWeightedFundingRate(marketId);
      
      return {
        marketId,
        currentRate: currentFundingRate.toString(),
        last24h: {
          paymentCount: totalPayments,
          totalAmount: totalAmount.toString(),
          averageAmount: avgAmount.toString(),
        },
        lastSettlement: this.lastSettlementTimes.get(marketId) || 0,
      };
    } catch (error) {
      console.error(`Error getting funding stats for market ${marketId}:`, error);
      return {
        marketId,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
} 