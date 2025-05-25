'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricalPnL } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { apiService } from '@/lib/api';

interface PnLChartProps {
  address: string;
}

export function PnLChart({ address }: PnLChartProps) {
  const [pnlHistory, setPnlHistory] = useState<HistoricalPnL[]>([]);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPnLHistory = async () => {
      setLoading(true);
      try {
        const response = await apiService.getPnLHistory(address, timeframe);
        if (response.success && response.data) {
          setPnlHistory(response.data.history);
        }
      } catch (error) {
        console.error('Failed to fetch PnL history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPnLHistory();
  }, [address, timeframe]);

  const totalPnL = pnlHistory.length > 0 
    ? pnlHistory[pnlHistory.length - 1].cumulativePnl 
    : 0;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">PnL History</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-bold">
              {formatCurrency(totalPnL)}
            </span>
            <span className={`text-sm ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              Total PnL
            </span>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
          {(['7d', '30d', '90d', '1y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                timeframe === tf 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <div className="text-gray-400">Loading PnL data...</div>
        </div>
      ) : pnlHistory.length === 0 ? (
        <div className="h-80 flex items-center justify-center">
          <div className="text-gray-400">No PnL data available</div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pnlHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date"
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === 'cumulativePnl' ? 'Cumulative PnL' :
                  name === 'dailyPnl' ? 'Daily PnL' :
                  name === 'realizedPnl' ? 'Realized PnL' :
                  name === 'unrealizedPnl' ? 'Unrealized PnL' : name
                ]}
              />
              <Line
                type="monotone"
                dataKey="cumulativePnl"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="dailyPnl"
                stroke="#10B981"
                strokeWidth={1}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Summary Stats */}
      {pnlHistory.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
          <div className="text-center">
            <div className="text-sm text-gray-400">Total Volume</div>
            <div className="font-semibold">
              {formatCurrency(pnlHistory.reduce((sum, day) => sum + day.volume, 0))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Total Trades</div>
            <div className="font-semibold">
              {pnlHistory.reduce((sum, day) => sum + day.trades, 0)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Realized PnL</div>
            <div className={`font-semibold ${
              pnlHistory.reduce((sum, day) => sum + day.realizedPnl, 0) >= 0 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}>
              {formatCurrency(pnlHistory.reduce((sum, day) => sum + day.realizedPnl, 0))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Funding PnL</div>
            <div className={`font-semibold ${
              pnlHistory.reduce((sum, day) => sum + day.fundingPnl, 0) >= 0 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}>
              {formatCurrency(pnlHistory.reduce((sum, day) => sum + day.fundingPnl, 0))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 