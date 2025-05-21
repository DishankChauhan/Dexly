import { Router, RequestHandler } from 'express';
import { getMarkets, getMarketById, getMarketData } from '../controllers/market.controller.js';

const router = Router();

/**
 * @route GET /api/market
 * @description Get all markets
 * @access Public
 */
router.get('/', getMarkets as RequestHandler);

/**
 * @route GET /api/market/:id
 * @description Get market by ID
 * @access Public
 */
router.get('/:id', getMarketById as RequestHandler);

/**
 * @route GET /api/market/:id/data
 * @description Get market data with prices and funding
 * @access Public
 */
router.get('/:id/data', getMarketData as RequestHandler);

export default router; 