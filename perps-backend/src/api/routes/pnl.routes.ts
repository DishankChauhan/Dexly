import { Router, RequestHandler } from 'express';
import {
  getUserPnL,
  getPnLHistory,
  getPositionPnL
} from '../controllers/pnl.controller.js';

const router = Router();

/**
 * @route   GET /api/pnl/:address
 * @desc    Get real-time PnL summary for a user
 * @access  Public (should be private with auth in production)
 */
router.get('/:address', getUserPnL as RequestHandler);

/**
 * @route   GET /api/pnl/:address/history
 * @desc    Get historical PnL data for a user
 * @query   timeframe (7d, 30d, 90d, 1y), granularity (daily)
 * @access  Public (should be private with auth in production)
 */
router.get('/:address/history', getPnLHistory as RequestHandler);

/**
 * @route   GET /api/pnl/position/:positionId
 * @desc    Get PnL details for a specific position
 * @access  Public (should be private with auth in production)
 */
router.get('/position/:positionId', getPositionPnL as RequestHandler);

export default router; 