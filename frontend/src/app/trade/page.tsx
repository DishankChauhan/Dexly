'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePriceData } from '@/hooks/usePriceData';
import { useMarkets } from '@/hooks/useMarkets';
import { useOrderbook } from '@/hooks/useOrderbook';
import Link from 'next/link';
import TradingChart from '@/components/TradingChart';
import TradeForm from '@/components/TradeForm';
import OrderBook from '@/components/OrderBook';
import PositionsList from '@/components/PositionsList';
import WalletContextProvider from '@/components/WalletContextProvider';

export default function TradePage() {
  const searchParams = useSearchParams();
  const marketIdParam = searchParams.get('market') || 'SOL-PERP';
  const [marketId, setMarketId] = useState(marketIdParam);
  
  const { priceData, fundingRate } = usePriceData(marketId);
  const { markets, selectedMarket, selectMarket } = useMarkets();
  const { asks, bids, lastUpdated } = useOrderbook(marketId);
  
  // Handle market changes
  useEffect(() => {
    if (marketIdParam && marketIdParam !== marketId) {
      setMarketId(marketIdParam);
      selectMarket(marketIdParam);
    }
  }, [marketIdParam, marketId, selectMarket]);

  // Calculate price change color and arrow
  const priceChangeClass = priceData?.price_change_24h_percentage && priceData.price_change_24h_percentage >= 0 
    ? 'text-green-400' 
    : 'text-red-400';
  
  const priceChangeArrow = priceData?.price_change_24h_percentage && priceData.price_change_24h_percentage >= 0 
    ? '↑' 
    : '↓';
  
  return (
    <WalletContextProvider>
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
                    value={marketId}
                    onChange={(e) => {
                      window.location.href = `/trade?market=${e.target.value}`;
                    }}
                  >
                    {markets.map(market => (
                      <option key={market.id} value={market.id}>
                        {market.asset_symbol}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700 rounded-md py-2 px-4">
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm mr-2">Price:</span>
                    <span className="text-lg font-medium">${priceData?.price?.toFixed(2) || '—'}</span>
                    
                    {priceData?.price_change_24h_percentage && (
                      <span className={`ml-2 text-sm ${priceChangeClass}`}>
                        {priceChangeArrow} {Math.abs(priceData.price_change_24h_percentage).toFixed(2)}%
                      </span>
                    )}
                  </div>
                </div>

                {fundingRate !== null && (
                  <div className="bg-gray-700 rounded-md py-2 px-4">
                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm mr-2">Funding:</span>
                      <span className={`${fundingRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {fundingRate >= 0 ? '+' : ''}{(fundingRate * 100).toFixed(4)}%
                      </span>
                    </div>
                  </div>
                )}
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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">{selectedMarket?.asset_symbol || marketId} Chart</h2>
                  <div className="flex space-x-2">
                    <button className="bg-gray-700 px-3 py-1 rounded text-sm">1H</button>
                    <button className="bg-gray-700 px-3 py-1 rounded text-sm">4H</button>
                    <button className="bg-blue-600 px-3 py-1 rounded text-sm">1D</button>
                    <button className="bg-gray-700 px-3 py-1 rounded text-sm">1W</button>
                  </div>
                </div>
                <div className="h-[500px]">
                  <TradingChart marketId={marketId} />
                </div>
              </div>
              
              {/* Positions List */}
              <PositionsList marketId={marketId} />
            </div>
            
            {/* Sidebar (1/4 width on desktop) */}
            <div className="space-y-6">
              {/* Trade Form */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">{selectedMarket?.asset_symbol || marketId}</h2>
                <TradeForm marketId={marketId} />
              </div>
              
              {/* Order Book */}
              <div className="bg-gray-800 rounded-lg p-4">
                <OrderBook 
                  bids={bids} 
                  asks={asks} 
                  lastUpdated={lastUpdated}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </WalletContextProvider>
  );
} 