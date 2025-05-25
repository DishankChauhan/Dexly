import { PerpsContractService } from '../blockchain/perpsContractService.js';
import { SolanaClient } from '../blockchain/solanaClient.js';
import { WebSocketService } from '../websocket/websocketService.js';
import { 
  Order, 
  OrderType, 
  Position, 
  OpenPositionParams, 
  ClosePositionParams, 
  TradeDirection 
} from '../../models/perps.js';
import prisma from '../../db/prisma.js';
import { Decimal } from 'decimal.js';
import { PublicKey } from '@solana/web3.js';
import config from '../../config/index.js';

/**
 * Service for handling advanced order types like limit, stop-loss, and take-profit
 */
export class OrderService {
  private contractService: PerpsContractService;
  private solanaClient: SolanaClient;
  private wsService: WebSocketService | null = null;
  
  // Order processing state
  private isProcessing: boolean = false;
  private orderCheckInterval: NodeJS.Timeout | null = null;
  private lastPrices: Map<string, bigint> = new Map(); // marketId -> price
  
  // Market data cache to reduce RPC calls
  private marketsCache: Map<string, {
    baseAssetReserve: bigint;
    quoteAssetReserve: bigint;
    timestamp: number;
  }> = new Map();
  
  constructor(
    contractService: PerpsContractService,
    solanaClient: SolanaClient,
    wsService?: WebSocketService
  ) {
    this.contractService = contractService;
    this.solanaClient = solanaClient;
    this.wsService = wsService || null;
  }
  
  /**
   * Start the order processing service
   * This continuously checks for orders to execute
   */
  public start(): void {
    if (this.orderCheckInterval) {
      console.log('Order service already running');
      return;
    }
    
    console.log('Starting order service...');
    
    // Check orders every 10 seconds
    this.orderCheckInterval = setInterval(async () => {
      await this.processOrders();
    }, 10000);
    
    console.log('Order service started');
  }
  
  /**
   * Stop the order processing service
   */
  public stop(): void {
    if (!this.orderCheckInterval) {
      console.log('Order service not running');
      return;
    }
    
    clearInterval(this.orderCheckInterval);
    this.orderCheckInterval = null;
    console.log('Order service stopped');
  }
  
  /**
   * Create a new limit order
   * @param userKey The user's public key
   * @param marketId The market ID
   * @param direction Long or short
   * @param size Size of the position
   * @param price Target price for the order
   * @param collateral Collateral amount
   * @param leverage Leverage amount
   * @param maxSlippageBps Maximum allowed slippage in basis points
   */
  async createLimitOrder(
    userKey: string,
    marketId: string,
    direction: TradeDirection,
    size: bigint,
    price: bigint,
    collateral: bigint,
    leverage: number,
    maxSlippageBps: number = 50
  ): Promise<string> {
    return this.createOrder(
      userKey,
      marketId,
      OrderType.Limit,
      direction,
      size,
      price,
      collateral,
      leverage,
      maxSlippageBps
    );
  }
  
  /**
   * Create a new stop-loss order
   * @param userKey The user's public key
   * @param positionId The position ID to apply stop-loss to
   * @param price Trigger price for the stop-loss
   * @param maxSlippageBps Maximum allowed slippage in basis points
   */
  async createStopLossOrder(
    userKey: string,
    positionId: string,
    price: bigint,
    maxSlippageBps: number = 100
  ): Promise<string> {
    // Get position details
    const position = await this.contractService.getPosition(positionId);
    if (!position) {
      throw new Error(`Position ${positionId} not found`);
    }
    
    // Verify position belongs to user
    if (position.user.toString() !== userKey) {
      throw new Error('Position does not belong to the specified user');
    }
    
    // Create the stop-loss order
    return this.createOrder(
      userKey,
      position.market.toString(),
      OrderType.StopLoss,
      position.isLong ? TradeDirection.Short : TradeDirection.Long, // Opposite direction to close
      position.size,
      price,
      BigInt(0), // No additional collateral for stop-loss
      0, // No leverage for stop-loss
      maxSlippageBps,
      positionId
    );
  }
  
  /**
   * Create a new take-profit order
   * @param userKey The user's public key
   * @param positionId The position ID to apply take-profit to
   * @param price Trigger price for the take-profit
   * @param maxSlippageBps Maximum allowed slippage in basis points
   */
  async createTakeProfitOrder(
    userKey: string,
    positionId: string,
    price: bigint,
    maxSlippageBps: number = 100
  ): Promise<string> {
    // Get position details
    const position = await this.contractService.getPosition(positionId);
    if (!position) {
      throw new Error(`Position ${positionId} not found`);
    }
    
    // Verify position belongs to user
    if (position.user.toString() !== userKey) {
      throw new Error('Position does not belong to the specified user');
    }
    
    // Create the take-profit order
    return this.createOrder(
      userKey,
      position.market.toString(),
      OrderType.TakeProfit,
      position.isLong ? TradeDirection.Short : TradeDirection.Long, // Opposite direction to close
      position.size,
      price,
      BigInt(0), // No additional collateral for take-profit
      0, // No leverage for take-profit
      maxSlippageBps,
      positionId
    );
  }
  
  /**
   * Create a new order in the database
   */
  private async createOrder(
    userKey: string,
    marketId: string,
    orderType: OrderType,
    direction: TradeDirection,
    size: bigint,
    price: bigint,
    collateral: bigint,
    leverage: number,
    maxSlippageBps: number,
    positionId?: string
  ): Promise<string> {
    try {
      // Validate market
      const market = await this.contractService.getMarket(marketId);
      if (!market) {
        throw new Error(`Market ${marketId} not found`);
      }
      
      // Generate unique order ID
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // Create order record
      const order = await prisma.order.create({
        data: {
          id: orderId,
          userId: userKey,
          marketId,
          orderType,
          isLong: direction === TradeDirection.Long,
          size: size.toString(),
          price: price.toString(),
          collateral: collateral.toString(),
          leverage,
          isActive: true,
          maxSlippageBps,
          createdAt: BigInt(Math.floor(Date.now() / 1000)).toString(),
          positionId: positionId || null
        }
      });
      
      console.log(`Created ${OrderType[orderType]} order: ${orderId}`);
      
      // Broadcast order creation if WebSocket service available
      if (this.wsService) {
        this.wsService.broadcastEvent('order_created', {
          orderId,
          userKey,
          marketId,
          orderType: OrderType[orderType],
          direction: TradeDirection[direction],
          price: price.toString(),
          size: size.toString(),
          timestamp: Date.now()
        }, client => client.subscriptions.userKey === userKey);
      }
      
      return orderId;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
  
  /**
   * Process all active orders
   */
  private async processOrders(): Promise<void> {
    if (this.isProcessing) {
      return;
    }
    
    try {
      this.isProcessing = true;
      
      // Get all active orders
      const activeOrders = await prisma.order.findMany({
        where: {
          isActive: true
        }
      });
      
      if (activeOrders.length === 0) {
        return;
      }
      
      console.log(`Processing ${activeOrders.length} active orders`);
      
      // Group orders by market to optimize price fetching
      const ordersByMarket: Map<string, any[]> = new Map();
      activeOrders.forEach((order: any) => {
        const orders = ordersByMarket.get(order.marketId) || [];
        orders.push(order);
        ordersByMarket.set(order.marketId, orders);
      });
      
      // Process orders by market
      for (const [marketId, orders] of ordersByMarket) {
        try {
          // Get current price for market
          const currentPrice = await this.getCurrentPrice(marketId);
          
          // Update last price
          this.lastPrices.set(marketId, currentPrice);
          
          // Process each order for this market
          for (const order of orders) {
            await this.processOrder(order, currentPrice);
          }
        } catch (error) {
          console.error(`Error processing orders for market ${marketId}:`, error);
        }
      }
    } catch (error) {
      console.error('Error processing orders:', error);
    } finally {
      this.isProcessing = false;
    }
  }
  
  /**
   * Process a single order
   */
  private async processOrder(order: any, currentPrice: bigint): Promise<void> {
    try {
      // Convert string values to BigInt
      const orderPrice = BigInt(order.price);
      
      // Check if order conditions are met
      let shouldExecute = false;
      
      switch (order.orderType) {
        case OrderType.Limit:
          // For limit buy (long), execute when price <= order price
          // For limit sell (short), execute when price >= order price
          if (order.isLong) {
            shouldExecute = currentPrice <= orderPrice;
          } else {
            shouldExecute = currentPrice >= orderPrice;
          }
          break;
          
        case OrderType.StopLoss:
          // For long positions, stop loss triggers when price <= order price
          // For short positions, stop loss triggers when price >= order price
          if (order.isLong) {
            shouldExecute = currentPrice <= orderPrice;
          } else {
            shouldExecute = currentPrice >= orderPrice;
          }
          break;
          
        case OrderType.TakeProfit:
          // For long positions, take profit triggers when price >= order price
          // For short positions, take profit triggers when price <= order price
          if (order.isLong) {
            shouldExecute = currentPrice >= orderPrice;
          } else {
            shouldExecute = currentPrice <= orderPrice;
          }
          break;
      }
      
      if (shouldExecute) {
        console.log(`Executing order ${order.id}`);
        await this.executeOrder(order);
      }
    } catch (error) {
      console.error(`Error processing order ${order.id}:`, error);
    }
  }
  
  /**
   * Execute an order
   */
  private async executeOrder(order: any): Promise<void> {
    try {
      let txSignature: string = '';
      
      // Mark order as inactive first to prevent duplicate execution
      await prisma.order.update({
        where: { id: order.id },
        data: { isActive: false }
      });
      
      // Execute based on order type
      switch (order.orderType) {
        case OrderType.Limit:
          // Open a new position
          const openParams: OpenPositionParams = {
            marketId: order.marketId,
            direction: order.isLong ? TradeDirection.Long : TradeDirection.Short,
            size: BigInt(order.size),
            collateral: BigInt(order.collateral),
            leverage: order.leverage,
            userKey: order.userId
          };
          
          // Prepare the instruction
          const openInstruction = await this.contractService.prepareOpenPosition(openParams);
          
          // Execute the transaction
          txSignature = await this.contractService.executeTransaction(openInstruction);
          
          // Update order with position details
          await prisma.order.update({
            where: { id: order.id },
            data: {
              executionPrice: (await this.getCurrentPrice(order.marketId)).toString(),
              executedAt: BigInt(Math.floor(Date.now() / 1000)).toString(),
              txHash: txSignature
            }
          });
          break;
          
        case OrderType.StopLoss:
        case OrderType.TakeProfit:
          // Close existing position
          if (!order.positionId) {
            throw new Error(`No position ID for ${OrderType[order.orderType]} order`);
          }
          
          const closeParams: ClosePositionParams = {
            positionId: order.positionId,
            userKey: order.userId,
            maxSlippageBps: order.maxSlippageBps
          };
          
          // Prepare the instruction
          const closeInstruction = await this.contractService.prepareClosePosition(closeParams);
          
          // Execute the transaction
          txSignature = await this.contractService.executeTransaction(closeInstruction);
          
          // Update order with execution details
          await prisma.order.update({
            where: { id: order.id },
            data: {
              executionPrice: (await this.getCurrentPrice(order.marketId)).toString(),
              executedAt: BigInt(Math.floor(Date.now() / 1000)).toString(),
              txHash: txSignature
            }
          });
          break;
      }
      
      console.log(`Order ${order.id} executed successfully: ${txSignature}`);
      
      // Broadcast order execution if WebSocket service available
      if (this.wsService) {
        this.wsService.broadcastEvent('order_executed', {
          orderId: order.id,
          orderType: OrderType[order.orderType],
          txHash: txSignature,
          timestamp: Date.now()
        }, client => client.subscriptions.userKey === order.userId);
      }
    } catch (error) {
      console.error(`Error executing order ${order.id}:`, error);
      
      // Re-activate the order in case of execution failure
      await prisma.order.update({
        where: { id: order.id },
        data: { 
          isActive: true,
          lastError: error instanceof Error ? error.message : 'Unknown error'
        }
      });
      
      // Broadcast order failure if WebSocket service available
      if (this.wsService) {
        this.wsService.broadcastEvent('order_failed', {
          orderId: order.id,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: Date.now()
        }, client => client.subscriptions.userKey === order.userId);
      }
    }
  }
  
  /**
   * Get the current price for a market
   * Uses a cache to reduce RPC calls
   */
  private async getCurrentPrice(marketId: string): Promise<bigint> {
    try {
      // Check cache first
      const cachedData = this.marketsCache.get(marketId);
      const now = Date.now();
      
      // If cache is valid (less than 15 seconds old), use it
      if (cachedData && (now - cachedData.timestamp) < 15000) {
        return (cachedData.quoteAssetReserve * BigInt(1e9)) / cachedData.baseAssetReserve;
      }
      
      // Otherwise fetch fresh data
      const market = await this.contractService.getMarket(marketId);
      if (!market) {
        throw new Error(`Market ${marketId} not found`);
      }
      
      const price = (market.quoteAssetReserve * BigInt(1e9)) / market.baseAssetReserve;
      
      // Update cache
      this.marketsCache.set(marketId, {
        baseAssetReserve: market.baseAssetReserve,
        quoteAssetReserve: market.quoteAssetReserve,
        timestamp: now
      });
      
      return price;
    } catch (error) {
      console.error(`Error getting current price for market ${marketId}:`, error);
      
      // Try using last known price
      const lastPrice = this.lastPrices.get(marketId);
      if (lastPrice) {
        return lastPrice;
      }
      
      throw error;
    }
  }
  
  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string, userKey: string): Promise<boolean> {
    try {
      // Get order
      const order = await prisma.order.findUnique({
        where: { id: orderId }
      });
      
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }
      
      // Verify ownership
      if (order.userId !== userKey) {
        throw new Error('Order does not belong to the specified user');
      }
      
      // Verify order is active
      if (!order.isActive) {
        throw new Error('Order is already executed or cancelled');
      }
      
      // Cancel order
      await prisma.order.update({
        where: { id: orderId },
        data: {
          isActive: false,
          cancelledAt: BigInt(Math.floor(Date.now() / 1000)).toString()
        }
      });
      
      console.log(`Order ${orderId} cancelled`);
      
      // Broadcast cancellation if WebSocket service available
      if (this.wsService) {
        this.wsService.broadcastEvent('order_cancelled', {
          orderId,
          timestamp: Date.now()
        }, client => client.subscriptions.userKey === userKey);
      }
      
      return true;
    } catch (error) {
      console.error(`Error cancelling order ${orderId}:`, error);
      return false;
    }
  }
  
  /**
   * Get active orders for a user
   */
  async getActiveOrdersForUser(userKey: string): Promise<any[]> {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userId: userKey,
          isActive: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return orders.map((order: any) => ({
        id: order.id,
        marketId: order.marketId,
        orderType: OrderType[order.orderType],
        direction: order.isLong ? 'Long' : 'Short',
        size: order.size,
        price: order.price,
        collateral: order.collateral,
        leverage: order.leverage,
        createdAt: order.createdAt,
        positionId: order.positionId
      }));
    } catch (error) {
      console.error(`Error getting active orders for user ${userKey}:`, error);
      return [];
    }
  }
  
  /**
   * Get order history for a user
   */
  async getOrderHistoryForUser(userKey: string, limit: number = 50): Promise<any[]> {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userId: userKey,
          isActive: false
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit
      });
      
      return orders.map((order: any) => ({
        id: order.id,
        marketId: order.marketId,
        orderType: OrderType[order.orderType],
        direction: order.isLong ? 'Long' : 'Short',
        size: order.size,
        price: order.price,
        executionPrice: order.executionPrice,
        status: order.executedAt ? 'Executed' : (order.cancelledAt ? 'Cancelled' : 'Unknown'),
        createdAt: order.createdAt,
        executedAt: order.executedAt,
        cancelledAt: order.cancelledAt,
        txHash: order.txHash
      }));
    } catch (error) {
      console.error(`Error getting order history for user ${userKey}:`, error);
      return [];
    }
  }

  /**
   * Get all orders for a user (both active and history)
   */
  async getUserOrders(userKey: string): Promise<any[]> {
    try {
      // Get active orders
      const activeOrders = await this.getActiveOrdersForUser(userKey);
      
      // Get order history
      const orderHistory = await this.getOrderHistoryForUser(userKey);
      
      // Combine and return
      return [...activeOrders, ...orderHistory];
    } catch (error) {
      console.error(`Error getting user orders ${userKey}:`, error);
      return [];
    }
  }
  
  /**
   * Get all orders for a specific position
   */
  async getPositionOrders(positionId: string): Promise<any[]> {
    try {
      const orders = await prisma.order.findMany({
        where: {
          positionId
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return orders.map((order: any) => ({
        id: order.id,
        marketId: order.marketId,
        orderType: OrderType[order.orderType],
        direction: order.isLong ? 'Long' : 'Short',
        size: order.size,
        price: order.price,
        executionPrice: order.executionPrice,
        status: order.isActive ? 'Active' : (order.executedAt ? 'Executed' : (order.cancelledAt ? 'Cancelled' : 'Unknown')),
        createdAt: order.createdAt,
        executedAt: order.executedAt,
        cancelledAt: order.cancelledAt,
        txHash: order.txHash
      }));
    } catch (error) {
      console.error(`Error getting orders for position ${positionId}:`, error);
      return [];
    }
  }
} 