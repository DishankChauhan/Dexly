import { Router, RequestHandler } from 'express';
import {
  getPortfolioOverview,
  getTradingStats,
  getPerformanceMetrics,
  getLeaderboard
} from '../controllers/stats.controller.js';

const router = Router();

/**
 * @route   GET /api/stats/portfolio/:address
 * @desc    Get portfolio overview for a user
 * @access  Public (should be private with auth in production)
 */
router.get('/portfolio/:address', getPortfolioOverview as RequestHandler);

/**
 * @route   GET /api/stats/trading/:address
 * @desc    Get trading statistics for a user
 * @query   timeframe (7d, 30d, 90d, 1y)
 * @access  Public (should be private with auth in production)
 */
router.get('/trading/:address', getTradingStats as RequestHandler);

/**
 * @route   GET /api/stats/performance/:address
 * @desc    Get performance metrics for a user
 * @access  Public (should be private with auth in production)
 */
router.get('/performance/:address', getPerformanceMetrics as RequestHandler);

/**
 * @route   GET /api/stats/leaderboard
 * @desc    Get trading leaderboard
 * @query   timeframe (7d, 30d, 90d, 1y), metric (totalPnl, winRate, etc), limit
 * @access  Public
 */
router.get('/leaderboard', getLeaderboard as RequestHandler);

export default router; 