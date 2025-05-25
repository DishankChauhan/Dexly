import { PerpsContractService } from '../blockchain/perpsContractService.js';
import { SimulateTradeParams, SimulateTradeResult, TradeDirection } from '../../models/perps.js';

/**
 * Service for trade simulation
 */
export class TradeSimulationService {
  private contractService: PerpsContractService;

  constructor(contractService: PerpsContractService) {
    this.contractService = contractService;
  }

  /**
   * Simulate a trade to calculate entry price, liquidation price, and fees
   */
  async simulateTrade(params: SimulateTradeParams): Promise<SimulateTradeResult> {
    // Convert string params to bigint if needed
    const normalizedParams: SimulateTradeParams = {
      ...params,
      size: typeof params.size === 'string' ? BigInt(params.size) : params.size,
      collateral: typeof params.collateral === 'string' ? BigInt(params.collateral) : params.collateral,
      direction: typeof params.direction === 'string' ? 
        (params.direction === '0' ? TradeDirection.Long : TradeDirection.Short) : 
        params.direction
    };
    
    // Call the contract service to simulate the trade
    const result = await this.contractService.simulateTrade(normalizedParams);
    
    return result;
  }

  /**
   * Calculate estimated PnL for different price movements
   */
  calculateEstimatedPnl(
    size: bigint,
    entryPrice: bigint,
    isLong: boolean,
    percentages: number[] = [5, 10, 25, 50]
  ): Record<string, bigint> {
    const result: Record<string, bigint> = {};
    
    for (const percentage of percentages) {
      // Calculate PnL for price up
      const priceMoveUp = (entryPrice * BigInt(percentage)) / BigInt(100);
      const newPriceUp = entryPrice + priceMoveUp;
      
      // Calculate PnL for price down
      const priceMoveDown = (entryPrice * BigInt(percentage)) / BigInt(100);
      const newPriceDown = entryPrice - priceMoveDown;
      
      // For long positions, profit when price goes up
      if (isLong) {
        const pnlUp = (size * (newPriceUp - entryPrice)) / entryPrice;
        const pnlDown = (size * (newPriceDown - entryPrice)) / entryPrice;
        
        result[`at${percentage}PercentUp`] = pnlUp;
        result[`at${percentage}PercentDown`] = pnlDown;
      } 
      // For short positions, profit when price goes down
      else {
        const pnlUp = (size * (entryPrice - newPriceUp)) / entryPrice;
        const pnlDown = (size * (entryPrice - newPriceDown)) / entryPrice;
        
        result[`at${percentage}PercentUp`] = pnlUp;
        result[`at${percentage}PercentDown`] = pnlDown;
      }
    }
    
    return result;
  }
} 