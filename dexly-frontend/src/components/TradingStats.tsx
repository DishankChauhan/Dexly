'use client';

import { useState, useEffect } from 'react';
import { TradingStatistics } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { apiService } from '@/lib/api';

interface TradingStatsProps {
  address: string;
}

export function TradingStats({ address }: TradingStatsProps) {
  const [stats, setStats] = useState<TradingStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiService.getTradingStats(address);
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch trading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [address]);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="text-center text-gray-400">Loading trading statistics...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="text-center text-gray-400">No trading statistics available</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-6">Trading Statistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Total Trades</div>
          <div className="text-2xl font-bold">{stats.totalTrades}</div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Total Volume</div>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalVolume)}</div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Win Rate</div>
          <div className={`text-2xl font-bold ${stats.winRate >= 0.5 ? 'text-green-400' : 'text-red-400'}`}>
            {formatPercentage(stats.winRate)}
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Profit Factor</div>
          <div className={`text-2xl font-bold ${stats.profitFactor >= 1 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.profitFactor.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Sharpe Ratio</div>
          <div className={`text-2xl font-bold ${stats.sharpeRatio >= 1 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.sharpeRatio.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Max Drawdown</div>
          <div className="text-2xl font-bold text-red-400">
            {formatPercentage(stats.maxDrawdown)}
          </div>
        </div>
      </div>
    </div>
  );
} 