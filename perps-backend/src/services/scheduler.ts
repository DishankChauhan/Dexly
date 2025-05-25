import { FundingRateService } from './market/fundingRateService.js';
import { LiquidationService } from './liquidation/liquidationService.js';
import { PerpsContractService } from './blockchain/perpsContractService.js';
import { SolanaClient } from './blockchain/solanaClient.js';
import { EventIndexer } from './indexer/eventIndexer.js';
import { WebSocketService } from './websocket/websocketService.js';
import { LiquidationMonitor } from './liquidation/liquidationMonitor.js';
import { OrderService } from './orders/orderService.js';
import { OracleService } from './oracle/oracleService.js';
import prisma from '../db/prisma.js';
import config from '../config/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Service for scheduling and executing periodic tasks
 */
export class SchedulerService {
  private fundingRateService: FundingRateService;
  private liquidationService: LiquidationService;
  private liquidationMonitor: LiquidationMonitor;
  private contractService: PerpsContractService;
  private solanaClient: SolanaClient;
  private eventIndexer: EventIndexer;
  private wsService: WebSocketService | null = null;
  private orderService: OrderService;
  private oracleService: OracleService;
  
  // Task intervals
  private fundingInterval: NodeJS.Timeout | null = null;
  private liquidationInterval: NodeJS.Timeout | null = null;
  private priceUpdateInterval: NodeJS.Timeout | null = null;
  private indexerInterval: NodeJS.Timeout | null = null;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private oraclePriceInterval: NodeJS.Timeout | null = null;
  
  constructor(wsService?: WebSocketService | null) {
    // Initialize services
    this.solanaClient = new SolanaClient();
    this.contractService = new PerpsContractService(this.solanaClient);
    this.wsService = wsService || null;
    
    // Load the IDL for the program
    this.loadIdl();
    
    // Initialize services with the correct dependencies
    this.oracleService = new OracleService(this.solanaClient.getConnection());
    this.fundingRateService = new FundingRateService(this.contractService, this.solanaClient);
    this.liquidationService = new LiquidationService(this.contractService, this.solanaClient);
    this.eventIndexer = new EventIndexer(this.solanaClient);
    
    // Initialize liquidation monitor with WebSocket service
    this.liquidationMonitor = new LiquidationMonitor(
      this.liquidationService,
      this.contractService,
      this.solanaClient,
      this.wsService || undefined
    );
    
    // Initialize order service
    this.orderService = new OrderService(
      this.contractService,
      this.solanaClient,
      this.wsService || undefined
    );
  }
  
  /**
   * Load the Anchor IDL
   */
  private async loadIdl(): Promise<void> {
    try {
      const perpsIdlPath = path.join(__dirname, '../../perps-idl.json');
      
      // Create a copy of Perps IDL from the program folder if it doesn't exist
      if (!fs.existsSync(perpsIdlPath)) {
        console.log('Perps IDL not found, attempting to copy from program folder...');
        const sourcePath = path.join(__dirname, '../../../perps/perps.json');
        
        if (fs.existsSync(sourcePath)) {
          // Copy the file
          fs.copyFileSync(sourcePath, perpsIdlPath);
          console.log(`Copied Perps IDL from ${sourcePath} to ${perpsIdlPath}`);
        } else {
          console.error(`Source IDL not found at ${sourcePath}`);
        }
      }
      
      // Load the IDL if it exists now
      if (fs.existsSync(perpsIdlPath)) {
        const idlJson = JSON.parse(fs.readFileSync(perpsIdlPath, 'utf8'));
        await this.contractService.initialize(idlJson);
        console.log('Program IDL loaded successfully');
      } else {
        console.error('Failed to load Perps IDL. Services might not function correctly.');
      }
    } catch (error) {
      console.error('Error loading program IDL:', error);
    }
  }
  
  /**
   * Start all scheduled tasks
   */
  async startScheduler(): Promise<void> {
    await this.startFundingRateUpdates();
    await this.startLiquidationChecks();
    await this.startPriceUpdates();
    await this.startEventIndexer();
    await this.startSystemHealthCheck();
    await this.startOraclePriceMonitoring();
    
    // Start enhanced liquidation monitor
    this.liquidationMonitor.start();
    
    // Start order service for advanced order types
    this.orderService.start();
    
    console.log('Scheduler started with oracle price monitoring');
  }
  
  /**
   * Stop all scheduled tasks
   */
  stopScheduler(): void {
    if (this.fundingInterval) {
      clearInterval(this.fundingInterval);
      this.fundingInterval = null;
    }
    
    if (this.liquidationInterval) {
      clearInterval(this.liquidationInterval);
      this.liquidationInterval = null;
    }
    
    if (this.priceUpdateInterval) {
      clearInterval(this.priceUpdateInterval);
      this.priceUpdateInterval = null;
    }
    
    if (this.indexerInterval) {
      clearInterval(this.indexerInterval);
      this.indexerInterval = null;
    }
    
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    
    if (this.oraclePriceInterval) {
      clearInterval(this.oraclePriceInterval);
      this.oraclePriceInterval = null;
    }
    
    // Stop liquidation monitor
    this.liquidationMonitor.stop();
    
    // Stop order service
    this.orderService.stop();
    
    // Stop oracle service subscriptions
    this.oracleService.shutdown();
    
    console.log('Scheduler stopped');
  }
  
  /**
   * Start the event indexer
   */
  private async startEventIndexer(): Promise<void> {
    try {
      // Check if we have admin credentials before starting indexer
      if (!this.solanaClient.hasAdminKey()) {
        console.warn('Admin credentials not configured. Event indexer will run in read-only mode.');
      }
      
      this.indexerInterval = await this.eventIndexer.startIndexing();
      console.log('Event indexer started');
    } catch (error) {
      console.error('Error starting event indexer:', error);
    }
  }
  
  /**
   * Start the funding rate update task
   * This typically runs every hour
   */
  private async startFundingRateUpdates(): Promise<void> {
    // Run every hour (in ms)
    const interval = config.FUNDING_INTERVAL_MS || 60 * 60 * 1000;
    
    this.fundingInterval = setInterval(async () => {
      try {
        console.log('Running funding rate updates...');
        
        // Get all markets
        const markets = await this.contractService.getMarkets();
        
        // Only process active markets
        const activeMarkets = markets.filter(market => market.isActive);
        console.log(`Found ${activeMarkets.length} active markets`);
        
        for (const market of activeMarkets) {
          const marketId = market.market?.toString() || '';
          if (!marketId) continue;
          
          console.log(`Processing funding for market ${marketId}...`);
          
          try {
            // Calculate new funding rate
            const fundingRate = await this.fundingRateService.calculateFundingRate(marketId);
            
            // Get market prices
            const baseAssetReserve = market.baseAssetReserve;
            const quoteAssetReserve = market.quoteAssetReserve;
            const markPrice = (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
            
            // Get oracle price
            let indexPrice = markPrice; // Fallback to mark price
            try {
              // Get the index price from oracle
              // This would be implemented in the fundingRateService
              const marketObj = await this.contractService.getMarket(marketId);
              if (marketObj) {
                indexPrice = await this.fundingRateService.getOraclePrice(marketObj);
              }
            } catch (error) {
              console.warn(`Failed to get oracle price for market ${marketId}, using mark price:`, error);
            }
            
            // Record funding event
            await this.fundingRateService.recordFundingEvent(
              marketId,
              fundingRate,
              markPrice,
              indexPrice
            );
            
            // Apply funding to positions
            await this.fundingRateService.applyFundingToPositions(marketId);
            
            console.log(`Funding updated for market ${marketId}: ${fundingRate.toString()} bps`);
            
            // Broadcast funding update via WebSocket if available
            if (this.wsService) {
              this.wsService.broadcastEvent('funding_update', {
                marketId,
                fundingRate: fundingRate.toString(),
                markPrice: markPrice.toString(),
                indexPrice: indexPrice.toString(),
                timestamp: Date.now()
              });
            }
          } catch (error) {
            console.error(`Error updating funding for market ${marketId}:`, error);
          }
        }
      } catch (error) {
        console.error('Error updating funding rates:', error);
      }
    }, interval);
    
    // Also run immediately on startup if configured
    if (config.RUN_FUNDING_ON_STARTUP) {
      console.log('Running initial funding rate update...');
      this.fundingInterval.ref();
      setImmediate(() => {
        this.fundingInterval?.unref();
      });
    } else {
      this.fundingInterval.unref();
    }
  }
  
  /**
   * Start the liquidation check task
   * This runs more frequently, e.g., every minute
   */
  private async startLiquidationChecks(): Promise<void> {
    // Run every minute (in ms)
    const interval = config.LIQUIDATION_INTERVAL_MS || 60 * 1000;
    
    this.liquidationInterval = setInterval(async () => {
      try {
        console.log('Checking for liquidations...');
        
        // Find liquidatable positions
        const liquidatablePositions = await this.liquidationService.findLiquidatablePositions();
        
        if (liquidatablePositions.length === 0) {
          console.log('No liquidatable positions found');
          return;
        }
        
        console.log(`Found ${liquidatablePositions.length} liquidatable positions`);
        
        // Process liquidations
        let successCount = 0;
        for (const { position } of liquidatablePositions) {
          // Check if we have admin credentials for executing liquidations
          if (!this.solanaClient.hasAdminKey()) {
            console.warn(`Cannot liquidate position ${position.id}: Admin credentials not configured`);
            continue;
          }
          
          const success = await this.liquidationService.liquidatePosition(position.id);
          if (success) {
            successCount++;
            console.log(`Position ${position.id} liquidated successfully`);
          } else {
            console.warn(`Failed to liquidate position ${position.id}`);
          }
        }
        
        if (successCount > 0) {
          console.log(`Liquidated ${successCount} positions successfully`);
        }
      } catch (error) {
        console.error('Error checking for liquidations:', error);
      }
    }, interval);
    
    // Don't run immediately on startup by default
    this.liquidationInterval.unref();
  }
  
  /**
   * Start the price update task
   * This runs very frequently, e.g., every 10 seconds
   */
  private async startPriceUpdates(): Promise<void> {
    // Run every 10 seconds (in ms)
    const interval = config.PRICE_UPDATE_INTERVAL_MS || 10 * 1000;
    
    this.priceUpdateInterval = setInterval(async () => {
      try {
        // Get all markets
        const markets = await this.contractService.getMarkets();
        
        for (const market of markets) {
          const marketId = market.market?.toString() || '';
          if (!marketId || !market.isActive) continue;
          
          // Calculate current prices
          const baseAssetReserve = market.baseAssetReserve;
          const quoteAssetReserve = market.quoteAssetReserve;
          const markPrice = (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
          
          // Try to get oracle price, fallback to mark price
          let indexPrice = markPrice;
          try {
            const marketObj = await this.contractService.getMarket(marketId);
            if (marketObj) {
              indexPrice = await this.fundingRateService.getOraclePrice(marketObj);
            }
          } catch (error) {
            // Fallback to using mark price if oracle fails
            console.debug(`Failed to get oracle price for ${marketId}, using mark price`);
          }
          
          // Record price update (less frequent than the interval to avoid database bloat)
          // Only record every minute (6 updates at 10-second intervals)
          const shouldRecord = Date.now() % (60 * 1000) < interval;
          
          if (shouldRecord) {
            await prisma.priceHistory.create({
              data: {
                id: `price-${marketId}-${Date.now()}`,
                marketId,
                markPrice: markPrice.toString(),
                indexPrice: indexPrice.toString(),
                timestamp: BigInt(Math.floor(Date.now() / 1000)),
              },
            });
          }
        }
      } catch (error) {
        console.error('Error updating prices:', error);
      }
    }, interval);
    
    // Don't prevent process from exiting
    this.priceUpdateInterval.unref();
  }
  
  /**
   * Start the system health check
   * This runs every few minutes to ensure the system is healthy
   */
  private async startSystemHealthCheck(): Promise<void> {
    // Run every 5 minutes
    const interval = 5 * 60 * 1000;
    
    this.healthCheckInterval = setInterval(async () => {
      try {
        console.log('Running system health check...');
        
        // Check Solana connection
        try {
          const blockHeight = await this.solanaClient.getConnection().getBlockHeight();
          console.log(`Solana connection healthy, current block height: ${blockHeight}`);
        } catch (error) {
          console.error('Solana connection failed:', error);
        }
        
        // Check database connection
        try {
          const count = await prisma.market.count();
          console.log(`Database connection healthy, ${count} markets found`);
        } catch (error) {
          console.error('Database connection failed:', error);
        }
        
        // Check admin key if configured
        if (this.solanaClient.hasAdminKey()) {
          console.log('Admin key is configured');
        } else {
          console.warn('Admin key is not configured, some features are disabled');
        }
        
        console.log('System health check completed');
      } catch (error) {
        console.error('Error running system health check:', error);
      }
    }, interval);
    
    // Don't prevent process from exiting
    this.healthCheckInterval.unref();
  }
  
  /**
   * Start oracle price monitoring for real-time price updates
   */
  private async startOraclePriceMonitoring(): Promise<void> {
    try {
      console.log('Starting oracle price monitoring...');
      
      // Get supported markets from oracle service
      const supportedMarkets = this.oracleService.getSupportedMarkets();
      console.log(`Monitoring prices for ${supportedMarkets.length} markets: ${supportedMarkets.join(', ')}`);
      
      // Start price subscriptions for each supported market
      for (const market of supportedMarkets) {
        await this.oracleService.startPriceUpdates(market, async (priceUpdate) => {
          try {
            // Broadcast price update via WebSocket if available
            if (this.wsService) {
              this.wsService.broadcastEvent('price_update', {
                marketId: priceUpdate.marketId,
                markPrice: priceUpdate.markPrice,
                indexPrice: priceUpdate.indexPrice,
                timestamp: priceUpdate.timestamp,
                confidence: priceUpdate.confidence
              });
            }
            
            console.log(`Price update for ${market}: $${priceUpdate.indexPrice.toFixed(2)}`);
          } catch (error) {
            console.error(`Error processing price update for ${market}:`, error);
          }
        });
      }
      
      // Also run a periodic health check on oracle service
      this.oraclePriceInterval = setInterval(async () => {
        try {
          const healthStatus = await this.oracleService.healthCheck();
          if (!healthStatus.overall) {
            console.warn('Oracle service health check failed:', healthStatus);
          }
        } catch (error) {
          console.error('Error during oracle health check:', error);
        }
      }, 60000); // Check every minute
      
      console.log('Oracle price monitoring started successfully');
    } catch (error) {
      console.error('Error starting oracle price monitoring:', error);
    }
  }
} 