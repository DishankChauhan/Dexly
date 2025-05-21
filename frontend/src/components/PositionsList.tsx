'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { usePositions } from '@/hooks/usePositions';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { solanaClient } from '@/services/solana';
import Link from 'next/link';

interface PositionsListProps {
  marketId?: string;
}

const PositionsList: React.FC<PositionsListProps> = ({ marketId }) => {
  const { publicKey } = useWallet();
  const { positions, closePosition, isLoading, error, stats } = usePositions(marketId);
  const [closingPositionId, setClosingPositionId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  
  const openPositions = positions.filter(pos => pos.status === 'open');
  
  const handleClosePosition = async (positionId: string) => {
    try {
      setClosingPositionId(positionId);
      setStatusMessage('Closing position...');
      setTxSignature(null);
      
      const result = await closePosition(positionId);
      
      if (result.success) {
        setStatusMessage('Position closed successfully!');
        if (result.signature) {
          setTxSignature(result.signature);
        }
      } else {
        setStatusMessage('Failed to close position');
      }
    } catch (error) {
      console.error('Error closing position:', error);
      setStatusMessage('Error closing position');
    } finally {
      setClosingPositionId(null);
    }
  };
  
  if (!publicKey) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-6">Connect your wallet to view your positions</p>
        <div className="flex justify-center">
          <WalletMultiButton />
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        Your Positions {marketId ? `(${marketId})` : ''}
      </h2>
      
      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading positions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-400">
          <p>{error}</p>
        </div>
      ) : openPositions.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No open positions found</p>
          <Link href="/trade" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
            Open a position
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="py-3 px-4">Market</th>
                  <th className="py-3 px-4">Side</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Leverage</th>
                  <th className="py-3 px-4">Entry Price</th>
                  <th className="py-3 px-4">Current Price</th>
                  <th className="py-3 px-4">PnL</th>
                  <th className="py-3 px-4">Funding</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {openPositions.map(position => (
                  <tr key={position.id} className="border-b border-gray-700">
                    <td className="py-3 px-4">{position.market_id}</td>
                    <td className="py-3 px-4">
                      <span className={position.direction === 'long' ? 'text-green-400' : 'text-red-400'}>
                        {position.direction.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">{position.size.toFixed(3)} SOL</td>
                    <td className="py-3 px-4">{position.leverage}x</td>
                    <td className="py-3 px-4">${position.entry_price.toFixed(2)}</td>
                    <td className="py-3 px-4">${position.current_price.toFixed(2)}</td>
                    <td className={`py-3 px-4 ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(4)} SOL
                      <span className="text-xs ml-1">
                        ({position.pnl_percentage >= 0 ? '+' : ''}{position.pnl_percentage.toFixed(2)}%)
                      </span>
                    </td>
                    <td className={`py-3 px-4 ${position.unrealized_funding >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.unrealized_funding >= 0 ? '+' : ''}{position.unrealized_funding.toFixed(4)} SOL
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleClosePosition(position.id)}
                        disabled={closingPositionId === position.id}
                        className={`bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm ${
                          closingPositionId === position.id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {closingPositionId === position.id ? 'Closing...' : 'Close'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Transaction Status */}
          {statusMessage && (
            <div className="mt-4 p-3 bg-gray-700 rounded-md">
              <p>{statusMessage}</p>
              
              {txSignature && (
                <div className="mt-2 text-sm">
                  <Link
                    href={solanaClient.getExplorerUrl(txSignature)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    View on Explorer
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PositionsList; 