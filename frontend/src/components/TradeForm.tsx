'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface TradeFormProps {
  currentPrice: number;
}

const TradeForm: React.FC<TradeFormProps> = ({ currentPrice }) => {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0.1);
  const [leverage, setLeverage] = useState<number>(2);
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [liquidationPrice, setLiquidationPrice] = useState<number>(0);
  const [collateralValue, setCollateralValue] = useState<number>(0);
  const [positionSize, setPositionSize] = useState<number>(0);

  // Calculate liquidation price, collateral value, and position size whenever inputs change
  useEffect(() => {
    // Simple liquidation price calculation (in a real app, this would be more complex)
    const liquidationPct = direction === 'long' ? 1 - (1 / leverage) * 0.9 : 1 + (1 / leverage) * 0.9;
    const liqPrice = currentPrice * liquidationPct;
    setLiquidationPrice(liqPrice);
    
    // Calculate collateral value and position size
    setCollateralValue(amount);
    setPositionSize(amount * leverage);
  }, [amount, leverage, direction, currentPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call the Solana program to open a position
    console.log('Opening position:', {
      wallet: publicKey?.toString(),
      direction,
      amount,
      leverage,
      entryPrice: currentPrice,
      liquidationPrice,
    });
    
    // Mock success message
    alert(`${direction.toUpperCase()} position opened with ${leverage}x leverage`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Direction Selector */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className={`py-2 rounded-md ${
            direction === 'long'
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setDirection('long')}
        >
          Long
        </button>
        <button
          type="button"
          className={`py-2 rounded-md ${
            direction === 'short'
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setDirection('short')}
        >
          Short
        </button>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Collateral Amount (SOL)
        </label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full bg-gray-700 rounded-md py-2 px-3 text-white"
        />
      </div>

      {/* Leverage Slider */}
      <div>
        <div className="flex justify-between mb-1">
          <label className="block text-sm font-medium text-gray-400">
            Leverage: {leverage}x
          </label>
          <span className="text-sm text-gray-400">
            Max 10x
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={leverage}
          onChange={(e) => setLeverage(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Position Info */}
      <div className="bg-gray-700 p-3 rounded-md space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Position Size:</span>
          <span>{positionSize.toFixed(2)} SOL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Entry Price:</span>
          <span>${currentPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Liquidation Price:</span>
          <span className={direction === 'long' ? 'text-red-400' : 'text-green-400'}>
            ${liquidationPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-3 rounded-md font-medium ${
          direction === 'long'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {direction === 'long' ? 'Long' : 'Short'} SOL
      </button>
    </form>
  );
};

export default TradeForm; 