'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { usePositions } from '@/hooks/usePositions';
import { usePriceData } from '@/hooks/usePriceData';
import { solanaClient } from '@/services/solana';
import Link from 'next/link';

const PositionsList = () => {
  const { publicKey } = useWallet();
  const { positions, isLoading, error, closePosition } = usePositions();
  const { priceData } = usePriceData();
  const [closingIds, setClosingIds] = useState<Set<string>>(new Set());
  const [closeSignature, setCloseSignature] = useState<string | null>(null);

  const handleClosePosition = async (positionId: string) => {
    setClosingIds((prev) => new Set(prev).add(positionId));
    try {
      const result = await closePosition(positionId);
      
      if (result.success && result.signature) {
        setCloseSignature(result.signature);
      }
    } finally {
      setClosingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(positionId);
        return newSet;
      });
    }
  };

  if (!publicKey) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Positions</h2>
        <div className="text-center py-8 text-gray-400">
          Connect your wallet to view positions
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Positions</h2>
      
      {isLoading && (
        <div className="text-center py-4">
          <p className="text-gray-400">Loading positions...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-900/20 text-red-200 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {/* Display close transaction signature if present */}
      {closeSignature && (
        <div className="bg-blue-900/30 p-3 rounded-md text-sm mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Close Transaction:</span>
            <Link
              href={solanaClient.getExplorerUrl(closeSignature)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              View on Explorer
            </Link>
          </div>
          <div className="mt-1 text-xs text-gray-400 break-all">
            {closeSignature}
          </div>
        </div>
      )}
      
      {!isLoading && positions.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No open positions yet
        </div>
      )}
      
      {positions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Direction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Leverage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Entry Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Liquidation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">PnL</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {positions.map((position) => (
                <tr key={position.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      position.direction === 'long' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {position.direction.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {position.size.toFixed(4)} SOL
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {position.leverage}x
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    ${position.entry_price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    ${position.liquidation_price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(4)} SOL
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleClosePosition(position.id)}
                        disabled={closingIds.has(position.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded"
                      >
                        {closingIds.has(position.id) ? 'Closing...' : 'Close'}
                      </button>
                      
                      {position.tx_signature && (
                        <Link
                          href={solanaClient.getExplorerUrl(position.tx_signature)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PositionsList; 