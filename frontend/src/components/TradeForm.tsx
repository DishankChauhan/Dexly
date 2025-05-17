'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { usePriceData } from '@/hooks/usePriceData';
import { usePositions } from '@/hooks/usePositions';
import { solanaClient } from '@/services/solana';
import Link from 'next/link';

interface TradeFormProps {
  currentPrice?: number; // Made optional since we'll use the hook
}

const TradeForm: React.FC<TradeFormProps> = ({ currentPrice: propCurrentPrice }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { priceData } = usePriceData();
  const { openPosition, error: positionError } = usePositions();
  
  const [amount, setAmount] = useState<number>(0.1);
  const [leverage, setLeverage] = useState<number>(2);
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [liquidationPrice, setLiquidationPrice] = useState<number>(0);
  const [collateralValue, setCollateralValue] = useState<number>(0);
  const [positionSize, setPositionSize] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  // Use the price from props or from the hook
  const currentPrice = propCurrentPrice || (priceData?.price || 100);

  // Get wallet balance
  useEffect(() => {
    const getBalance = async () => {
      if (publicKey) {
        try {
          const balance = await solanaClient.getBalance(publicKey);
          setWalletBalance(balance);
        } catch (error) {
          console.error("Failed to get wallet balance:", error);
        }
      } else {
        setWalletBalance(null);
      }
    };

    getBalance();
    // Poll for balance every 10 seconds
    const intervalId = setInterval(getBalance, 10000);
    
    return () => clearInterval(intervalId);
  }, [publicKey]);

  // Calculate liquidation price, collateral value, and position size whenever inputs change
  useEffect(() => {
    // Simple liquidation price calculation
    const liquidationPct = direction === 'long' ? 1 - (1 / leverage) * 0.9 : 1 + (1 / leverage) * 0.9;
    const liqPrice = currentPrice * liquidationPct;
    setLiquidationPrice(liqPrice);
    
    // Calculate collateral value and position size
    setCollateralValue(amount);
    setPositionSize(amount * leverage);
  }, [amount, leverage, direction, currentPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) {
      setStatusMessage('Please connect your wallet first');
      return;
    }
    
    if (walletBalance !== null && amount > walletBalance) {
      setStatusMessage(`Not enough SOL in wallet. Balance: ${walletBalance.toFixed(4)} SOL`);
      return;
    }
    
    try {
      setIsSubmitting(true);
      setStatusMessage('Opening position...');
      setTxSignature(null);
      
      const result = await openPosition(direction, amount, leverage);
      
      if (result) {
        // If we have a transaction signature, show it
        if (result.tx_signature) {
          setTxSignature(result.tx_signature);
          setStatusMessage(`${direction.toUpperCase()} position opened successfully!`);
        } else {
          setStatusMessage(`${direction.toUpperCase()} position opened successfully!`);
        }
        
        // Update wallet balance
        if (publicKey) {
          const balance = await solanaClient.getBalance(publicKey);
          setWalletBalance(balance);
        }
      } else {
        setStatusMessage('Failed to open position');
      }
    } catch (error) {
      console.error('Error opening position:', error);
      setStatusMessage('Error opening position');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Wallet Balance */}
      {publicKey && (
        <div className="bg-gray-700 p-3 rounded-md">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Wallet Balance:</span>
            <span>{walletBalance !== null ? `${walletBalance.toFixed(4)} SOL` : 'Loading...'}</span>
          </div>
        </div>
      )}
      
      {/* Direction Selector */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={isSubmitting}
          className={`py-2 rounded-md ${
            direction === 'long'
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300'
          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => setDirection('long')}
        >
          Long
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          className={`py-2 rounded-md ${
            direction === 'short'
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-300'
          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          disabled={isSubmitting}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
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
          disabled={isSubmitting}
          onChange={(e) => setLeverage(parseInt(e.target.value) || 1)}
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
        {priceData?.source && (
          <div className="flex justify-between">
            <span className="text-gray-400">Price Source:</span>
            <span className={priceData.source === 'pyth' ? 'text-green-400' : 'text-yellow-400'}>
              {priceData.source === 'pyth' ? 'Pyth Oracle' : 'Simulation'}
            </span>
          </div>
        )}
      </div>

      {/* Transaction Info */}
      {txSignature && (
        <div className="bg-blue-900/30 p-3 rounded-md text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Transaction:</span>
            <Link
              href={solanaClient.getExplorerUrl(txSignature)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              View on Explorer
            </Link>
          </div>
          <div className="mt-1 text-xs text-gray-400 break-all">
            {txSignature}
          </div>
        </div>
      )}

      {/* Status Message */}
      {statusMessage && (
        <div className="text-center py-2 px-3 bg-gray-700 rounded-md">
          {statusMessage}
        </div>
      )}

      {/* Error Message */}
      {positionError && (
        <div className="text-center py-2 px-3 bg-red-900/50 text-red-200 rounded-md">
          {positionError}
        </div>
      )}

      {/* Submit Button */}
      {publicKey ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-md font-medium ${
            direction === 'long'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Processing...' : direction === 'long' ? 'Long' : 'Short'} SOL
        </button>
      ) : (
        <div className="text-center py-4">
          <p className="mb-4">Connect your wallet to start trading</p>
          <WalletMultiButton />
        </div>
      )}
    </form>
  );
};

export default TradeForm; 