import {
  ApiResponse,
  Market,
  Position,
  PnLSummary,
  HistoricalPnL,
  PortfolioOverview,
  TradingStatistics,
  LeaderboardEntry,
  TradeSimulation,
  OrderParams,
  TradeDirection
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth APIs
  async generateNonce(publicKey: string): Promise<ApiResponse<{ nonce: string; message: string; expiresIn: number }>> {
    return this.request('/auth/nonce', {
      method: 'POST',
      body: JSON.stringify({ publicKey }),
    });
  }

  async verifySignature(
    publicKey: string,
    signature: string,
    message: string
  ): Promise<ApiResponse<{ token: string; user: any; expiresIn: string }>> {
    return this.request('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ publicKey, signature, message }),
    });
  }

  async getSession(): Promise<ApiResponse<{ user: any; authenticated: boolean }>> {
    return this.request('/auth/session');
  }

  async refreshToken(): Promise<ApiResponse<{ token: string; expiresIn: string }>> {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Market APIs
  async getMarkets(): Promise<ApiResponse<Market[]>> {
    return this.request('/markets');
  }

  async getMarket(marketId: string): Promise<ApiResponse<Market>> {
    return this.request(`/markets/${marketId}`);
  }

  async getMarketFunding(marketId: string): Promise<ApiResponse<{ fundingRate: string; nextFunding: number }>> {
    return this.request(`/markets/${marketId}/funding`);
  }

  async getMarketPriceFeed(marketId: string): Promise<ApiResponse<{ price: number; confidence: number; timestamp: number }>> {
    return this.request(`/markets/${marketId}/price-feed`);
  }

  async getMarketData(marketId: string): Promise<ApiResponse<any>> {
    return this.request(`/markets/${marketId}/data`);
  }

  async getPriceHistory(marketId: string, timeframe: string = '1d'): Promise<ApiResponse<{ timestamp: number; price: string }[]>> {
    return this.request(`/markets/${marketId}/price-history?timeframe=${timeframe}`);
  }

  async getCandlestickData(marketId: string, timeframe: string = '1H', limit: number = 100): Promise<ApiResponse<any[]>> {
    return this.request(`/markets/${marketId}/candlestick?timeframe=${timeframe}&limit=${limit}`);
  }

  // Position APIs
  async getUserPositions(address: string): Promise<ApiResponse<Position[]>> {
    return this.request(`/positions/user/${address}`);
  }

  async openPosition(params: OrderParams): Promise<ApiResponse<{ instruction: any; simulatedEntryPrice: string; simulatedLiquidationPrice: string }>> {
    return this.request('/positions/open', {
      method: 'POST',
      body: JSON.stringify({
        marketId: params.marketId,
        direction: params.direction,
        size: params.size,
        collateral: params.collateral,
        leverage: params.leverage,
        userKey: this.getAuthToken(), // This should be the user's public key
      }),
    });
  }

  async closePosition(positionId: string): Promise<ApiResponse<{ instruction: any }>> {
    return this.request('/positions/close', {
      method: 'POST',
      body: JSON.stringify({ positionId }),
    });
  }

  async liquidatePosition(address: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(`/positions/liquidate/${address}`, {
      method: 'POST',
    });
  }

  // Trade Simulation
  async simulateTrade(params: OrderParams): Promise<ApiResponse<TradeSimulation>> {
    return this.request('/trade/simulate', {
      method: 'POST',
      body: JSON.stringify({
        marketId: params.marketId,
        direction: params.direction,
        size: params.size,
        collateral: params.collateral,
        leverage: params.leverage,
        userKey: this.getAuthToken(),
      }),
    });
  }

  // Order APIs
  async createLimitOrder(params: OrderParams): Promise<ApiResponse<{ orderId: string }>> {
    return this.request('/orders/limit', {
      method: 'POST',
      body: JSON.stringify({
        marketId: params.marketId,
        direction: params.direction,
        size: params.size,
        price: params.price,
        collateral: params.collateral,
        leverage: params.leverage,
        userKey: this.getAuthToken(),
      }),
    });
  }

  async cancelOrder(orderId: string): Promise<ApiResponse<{ cancelled: boolean }>> {
    return this.request('/orders/cancel', {
      method: 'POST',
      body: JSON.stringify({
        orderId,
        userKey: this.getAuthToken(),
      }),
    });
  }

  async getUserOrders(address: string): Promise<ApiResponse<any[]>> {
    return this.request(`/orders/user/${address}`);
  }

  // PnL APIs
  async getUserPnL(address: string): Promise<ApiResponse<{ summary: PnLSummary; positions: any[] }>> {
    return this.request(`/pnl/${address}`);
  }

  async getPnLHistory(
    address: string,
    timeframe: '7d' | '30d' | '90d' | '1y' = '30d',
    granularity: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<ApiResponse<{ timeframe: string; granularity: string; history: HistoricalPnL[] }>> {
    return this.request(`/pnl/${address}/history?timeframe=${timeframe}&granularity=${granularity}`);
  }

  async getPositionPnL(positionId: string): Promise<ApiResponse<any>> {
    return this.request(`/pnl/position/${positionId}`);
  }

  // Stats APIs
  async getPortfolioOverview(address: string): Promise<ApiResponse<PortfolioOverview>> {
    return this.request(`/stats/portfolio/${address}`);
  }

  async getTradingStats(
    address: string,
    timeframe: '7d' | '30d' | '90d' | '1y' = '30d'
  ): Promise<ApiResponse<TradingStatistics>> {
    return this.request(`/stats/trading/${address}?timeframe=${timeframe}`);
  }

  async getPerformanceMetrics(address: string): Promise<ApiResponse<any>> {
    return this.request(`/stats/performance/${address}`);
  }

  async getLeaderboard(
    metric: 'pnl' | 'volume' | 'winRate' | 'trades' = 'pnl',
    timeframe: '24h' | '7d' | '30d' | 'all' = '30d'
  ): Promise<ApiResponse<{ timeframe: string; metric: string; leaderboard: LeaderboardEntry[] }>> {
    return this.request(`/stats/leaderboard?metric=${metric}&timeframe=${timeframe}`);
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService; 