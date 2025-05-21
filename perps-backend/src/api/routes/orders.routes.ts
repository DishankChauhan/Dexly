import express, { RequestHandler } from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

/**
 * Order routes
 */

// Create a limit order
router.post('/limit', orderController.createLimitOrder as RequestHandler);

// Create a stop-loss order
router.post('/stop-loss', orderController.createStopLossOrder as RequestHandler);

// Create a take-profit order
router.post('/take-profit', orderController.createTakeProfitOrder as RequestHandler);

// Cancel an order
router.post('/cancel', orderController.cancelOrder as RequestHandler);

// Get user orders
router.get('/user/:userKey', orderController.getUserOrders as RequestHandler);

// Get position orders
router.get('/position/:positionId', orderController.getPositionOrders as RequestHandler);

export default router; 