'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import TradingChart from '../components/TradingChart';
import TradeForm from '../components/TradeForm';
import PositionsList from '../components/PositionsList';

export default function Home() {
  const { publicKey } = useWallet();
  const [currentPrice, setCurrentPrice] = useState(100); // Mock price

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-900 text-white">
      <header className="w-full max-w-7xl flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Dexly</h1>
        <WalletMultiButton />
      </header>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Chart Section - Takes 2/3 of the screen on large displays */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4 h-[500px]">
          <TradingChart />
        </div>

        {/* Trade Form Section */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Trade</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-400">Current SOL Price</p>
            <p className="text-2xl font-bold">${currentPrice.toFixed(2)}</p>
          </div>
          
          {publicKey ? (
            <TradeForm currentPrice={currentPrice} />
          ) : (
            <div className="text-center py-8">
              <p className="mb-4">Connect your wallet to start trading</p>
              <WalletMultiButton />
            </div>
          )}
        </div>
      </div>

      {/* Positions Section */}
      <div className="w-full max-w-7xl mt-8 bg-gray-800 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Your Positions</h2>
        {publicKey ? (
          <PositionsList walletAddress={publicKey.toString()} />
        ) : (
          <p className="text-center py-4 text-gray-400">Connect your wallet to view positions</p>
        )}
      </div>
    </main>
  );
} 