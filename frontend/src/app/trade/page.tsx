'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePriceData } from '@/hooks/usePriceData';
import Link from 'next/link';
import TradingChart from '@/components/TradingChart';
import TradeForm from '@/components/TradeForm';
import OrderBook from '@/components/OrderBook';
import PositionsList from '@/components/PositionsList';
import { OrderbookEntry } from '@/types';

export default function TradePage() {
  const searchParams = useSearchParams();
  const market = searchParams.get('market') || 'SOL-PERP';
  const { priceData } = usePriceData();
  
  // Generate mock orderbook data (in a real app this would come from an API)
  const [orderbook, setOrderbook] = useState<{ bids: OrderbookEntry[]; asks: OrderbookEntry[] }>({
    bids: [],
    asks: []
  });
  
  useEffect(() => {
    // Generate some realistic-looking orderbook data based on the current price
    const currentPrice = priceData?.price || 100;
    const generateOrderbookData = () => {
      const bids: OrderbookEntry[] = [];
      const asks: OrderbookEntry[] = [];
      
      // Generate 15 bids (buy orders) slightly below current price
      for (let i = 0; i < 15; i++) {
        const priceOffset = (i + 1) * 0.1;
        const price = currentPrice * (1 - priceOffset / 100);
        const size = Math.random() * 10 + 1; // Random size between 1 and 11
        bids.push({ price, size });
      }
      
      // Generate 15 asks (sell orders) slightly above current price
      for (let i = 0; i < 15; i++) {
        const priceOffset = (i + 1) * 0.1;
        const price = currentPrice * (1 + priceOffset / 100);
        const size = Math.random() * 10 + 1; // Random size between 1 and 11
        asks.push({ price, size });
      }
      
      // Sort bids in descending order (highest first)
      bids.sort((a, b) => b.price - a.price);
      // Sort asks in ascending order (lowest first)
      asks.sort((a, b) => a.price - b.price);
      
      return { bids, asks };
    };
    
    setOrderbook(generateOrderbookData());
    
    // Update orderbook every 5 seconds
    const interval = setInterval(() => {
      setOrderbook(generateOrderbookData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [priceData]);
  
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Header with market selector */}
      <div className="bg-gray-800 py-4 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mr-8">
                Dexly
              </Link>
              
              <div className="relative">
                <select 
                  className="bg-gray-700 text-white rounded-md py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={market}
                  onChange={(e) => {
                    window.location.href = `/trade?market=${e.target.value}`;
                  }}
                >
                  <option value="SOL-PERP">SOL-PERP</option>
                  <option value="BTC-PERP">BTC-PERP</option>
                  <option value="ETH-PERP">ETH-PERP</option>
                  <option value="AVAX-PERP">AVAX-PERP</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-gray-700 rounded-md py-2 px-4">
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm mr-2">Price:</span>
                  <span className="text-lg font-medium">${priceData?.price?.toFixed(2) || '—'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Main trading interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart section (3/4 width on desktop) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chart */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">{market} Chart</h2>
              <div className="h-[500px]">
                <TradingChart />
              </div>
            </div>
            
            {/* Positions List */}
            <PositionsList />
          </div>
          
          {/* Sidebar (1/4 width on desktop) */}
          <div className="space-y-6">
            {/* Trade Form */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">{market}</h2>
              <TradeForm currentPrice={priceData?.price} />
            </div>
            
            {/* Order Book */}
            <div className="bg-gray-800 rounded-lg p-4">
              <OrderBook 
                bids={orderbook.bids} 
                asks={orderbook.asks} 
                lastUpdated={Date.now() / 1000}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 