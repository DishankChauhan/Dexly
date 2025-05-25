'use client';

import { useState } from 'react';
import { useWalletContext } from '@/contexts/WalletContext';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { PortfolioOverview } from '@/components/PortfolioOverview';
import { PnLChart } from '@/components/PnLChart';
import { TradingStats } from '@/components/TradingStats';
import { TradeHistory } from '@/components/TradeHistory';

export default function PortfolioPage() {
  const { isConnected, user } = useWalletContext();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isConnected || !user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
          <p className="text-gray-400 mb-6">Connect your wallet to view your portfolio</p>
          <WalletConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <WalletConnectButton />
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <nav className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'pnl', label: 'PnL History' },
              { id: 'stats', label: 'Trading Stats' },
              { id: 'history', label: 'Trade History' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PortfolioOverview address={user.address} />
            </div>
            <div className="lg:col-span-2">
              <PnLChart address={user.address} />
            </div>
          </div>
        )}

        {activeTab === 'pnl' && (
          <PnLChart address={user.address} />
        )}

        {activeTab === 'stats' && (
          <TradingStats address={user.address} />
        )}

        {activeTab === 'history' && (
          <TradeHistory address={user.address} />
        )}
      </div>
    </div>
  );
} 