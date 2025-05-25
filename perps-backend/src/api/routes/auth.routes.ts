import { Router, RequestHandler } from 'express';
import {
  generateNonce,
  verifySignature,
  getSession,
  logout,
  refreshToken,
  authenticateToken
} from '../controllers/auth.controller.js';

const router = Router();

/**
 * @route   POST /api/auth/nonce
 * @desc    Generate a nonce for wallet signature
 * @access  Public
 */
router.post('/nonce', generateNonce as RequestHandler);

/**
 * @route   POST /api/auth/verify
 * @desc    Verify wallet signature and authenticate user
 * @access  Public
 */
router.post('/verify', verifySignature as RequestHandler);

/**
 * @route   GET /api/auth/session
 * @desc    Get current session information
 * @access  Private
 */
router.get('/session', authenticateToken as RequestHandler, getSession as RequestHandler);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh JWT token
 * @access  Private
 */
router.post('/refresh', authenticateToken as RequestHandler, refreshToken as RequestHandler);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (invalidate session)
 * @access  Private
 */
router.post('/logout', authenticateToken as RequestHandler, logout as RequestHandler);

export default router; 