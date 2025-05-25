import { Router, RequestHandler } from 'express';
import { getMarkets, getMarketById, getMarketData, getMarketFundingHistory, getCurrentPrice, getPriceHistory, getCurrentFundingRate, getMarketAMMData, getCandlestickData } from '../controllers/market.controller.js';

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

/**
 * @route GET /api/market/:id/funding-history
 * @description Get funding rate history for a market
 * @access Public
 */
router.get('/:id/funding-history', getMarketFundingHistory as RequestHandler);

/**
 * @route GET /api/market/:id/price
 * @description Get current price for a market
 * @access Public
 */
router.get('/:id/price', getCurrentPrice as RequestHandler);

/**
 * @route GET /api/market/:id/price-history
 * @description Get price history for a market
 * @access Public
 */
router.get('/:id/price-history', getPriceHistory as RequestHandler);

/**
 * @route GET /api/market/:id/candlestick
 * @description Get candlestick data for a market
 * @access Public
 */
router.get('/:id/candlestick', getCandlestickData as RequestHandler);

/**
 * @route GET /api/market/:id/funding-rate
 * @description Get current funding rate for a market
 * @access Public
 */
router.get('/:id/funding-rate', getCurrentFundingRate as RequestHandler);

/**
 * @route GET /api/market/:id/funding
 * @description Get current funding rate for a market (alias for funding-rate)
 * @access Public
 */
router.get('/:id/funding', getCurrentFundingRate as RequestHandler);

/**
 * @route GET /api/market/:id/amm
 * @description Get AMM data for a market
 * @access Public
 */
router.get('/:id/amm', getMarketAMMData as RequestHandler);

export default router; 