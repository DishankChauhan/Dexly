import { PerpsContractService } from '../blockchain/perpsContractService.js';
import { SolanaClient } from '../blockchain/solanaClient.js';
import { LiquidationService } from './liquidationService.js';
import prisma from '../../db/prisma.js';
import { WebSocketService } from '../websocket/websocketService.js';
import { Position, Market } from '../../models/perps.js';
import config from '../../config/index.js';

/**
 * Enhanced liquidation monitoring service
 * Continuously checks for positions eligible for liquidation and executes them
 */
export class LiquidationMonitor {
  private liquidationService: LiquidationService;
  private contractService: PerpsContractService;
  private solanaClient: SolanaClient;
  private wsService: WebSocketService | null = null;
  
  // Monitor state
  private isMonitoring: boolean = false;
  private monitorInterval: NodeJS.Timeout | null = null;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  
  // Tracking for rate limiting and monitoring
  private liquidationsAttempted: number = 0;
  private liquidationsSucceeded: number = 0;
  private lastLiquidationAttempt: number = 0;
  private consecutiveFailures: number = 0;
  
  // Configuration
  private checkIntervalMs: number;
  private healthCheckIntervalMs: number;
  private minTimeBetweenLiquidationsMs: number;
  private maxConsecutiveFailures: number;
  
  constructor(
    liquidationService: LiquidationService,
    contractService: PerpsContractService,
    solanaClient: SolanaClient,
    wsService?: WebSocketService
  ) {
    this.liquidationService = liquidationService;
    this.contractService = contractService;
    this.solanaClient = solanaClient;
    this.wsService = wsService || null;
    
    // Set defaults from config or use reasonable defaults
    this.checkIntervalMs = config.LIQUIDATION_CHECK_INTERVAL_MS || 30 * 1000; // 30 seconds
    this.healthCheckIntervalMs = config.LIQUIDATION_HEALTH_CHECK_INTERVAL_MS || 5 * 60 * 1000; // 5 minutes
    this.minTimeBetweenLiquidationsMs = config.MIN_TIME_BETWEEN_LIQUIDATIONS_MS || 5 * 1000; // 5 seconds
    this.maxConsecutiveFailures = config.MAX_CONSECUTIVE_LIQUIDATION_FAILURES || 5;
  }
  
  /**
   * Start the liquidation monitor
   */
  public start(): void {
    if (this.isMonitoring) {
      console.log('Liquidation monitor already running');
      return;
    }
    
    console.log('Starting liquidation monitor...');
    this.isMonitoring = true;
    
    // Start checking for liquidatable positions
    this.monitorInterval = setInterval(async () => {
      await this.checkAndLiquidatePositions();
    }, this.checkIntervalMs);
    
    // Start health check to ensure the monitor is working properly
    this.healthCheckInterval = setInterval(() => {
      this.performHealthCheck();
    }, this.healthCheckIntervalMs);
    
    console.log(`Liquidation monitor started. Checking every ${this.checkIntervalMs / 1000} seconds.`);
  }
  
  /**
   * Stop the liquidation monitor
   */
  public stop(): void {
    if (!this.isMonitoring) {
      console.log('Liquidation monitor not running');
      return;
    }
    
    console.log('Stopping liquidation monitor...');
    this.isMonitoring = false;
    
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
    
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    
    console.log('Liquidation monitor stopped.');
  }
  
  /**
   * Perform one check and liquidation cycle
   */
  private async checkAndLiquidatePositions(): Promise<void> {
    if (!this.isMonitoring) return;
    
    try {
      console.log('Checking for liquidatable positions...');
      
      // Get liquidatable positions
      const liquidatablePositions = await this.liquidationService.findLiquidatablePositions();
      console.log(`Found ${liquidatablePositions.length} liquidatable positions`);
      
      if (liquidatablePositions.length === 0) {
        return;
      }
      
      // Sort positions by health factor (most underwater first)
      liquidatablePositions.sort((a, b) => {
        const healthA = this.calculatePositionHealth(a.position, a.currentPrice);
        const healthB = this.calculatePositionHealth(b.position, b.currentPrice);
        return healthA - healthB; // Smaller health factor (worse health) first
      });
      
      // Rate limit liquidations
      const now = Date.now();
      if (now - this.lastLiquidationAttempt < this.minTimeBetweenLiquidationsMs) {
        console.log(`Rate limiting liquidations. Next attempt in ${(this.lastLiquidationAttempt + this.minTimeBetweenLiquidationsMs - now) / 1000} seconds.`);
        return;
      }
      
      // Attempt to liquidate the position with the worst health
      const target = liquidatablePositions[0];
      this.lastLiquidationAttempt = now;
      this.liquidationsAttempted++;
      
      // Record liquidation attempt
      await prisma.liquidationAttempt.create({
        data: {
          id: `attempt-${target.position.id}-${now}`,
          positionId: target.position.id,
          marketId: target.position.marketId,
          timestamp: BigInt(Math.floor(now / 1000)).toString(),
          currentPrice: target.currentPrice,
          liquidationPrice: target.position.liquidationPrice,
          status: 'ATTEMPTED'
        }
      });
      
      console.log(`Attempting to liquidate position ${target.position.id}...`);
      
      // Execute liquidation
      const success = await this.liquidationService.liquidatePosition(target.position.id);
      
      if (success) {
        console.log(`Successfully liquidated position ${target.position.id}`);
        this.liquidationsSucceeded++;
        this.consecutiveFailures = 0;
        
        // Update liquidation attempt record
        await prisma.liquidationAttempt.update({
          where: { id: `attempt-${target.position.id}-${now}` },
          data: { status: 'SUCCESS' }
        });
        
        // Notify via WebSocket if available
        if (this.wsService) {
          this.wsService.broadcastEvent('liquidation', {
            positionId: target.position.id,
            marketId: target.position.marketId,
            timestamp: now
          });
        }
      } else {
        console.error(`Failed to liquidate position ${target.position.id}`);
        this.consecutiveFailures++;
        
        // Update liquidation attempt record
        await prisma.liquidationAttempt.update({
          where: { id: `attempt-${target.position.id}-${now}` },
          data: { status: 'FAILED' }
        });
        
        // If too many consecutive failures, pause monitoring temporarily
        if (this.consecutiveFailures >= this.maxConsecutiveFailures) {
          console.error(`Too many consecutive liquidation failures (${this.consecutiveFailures}). Pausing liquidation monitor for 10 minutes.`);
          this.stop();
          
          // Restart after 10 minutes
          setTimeout(() => {
            console.log('Restarting liquidation monitor after pause.');
            this.consecutiveFailures = 0;
            this.start();
          }, 10 * 60 * 1000);
        }
      }
    } catch (error) {
      console.error('Error in liquidation monitor cycle:', error);
      this.consecutiveFailures++;
    }
  }
  
  /**
   * Calculate the health factor of a position
   * Lower value means position is closer to liquidation
   */
  private calculatePositionHealth(position: any, currentPrice: string): number {
    try {
      // Parse values
      const isLong = position.isLong;
      const entryPrice = BigInt(position.entryPrice);
      const liquidationPrice = BigInt(position.liquidationPrice);
      const currentPriceBigInt = BigInt(currentPrice);
      
      // Calculate how far the current price is from liquidation price
      // For longs: (current - liquidation) / liquidation
      // For shorts: (liquidation - current) / liquidation
      
      let healthPercentage: number;
      if (isLong) {
        if (currentPriceBigInt <= liquidationPrice) return 0; // Already liquidatable
        const distance = Number(currentPriceBigInt - liquidationPrice);
        healthPercentage = distance / Number(liquidationPrice);
      } else {
        if (currentPriceBigInt >= liquidationPrice) return 0; // Already liquidatable
        const distance = Number(liquidationPrice - currentPriceBigInt);
        healthPercentage = distance / Number(liquidationPrice);
      }
      
      // Return as a percentage (0 to 100)
      return Math.min(healthPercentage * 100, 100);
    } catch (error) {
      console.error('Error calculating position health:', error);
      return 100; // Return max health on error to prevent unnecessary liquidation
    }
  }
  
  /**
   * Perform health check and report monitor statistics
   */
  private performHealthCheck(): void {
    if (!this.isMonitoring) return;
    
    const successRate = this.liquidationsAttempted > 0 
      ? (this.liquidationsSucceeded / this.liquidationsAttempted) * 100 
      : 0;
      
    console.log(`
    === Liquidation Monitor Health Check ===
    Status: ${this.isMonitoring ? 'ACTIVE' : 'INACTIVE'}
    Consecutive Failures: ${this.consecutiveFailures}
    Liquidations Attempted: ${this.liquidationsAttempted}
    Liquidations Succeeded: ${this.liquidationsSucceeded}
    Success Rate: ${successRate.toFixed(2)}%
    Last Attempt: ${this.lastLiquidationAttempt > 0 ? new Date(this.lastLiquidationAttempt).toISOString() : 'Never'}
    =======================================
    `);
    
    // Write health check data to database for monitoring
    try {
      prisma.systemHealth.create({
        data: {
          id: `liquidation-monitor-${Date.now()}`,
          component: 'LIQUIDATION_MONITOR',
          status: this.isMonitoring ? 'ACTIVE' : 'INACTIVE',
          metrics: JSON.stringify({
            consecutiveFailures: this.consecutiveFailures,
            liquidationsAttempted: this.liquidationsAttempted,
            liquidationsSucceeded: this.liquidationsSucceeded,
            successRate: successRate,
            lastAttempt: this.lastLiquidationAttempt
          }),
          timestamp: BigInt(Math.floor(Date.now() / 1000)).toString()
        }
      });
    } catch (error) {
      console.error('Error recording health check data:', error);
    }
  }
  
  /**
   * Get monitor statistics
   */
  public getStatistics(): any {
    return {
      isMonitoring: this.isMonitoring,
      liquidationsAttempted: this.liquidationsAttempted,
      liquidationsSucceeded: this.liquidationsSucceeded,
      successRate: this.liquidationsAttempted > 0 
        ? (this.liquidationsSucceeded / this.liquidationsAttempted) * 100 
        : 0,
      consecutiveFailures: this.consecutiveFailures,
      lastLiquidationAttempt: this.lastLiquidationAttempt
    };
  }
} 