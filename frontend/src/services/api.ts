import { Position, PriceData, OrderbookData, Market, PriceImpactData, FundingRateDataPoint, UserStats, TransactionHistory } from '@/types';
import axios from 'axios';

// Create a base axios instance for API calls
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service to interact with our backend
export const apiService = {
  // Markets
  async getMarkets(): Promise<Market[]> {
    const response = await api.get('/markets');
    return response.data;
  },

  async getMarket(marketId: string): Promise<Market> {
    const response = await api.get(`/markets/${marketId}`);
    return response.data;
  },

  async getMarketAMMData(marketId: string): Promise<Market> {
    const response = await api.get(`/markets/${marketId}/amm`);
    return response.data;
  },

  // Price
  async getCurrentPrice(marketId: string): Promise<PriceData> {
    const response = await api.get(`/markets/${marketId}/price`);
    return response.data;
  },

  async getPriceHistory(marketId: string, timeframe: string = '1d'): Promise<{timestamp: number, price: number}[]> {
    const response = await api.get(`/markets/${marketId}/price-history?timeframe=${timeframe}`);
    return response.data;
  },

  // Price Impact
  async calculatePriceImpact(marketId: string, size: number, direction: 'long' | 'short'): Promise<PriceImpactData> {
    const response = await api.post(`/markets/${marketId}/price-impact`, {
      size,
      direction
    });
    return response.data;
  },

  // Funding Rates
  async getCurrentFundingRate(marketId: string): Promise<number> {
    const response = await api.get(`/markets/${marketId}/funding-rate`);
    return response.data.rate;
  },

  async getFundingRateHistory(marketId: string, limit: number = 100): Promise<FundingRateDataPoint[]> {
    const response = await api.get(`/markets/${marketId}/funding-history?limit=${limit}`);
    return response.data;
  },

  // Positions
  async getPositionsByWallet(walletAddress: string): Promise<Position[]> {
    const response = await api.get(`/positions?wallet=${walletAddress}`);
    return response.data;
  },

  async getPosition(positionId: string): Promise<Position> {
    const response = await api.get(`/positions/${positionId}`);
    return response.data;
  },

  async openPosition(
    walletAddress: string,
    marketId: string,
    direction: 'long' | 'short',
    size: number,
    leverage: number
  ): Promise<Position> {
    const response = await api.post('/positions', {
      wallet: walletAddress,
      market_id: marketId,
      direction,
      size,
      leverage,
    });
    return response.data;
  },

  async closePosition(positionId: string): Promise<{ success: boolean, tx_signature?: string }> {
    const response = await api.post(`/positions/${positionId}/close`);
    return response.data;
  },

  // User Stats
  async getUserStats(walletAddress: string): Promise<UserStats> {
    const response = await api.get(`/users/${walletAddress}/stats`);
    return response.data;
  },

  // Transaction History
  async getTransactionHistory(walletAddress: string, limit: number = 20): Promise<TransactionHistory[]> {
    const response = await api.get(`/users/${walletAddress}/transactions?limit=${limit}`);
    return response.data;
  },
  
  // Orderbook
  async getOrderbook(marketId: string): Promise<OrderbookData> {
    const response = await api.get(`/markets/${marketId}/orderbook`);
    return response.data;
  },
  
  // Admin Functions - requires admin key
  async pauseMarket(marketId: string, adminKey: string): Promise<{ success: boolean }> {
    const response = await api.post(`/admin/markets/${marketId}/pause`, {}, {
      headers: {
        'X-Admin-Key': adminKey
      }
    });
    return response.data;
  },
  
  async resumeMarket(marketId: string, adminKey: string): Promise<{ success: boolean }> {
    const response = await api.post(`/admin/markets/${marketId}/resume`, {}, {
      headers: {
        'X-Admin-Key': adminKey
      }
    });
    return response.data;
  },
  
  async updateFundingRate(marketId: string, newRate: number, adminKey: string): Promise<{ success: boolean }> {
    const response = await api.post(`/admin/markets/${marketId}/funding-rate`, {
      rate: newRate
    }, {
      headers: {
        'X-Admin-Key': adminKey
      }
    });
    return response.data;
  }
}; 