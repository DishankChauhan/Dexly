import { PerpsContractService } from '../blockchain/perpsContractService.js';
import { SolanaClient } from '../blockchain/solanaClient.js';
import prisma from '../../db/prisma.js';
import { Position, Market } from '../../models/perps.js';
import { PublicKey } from '@solana/web3.js';

/**
 * Service for monitoring positions for liquidation
 */
export class LiquidationService {
  private contractService: PerpsContractService;
  private solanaClient: SolanaClient;
  
  constructor(contractService: PerpsContractService, solanaClient: SolanaClient) {
    this.contractService = contractService;
    this.solanaClient = solanaClient;
  }
  
  /**
   * Find positions that are eligible for liquidation
   */
  async findLiquidatablePositions(): Promise<any[]> {
    try {
      // Get all markets
      const markets = await this.contractService.getMarkets();
      const liquidatablePositions: any[] = [];
      
      // For each market, check positions for liquidation
      for (const market of markets) {
        // Skip inactive markets
        if (!market.isActive) {
          continue;
        }
        
        // Calculate current mark price from vAMM
        const baseAssetReserve = market.baseAssetReserve;
        const quoteAssetReserve = market.quoteAssetReserve;
        const currentPrice = (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
        
        // Get oracle price for index price check
        const oraclePrice = await this.getOraclePrice(market);
        
        // Check for excessive deviation between mark and index price
        // If deviation is too high, we should not liquidate positions
        const deviation = this.calculatePriceDeviation(currentPrice, oraclePrice);
        const maxDeviationBps = market.maxOracleDeviationBps || 1000; // Default 10%
        
        if (deviation > maxDeviationBps) {
          console.warn(`Market ${market.market.toString()} has excessive price deviation: ${deviation} bps`);
          continue;
        }
        
        // Get positions from on-chain for this market
        try {
          // Find all positions for this market
          const positions = await prisma.position.findMany({
            where: {
              marketId: market.market.toString(),
              isClosed: false,
            },
          });
          
          // Check each position for liquidation
          for (const position of positions) {
            const isLiquidatable = await this.checkPositionLiquidation(
              position,
              currentPrice
            );
            
            if (isLiquidatable) {
              liquidatablePositions.push({
                position,
                market,
                currentPrice: currentPrice.toString(),
              });
              
              console.log(`Found liquidatable position: ${position.id} at price ${currentPrice.toString()}`);
            }
          }
        } catch (error) {
          console.error(`Error checking positions for market ${market.market.toString()}:`, error);
        }
      }
      
      return liquidatablePositions;
    } catch (error) {
      console.error('Error finding liquidatable positions:', error);
      return [];
    }
  }
  
  /**
   * Get oracle price for a market
   */
  private async getOraclePrice(market: Market): Promise<bigint> {
    try {
      // In production, this would use oracle-specific logic
      // For simplicity, using the mark price as a placeholder
      const baseAssetReserve = market.baseAssetReserve;
      const quoteAssetReserve = market.quoteAssetReserve;
      return (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
    } catch (error) {
      console.error(`Error getting oracle price for market ${market.market.toString()}:`, error);
      // Fallback to mark price
      const baseAssetReserve = market.baseAssetReserve;
      const quoteAssetReserve = market.quoteAssetReserve;
      return (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
    }
  }
  
  /**
   * Calculate the deviation between two prices in basis points
   */
  private calculatePriceDeviation(price1: bigint, price2: bigint): number {
    const diff = price1 > price2 ? price1 - price2 : price2 - price1;
    const baseDenominator = price1;
    const deviation = Number((diff * BigInt(10000)) / baseDenominator);
    return deviation;
  }
  
  /**
   * Check if a position should be liquidated
   */
  async checkPositionLiquidation(
    position: any,
    currentPrice: bigint
  ): Promise<boolean> {
    try {
      // Get position data
      const isLong = position.isLong;
      const liquidationPrice = BigInt(position.liquidationPrice);
      
      // Margin check: compare current price to liquidation price
      // Long positions are liquidated if price falls below liquidation price
      // Short positions are liquidated if price rises above liquidation price
      if (isLong && currentPrice <= liquidationPrice) {
        return true;
      } else if (!isLong && currentPrice >= liquidationPrice) {
        return true;
      }
      
      // Not liquidatable
      return false;
    } catch (error) {
      console.error('Error checking position for liquidation:', error);
      return false;
    }
  }
  
  /**
   * Process a position liquidation
   */
  async liquidatePosition(positionId: string): Promise<boolean> {
    try {
      console.log(`Attempting to liquidate position ${positionId}`);
      
      // Get position from database
      const position = await prisma.position.findUnique({
        where: { id: positionId },
      });
      
      if (!position) {
        console.error(`Position ${positionId} not found`);
        return false;
      }
      
      // Submit liquidation transaction to the blockchain
      try {
        // Execute the liquidation transaction
        const txSignature = await this.contractService.liquidatePosition(positionId);
        console.log(`Liquidation transaction submitted: ${txSignature}`);
        
        // Record liquidation event
        await prisma.liquidation.create({
          data: {
            id: `liquidation-${positionId}-${Date.now()}`,
            positionId,
            marketId: position.marketId,
            liquidator: this.solanaClient.getAdminPublicKey()?.toString() || 'system',
            liquidationPrice: position.liquidationPrice.toString(),
            collateralReturned: '0', // This will be updated by event indexer
            fee: '0', // This will be updated by event indexer
            txHash: txSignature,
            timestamp: BigInt(Math.floor(Date.now() / 1000)),
          },
        });
        
        // Update the position
        await prisma.position.update({
          where: { id: positionId },
          data: {
            isClosed: true,
            closedAt: BigInt(Math.floor(Date.now() / 1000)),
          },
        });
        
        return true;
      } catch (error) {
        console.error(`Error executing liquidation transaction for position ${positionId}:`, error);
        // If transaction failed but we can confirm it's liquidatable,
        // mark it for manual intervention
        await prisma.position.update({
          where: { id: positionId },
          data: {
            // Instead of needsLiquidation, we might want to track this in a separate table
          },
        });
        return false;
      }
    } catch (error) {
      console.error(`Error liquidating position ${positionId}:`, error);
      return false;
    }
  }
  
  /**
   * Calculate the liquidation price for a position
   */
  calculateLiquidationPrice(
    isLong: boolean,
    size: bigint,
    entryPrice: bigint,
    collateral: bigint,
    leverage: number,
    maintenanceMarginRatio: number
  ): bigint {
    // Calculate maintenance margin (basis points to decimals)
    const maintenanceMarginRatio_decimal = BigInt(maintenanceMarginRatio) * BigInt(1e5) / BigInt(1e9);
    
    // For longs:
    // liquidationPrice = entryPrice * (1 - (collateral / (size * leverage)) + maintenanceMarginRatio)
    
    // For shorts:
    // liquidationPrice = entryPrice * (1 + (collateral / (size * leverage)) - maintenanceMarginRatio)
    
    const positionValue = size * BigInt(leverage);
    const collateralRatio = (collateral * BigInt(1e9)) / positionValue;
    
    let liquidationPrice: bigint;
    if (isLong) {
      // Long position liquidation price
      liquidationPrice = entryPrice - 
        ((entryPrice * collateralRatio) / BigInt(1e9)) + 
        ((entryPrice * maintenanceMarginRatio_decimal) / BigInt(1e9));
    } else {
      // Short position liquidation price
      liquidationPrice = entryPrice + 
        ((entryPrice * collateralRatio) / BigInt(1e9)) - 
        ((entryPrice * maintenanceMarginRatio_decimal) / BigInt(1e9));
    }
    
    return liquidationPrice;
  }
  
  /**
   * Calculate the health factor of a position
   * Health factor < 1.0 means position is liquidatable
   */
  calculateHealthFactor(
    isLong: boolean,
    size: bigint,
    entryPrice: bigint,
    currentPrice: bigint,
    collateral: bigint,
    maintenanceMarginRatio: number
  ): number {
    try {
      // Calculate position value at entry
      const positionValue = (size * entryPrice) / BigInt(1e9);
      
      // Calculate unrealized PnL
      let unrealizedPnl: bigint;
      if (isLong) {
        // For longs: (currentPrice - entryPrice) * size / 1e9
        unrealizedPnl = ((currentPrice - entryPrice) * size) / BigInt(1e9);
      } else {
        // For shorts: (entryPrice - currentPrice) * size / 1e9
        unrealizedPnl = ((entryPrice - currentPrice) * size) / BigInt(1e9);
      }
      
      // Calculate adjusted collateral with PnL
      const adjustedCollateral = collateral + unrealizedPnl;
      
      // Calculate required maintenance margin
      const maintenanceMargin = (positionValue * BigInt(maintenanceMarginRatio)) / BigInt(10000);
      
      // Health factor = adjusted collateral / maintenance margin
      // If health factor < 1.0, position is liquidatable
      if (maintenanceMargin <= 0 || adjustedCollateral <= 0) {
        return adjustedCollateral <= 0 ? 0 : 999;
      }
      
      const healthFactor = Number(adjustedCollateral) / Number(maintenanceMargin);
      return healthFactor;
    } catch (error) {
      console.error('Error calculating health factor:', error);
      return 999; // Default to healthy on error
    }
  }
} 