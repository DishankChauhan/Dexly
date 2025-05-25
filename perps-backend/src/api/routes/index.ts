import express from 'express';
import marketRoutes from './market.routes.js';
import tradeRoutes from './trade.routes.js';
import positionRoutes from './position.routes.js';
import orderRoutes from './orders.routes.js';
import pnlRoutes from './pnl.routes.js';
import statsRoutes from './stats.routes.js';
import authRoutes from './auth.routes.js';

const router = express.Router();

// API routes
router.use('/markets', marketRoutes);
router.use('/trade', tradeRoutes);
router.use('/positions', positionRoutes);
router.use('/orders', orderRoutes);
router.use('/pnl', pnlRoutes);
router.use('/stats', statsRoutes);
router.use('/auth', authRoutes);

export default router; 