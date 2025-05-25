'use client';

import { useState, useEffect } from 'react';
import { formatPercentage } from '@/lib/utils';
import { apiService } from '@/lib/api';

interface FundingRateBarProps {
  marketId: string;
}

export function FundingRateBar({ marketId }: FundingRateBarProps) {
  const [fundingRate, setFundingRate] = useState<string>('0');
  const [nextFunding, setNextFunding] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const fetchFundingRate = async () => {
      try {
        const response = await apiService.getMarketFunding(marketId);
        if (response.success && response.data) {
          setFundingRate(response.data.fundingRate);
          setNextFunding(response.data.nextFunding);
        }
      } catch (error) {
        console.error('Failed to fetch funding rate:', error);
      }
    };

    fetchFundingRate();
    const interval = setInterval(fetchFundingRate, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [marketId]);

  useEffect(() => {
    const updateTimeLeft = () => {
      if (nextFunding > 0) {
        const now = Date.now();
        const diff = nextFunding - now;
        
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setTimeLeft('00:00:00');
        }
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [nextFunding]);

  const fundingRateNum = parseFloat(fundingRate);
  const isPositive = fundingRateNum >= 0;

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Funding Rate:</span>
            <span className={`font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(fundingRateNum / 100)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Next Funding:</span>
            <span className="font-medium text-white">{timeLeft}</span>
          </div>
        </div>

        <div className="text-xs text-gray-400">
          {isPositive ? 'Longs pay Shorts' : 'Shorts pay Longs'}
        </div>
      </div>
    </div>
  );
} 