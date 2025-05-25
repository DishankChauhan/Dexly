import { Router, RequestHandler } from 'express';
import { getUserPositions, getPositionById, openPosition, closePosition } from '../controllers/position.controller.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { openPositionSchema, closePositionSchema } from '../validation/trade.validation.js';

const router = Router();

/**
 * @route GET /api/position/user/:userKey
 * @description Get positions for a user
 * @access Public
 */
router.get('/user/:userKey', getUserPositions as RequestHandler);

/**
 * @route GET /api/position/:id
 * @description Get position by ID
 * @access Public
 */
router.get('/:id', getPositionById as RequestHandler);

/**
 * @route POST /api/position/open
 * @description Open a new position
 * @access Public
 */
router.post('/open', validateRequest(openPositionSchema), openPosition as RequestHandler);

/**
 * @route POST /api/position/:id/close
 * @description Close an existing position
 * @access Public
 */
router.post('/:id/close', validateRequest(closePositionSchema), closePosition as RequestHandler);

export default router; 