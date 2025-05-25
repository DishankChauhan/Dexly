'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Market, PriceCandle } from '@/types';
import { formatPrice } from '@/lib/utils';

interface PriceChartProps {
  market: Market;
}

// Mock data for demonstration
const generateMockData = (basePrice: number): PriceCandle[] => {
  const data: PriceCandle[] = [];
  let price = basePrice;
  const now = Date.now();
  
  for (let i = 100; i >= 0; i--) {
    const change = (Math.random() - 0.5) * 0.02; // ±1% change
    price = price * (1 + change);
    
    data.push({
      time: now - (i * 60000), // 1 minute intervals
      open: price,
      high: price * (1 + Math.random() * 0.01),
      low: price * (1 - Math.random() * 0.01),
      close: price,
      volume: Math.random() * 1000000
    });
  }
  
  return data;
};

export function PriceChart({ market }: PriceChartProps) {
  const [chartData, setChartData] = useState<PriceCandle[]>([]);
  const [timeframe, setTimeframe] = useState('1H');

  useEffect(() => {
    // Generate mock data based on market price
    const basePrice = market.markPrice || 100;
    const mockData = generateMockData(basePrice);
    setChartData(mockData);
  }, [market]);

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].close : 0;
  const priceChange = chartData.length > 1 
    ? ((currentPrice - chartData[0].close) / chartData[0].close) * 100 
    : 0;

  return (
    <div className="h-full bg-gray-800 rounded-lg p-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">{market.assetSymbol}-PERP</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              {formatPrice(currentPrice, '$')}
            </span>
            <span className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
          {['1M', '5M', '15M', '1H', '4H', '1D'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
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

      {/* Chart */}
      <div className="h-[calc(100%-80px)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time"
              tickFormatter={formatXAxis}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              domain={['dataMin - 1', 'dataMax + 1']}
              tickFormatter={(value) => formatPrice(value)}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value: number) => [formatPrice(value, '$'), 'Price']}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke={priceChange >= 0 ? '#10B981' : '#EF4444'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 