import { Request, Response } from 'express';
import { PublicKey, Keypair } from '@solana/web3.js';
import tweetnacl from 'tweetnacl';
import bs58 from 'bs58';
import prisma from '../../db/prisma.js';
import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../../config/index.js';

// JWT secret key (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Nonce storage (in production, use Redis)
const nonceStorage = new Map<string, { nonce: string; timestamp: number }>();
const NONCE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export interface AuthenticatedRequest extends Request {
  user?: {
    publicKey: string;
    address: string;
  };
}

/**
 * Generate a nonce for wallet signature
 */
export const generateNonce = async (req: Request, res: Response) => {
  try {
    const { publicKey } = req.body;
    
    if (!publicKey) {
      return res.status(400).json({
        success: false,
        error: 'Public key is required'
      });
    }

    // Validate public key format
    try {
      new PublicKey(publicKey);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid public key format'
      });
    }

    // Generate cryptographically secure nonce
    const nonce = crypto.randomBytes(32).toString('hex');
    const timestamp = Date.now();
    
    // Store nonce with expiry
    nonceStorage.set(publicKey, { nonce, timestamp });
    
    // Clean up expired nonces
    cleanupExpiredNonces();
    
    // Create user record if doesn't exist
    try {
      await prisma.user.upsert({
        where: { publicKey },
        update: { updatedAt: new Date() },
        create: {
          id: `user_${publicKey}`,
          publicKey
        }
      });
    } catch (dbError) {
      console.warn('Failed to create/update user record:', dbError);
      // Continue anyway - auth can work without database
    }

    res.status(200).json({
      success: true,
      data: {
        nonce,
        message: `Sign this message to authenticate with Dexly: ${nonce}`,
        expiresIn: NONCE_EXPIRY
      }
    });
  } catch (error) {
    console.error('Error generating nonce:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate nonce',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Verify wallet signature and authenticate user
 */
export const verifySignature = async (req: Request, res: Response) => {
  try {
    const { publicKey, signature, message } = req.body;
    
    if (!publicKey || !signature || !message) {
      return res.status(400).json({
        success: false,
        error: 'Public key, signature, and message are required'
      });
    }

    // Validate public key
    let publicKeyObj: PublicKey;
    try {
      publicKeyObj = new PublicKey(publicKey);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid public key format'
      });
    }

    // Check if nonce exists and is valid
    const storedNonce = nonceStorage.get(publicKey);
    if (!storedNonce) {
      return res.status(400).json({
        success: false,
        error: 'Nonce not found. Please request a new nonce.'
      });
    }

    // Check nonce expiry
    if (Date.now() - storedNonce.timestamp > NONCE_EXPIRY) {
      nonceStorage.delete(publicKey);
      return res.status(400).json({
        success: false,
        error: 'Nonce expired. Please request a new nonce.'
      });
    }

    // Extract nonce from message
    const expectedMessage = `Sign this message to authenticate with Dexly: ${storedNonce.nonce}`;
    if (message !== expectedMessage) {
      return res.status(400).json({
        success: false,
        error: 'Invalid message format'
      });
    }

    // Verify signature
    try {
      const messageBytes = new TextEncoder().encode(message);
      const signatureBytes = bs58.decode(signature);
      const publicKeyBytes = publicKeyObj.toBytes();
      
      const isValid = tweetnacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
      
      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid signature'
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Failed to verify signature',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Remove used nonce
    nonceStorage.delete(publicKey);

    // Generate JWT token
    const token = (jwt as any).default.sign(
      { 
        publicKey, 
        address: publicKey,
        timestamp: Date.now()
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Update user last activity
    try {
      await prisma.user.update({
        where: { publicKey },
        data: { updatedAt: new Date() }
      });
    } catch (dbError) {
      console.warn('Failed to update user activity:', dbError);
    }

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          publicKey,
          address: publicKey
        },
        expiresIn: JWT_EXPIRES_IN
      }
    });
  } catch (error) {
    console.error('Error verifying signature:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get current session information
 */
export const getSession = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    // Get user data from database
    let userData = null;
    try {
      userData = await prisma.user.findUnique({
        where: { publicKey: req.user.publicKey },
        select: {
          id: true,
          publicKey: true,
          createdAt: true,
          updatedAt: true
        }
      });
    } catch (dbError) {
      console.warn('Failed to fetch user data:', dbError);
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          publicKey: req.user.publicKey,
          address: req.user.address,
          ...userData
        },
        authenticated: true
      }
    });
  } catch (error) {
    console.error('Error getting session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get session',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Logout user (invalidate session)
 */
export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // In a full implementation, you might want to maintain a blacklist of invalidated tokens
    // For now, we'll just return success - the client should delete the token
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to logout',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Refresh JWT token
 */
export const refreshToken = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    // Generate new token
    const token = (jwt as any).default.sign(
      { 
        publicKey: req.user.publicKey, 
        address: req.user.address,
        timestamp: Date.now()
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        expiresIn: JWT_EXPIRES_IN
      }
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh token',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Clean up expired nonces
 */
function cleanupExpiredNonces(): void {
  const now = Date.now();
  for (const [publicKey, { timestamp }] of nonceStorage.entries()) {
    if (now - timestamp > NONCE_EXPIRY) {
      nonceStorage.delete(publicKey);
    }
  }
}

/**
 * Middleware to authenticate JWT tokens
 */
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }

    (jwt as any).default.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: 'Invalid or expired token'
        });
      }

      req.user = {
        publicKey: decoded.publicKey,
        address: decoded.address
      };
      
      next();
    });
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
};

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(); // Continue without authentication
  }

  (jwt as any).default.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (!err && decoded) {
      req.user = {
        publicKey: decoded.publicKey,
        address: decoded.address
      };
    }
    next();
  });
}; 