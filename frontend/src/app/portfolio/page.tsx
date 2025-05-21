'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import PositionsList from '@/components/PositionsList';
import { usePositions } from '@/hooks/usePositions';
import { useUserStats } from '@/hooks/useUserStats';
import WalletContextProvider from '@/components/WalletContextProvider';
import Link from 'next/link';

export default function PortfolioPage() {
  const { publicKey } = useWallet();
  const { positions, stats: positionStats } = usePositions();
  const { stats, transactions, isLoading } = useUserStats();
  const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
  
  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Format transaction type for display
  const formatTransactionType = (type: string) => {
    switch (type) {
      case 'deposit': return 'Deposit';
      case 'withdrawal': return 'Withdrawal';
      case 'trade': return 'Trade';
      case 'funding': return 'Funding Payment';
      case 'liquidation': return 'Liquidation';
      default: return type;
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
                  <Link href="/portfolio" className="text-white border-b-2 border-blue-500 pb-1">
                    Portfolio
                  </Link>
                  <Link href="/admin" className="hover:text-gray-300">
                    Admin
                  </Link>
                </nav>
              </div>
              <WalletMultiButton />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
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
                    <p className="text-2xl font-bold">{positionStats.totalCollateral.toFixed(4)} SOL</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Total PnL</p>
                    <p className={`text-2xl font-bold ${positionStats.totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {positionStats.totalPnl >= 0 ? '+' : ''}{positionStats.totalPnl.toFixed(4)} SOL
                    </p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Funding Payments</p>
                    <p className={`text-2xl font-bold ${positionStats.totalFundingPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {positionStats.totalFundingPnl >= 0 ? '+' : ''}{positionStats.totalFundingPnl.toFixed(4)} SOL
                    </p>
                  </div>
                </div>
                
                {stats && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">Total Volume</p>
                      <p className="text-xl font-bold">{stats.total_volume.toFixed(2)} SOL</p>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">Total Fees Paid</p>
                      <p className="text-xl font-bold">{stats.total_fees_paid.toFixed(4)} SOL</p>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">Win Rate</p>
                      <p className="text-xl font-bold">{stats.win_rate ? `${(stats.win_rate * 100).toFixed(1)}%` : '—'}</p>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">Total Trades</p>
                      <p className="text-xl font-bold">{stats.total_trades}</p>
                    </div>
                  </div>
                )}
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
                    Transaction History
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              {activeTab === 'positions' ? (
                <PositionsList />
              ) : (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                  
                  {isLoading ? (
                    <div className="text-center py-8">
                      <p>Loading transaction history...</p>
                    </div>
                  ) : transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No transactions found
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b border-gray-700">
                            <th className="py-3 px-4">Time</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map(tx => (
                            <tr key={tx.id} className="border-b border-gray-700">
                              <td className="py-3 px-4">{formatDate(tx.timestamp)}</td>
                              <td className="py-3 px-4">{formatTransactionType(tx.type)}</td>
                              <td className={`py-3 px-4 ${
                                tx.type === 'deposit' || tx.type === 'trade' && tx.amount > 0 
                                  ? 'text-green-400' 
                                  : 'text-red-400'
                              }`}>
                                {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(4)} SOL
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  tx.status === 'success' 
                                    ? 'bg-green-900/50 text-green-400' 
                                    : tx.status === 'pending'
                                    ? 'bg-yellow-900/50 text-yellow-400'
                                    : 'bg-red-900/50 text-red-400'
                                }`}>
                                  {tx.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                {tx.tx_signature && (
                                  <Link 
                                    href={`https://explorer.solana.com/tx/${tx.tx_signature}?cluster=devnet`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline"
                                  >
                                    View Transaction
                                  </Link>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </WalletContextProvider>
  );
} 