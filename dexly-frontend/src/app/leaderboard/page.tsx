'use client';

import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/types';
import { formatCurrency, formatPercentage, truncateAddress } from '@/lib/utils';
import { apiService } from '@/lib/api';
import { WalletConnectButton } from '@/components/WalletConnectButton';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [metric, setMetric] = useState<'pnl' | 'volume' | 'winRate' | 'trades'>('pnl');
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | 'all'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await apiService.getLeaderboard(metric, timeframe);
        if (response.success && response.data) {
          setLeaderboard(response.data.leaderboard);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [metric, timeframe]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <WalletConnectButton />
        </div>
      </header>

      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Metric Selector */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: 'pnl', label: 'PnL' },
              { id: 'volume', label: 'Volume' },
              { id: 'winRate', label: 'Win Rate' },
              { id: 'trades', label: 'Trades' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMetric(m.id as 'pnl' | 'volume' | 'winRate' | 'trades')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  metric === m.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Timeframe Selector */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: '24h', label: '24H' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' },
              { id: 'all', label: 'All Time' },
            ].map((tf) => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id as '24h' | '7d' | '30d' | 'all')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  timeframe === tf.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">
              Loading leaderboard...
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No data available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Trader
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      PnL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Win Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Trades
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.address} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`font-bold text-lg ${
                            index === 0 ? 'text-yellow-400' :
                            index === 1 ? 'text-gray-300' :
                            index === 2 ? 'text-orange-400' :
                            'text-gray-400'
                          }`}>
                            #{entry.rank}
                          </span>
                          {index < 3 && (
                            <span className="ml-2 text-lg">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm">
                          {truncateAddress(entry.address, 6)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className={`font-semibold ${
                            entry.totalPnl >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {entry.totalPnl >= 0 ? '+' : ''}{formatCurrency(entry.totalPnl)}
                          </span>
                          <span className={`text-xs ${
                            entry.totalPnlPercentage >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {entry.totalPnlPercentage >= 0 ? '+' : ''}{formatPercentage(entry.totalPnlPercentage / 100)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">
                          {formatCurrency(entry.totalVolume)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${
                          entry.winRate >= 0.5 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formatPercentage(entry.winRate)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">
                          {entry.totalTrades}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 