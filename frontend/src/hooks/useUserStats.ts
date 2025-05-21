import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { UserStats, TransactionHistory } from '@/types';
import { apiService } from '@/services/api';

export const useUserStats = () => {
  const { publicKey } = useWallet();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setStats(null);
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const walletAddress = publicKey.toString();
        
        // Fetch user stats and transaction history in parallel
        const [userStats, txHistory] = await Promise.all([
          apiService.getUserStats(walletAddress),
          apiService.getTransactionHistory(walletAddress)
        ]);
        
        if (isMounted) {
          setStats(userStats);
          setTransactions(txHistory);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch user data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    // Refresh data every 30 seconds
    const intervalId = setInterval(fetchData, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [publicKey]);

  return {
    stats,
    transactions,
    isLoading,
    error,
  };
}; 