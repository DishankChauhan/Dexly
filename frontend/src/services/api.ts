import { Position, PriceData } from '@/types';

const API_URL = '/api';

// API service to interact with our backend
export const api = {
  // Get current price
  async getCurrentPrice(): Promise<PriceData> {
    const response = await fetch(`${API_URL}/price`);
    if (!response.ok) {
      throw new Error('Failed to fetch price data');
    }
    return response.json();
  },

  // Get positions for a wallet
  async getPositionsByWallet(wallet: string): Promise<Position[]> {
    const response = await fetch(`${API_URL}/positions/wallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wallet),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch positions');
    }

    return response.json();
  },

  // Open a new position
  async openPosition(
    wallet: string,
    direction: 'long' | 'short',
    size: number,
    leverage: number
  ): Promise<Position> {
    const response = await fetch(`${API_URL}/positions/open`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet,
        direction,
        size,
        leverage,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to open position');
    }

    return response.json();
  },

  // Close a position
  async closePosition(positionId: string): Promise<void> {
    const response = await fetch(`${API_URL}/positions/close`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(positionId),
    });

    if (!response.ok) {
      throw new Error('Failed to close position');
    }
  },
}; 