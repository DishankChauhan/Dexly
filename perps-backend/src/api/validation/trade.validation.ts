import { z } from 'zod';

/**
 * Validation schema for trade simulation request
 */
export const simulateTradeSchema = z.object({
  marketId: z.string().min(1, 'Market ID is required'),
  direction: z.enum(['0', '1']).or(z.number().int().min(0).max(1)),
  size: z.string().min(1, 'Size is required').or(z.number().positive()),
  collateral: z.string().min(1, 'Collateral is required').or(z.number().positive()),
  leverage: z.number().int().min(1).max(50),
  userKey: z.string().min(1, 'User public key is required'),
});

/**
 * Validation schema for opening a position
 */
export const openPositionSchema = z.object({
  marketId: z.string().min(1, 'Market ID is required'),
  direction: z.enum(['0', '1']).or(z.number().int().min(0).max(1)),
  size: z.string().min(1, 'Size is required').or(z.number().positive()),
  collateral: z.string().min(1, 'Collateral is required').or(z.number().positive()),
  leverage: z.number().int().min(1).max(50),
  userKey: z.string().min(1, 'User public key is required'),
});

/**
 * Validation schema for closing a position
 */
export const closePositionSchema = z.object({
  userKey: z.string().min(1, 'User public key is required'),
}); 