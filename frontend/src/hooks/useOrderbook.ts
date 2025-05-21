import { useState, useEffect } from 'react';
import { OrderbookData, OrderbookEntry } from '@/types';
import { apiService } from '@/services/api';

export const useOrderbook = (marketId: string) => {
  const [bids, setBids] = useState<OrderbookEntry[]>([]);
  const [asks, setAsks] = useState<OrderbookEntry[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!marketId) return;

    let isMounted = true;
    const fetchOrderbook = async () => {
      try {
        const data = await apiService.getOrderbook(marketId);
        if (isMounted) {
          setBids(data.bids);
          setAsks(data.asks);
          setLastUpdated(data.timestamp || Date.now());
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch orderbook');
          
          // Generate mock data if API fails (for development)
          generateMockOrderbook();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Helper function to generate mock orderbook data
    const generateMockOrderbook = () => {
      // Use a fixed base price for consistent orderbook 
      const basePrice = 100;
      const mockBids: OrderbookEntry[] = [];
      const mockAsks: OrderbookEntry[] = [];
      
      // Generate 15 bids (buy orders) below base price
      for (let i = 0; i < 15; i++) {
        const priceDelta = (i + 1) * 0.05;
        const price = basePrice * (1 - priceDelta);
        const size = Math.random() * 10 + 0.5; // Random size between 0.5 and 10.5
        mockBids.push({ price, size });
      }
      
      // Generate 15 asks (sell orders) above base price
      for (let i = 0; i < 15; i++) {
        const priceDelta = (i + 1) * 0.05;
        const price = basePrice * (1 + priceDelta);
        const size = Math.random() * 10 + 0.5; // Random size between 0.5 and 10.5
        mockAsks.push({ price, size });
      }
      
      // Sort bids in descending order (highest first)
      mockBids.sort((a, b) => b.price - a.price);
      // Sort asks in ascending order (lowest first)
      mockAsks.sort((a, b) => a.price - b.price);
      
      setBids(mockBids);
      setAsks(mockAsks);
      setLastUpdated(Date.now());
    };

    // Initial fetch
    fetchOrderbook();
    
    // Update orderbook every 2 seconds
    const intervalId = setInterval(fetchOrderbook, 2000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [marketId]);

  return {
    bids,
    asks,
    lastUpdated,
    isLoading,
    error,
  };
}; 