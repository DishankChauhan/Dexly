import { Request, Response } from 'express';
import { TradeSimulationService } from '../../services/simulation/tradeSimulationService.js';
import { PerpsContractService } from '../../services/blockchain/perpsContractService.js';
import { SolanaClient } from '../../services/blockchain/solanaClient.js';
import { TradeDirection } from '../../models/perps.js';

// Initialize services (this is a temporary approach, in production we'd use dependency injection)
const solanaClient = new SolanaClient();
const contractService = new PerpsContractService(solanaClient);
const simulationService = new TradeSimulationService(contractService);

/**
 * Simulate a trade without executing it
 */
export const simulateTrade = async (req: Request, res: Response) => {
  try {
    const { marketId, direction, size, collateral, leverage, userKey } = req.body;
    
    // Parse parameters
    const tradeParams = {
      marketId,
      direction: parseInt(direction),
      size: BigInt(size),
      collateral: BigInt(collateral),
      leverage: parseInt(leverage),
      userKey
    };
    
    // Simulate trade
    const result = await simulationService.simulateTrade(tradeParams);
    
    // Return simulation results
    res.status(200).json({
      success: true,
      data: {
        entryPrice: result.entryPrice.toString(),
        liquidationPrice: result.liquidationPrice.toString(),
        fee: result.fee.toString(),
        slippage: result.slippage,
        maxLeverage: result.maxLeverage,
        collateralRequired: result.collateralRequired.toString(),
        estimatedPnl: {
          at5PercentUp: result.estimatedPnl.at5PercentUp.toString(),
          at10PercentUp: result.estimatedPnl.at10PercentUp.toString(),
          at5PercentDown: result.estimatedPnl.at5PercentDown.toString(),
          at10PercentDown: result.estimatedPnl.at10PercentDown.toString(),
        },
        fundingRate: result.fundingRate.toString()
      }
    });
  } catch (error) {
    console.error('Error simulating trade:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to simulate trade',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 