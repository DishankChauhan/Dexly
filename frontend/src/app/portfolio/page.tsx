'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import PositionsList from '@/components/PositionsList';
import { usePositions } from '@/hooks/usePositions';
import { solanaClient } from '@/services/solana';

export default function Portfolio() {
  const { publicKey } = useWallet();
  const { positions } = usePositions();
  const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
  
  // Calculate portfolio stats
  const totalCollateral = positions.reduce((sum, pos) => sum + pos.size, 0);
  const totalPnl = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const openPositionsCount = positions.length;
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-900 text-white">
      <header className="w-full max-w-7xl flex justify-between items-center py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Dexly</h1>
          <nav className="ml-8">
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Trade</a>
              </li>
              <li>
                <a href="/portfolio" className="text-white border-b-2 border-blue-500 pb-1">Portfolio</a>
              </li>
            </ul>
          </nav>
        </div>
        <WalletMultiButton />
      </header>

      <div className="w-full max-w-7xl mt-8">
        {!publicKey ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-6">Connect your Solana wallet to view your portfolio</p>
            <div className="flex justify-center">
              <WalletMultiButton />
            </div>
          </div>
        ) : (
          <>
            {/* Portfolio Summary */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Collateral</p>
                  <p className="text-2xl font-bold">{totalCollateral.toFixed(4)} SOL</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total PnL</p>
                  <p className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(4)} SOL
                  </p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Open Positions</p>
                  <p className="text-2xl font-bold">{openPositionsCount}</p>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <div className="flex">
                <button
                  className={`py-2 px-4 text-sm font-medium ${
                    activeTab === 'positions'
                      ? 'border-b-2 border-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('positions')}
                >
                  Open Positions
                </button>
                <button
                  className={`py-2 px-4 text-sm font-medium ${
                    activeTab === 'history'
                      ? 'border-b-2 border-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  Trade History
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'positions' ? (
              <PositionsList />
            ) : (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Trade History</h2>
                
                {/* This would be populated with real trade history in a full implementation */}
                <div className="text-center py-8 text-gray-400">
                  Trade history will be available soon
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
} 