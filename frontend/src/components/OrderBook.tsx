'use client';

import { useState, useEffect } from 'react';
import { OrderbookEntry } from '@/types';

interface OrderBookProps {
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
  lastUpdated?: number;
}

const OrderBook: React.FC<OrderBookProps> = ({ bids, asks, lastUpdated }) => {
  // Find the highest bid and lowest ask to highlight the spread
  const highestBid = bids.length > 0 ? bids[0].price : 0;
  const lowestAsk = asks.length > 0 ? asks[0].price : 0;
  const spread = lowestAsk - highestBid;
  const spreadPercentage = highestBid > 0 ? (spread / highestBid) * 100 : 0;

  // Function to format numbers with commas
  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full">
      <h2 className="text-lg font-semibold mb-2">Order Book</h2>
      
      {/* Spread information */}
      <div className="flex justify-between text-xs mb-2 text-gray-400 border-b border-gray-700 pb-2">
        <span>Spread: ${formatNumber(spread, 2)}</span>
        <span>{formatNumber(spreadPercentage, 3)}%</span>
      </div>
      
      {/* Headers */}
      <div className="grid grid-cols-3 text-xs text-gray-400 mb-1">
        <div>Price (USD)</div>
        <div className="text-right">Size (SOL)</div>
        <div className="text-right">Total</div>
      </div>
      
      {/* Asks (sell orders) - displayed in reverse order (highest to lowest) */}
      <div className="mb-2 max-h-[200px] overflow-y-auto">
        {asks.slice().reverse().map((ask, index) => {
          // Calculate cumulative total for this price level
          const total = ask.size;
          
          // Calculate percentage of the largest order for the depth visualization
          const maxSize = Math.max(...asks.map(a => a.size));
          const sizePercentage = (ask.size / maxSize) * 100;
          
          return (
            <div 
              key={`ask-${index}`} 
              className="grid grid-cols-3 text-xs relative py-1"
            >
              {/* Background depth visualization */}
              <div 
                className="absolute right-0 top-0 bottom-0 bg-red-900/20" 
                style={{ width: `${sizePercentage}%` }}
              ></div>
              
              {/* Price */}
              <div className="text-red-400 z-10">${formatNumber(ask.price)}</div>
              
              {/* Size */}
              <div className="text-right z-10">{formatNumber(ask.size, 4)}</div>
              
              {/* Total */}
              <div className="text-right z-10">{formatNumber(total, 4)}</div>
            </div>
          );
        })}
      </div>
      
      {/* Current price indicator */}
      <div className="text-center py-1 bg-gray-700 text-white text-sm font-medium mb-2">
        ${highestBid > 0 ? formatNumber((highestBid + lowestAsk) / 2) : '—'}
      </div>
      
      {/* Bids (buy orders) */}
      <div className="max-h-[200px] overflow-y-auto">
        {bids.map((bid, index) => {
          // Calculate cumulative total for this price level
          const total = bid.size;
          
          // Calculate percentage of the largest order for the depth visualization
          const maxSize = Math.max(...bids.map(b => b.size));
          const sizePercentage = (bid.size / maxSize) * 100;
          
          return (
            <div 
              key={`bid-${index}`} 
              className="grid grid-cols-3 text-xs relative py-1"
            >
              {/* Background depth visualization */}
              <div 
                className="absolute right-0 top-0 bottom-0 bg-green-900/20" 
                style={{ width: `${sizePercentage}%` }}
              ></div>
              
              {/* Price */}
              <div className="text-green-400 z-10">${formatNumber(bid.price)}</div>
              
              {/* Size */}
              <div className="text-right z-10">{formatNumber(bid.size, 4)}</div>
              
              {/* Total */}
              <div className="text-right z-10">{formatNumber(total, 4)}</div>
            </div>
          );
        })}
      </div>
      
      {/* Last updated timestamp */}
      {lastUpdated && (
        <div className="text-xs text-gray-500 mt-2 text-right">
          Updated: {new Date(lastUpdated * 1000).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default OrderBook; 