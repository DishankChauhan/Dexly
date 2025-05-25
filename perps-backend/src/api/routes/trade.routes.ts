import { Router } from 'express';
import { simulateTrade } from '../controllers/trade.controller.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { simulateTradeSchema } from '../validation/trade.validation.js';

const router = Router();

/**
 * @route POST /api/trade/simulate
 * @description Simulate a trade without executing it
 * @access Public
 */
router.post('/simulate', validateRequest(simulateTradeSchema), simulateTrade);

export default router; 