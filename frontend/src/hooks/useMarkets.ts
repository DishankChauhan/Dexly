import { useState, useEffect } from 'react';
import { Market, PriceImpactData } from '@/types';
import { apiService } from '@/services/api';

export const useMarkets = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all markets
  useEffect(() => {
    let isMounted = true;

    const fetchMarkets = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getMarkets();
        if (isMounted) {
          setMarkets(data);
          // Set the first market as selected if none is selected yet
          if (!selectedMarket && data.length > 0) {
            setSelectedMarket(data[0]);
          }
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch markets');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMarkets();
    // Refresh every 60 seconds
    const intervalId = setInterval(fetchMarkets, 60000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [selectedMarket]);

  // Select a market by ID
  const selectMarket = async (marketId: string) => {
    try {
      setIsLoading(true);
      const market = await apiService.getMarket(marketId);
      setSelectedMarket(market);
      setError(null);
    } catch (err) {
      setError('Failed to fetch market details');
    } finally {
      setIsLoading(false);
    }
  };

  // Get detailed AMM data for the selected market
  const getAMMData = async (marketId: string) => {
    try {
      setIsLoading(true);
      const market = await apiService.getMarketAMMData(marketId);
      
      // Update the selected market with AMM data
      if (selectedMarket && selectedMarket.id === marketId) {
        setSelectedMarket(market);
      }
      
      // Also update the market in the markets array
      setMarkets(markets.map(m => 
        m.id === marketId ? market : m
      ));
      
      setError(null);
      return market;
    } catch (err) {
      setError('Failed to fetch AMM data');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate price impact for a trade
  const calculatePriceImpact = async (
    marketId: string,
    size: number,
    direction: 'long' | 'short'
  ): Promise<PriceImpactData | null> => {
    try {
      const data = await apiService.calculatePriceImpact(marketId, size, direction);
      return data;
    } catch (err) {
      setError('Failed to calculate price impact');
      return null;
    }
  };

  return {
    markets,
    selectedMarket,
    isLoading,
    error,
    selectMarket,
    getAMMData,
    calculatePriceImpact,
  };
}; 