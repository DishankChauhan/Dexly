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

export interface PortfolioOverview {
  totalPortfolioValue: number;
  totalPnl: number;
  totalPnlPercentage: number;
  collateralInUse: number;
  availableBalance: number;
  totalMarginUsed: number;
  marginUtilization: number;
  openPositions: number;
  positionsAtRisk: number;
  averageLeverage: number;
  estimatedLiquidationValue: number;
}

export interface TradingStatistics {
  totalTrades: number;
  totalVolume: number;
  averageTradeSize: number;
  winRate: number;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winningStreaks: number;
  losingStreaks: number;
  averageHoldTime: number;
  tradingFrequency: number;
  bestTrade: number;
  worstTrade: number;
  totalFees: number;
  marketsTraded: string[];
}

export interface PerformanceMetrics {
  daily: {
    returns: number[];
    volatility: number;
    sharpeRatio: number;
  };
  weekly: {
    returns: number[];
    volatility: number;
    sharpeRatio: number;
  };
  monthly: {
    returns: number[];
    volatility: number;
    sharpeRatio: number;
  };
  totalReturn: number;
  totalReturnPercentage: number;
  benchmarkComparison: number;
}

export interface LeaderboardEntry {
  userId: string;
  publicKey: string;
  totalPnl: number;
  totalPnlPercentage: number;
  totalVolume: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  rank: number;
}

/**
 * Get portfolio overview for a user
 */
export const getPortfolioOverview = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'User address is required'
      });
    }

    // Get all open positions
    const openPositions = await prisma.position.findMany({
      where: {
        userId: address,
        isClosed: false
      },
      include: {
        market: true,
        fundingPayments: true
      }
    });

    // Get all closed positions for PnL calculation
    const closedPositions = await prisma.position.findMany({
      where: {
        userId: address,
        isClosed: true,
        realizedPnl: { not: null }
      }
    });

    let totalPortfolioValue = 0;
    let totalUnrealizedPnl = 0;
    let totalCollateralInUse = 0;
    let positionsAtRisk = 0;
    let totalLeverageWeighted = 0;
    let estimatedLiquidationValue = 0;

    // Calculate metrics for each open position
    for (const position of openPositions) {
      try {
        const marketSymbol = position.market.assetSymbol + '-PERP';
        const priceData = await oracleService.getMarketPrice(marketSymbol);
        const currentPrice = priceData.price;

        const size = Number(position.size);
        const entryPrice = Number(position.entryPrice);
        const collateral = Number(position.collateral);
        const liquidationPrice = Number(position.liquidationPrice);

        // Calculate unrealized PnL
        let unrealizedPnl: number;
        if (position.isLong) {
          unrealizedPnl = size * (currentPrice - entryPrice);
        } else {
          unrealizedPnl = size * (entryPrice - currentPrice);
        }

        // Calculate position value and margin ratio
        const positionValue = size * currentPrice;
        const totalValue = collateral + unrealizedPnl;
        const marginRatio = totalValue / positionValue;

        totalPortfolioValue += totalValue;
        totalUnrealizedPnl += unrealizedPnl;
        totalCollateralInUse += collateral;
        totalLeverageWeighted += position.leverage * positionValue;

        // Check if position is at risk (within 20% of liquidation)
        const liquidationDistance = position.isLong 
          ? (currentPrice - liquidationPrice) / currentPrice
          : (liquidationPrice - currentPrice) / currentPrice;
        
        if (liquidationDistance < 0.2) {
          positionsAtRisk++;
          estimatedLiquidationValue += positionValue;
        }
      } catch (error) {
        console.error(`Error calculating metrics for position ${position.id}:`, error);
      }
    }

    // Calculate realized PnL
    const totalRealizedPnl = closedPositions.reduce((sum, pos) => 
      sum + Number(pos.realizedPnl || 0), 0
    );

    // Calculate funding PnL
    const totalFundingPnl = openPositions.reduce((sum, pos) => 
      sum + Number(pos.realizedPnlFromFunding), 0
    );

    const totalPnl = totalRealizedPnl + totalUnrealizedPnl + totalFundingPnl;
    const initialCapital = totalCollateralInUse - totalUnrealizedPnl; // Approximation
    const totalPnlPercentage = initialCapital > 0 ? (totalPnl / initialCapital) * 100 : 0;

    // Calculate average leverage
    const totalPositionValue = openPositions.reduce((sum, pos) => {
      const size = Number(pos.size);
      const entryPrice = Number(pos.entryPrice);
      return sum + (size * entryPrice);
    }, 0);
    
    const averageLeverage = totalPositionValue > 0 ? totalLeverageWeighted / totalPositionValue : 0;

    // Calculate margin utilization
    const marginUtilization = totalCollateralInUse > 0 ? 
      (totalCollateralInUse / (totalCollateralInUse + 1000)) * 100 : 0; // Assuming some available balance

    const portfolioOverview: PortfolioOverview = {
      totalPortfolioValue,
      totalPnl,
      totalPnlPercentage,
      collateralInUse: totalCollateralInUse,
      availableBalance: Math.max(0, 1000 - totalCollateralInUse), // Mock available balance
      totalMarginUsed: totalCollateralInUse,
      marginUtilization,
      openPositions: openPositions.length,
      positionsAtRisk,
      averageLeverage,
      estimatedLiquidationValue
    };

    res.status(200).json({
      success: true,
      data: portfolioOverview
    });
  } catch (error) {
    console.error(`Error getting portfolio overview for ${req.params.address}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to get portfolio overview',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get trading statistics for a user
 */
export const getTradingStats = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const { timeframe = '30d' } = req.query;

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

    // Get all trades in timeframe
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

    // Get all positions (closed and open) in timeframe
    const allPositions = await prisma.position.findMany({
      where: {
        userId: address,
        createdAt: { gte: startDate }
      },
      include: {
        market: true
      }
    });

    const closedPositions = allPositions.filter(pos => pos.isClosed);

    // Calculate basic stats
    const totalTrades = trades.length;
    const totalVolume = trades.reduce((sum, trade) => 
      sum + Number(trade.size) * Number(trade.price), 0
    );
    const averageTradeSize = totalTrades > 0 ? totalVolume / totalTrades : 0;
    const totalFees = trades.reduce((sum, trade) => sum + Number(trade.fee), 0);

    // Calculate PnL stats
    const winningTrades = closedPositions.filter(pos => 
      Number(pos.realizedPnl || 0) > 0
    ).length;
    const losingTrades = closedPositions.filter(pos => 
      Number(pos.realizedPnl || 0) < 0
    ).length;
    const totalClosedTrades = winningTrades + losingTrades;
    const winRate = totalClosedTrades > 0 ? (winningTrades / totalClosedTrades) * 100 : 0;

    // Calculate profit factor
    const grossProfit = closedPositions
      .filter(pos => Number(pos.realizedPnl || 0) > 0)
      .reduce((sum, pos) => sum + Number(pos.realizedPnl || 0), 0);
    
    const grossLoss = Math.abs(closedPositions
      .filter(pos => Number(pos.realizedPnl || 0) < 0)
      .reduce((sum, pos) => sum + Number(pos.realizedPnl || 0), 0));
    
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 0;

    // Calculate hold times
    const holdTimes = closedPositions.map(pos => {
      const opened = Number(pos.openedAt) * 1000;
      const closed = Number(pos.closedAt || 0) * 1000;
      return closed - opened;
    }).filter(time => time > 0);

    const averageHoldTime = holdTimes.length > 0 ? 
      holdTimes.reduce((a, b) => a + b, 0) / holdTimes.length : 0;

    // Calculate trading frequency (trades per day)
    const tradingFrequency = totalTrades / daysBack;

    // Find best and worst trades
    const pnls = closedPositions.map(pos => Number(pos.realizedPnl || 0));
    const bestTrade = pnls.length > 0 ? Math.max(...pnls) : 0;
    const worstTrade = pnls.length > 0 ? Math.min(...pnls) : 0;

    // Calculate streaks
    let currentWinStreak = 0;
    let maxWinStreak = 0;
    let currentLoseStreak = 0;
    let maxLoseStreak = 0;

    closedPositions.forEach(pos => {
      const pnl = Number(pos.realizedPnl || 0);
      if (pnl > 0) {
        currentWinStreak++;
        currentLoseStreak = 0;
        maxWinStreak = Math.max(maxWinStreak, currentWinStreak);
      } else if (pnl < 0) {
        currentLoseStreak++;
        currentWinStreak = 0;
        maxLoseStreak = Math.max(maxLoseStreak, currentLoseStreak);
      }
    });

    // Get unique markets traded
    const marketsTraded = [...new Set(trades.map(trade => 
      trade.market.assetSymbol + '-PERP'
    ))];

    // Calculate Sharpe ratio (simplified)
    const dailyReturns = calculateDailyReturns(closedPositions);
    const sharpeRatio = calculateSharpeRatio(dailyReturns);

    // Calculate max drawdown
    const maxDrawdown = calculateMaxDrawdown(closedPositions);

    const tradingStats: TradingStatistics = {
      totalTrades,
      totalVolume,
      averageTradeSize,
      winRate,
      profitFactor,
      sharpeRatio,
      maxDrawdown,
      winningStreaks: maxWinStreak,
      losingStreaks: maxLoseStreak,
      averageHoldTime: averageHoldTime / (1000 * 60 * 60), // Convert to hours
      tradingFrequency,
      bestTrade,
      worstTrade,
      totalFees,
      marketsTraded
    };

    res.status(200).json({
      success: true,
      data: tradingStats
    });
  } catch (error) {
    console.error(`Error getting trading stats for ${req.params.address}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to get trading statistics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get performance metrics for a user
 */
export const getPerformanceMetrics = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'User address is required'
      });
    }

    // Get all closed positions for the user
    const closedPositions = await prisma.position.findMany({
      where: {
        userId: address,
        isClosed: true,
        realizedPnl: { not: null }
      },
      orderBy: { closedAt: 'asc' }
    });

    // Calculate daily, weekly, and monthly returns
    const dailyReturns = calculateDailyReturns(closedPositions);
    const weeklyReturns = calculateWeeklyReturns(closedPositions);
    const monthlyReturns = calculateMonthlyReturns(closedPositions);

    // Calculate volatility and Sharpe ratios
    const dailyVolatility = calculateVolatility(dailyReturns);
    const weeklyVolatility = calculateVolatility(weeklyReturns);
    const monthlyVolatility = calculateVolatility(monthlyReturns);

    const dailySharpe = calculateSharpeRatio(dailyReturns);
    const weeklySharpe = calculateSharpeRatio(weeklyReturns);
    const monthlySharpe = calculateSharpeRatio(monthlyReturns);

    // Calculate total return
    const totalPnl = closedPositions.reduce((sum, pos) => 
      sum + Number(pos.realizedPnl || 0), 0
    );
    const totalCollateral = closedPositions.reduce((sum, pos) => 
      sum + Number(pos.collateral), 0
    );
    const totalReturnPercentage = totalCollateral > 0 ? (totalPnl / totalCollateral) * 100 : 0;

    // Mock benchmark comparison (would be against market index in real implementation)
    const benchmarkComparison = totalReturnPercentage - 5; // Assuming 5% benchmark

    const performanceMetrics: PerformanceMetrics = {
      daily: {
        returns: dailyReturns,
        volatility: dailyVolatility,
        sharpeRatio: dailySharpe
      },
      weekly: {
        returns: weeklyReturns,
        volatility: weeklyVolatility,
        sharpeRatio: weeklySharpe
      },
      monthly: {
        returns: monthlyReturns,
        volatility: monthlyVolatility,
        sharpeRatio: monthlySharpe
      },
      totalReturn: totalPnl,
      totalReturnPercentage,
      benchmarkComparison
    };

    res.status(200).json({
      success: true,
      data: performanceMetrics
    });
  } catch (error) {
    console.error(`Error getting performance metrics for ${req.params.address}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to get performance metrics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get trading leaderboard
 */
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { timeframe = '30d', metric = 'totalPnl', limit = 50 } = req.query;

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

    // Get all users with trading activity in the timeframe
    const usersWithActivity = await prisma.user.findMany({
      where: {
        trades: {
          some: {
            createdAt: { gte: startDate }
          }
        }
      },
      include: {
        trades: {
          where: { createdAt: { gte: startDate } }
        },
        positions: {
          where: { 
            isClosed: true,
            closedAt: { not: null },
            realizedPnl: { not: null }
          }
        }
      }
    });

    // Calculate metrics for each user
    const leaderboardData: LeaderboardEntry[] = [];

    for (const user of usersWithActivity) {
      const totalPnl = user.positions.reduce((sum, pos) => 
        sum + Number(pos.realizedPnl || 0), 0
      );

      const totalVolume = user.trades.reduce((sum, trade) => 
        sum + Number(trade.size) * Number(trade.price), 0
      );

      const winningTrades = user.positions.filter(pos => 
        Number(pos.realizedPnl || 0) > 0
      ).length;
      
      const totalTrades = user.positions.length;
      const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

      // Calculate profit factor
      const grossProfit = user.positions
        .filter(pos => Number(pos.realizedPnl || 0) > 0)
        .reduce((sum, pos) => sum + Number(pos.realizedPnl || 0), 0);
      
      const grossLoss = Math.abs(user.positions
        .filter(pos => Number(pos.realizedPnl || 0) < 0)
        .reduce((sum, pos) => sum + Number(pos.realizedPnl || 0), 0));
      
      const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 0;

      // Calculate total PnL percentage
      const totalCollateral = user.positions.reduce((sum, pos) => 
        sum + Number(pos.collateral), 0
      );
      const totalPnlPercentage = totalCollateral > 0 ? (totalPnl / totalCollateral) * 100 : 0;

      // Only include users with actual trading activity
      if (totalTrades > 0) {
        leaderboardData.push({
          userId: user.id,
          publicKey: user.publicKey,
          totalPnl,
          totalPnlPercentage,
          totalVolume,
          winRate,
          profitFactor,
          totalTrades,
          rank: 0 // Will be set after sorting
        });
      }
    }

    // Sort by the requested metric
    leaderboardData.sort((a, b) => {
      switch (metric) {
        case 'totalPnl': return b.totalPnl - a.totalPnl;
        case 'totalPnlPercentage': return b.totalPnlPercentage - a.totalPnlPercentage;
        case 'totalVolume': return b.totalVolume - a.totalVolume;
        case 'winRate': return b.winRate - a.winRate;
        case 'profitFactor': return b.profitFactor - a.profitFactor;
        default: return b.totalPnl - a.totalPnl;
      }
    });

    // Assign ranks and limit results
    const limitedResults = leaderboardData
      .slice(0, Number(limit))
      .map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));

    res.status(200).json({
      success: true,
      data: {
        timeframe,
        metric,
        leaderboard: limitedResults,
        totalTraders: leaderboardData.length
      }
    });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get leaderboard',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Helper function to calculate daily returns
 */
function calculateDailyReturns(positions: any[]): number[] {
  const dailyPnL = new Map<string, number>();
  
  positions.forEach(pos => {
    if (pos.closedAt) {
      const date = new Date(Number(pos.closedAt) * 1000).toISOString().split('T')[0];
      const pnl = Number(pos.realizedPnl || 0);
      dailyPnL.set(date, (dailyPnL.get(date) || 0) + pnl);
    }
  });

  return Array.from(dailyPnL.values());
}

/**
 * Helper function to calculate weekly returns
 */
function calculateWeeklyReturns(positions: any[]): number[] {
  const weeklyPnL = new Map<string, number>();
  
  positions.forEach(pos => {
    if (pos.closedAt) {
      const date = new Date(Number(pos.closedAt) * 1000);
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
      const weekKey = weekStart.toISOString().split('T')[0];
      const pnl = Number(pos.realizedPnl || 0);
      weeklyPnL.set(weekKey, (weeklyPnL.get(weekKey) || 0) + pnl);
    }
  });

  return Array.from(weeklyPnL.values());
}

/**
 * Helper function to calculate monthly returns
 */
function calculateMonthlyReturns(positions: any[]): number[] {
  const monthlyPnL = new Map<string, number>();
  
  positions.forEach(pos => {
    if (pos.closedAt) {
      const date = new Date(Number(pos.closedAt) * 1000);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const pnl = Number(pos.realizedPnl || 0);
      monthlyPnL.set(monthKey, (monthlyPnL.get(monthKey) || 0) + pnl);
    }
  });

  return Array.from(monthlyPnL.values());
}

/**
 * Helper function to calculate volatility
 */
function calculateVolatility(returns: number[]): number {
  if (returns.length < 2) return 0;
  
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
  return Math.sqrt(variance);
}

/**
 * Helper function to calculate Sharpe ratio
 */
function calculateSharpeRatio(returns: number[], riskFreeRate: number = 0): number {
  if (returns.length < 2) return 0;
  
  const volatility = calculateVolatility(returns);
  if (volatility === 0) return 0;
  
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  return (avgReturn - riskFreeRate) / volatility;
}

/**
 * Helper function to calculate maximum drawdown
 */
function calculateMaxDrawdown(positions: any[]): number {
  if (positions.length === 0) return 0;
  
  let peak = 0;
  let maxDrawdown = 0;
  let cumulativePnL = 0;
  
  positions.forEach(pos => {
    cumulativePnL += Number(pos.realizedPnl || 0);
    peak = Math.max(peak, cumulativePnL);
    const drawdown = (peak - cumulativePnL) / peak;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  });
  
  return maxDrawdown * 100; // Return as percentage
} 