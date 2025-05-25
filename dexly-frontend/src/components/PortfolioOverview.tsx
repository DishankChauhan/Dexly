'use client';

import { useState, useEffect } from 'react';
import { PortfolioOverview as PortfolioData } from '@/types';
import { formatCurrency, formatPercentage, getPnLColor } from '@/lib/utils';
import { apiService } from '@/lib/api';

interface PortfolioOverviewProps {
  address: string;
}

export function PortfolioOverview({ address }: PortfolioOverviewProps) {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await apiService.getPortfolioOverview(address);
        if (response.success && response.data) {
          setPortfolio(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
    
    // Refresh portfolio every 30 seconds
    const interval = setInterval(fetchPortfolio, 30000);
    return () => clearInterval(interval);
  }, [address]);

  if (loading) {
    return (
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="text-center text-gray-400">Loading portfolio...</div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="text-center text-gray-400">Failed to load portfolio</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 border-b border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Portfolio Overview</h3>
      
      <div className="space-y-3">
        {/* Total Portfolio Value */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Portfolio Value</span>
          <span className="font-semibold text-lg">
            {formatCurrency(portfolio.totalPortfolioValue)}
          </span>
        </div>

        {/* Total PnL */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total PnL</span>
          <div className="text-right">
            <div className={`font-semibold ${getPnLColor(portfolio.totalPnl)}`}>
              {portfolio.totalPnl >= 0 ? '+' : ''}{formatCurrency(portfolio.totalPnl)}
            </div>
            <div className={`text-sm ${getPnLColor(portfolio.totalPnlPercentage)}`}>
              {portfolio.totalPnlPercentage >= 0 ? '+' : ''}{formatPercentage(portfolio.totalPnlPercentage / 100)}
            </div>
          </div>
        </div>

        {/* Available Balance */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Available Balance</span>
          <span className="font-medium">
            {formatCurrency(portfolio.availableBalance)}
          </span>
        </div>

        {/* Margin Used */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Margin Used</span>
          <div className="text-right">
            <div className="font-medium">
              {formatCurrency(portfolio.totalMarginUsed)}
            </div>
            <div className="text-sm text-gray-400">
              {formatPercentage(portfolio.marginUtilization / 100)} utilized
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Open Positions</span>
          <div className="text-right">
            <div className="font-medium">{portfolio.openPositions}</div>
            {portfolio.positionsAtRisk > 0 && (
              <div className="text-sm text-red-400">
                {portfolio.positionsAtRisk} at risk
              </div>
            )}
          </div>
        </div>

        {/* Average Leverage */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Avg Leverage</span>
          <span className="font-medium">
            {portfolio.averageLeverage.toFixed(2)}x
          </span>
        </div>

        {/* Margin Utilization Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Margin Utilization</span>
            <span className="text-gray-300">
              {formatPercentage(portfolio.marginUtilization / 100)}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                portfolio.marginUtilization > 80
                  ? 'bg-red-500'
                  : portfolio.marginUtilization > 60
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(portfolio.marginUtilization, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 