'use client';

import { useState, FormEvent } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useMarkets } from '@/hooks/useMarkets';
import { Market } from '@/types';
import { apiService } from '@/services/api';
import WalletContextProvider from '@/components/WalletContextProvider';
import Link from 'next/link';

// Set of admin wallet addresses
const ADMIN_WALLETS = [
  "TODO_REPLACE_WITH_ACTUAL_ADMIN_WALLET_ADDRESS"
];

export default function AdminPage() {
  const { publicKey } = useWallet();
  const { markets, isLoading: marketsLoading } = useMarkets();
  const [adminKey, setAdminKey] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [fundingRate, setFundingRate] = useState<number>(0.0001); // 0.01% default
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  
  // Check if connected wallet is admin
  const isAdmin = publicKey ? ADMIN_WALLETS.includes(publicKey.toString()) : false;
  
  const handlePauseMarket = async (marketId: string) => {
    if (!adminKey) {
      setMessageType('error');
      setStatusMessage('Admin key is required');
      return;
    }
    
    try {
      setStatusMessage('Pausing market...');
      setMessageType('info');
      const result = await apiService.pauseMarket(marketId, adminKey);
      
      if (result.success) {
        setStatusMessage(`Market ${marketId} paused successfully`);
        setMessageType('success');
      } else {
        setStatusMessage('Failed to pause market');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error pausing market:', error);
      setStatusMessage('Error pausing market');
      setMessageType('error');
    }
  };
  
  const handleResumeMarket = async (marketId: string) => {
    if (!adminKey) {
      setMessageType('error');
      setStatusMessage('Admin key is required');
      return;
    }
    
    try {
      setStatusMessage('Resuming market...');
      setMessageType('info');
      const result = await apiService.resumeMarket(marketId, adminKey);
      
      if (result.success) {
        setStatusMessage(`Market ${marketId} resumed successfully`);
        setMessageType('success');
      } else {
        setStatusMessage('Failed to resume market');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error resuming market:', error);
      setStatusMessage('Error resuming market');
      setMessageType('error');
    }
  };
  
  const handleUpdateFundingRate = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedMarket || !adminKey) {
      setMessageType('error');
      setStatusMessage('Market and admin key are required');
      return;
    }
    
    try {
      setStatusMessage('Updating funding rate...');
      setMessageType('info');
      const result = await apiService.updateFundingRate(selectedMarket, fundingRate, adminKey);
      
      if (result.success) {
        setStatusMessage(`Funding rate updated to ${(fundingRate * 100).toFixed(4)}%`);
        setMessageType('success');
      } else {
        setStatusMessage('Failed to update funding rate');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error updating funding rate:', error);
      setStatusMessage('Error updating funding rate');
      setMessageType('error');
    }
  };
  
  return (
    <WalletContextProvider>
      <main className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 py-4 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mr-8">
                  Dexly
                </Link>
                <nav className="flex space-x-6">
                  <Link href="/trade" className="hover:text-gray-300">
                    Trade
                  </Link>
                  <Link href="/portfolio" className="hover:text-gray-300">
                    Portfolio
                  </Link>
                  <Link href="/admin" className="text-blue-400 border-b-2 border-blue-400 pb-1">
                    Admin
                  </Link>
                </nav>
              </div>
              <WalletMultiButton />
            </div>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          {!publicKey ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-lg mb-4">Please connect your wallet to access admin functions</p>
              <div className="flex justify-center">
                <WalletMultiButton />
              </div>
            </div>
          ) : !isAdmin ? (
            <div className="bg-red-900/30 rounded-lg p-8 text-center">
              <p className="text-lg">
                Access denied. This wallet does not have admin privileges.
              </p>
              <p className="mt-2 text-gray-400">
                Connected wallet: {publicKey.toString()}
              </p>
            </div>
          ) : (
            <>
              {/* Admin Key Input */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Authentication</h2>
                <div className="flex items-center">
                  <input
                    type="password"
                    placeholder="Enter admin key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="flex-1 bg-gray-700 py-2 px-3 rounded-md text-white"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Admin key is required for all operations
                </p>
              </div>
              
              {/* Markets Management */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Markets Management</h2>
                
                {marketsLoading ? (
                  <p>Loading markets...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-700">
                          <th className="py-2 px-4">Market</th>
                          <th className="py-2 px-4">Price</th>
                          <th className="py-2 px-4">Funding Rate</th>
                          <th className="py-2 px-4">Status</th>
                          <th className="py-2 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {markets.map((market: Market) => (
                          <tr key={market.id} className="border-b border-gray-700">
                            <td className="py-3 px-4">{market.asset_symbol}</td>
                            <td className="py-3 px-4">${market.mark_price.toFixed(2)}</td>
                            <td className="py-3 px-4">{(market.funding_rate * 100).toFixed(4)}%</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                market.is_active ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                              }`}>
                                {market.is_active ? 'Active' : 'Paused'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {market.is_active ? (
                                <button
                                  onClick={() => handlePauseMarket(market.id)}
                                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm"
                                >
                                  Pause
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleResumeMarket(market.id)}
                                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm"
                                >
                                  Resume
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              {/* Funding Rate Update */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Update Funding Rate</h2>
                
                <form onSubmit={handleUpdateFundingRate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Select Market
                    </label>
                    <select
                      value={selectedMarket}
                      onChange={(e) => setSelectedMarket(e.target.value)}
                      className="w-full bg-gray-700 rounded-md py-2 px-3 text-white"
                      required
                    >
                      <option value="">Select a market</option>
                      {markets.map((market: Market) => (
                        <option key={market.id} value={market.id}>
                          {market.asset_symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Funding Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={fundingRate * 100}
                      onChange={(e) => setFundingRate(parseFloat(e.target.value) / 100)}
                      className="w-full bg-gray-700 rounded-md py-2 px-3 text-white"
                      required
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      Enter value as percentage (e.g., 0.01 for 0.01% per hour)
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                  >
                    Update Funding Rate
                  </button>
                </form>
              </div>
            </>
          )}
          
          {/* Status Messages */}
          {statusMessage && (
            <div className={`mt-6 p-4 rounded-md ${
              messageType === 'success' ? 'bg-green-900/30 text-green-400' :
              messageType === 'error' ? 'bg-red-900/30 text-red-400' :
              'bg-blue-900/30 text-blue-400'
            }`}>
              {statusMessage}
            </div>
          )}
        </div>
      </main>
    </WalletContextProvider>
  );
} 