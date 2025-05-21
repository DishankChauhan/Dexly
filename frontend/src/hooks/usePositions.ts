import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Position } from '@/types';
import { apiService } from '@/services/api';

interface ClosePositionResult {
  success: boolean;
  signature?: string;
}

export const usePositions = (marketId?: string) => {
  const { publicKey } = useWallet();
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter to only include positions for the specified market, if provided
  const filteredPositions = marketId 
    ? positions.filter(pos => pos.market_id === marketId)
    : positions;

  useEffect(() => {
    if (!publicKey) {
      setPositions([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchPositions = async () => {
      try {
        setIsLoading(true);
        const walletAddress = publicKey.toString();
        const data = await apiService.getPositionsByWallet(walletAddress);
        
        if (isMounted) {
          setPositions(data);
          setError(null);
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
    leverage: number,
    marketIdToUse: string = 'SOL-PERP' // Default market
  ) => {
    if (!publicKey) {
      setError('Wallet not connected');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const newPosition = await apiService.openPosition(
        publicKey.toString(),
        marketIdToUse,
        direction,
        size,
        leverage
      );
      
      setPositions((prev) => [...prev, newPosition]);
      setIsLoading(false);
      return newPosition;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to open position';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  const closePosition = async (positionId: string): Promise<ClosePositionResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await apiService.closePosition(positionId);
      
      if (result.success) {
        // Update local state to mark position as closed
        setPositions((prev) => 
          prev.map(p => p.id === positionId 
            ? {...p, status: 'closed' as const} 
            : p
          )
        );
      }
      
      setIsLoading(false);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to close position';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false };
    }
  };

  // Calculate aggregate stats for displayed positions
  const totalPnl = filteredPositions
    .filter(p => p.status === 'open')
    .reduce((sum, pos) => sum + pos.pnl, 0);
  
  const totalFundingPnl = filteredPositions
    .filter(p => p.status === 'open')
    .reduce((sum, pos) => sum + pos.unrealized_funding, 0);
  
  const totalCollateral = filteredPositions
    .filter(p => p.status === 'open')
    .reduce((sum, pos) => sum + pos.collateral, 0);

  return {
    positions: filteredPositions,
    isLoading,
    error,
    openPosition,
    closePosition,
    stats: {
      totalPnl,
      totalFundingPnl,
      totalCollateral,
      openPositionsCount: filteredPositions.filter(p => p.status === 'open').length
    }
  };
}; 