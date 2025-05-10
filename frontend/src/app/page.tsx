'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import TradingChart from '../components/TradingChart';
import TradeForm from '../components/TradeForm';
import PositionsList from '../components/PositionsList';
import { usePriceData } from '@/hooks/usePriceData';

export default function Home() {
  const { publicKey } = useWallet();
  const { priceData, isLoading: isPriceLoading } = usePriceData();
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-900 text-white">
      <header className="w-full max-w-7xl flex justify-between items-center py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Dexly</h1>
          {priceData && (
            <div className="ml-6 bg-gray-800 px-3 py-1 rounded-md flex items-center">
              <span className="text-gray-400 mr-2">SOL:</span>
              <span className="font-medium">${priceData.price.toFixed(2)}</span>
            </div>
          )}
        </div>
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
            <p className="text-2xl font-bold">
              {isPriceLoading
                ? 'Loading...'
                : `$${priceData?.price.toFixed(2) || '0.00'}`}
            </p>
          </div>
          
          <TradeForm />
        </div>
      </div>

      {/* Positions Section */}
      <div className="w-full max-w-7xl mt-6">
        <PositionsList />
      </div>
    </main>
  );
} 