import express from 'express';
import marketRoutes from './market.routes.js';
import tradeRoutes from './trade.routes.js';
import positionRoutes from './position.routes.js';
import orderRoutes from './orders.routes.js';

const router = express.Router();

// API routes
router.use('/markets', marketRoutes);
router.use('/trades', tradeRoutes);
router.use('/positions', positionRoutes);
router.use('/orders', orderRoutes);

export default router; 