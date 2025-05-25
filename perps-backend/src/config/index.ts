import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Define configuration schema with validation
const configSchema = z.object({
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Server
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('localhost'),
  
  // Database - required
  DATABASE_URL: z.string().min(1),
  
  // Solana
  SOLANA_RPC_URL: z.string().default('http://127.0.0.1:8899'),
  PROGRAM_ID: z.string().min(1),
  
  // Admin wallet - optional
  ADMIN_PRIVATE_KEY: z.string().optional(),
  
  // JWT - for auth if needed
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  
  // Scheduler configuration
  FUNDING_INTERVAL_MS: z.coerce.number().default(60 * 60 * 1000), // Default: 1 hour
  LIQUIDATION_INTERVAL_MS: z.coerce.number().default(60 * 1000), // Default: 1 minute
  PRICE_UPDATE_INTERVAL_MS: z.coerce.number().default(10 * 1000), // Default: 10 seconds
  RUN_FUNDING_ON_STARTUP: z.boolean().default(false),
  
  // Enhanced liquidation monitor configuration
  LIQUIDATION_CHECK_INTERVAL_MS: z.coerce.number().default(30 * 1000), // Default: 30 seconds
  LIQUIDATION_HEALTH_CHECK_INTERVAL_MS: z.coerce.number().default(5 * 60 * 1000), // Default: 5 minutes
  MIN_TIME_BETWEEN_LIQUIDATIONS_MS: z.coerce.number().default(5 * 1000), // Default: 5 seconds
  MAX_CONSECUTIVE_LIQUIDATION_FAILURES: z.coerce.number().default(5), // Default: 5 failures
  
  // WebSocket configuration
  WEBSOCKET_ENABLED: z.boolean().default(true),
  MARKET_UPDATE_INTERVAL_MS: z.coerce.number().default(5 * 1000), // Default: 5 seconds
  POSITION_UPDATE_INTERVAL_MS: z.coerce.number().default(10 * 1000), // Default: 10 seconds
  
  // Order service configuration
  ORDER_CHECK_INTERVAL_MS: z.coerce.number().default(10 * 1000), // Default: 10 seconds
  
  // vAMM optimization parameters
  VAMM_MIN_LIQUIDITY: z.coerce.number().default(1000000), // Minimum liquidity in vAMM pool
  VAMM_MAX_PRICE_IMPACT_BPS: z.coerce.number().default(100), // Max price impact in basis points (1%)
  VAMM_K_ADJUSTMENT_FACTOR: z.coerce.number().default(100), // K adjustment factor for tuning
});

// Parse and validate environment variables
const config = configSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE_URL: process.env.DATABASE_URL,
  SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
  PROGRAM_ID: process.env.PROGRAM_ID,
  ADMIN_PRIVATE_KEY: process.env.ADMIN_PRIVATE_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  FUNDING_INTERVAL_MS: process.env.FUNDING_INTERVAL_MS,
  LIQUIDATION_INTERVAL_MS: process.env.LIQUIDATION_INTERVAL_MS,
  PRICE_UPDATE_INTERVAL_MS: process.env.PRICE_UPDATE_INTERVAL_MS,
  RUN_FUNDING_ON_STARTUP: process.env.RUN_FUNDING_ON_STARTUP,
  LIQUIDATION_CHECK_INTERVAL_MS: process.env.LIQUIDATION_CHECK_INTERVAL_MS,
  LIQUIDATION_HEALTH_CHECK_INTERVAL_MS: process.env.LIQUIDATION_HEALTH_CHECK_INTERVAL_MS,
  MIN_TIME_BETWEEN_LIQUIDATIONS_MS: process.env.MIN_TIME_BETWEEN_LIQUIDATIONS_MS,
  MAX_CONSECUTIVE_LIQUIDATION_FAILURES: process.env.MAX_CONSECUTIVE_LIQUIDATION_FAILURES,
  WEBSOCKET_ENABLED: process.env.WEBSOCKET_ENABLED,
  MARKET_UPDATE_INTERVAL_MS: process.env.MARKET_UPDATE_INTERVAL_MS,
  POSITION_UPDATE_INTERVAL_MS: process.env.POSITION_UPDATE_INTERVAL_MS,
  ORDER_CHECK_INTERVAL_MS: process.env.ORDER_CHECK_INTERVAL_MS,
  VAMM_MIN_LIQUIDITY: process.env.VAMM_MIN_LIQUIDITY,
  VAMM_MAX_PRICE_IMPACT_BPS: process.env.VAMM_MAX_PRICE_IMPACT_BPS,
  VAMM_K_ADJUSTMENT_FACTOR: process.env.VAMM_K_ADJUSTMENT_FACTOR,
});

export default config; 