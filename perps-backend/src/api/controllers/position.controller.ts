import { Request, Response } from 'express';
import { PerpsContractService } from '../../services/blockchain/perpsContractService.js';
import { SolanaClient } from '../../services/blockchain/solanaClient.js';
import { TradeDirection } from '../../models/perps.js';
import prisma from '../../db/prisma.js';
import { PublicKey, Connection, Transaction } from '@solana/web3.js';

// Initialize services
const solanaClient = new SolanaClient();
const contractService = new PerpsContractService(solanaClient);

/**
 * Get all positions for a user
 */
export const getUserPositions = async (req: Request, res: Response) => {
  try {
    const { userKey } = req.params;
    
    // Fetch on-chain positions
    const positions = await contractService.getUserPositions(userKey);
    
    if (!positions || positions.length === 0) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }
    
    // Format positions for response
    const formattedPositions = positions.map(position => ({
      id: position.market.toString() + '-' + position.user.toString(), // This might need to be adjusted
      userKey: position.user.toString(),
      marketId: position.market.toString(),
      isLong: position.isLong,
      size: position.size.toString(),
      entryPrice: position.entryPrice.toString(),
      collateral: position.collateral.toString(),
      leverage: position.leverage,
      openedAt: position.openedAt.toString(),
      lastFundingTs: position.lastFundingTs.toString(),
      realizedPnlFromFunding: position.realizedPnlFromFunding.toString(),
      liquidationPrice: position.liquidationPrice.toString(),
      isClosed: position.isClosed,
      
      // Calculate unrealized PnL
      unrealizedPnl: "0", // Would calculate based on current market price
    }));
    
    res.status(200).json({
      success: true,
      data: formattedPositions
    });
  } catch (error) {
    console.error(`Error fetching positions for user ${req.params.userKey}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch positions',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get position by ID
 */
export const getPositionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Fetch position from chain
    const position = await contractService.getPosition(id);
    
    if (!position) {
      return res.status(404).json({
        success: false,
        error: 'Position not found',
      });
    }
    
    // Format position for response
    const formattedPosition = {
      id,
      userKey: position.user.toString(),
      marketId: position.market.toString(),
      isLong: position.isLong,
      size: position.size.toString(),
      entryPrice: position.entryPrice.toString(),
      collateral: position.collateral.toString(),
      leverage: position.leverage,
      openedAt: position.openedAt.toString(),
      lastFundingTs: position.lastFundingTs.toString(),
      realizedPnlFromFunding: position.realizedPnlFromFunding.toString(),
      liquidationPrice: position.liquidationPrice.toString(),
      isClosed: position.isClosed,
      
      // Calculate unrealized PnL
      unrealizedPnl: await calculateUnrealizedPnl(position),
    };
    
    res.status(200).json({
      success: true,
      data: formattedPosition
    });
  } catch (error) {
    console.error(`Error fetching position ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch position',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Open a new position
 */
export const openPosition = async (req: Request, res: Response) => {
  try {
    const { marketId, direction, size, collateral, leverage, userKey } = req.body;
    
    // Prepare transaction instruction
    const openPositionParams = {
      marketId,
      direction: parseInt(direction),
      size: BigInt(size),
      collateral: BigInt(collateral),
      leverage: parseInt(leverage),
      userKey
    };
    
    const instruction = await contractService.prepareOpenPosition(openPositionParams);
    
    // Return the instruction for frontend to sign and send
    res.status(200).json({
      success: true,
      data: {
        instruction: {
          programId: instruction.programId.toString(),
          keys: instruction.keys.map(key => ({
            pubkey: key.pubkey.toString(),
            isSigner: key.isSigner,
            isWritable: key.isWritable
          })),
          data: Buffer.from(instruction.data).toString('base64')
        },
        simulatedEntryPrice: "0", // This would be calculated from simulation
        simulatedLiquidationPrice: "0", // This would be calculated from simulation
      }
    });
  } catch (error) {
    console.error('Error preparing open position transaction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to prepare open position transaction',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Close an existing position
 */
export const closePosition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userKey } = req.body;
    
    // Prepare transaction instruction
    const closePositionParams = {
      positionId: id,
      userKey
    };
    
    const instruction = await contractService.prepareClosePosition(closePositionParams);
    
    // Return the instruction for frontend to sign and send
    res.status(200).json({
      success: true,
      data: {
        instruction: {
          programId: instruction.programId.toString(),
          keys: instruction.keys.map(key => ({
            pubkey: key.pubkey.toString(),
            isSigner: key.isSigner,
            isWritable: key.isWritable
          })),
          data: Buffer.from(instruction.data).toString('base64')
        },
        estimatedPnl: "0", // Would be calculated from current market price
      }
    });
  } catch (error) {
    console.error(`Error preparing close position transaction for ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to prepare close position transaction',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Calculate unrealized PnL for a position
 */
async function calculateUnrealizedPnl(position: any): Promise<string> {
  try {
    // Get market data to calculate current price
    const market = await contractService.getMarket(position.market.toString());
    if (!market) {
      return "0";
    }
    
    // Calculate current mark price
    const baseAssetReserve = market.baseAssetReserve;
    const quoteAssetReserve = market.quoteAssetReserve;
    const currentPrice = (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
    
    // Calculate PnL
    const size = position.size;
    const entryPrice = position.entryPrice;
    const isLong = position.isLong;
    
    let pnl: bigint;
    if (isLong) {
      // For long positions: (currentPrice - entryPrice) * size / entryPrice
      pnl = ((currentPrice - entryPrice) * size) / entryPrice;
    } else {
      // For short positions: (entryPrice - currentPrice) * size / entryPrice
      pnl = ((entryPrice - currentPrice) * size) / entryPrice;
    }
    
    return pnl.toString();
  } catch (error) {
    console.error('Error calculating unrealized PnL:', error);
    return "0";
  }
} 