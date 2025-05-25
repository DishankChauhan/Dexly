import { Request, Response } from 'express';
import { OrderService } from '../../services/orders/orderService.js';
import { PerpsContractService } from '../../services/blockchain/perpsContractService.js';
import { SolanaClient } from '../../services/blockchain/solanaClient.js';
import { WebSocketService } from '../../services/websocket/websocketService.js';
import { TradeDirection } from '../../models/perps.js';

// Initialize services
const solanaClient = new SolanaClient();
const contractService = new PerpsContractService(solanaClient);
// WebSocketService should be passed in from app.ts, but for simplicity we'll skip it here
const orderService = new OrderService(contractService, solanaClient);

/**
 * Create a limit order
 */
export const createLimitOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { marketId, direction, size, price, collateral, leverage, userKey } = req.body;
    
    if (!marketId || direction === undefined || !size || !price || !collateral || !leverage || !userKey) {
      res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
      return;
    }
    
    const orderId = await orderService.createLimitOrder(
      userKey,
      marketId,
      parseInt(direction) === 1 ? TradeDirection.Long : TradeDirection.Short,
      BigInt(size),
      BigInt(price),
      BigInt(collateral),
      parseInt(leverage)
    );
    
    res.status(201).json({
      success: true,
      data: {
        orderId,
        marketId,
        orderType: 'LIMIT',
        direction: parseInt(direction) === TradeDirection.Long ? 'LONG' : 'SHORT',
        size,
        price,
        collateral,
        leverage,
        userKey
      }
    });
  } catch (error) {
    console.error('Error creating limit order:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to create limit order',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Create a stop-loss order
 */
export const createStopLossOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { positionId, triggerPrice, userKey } = req.body;
    
    if (!positionId || !triggerPrice || !userKey) {
      res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
      return;
    }
    
    const orderId = await orderService.createStopLossOrder(
      userKey,
      positionId,
      BigInt(triggerPrice)
    );
    
    res.status(201).json({
      success: true,
      data: {
        orderId,
        positionId,
        orderType: 'STOP_LOSS',
        triggerPrice,
        userKey
      }
    });
  } catch (error) {
    console.error('Error creating stop-loss order:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to create stop-loss order',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Create a take-profit order
 */
export const createTakeProfitOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { positionId, triggerPrice, userKey } = req.body;
    
    if (!positionId || !triggerPrice || !userKey) {
      res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
      return;
    }
    
    const orderId = await orderService.createTakeProfitOrder(
      userKey,
      positionId,
      BigInt(triggerPrice)
    );
    
    res.status(201).json({
      success: true,
      data: {
        orderId,
        positionId,
        orderType: 'TAKE_PROFIT',
        triggerPrice,
        userKey
      }
    });
  } catch (error) {
    console.error('Error creating take-profit order:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to create take-profit order',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Cancel an order
 */
export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, userKey } = req.body;
    
    if (!orderId || !userKey) {
      res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
      return;
    }
    
    const success = await orderService.cancelOrder(orderId, userKey);
    
    res.status(200).json({
      success: true,
      data: {
        orderId,
        cancelled: success
      }
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to cancel order',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get user orders
 */
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userKey } = req.params;
    
    if (!userKey) {
      res.status(400).json({
        success: false,
        error: 'Missing user key parameter'
      });
      return;
    }
    
    const orders = await orderService.getUserOrders(userKey);
    
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user orders',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get position orders
 */
export const getPositionOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { positionId } = req.params;
    
    if (!positionId) {
      res.status(400).json({
        success: false,
        error: 'Missing position ID parameter'
      });
      return;
    }
    
    const orders = await orderService.getPositionOrders(positionId);
    
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching position orders:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch position orders',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 