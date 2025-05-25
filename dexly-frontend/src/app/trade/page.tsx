'use client';

import { useState, useEffect } from 'react';
import { useWalletContext } from '@/contexts/WalletContext';
import { Navigation } from '@/components/Navigation';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { PriceChart } from '@/components/PriceChart';
import { TradePanel } from '@/components/TradePanel';
import { PositionsTable } from '@/components/PositionsTable';
import { FundingRateBar } from '@/components/FundingRateBar';
import { PortfolioOverview } from '@/components/PortfolioOverview';
import { Market } from '@/types';
import { apiService } from '@/lib/api';

export default function TradePage() {
  const { isConnected, user } = useWalletContext();
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await apiService.getMarkets();
        if (response.success && response.data) {
          setMarkets(response.data);
          if (response.data.length > 0) {
            setSelectedMarket(response.data[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch markets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Left Panel - Chart and Market Info */}
        <div className="flex-1 flex flex-col">
          {/* Funding Rate Bar */}
          {selectedMarket && (
            <FundingRateBar marketId={selectedMarket.id} />
          )}
          
          {/* Price Chart */}
          <div className="flex-1 p-4">
            {selectedMarket ? (
              <PriceChart market={selectedMarket} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Select a market to view chart
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Trading */}
        <div className="w-full lg:w-96 border-l border-gray-800 flex flex-col">
          {isConnected && user ? (
            <>
              {/* Portfolio Overview */}
              <PortfolioOverview address={user.address} />
              
              {/* Trade Panel */}
              {selectedMarket && (
                <TradePanel market={selectedMarket} />
              )}
            </>
          ) : (
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Connect Wallet to Trade</h3>
              <p className="text-gray-400 mb-6">
                Connect your Solana wallet to start trading perpetual futures
              </p>
              <WalletConnectButton />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel - Positions */}
      {isConnected && user && (
        <div className="border-t border-gray-800 p-4">
          <PositionsTable address={user.address} />
        </div>
      )}
    </div>
  );
} 