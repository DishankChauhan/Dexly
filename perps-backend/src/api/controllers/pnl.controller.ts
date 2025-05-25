import { Request, Response } from 'express';
import { PerpsContractService } from '../../services/blockchain/perpsContractService.js';
import { SolanaClient } from '../../services/blockchain/solanaClient.js';
import { OracleService } from '../../services/oracle/oracleService.js';
import prisma from '../../db/prisma.js';
import Decimal from 'decimal.js';

// Initialize services
const solanaClient = new SolanaClient();
const contractService = new PerpsContractService(solanaClient);
const oracleService = new OracleService(solanaClient.getConnection());

export interface PnLSummary {
  totalPnl: number;
  unrealizedPnl: number;
  realizedPnl: number;
  fundingPnl: number;
  totalVolume: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  currentPositions: number;
}

export interface PositionPnL {
  positionId: string;
  marketId: string;
  marketSymbol: string;
  isLong: boolean;
  size: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnl: number;
  unrealizedPnlPercentage: number;
  realizedPnlFromFunding: number;
  liquidationPrice: number;
  marginRatio: number;
  leverage: number;
  collateral: number;
  openedAt: number;
  daysOpen: number;
}

export interface HistoricalPnL {
  date: string;
  dailyPnl: number;
  cumulativePnl: number;
  volume: number;
  trades: number;
  realizedPnl: number;
  unrealizedPnl: number;
  fundingPnl: number;
}

/**
 * Get real-time PnL for a user
 */
export const getUserPnL = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'User address is required'
      });
    }

    // Get user positions
    const positions = await prisma.position.findMany({
      where: { 
        userId: address,
        isClosed: false
      },
      include: {
        market: true,
        fundingPayments: true
      }
    });

    // Get user trades for realized PnL
    const trades = await prisma.trade.findMany({
      where: { userId: address },
      include: {
        position: true,
        market: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate position-level PnL
    const positionPnLs: PositionPnL[] = [];
    let totalUnrealizedPnl = 0;
    let totalFundingPnl = 0;

    for (const position of positions) {
      try {
        // Get current market price
        const marketSymbol = position.market.assetSymbol + '-PERP';
        const priceData = await oracleService.getMarketPrice(marketSymbol);
        const currentPrice = priceData.price;

        // Calculate unrealized PnL
        const size = Number(position.size);
        const entryPrice = Number(position.entryPrice);
        const collateral = Number(position.collateral);
        
        let unrealizedPnl: number;
        if (position.isLong) {
          unrealizedPnl = size * (currentPrice - entryPrice);
        } else {
          unrealizedPnl = size * (entryPrice - currentPrice);
        }

        const unrealizedPnlPercentage = (unrealizedPnl / collateral) * 100;

        // Calculate funding PnL
        const fundingPnl = Number(position.realizedPnlFromFunding);

        // Calculate liquidation price
        const liquidationPrice = Number(position.liquidationPrice);

        // Calculate margin ratio
        const positionValue = size * currentPrice;
        const marginRatio = (collateral + unrealizedPnl) / positionValue;

        // Calculate days open
        const openedAt = Number(position.openedAt) * 1000; // Convert to milliseconds
        const daysOpen = (Date.now() - openedAt) / (1000 * 60 * 60 * 24);

        const positionPnL: PositionPnL = {
          positionId: position.id,
          marketId: position.marketId,
          marketSymbol,
          isLong: position.isLong,
          size,
          entryPrice,
          currentPrice,
          unrealizedPnl,
          unrealizedPnlPercentage,
          realizedPnlFromFunding: fundingPnl,
          liquidationPrice,
          marginRatio,
          leverage: position.leverage,
          collateral,
          openedAt: Number(position.openedAt),
          daysOpen
        };

        positionPnLs.push(positionPnL);
        totalUnrealizedPnl += unrealizedPnl;
        totalFundingPnl += fundingPnl;
      } catch (error) {
        console.error(`Error calculating PnL for position ${position.id}:`, error);
      }
    }

    // Calculate realized PnL from closed positions
    const closedPositions = await prisma.position.findMany({
      where: { 
        userId: address,
        isClosed: true,
        realizedPnl: { not: null }
      }
    });

    const totalRealizedPnl = closedPositions.reduce((sum, pos) => 
      sum + Number(pos.realizedPnl || 0), 0
    );

    // Calculate trading statistics
    const totalVolume = trades.reduce((sum, trade) => 
      sum + Number(trade.size) * Number(trade.price), 0
    );

    const winningTrades = closedPositions.filter(pos => 
      Number(pos.realizedPnl || 0) > 0
    ).length;
    
    const losingTrades = closedPositions.filter(pos => 
      Number(pos.realizedPnl || 0) < 0
    ).length;

    const totalTrades = winningTrades + losingTrades;
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

    const winningPnLs = closedPositions
      .filter(pos => Number(pos.realizedPnl || 0) > 0)
      .map(pos => Number(pos.realizedPnl || 0));
      
    const losingPnLs = closedPositions
      .filter(pos => Number(pos.realizedPnl || 0) < 0)
      .map(pos => Number(pos.realizedPnl || 0));

    const averageWin = winningPnLs.length > 0 ? 
      winningPnLs.reduce((a, b) => a + b, 0) / winningPnLs.length : 0;
      
    const averageLoss = losingPnLs.length > 0 ? 
      losingPnLs.reduce((a, b) => a + b, 0) / losingPnLs.length : 0;

    const largestWin = winningPnLs.length > 0 ? Math.max(...winningPnLs) : 0;
    const largestLoss = losingPnLs.length > 0 ? Math.min(...losingPnLs) : 0;

    const profitFactor = averageLoss !== 0 ? Math.abs(averageWin / averageLoss) : 0;

    const totalPnl = totalRealizedPnl + totalUnrealizedPnl + totalFundingPnl;

    const pnlSummary: PnLSummary = {
      totalPnl,
      unrealizedPnl: totalUnrealizedPnl,
      realizedPnl: totalRealizedPnl,
      fundingPnl: totalFundingPnl,
      totalVolume,
      winRate,
      profitFactor,
      totalTrades,
      winningTrades,
      losingTrades,
      averageWin,
      averageLoss,
      largestWin,
      largestLoss,
      currentPositions: positions.length
    };

    res.status(200).json({
      success: true,
      data: {
        summary: pnlSummary,
        positions: positionPnLs
      }
    });
  } catch (error) {
    console.error(`Error calculating PnL for user ${req.params.address}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate PnL',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get historical PnL data for a user
 */
export const getPnLHistory = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const { timeframe = '30d', granularity = 'daily' } = req.query;

    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'User address is required'
      });
    }

    // Calculate time range
    let daysBack = 30;
    switch (timeframe) {
      case '7d': daysBack = 7; break;
      case '30d': daysBack = 30; break;
      case '90d': daysBack = 90; break;
      case '1y': daysBack = 365; break;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    // Get all trades in the time range
    const trades = await prisma.trade.findMany({
      where: {
        userId: address,
        createdAt: { gte: startDate }
      },
      include: {
        position: true,
        market: true
      },
      orderBy: { createdAt: 'asc' }
    });

    // Get all closed positions in the time range
    const closedPositions = await prisma.position.findMany({
      where: {
        userId: address,
        isClosed: true,
        closedAt: { not: null },
        realizedPnl: { not: null }
      },
      include: {
        market: true
      }
    });

    // Get funding payments in the time range
    const fundingPayments = await prisma.fundingPayment.findMany({
      where: {
        position: {
          userId: address
        },
        createdAt: { gte: startDate }
      }
    });

    // Group data by date
    const dailyData = new Map<string, HistoricalPnL>();
    
    // Initialize all days with zero values
    for (let i = 0; i <= daysBack; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (daysBack - i));
      const dateStr = date.toISOString().split('T')[0];
      
      dailyData.set(dateStr, {
        date: dateStr,
        dailyPnl: 0,
        cumulativePnl: 0,
        volume: 0,
        trades: 0,
        realizedPnl: 0,
        unrealizedPnl: 0,
        fundingPnl: 0
      });
    }

    // Process trades for volume and count
    trades.forEach(trade => {
      const dateStr = trade.createdAt.toISOString().split('T')[0];
      const dayData = dailyData.get(dateStr);
      if (dayData) {
        dayData.volume += Number(trade.size) * Number(trade.price);
        dayData.trades += 1;
      }
    });

    // Process closed positions for realized PnL
    closedPositions.forEach(position => {
      if (position.closedAt) {
        const closeDate = new Date(Number(position.closedAt) * 1000);
        const dateStr = closeDate.toISOString().split('T')[0];
        const dayData = dailyData.get(dateStr);
        if (dayData) {
          const realizedPnl = Number(position.realizedPnl || 0);
          dayData.realizedPnl += realizedPnl;
          dayData.dailyPnl += realizedPnl;
        }
      }
    });

    // Process funding payments
    fundingPayments.forEach(payment => {
      const dateStr = payment.createdAt.toISOString().split('T')[0];
      const dayData = dailyData.get(dateStr);
      if (dayData) {
        const fundingPnl = Number(payment.amount);
        dayData.fundingPnl += fundingPnl;
        dayData.dailyPnl += fundingPnl;
      }
    });

    // Calculate cumulative PnL
    let cumulativePnl = 0;
    const sortedData = Array.from(dailyData.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    sortedData.forEach(dayData => {
      cumulativePnl += dayData.dailyPnl;
      dayData.cumulativePnl = cumulativePnl;
    });

    res.status(200).json({
      success: true,
      data: {
        timeframe,
        granularity,
        history: sortedData
      }
    });
  } catch (error) {
    console.error(`Error getting PnL history for user ${req.params.address}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to get PnL history',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get PnL summary for a specific position
 */
export const getPositionPnL = async (req: Request, res: Response) => {
  try {
    const { positionId } = req.params;

    if (!positionId) {
      return res.status(400).json({
        success: false,
        error: 'Position ID is required'
      });
    }

    const position = await prisma.position.findUnique({
      where: { id: positionId },
      include: {
        market: true,
        fundingPayments: true,
        trades: true
      }
    });

    if (!position) {
      return res.status(404).json({
        success: false,
        error: 'Position not found'
      });
    }

    let positionPnL: any = {
      positionId: position.id,
      marketId: position.marketId,
      marketSymbol: position.market.assetSymbol + '-PERP',
      isLong: position.isLong,
      size: Number(position.size),
      entryPrice: Number(position.entryPrice),
      collateral: Number(position.collateral),
      leverage: position.leverage,
      openedAt: Number(position.openedAt),
      isClosed: position.isClosed
    };

    if (position.isClosed) {
      // Closed position - return realized PnL
      positionPnL.realizedPnl = Number(position.realizedPnl || 0);
      positionPnL.closedAt = Number(position.closedAt || 0);
      positionPnL.closingPrice = Number(position.closingPrice || 0);
    } else {
      // Open position - calculate unrealized PnL
      try {
        const marketSymbol = position.market.assetSymbol + '-PERP';
        const priceData = await oracleService.getMarketPrice(marketSymbol);
        const currentPrice = priceData.price;

        const size = Number(position.size);
        const entryPrice = Number(position.entryPrice);
        
        let unrealizedPnl: number;
        if (position.isLong) {
          unrealizedPnl = size * (currentPrice - entryPrice);
        } else {
          unrealizedPnl = size * (entryPrice - currentPrice);
        }

        positionPnL.currentPrice = currentPrice;
        positionPnL.unrealizedPnl = unrealizedPnl;
        positionPnL.unrealizedPnlPercentage = (unrealizedPnl / Number(position.collateral)) * 100;
        positionPnL.liquidationPrice = Number(position.liquidationPrice);
      } catch (error) {
        console.error('Error getting current price for position PnL:', error);
        positionPnL.error = 'Could not fetch current price';
      }
    }

    // Calculate funding PnL
    const fundingPnl = position.fundingPayments.reduce((sum, payment) => 
      sum + Number(payment.amount), 0
    );
    positionPnL.fundingPnl = fundingPnl;

    // Get trade history for this position
    const tradeHistory = position.trades.map(trade => ({
      id: trade.id,
      side: trade.side,
      size: Number(trade.size),
      price: Number(trade.price),
      fee: Number(trade.fee),
      timestamp: trade.createdAt.getTime(),
      txHash: trade.txHash
    }));

    positionPnL.trades = tradeHistory;

    res.status(200).json({
      success: true,
      data: positionPnL
    });
  } catch (error) {
    console.error(`Error getting position PnL for ${req.params.positionId}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to get position PnL',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 