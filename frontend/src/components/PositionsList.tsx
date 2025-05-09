'use client';

import { useState, useEffect } from 'react';

interface Position {
  id: string;
  direction: 'long' | 'short';
  size: number;
  leverage: number;
  entryPrice: number;
  liquidationPrice: number;
  pnl: number;
  timestamp: number;
}

interface PositionsListProps {
  walletAddress: string;
}

const PositionsList: React.FC<PositionsListProps> = ({ walletAddress }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch from the backend API
        // For now, we'll use mock data
        const mockPositions: Position[] = [
          {
            id: '1',
            direction: 'long',
            size: 0.5,
            leverage: 3,
            entryPrice: 95,
            liquidationPrice: 85,
            pnl: 2.5,
            timestamp: Date.now() - 3600000,
          },
          {
            id: '2',
            direction: 'short',
            size: 0.2,
            leverage: 5,
            entryPrice: 102,
            liquidationPrice: 110,
            pnl: -0.8,
            timestamp: Date.now() - 7200000,
          },
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setPositions(mockPositions);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching positions:', error);
        setIsLoading(false);
      }
    };

    if (walletAddress) {
      fetchPositions();
    }
  }, [walletAddress]);

  const handleClosePosition = (id: string) => {
    // In a real app, this would call the Solana program to close the position
    console.log('Closing position:', id);
    
    // Mock closing by removing from the list
    setPositions(positions.filter(p => p.id !== id));
    
    // Mock success message
    alert(`Position ${id} closed successfully`);
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading positions...</div>;
  }

  if (positions.length === 0) {
    return <div className="text-center py-8 text-gray-400">No open positions</div>;
  }

  return (
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
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    position.direction === 'long'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {position.direction.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {position.size} SOL
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {position.leverage}x
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                ${position.entryPrice}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                ${position.liquidationPrice}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={
                    position.pnl > 0 ? 'text-green-400' : 'text-red-400'
                  }
                >
                  ${position.pnl.toFixed(2)}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <button
                  onClick={() => handleClosePosition(position.id)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Close
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsList; 