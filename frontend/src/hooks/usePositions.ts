import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Position } from '@/types';
import { api } from '@/services/api';

interface ClosePositionResult {
  success: boolean;
  signature?: string;
}

export const usePositions = () => {
  const { publicKey } = useWallet();
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setPositions([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchPositions = async () => {
      try {
        const walletAddress = publicKey.toString();
        const data = await api.getPositionsByWallet(walletAddress);
        if (isMounted) {
          setPositions(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch positions');
          setIsLoading(false);
        }
      }
    };

    fetchPositions();
    const intervalId = setInterval(fetchPositions, 10000); // Refresh every 10 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [publicKey]);

  const openPosition = async (
    direction: 'long' | 'short',
    size: number,
    leverage: number
  ) => {
    if (!publicKey) {
      setError('Wallet not connected');
      return null;
    }

    try {
      setIsLoading(true);
      const newPosition = await api.openPosition(
        publicKey.toString(),
        direction,
        size,
        leverage
      );
      setPositions((prev) => [...prev, newPosition]);
      setIsLoading(false);
      return newPosition;
    } catch (err) {
      setError('Failed to open position');
      setIsLoading(false);
      return null;
    }
  };

  const closePosition = async (positionId: string): Promise<ClosePositionResult> => {
    try {
      setIsLoading(true);
      await api.closePosition(positionId);
      
      setPositions((prev) => prev.filter((p) => p.id !== positionId));
      setIsLoading(false);
      
      // In a real blockchain implementation, this would return the transaction signature
      // For now, we're returning a mock signature since our API doesn't return real signatures
      return { 
        success: true,
        signature: undefined // Our mock API doesn't return a real signature yet
      };
    } catch (err) {
      setError('Failed to close position');
      setIsLoading(false);
      return { success: false };
    }
  };

  return {
    positions,
    isLoading,
    error,
    openPosition,
    closePosition,
  };
}; 