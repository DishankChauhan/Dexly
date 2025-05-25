'use client';

import { useState, useEffect } from 'react';
import { Position } from '@/types';
import { formatPrice, formatCurrency, formatPnL, formatTimeAgo, getPnLColor } from '@/lib/utils';
import { apiService } from '@/lib/api';

interface PositionsTableProps {
  address: string;
}

export function PositionsTable({ address }: PositionsTableProps) {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await apiService.getUserPositions(address);
        if (response.success && response.data) {
          setPositions(response.data.filter(p => !p.isClosed));
        }
      } catch (error) {
        console.error('Failed to fetch positions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
    
    // Refresh positions every 10 seconds
    const interval = setInterval(fetchPositions, 10000);
    return () => clearInterval(interval);
  }, [address]);

  const handleClosePosition = async (positionId: string) => {
    try {
      const response = await apiService.closePosition(positionId);
      if (response.success) {
        // Remove position from list
        setPositions(prev => prev.filter(p => p.id !== positionId));
        alert('Position closed successfully!');
      }
    } catch (error) {
      console.error('Failed to close position:', error);
      alert('Failed to close position');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Open Positions</h3>
        <div className="text-center text-gray-400">Loading positions...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Open Positions</h3>
      
      {positions.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No open positions
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Market</th>
                <th className="text-left py-2 text-gray-400">Side</th>
                <th className="text-left py-2 text-gray-400">Size</th>
                <th className="text-left py-2 text-gray-400">Entry Price</th>
                <th className="text-left py-2 text-gray-400">Mark Price</th>
                <th className="text-left py-2 text-gray-400">PnL</th>
                <th className="text-left py-2 text-gray-400">Margin</th>
                <th className="text-left py-2 text-gray-400">Liq. Price</th>
                <th className="text-left py-2 text-gray-400">Opened</th>
                <th className="text-left py-2 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => {
                const unrealizedPnl = parseFloat(position.unrealizedPnl || '0');
                const pnlFormatted = formatPnL(unrealizedPnl);
                
                return (
                  <tr key={position.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="py-3">
                      <span className="font-medium">{position.marketId}</span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        position.isLong 
                          ? 'bg-green-600/20 text-green-400' 
                          : 'bg-red-600/20 text-red-400'
                      }`}>
                        {position.isLong ? 'Long' : 'Short'}
                      </span>
                    </td>
                    <td className="py-3">
                      {parseFloat(position.size).toFixed(4)}
                    </td>
                    <td className="py-3">
                      {formatPrice(parseFloat(position.entryPrice), '$')}
                    </td>
                    <td className="py-3">
                      {position.currentPrice 
                        ? formatPrice(parseFloat(position.currentPrice), '$')
                        : '--'
                      }
                    </td>
                    <td className="py-3">
                      <span className={pnlFormatted.isPositive ? 'text-green-400' : 'text-red-400'}>
                        {pnlFormatted.formatted}
                      </span>
                    </td>
                    <td className="py-3">
                      {formatCurrency(parseFloat(position.collateral))}
                    </td>
                    <td className="py-3">
                      <span className="text-red-400">
                        {formatPrice(parseFloat(position.liquidationPrice), '$')}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">
                      {formatTimeAgo(position.openedAt)}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleClosePosition(position.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-medium transition-colors"
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 