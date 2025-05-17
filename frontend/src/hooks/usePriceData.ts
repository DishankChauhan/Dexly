import { useState, useEffect } from 'react';
import { PriceData } from '@/types';
import { api } from '@/services/api';

export const usePriceData = () => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const intervalId = setInterval(async () => {
      try {
        const data = await api.getCurrentPrice();
        if (isMounted) {
          setPriceData(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch price data');
          setIsLoading(false);
        }
      }
    }, 3000); // Update every 3 seconds

    // Initial fetch
    fetchPriceData();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const fetchPriceData = async () => {
    try {
      const data = await api.getCurrentPrice();
      setPriceData(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch price data');
      setIsLoading(false);
    }
  };

  return {
    priceData,
    isLoading,
    error,
    refetch: fetchPriceData,
  };
}; 