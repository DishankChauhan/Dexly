import { useState, useEffect } from 'react';
import { PriceData, FundingRateDataPoint } from '@/types';
import { apiService } from '@/services/api';

export const usePriceData = (marketId: string = 'SOL-PERP') => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [priceHistory, setPriceHistory] = useState<{timestamp: number, price: number}[]>([]);
  const [fundingRate, setFundingRate] = useState<number | null>(null);
  const [fundingHistory, setFundingHistory] = useState<FundingRateDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPriceData = async () => {
      try {
        const data = await apiService.getCurrentPrice(marketId);
        if (isMounted) {
          setPriceData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch price data');
        }
      }
    };
    
    const fetchPriceHistory = async () => {
      try {
        const data = await apiService.getPriceHistory(marketId);
        if (isMounted) {
          setPriceHistory(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch price history:', err);
        }
      }
    };
    
    const fetchFundingRate = async () => {
      try {
        const rate = await apiService.getCurrentFundingRate(marketId);
        if (isMounted) {
          setFundingRate(rate);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch funding rate:', err);
        }
      }
    };
    
    const fetchFundingHistory = async () => {
      try {
        const history = await apiService.getFundingRateHistory(marketId);
        if (isMounted) {
          setFundingHistory(history);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch funding history:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Execute all data fetches
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchPriceData(),
        fetchPriceHistory(),
        fetchFundingRate(),
        fetchFundingHistory()
      ]);
      if (isMounted) setIsLoading(false);
    };

    fetchAllData();
    // Polling interval for real-time updates
    const intervalId = setInterval(() => {
      fetchPriceData();
      fetchFundingRate();
    }, 10000); // Update price and funding rate every 10 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [marketId]);

  return {
    priceData,
    priceHistory,
    fundingRate,
    fundingHistory,
    isLoading,
    error,
  };
}; 