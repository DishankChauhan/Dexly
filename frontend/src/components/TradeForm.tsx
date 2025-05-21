'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { usePriceData } from '@/hooks/usePriceData';
import { usePositions } from '@/hooks/usePositions';
import { useMarkets } from '@/hooks/useMarkets';
import { solanaClient } from '@/services/solana';
import { PriceImpactData } from '@/types';
import Link from 'next/link';

interface TradeFormProps {
  marketId: string;
}

const TradeForm: React.FC<TradeFormProps> = ({ marketId }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { priceData, fundingRate } = usePriceData(marketId);
  const { openPosition, error: positionError } = usePositions(marketId);
  const { calculatePriceImpact, selectedMarket, getAMMData } = useMarkets();
  
  const [amount, setAmount] = useState<number>(0.1);
  const [leverage, setLeverage] = useState<number>(2);
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [liquidationPrice, setLiquidationPrice] = useState<number>(0);
  const [collateralValue, setCollateralValue] = useState<number>(0);
  const [positionSize, setPositionSize] = useState<number>(0);
  const [priceImpact, setPriceImpact] = useState<PriceImpactData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  // Current price from the price data hook
  const currentPrice = priceData?.price || 0;
  
  // Fetch AMM data when market changes
  useEffect(() => {
    if (marketId) {
      getAMMData(marketId);
    }
  }, [marketId, getAMMData]);

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

  // Calculate liquidation price, collateral value, position size, and price impact whenever inputs change
  useEffect(() => {
    if (amount <= 0 || !currentPrice || !selectedMarket) return;

    // Calculate position size
    const posSize = amount * leverage;
    setPositionSize(posSize);
    setCollateralValue(amount);
    
    // Calculate price impact
    const fetchPriceImpact = async () => {
      if (marketId && posSize > 0) {
        const impact = await calculatePriceImpact(marketId, posSize, direction);
        setPriceImpact(impact);
      }
    };
    
    // Calculate liquidation price based on direction and leverage
    const maxLeverage = selectedMarket?.max_leverage || 10;
    const marginRatioBps = selectedMarket?.min_margin_ratio_bps || 500;
    const marginRatio = marginRatioBps / 10000; // Convert BPS to decimal
    
    // Liquidation formula: Entry Price * (1 ± (1 - margin ratio) / leverage)
    // For longs: Entry Price * (1 - (1 - margin ratio) / leverage)
    // For shorts: Entry Price * (1 + (1 - margin ratio) / leverage)
    
    const effectivePrice = priceImpact?.execution_price || currentPrice;
    const liquidationMultiplier = direction === 'long' 
      ? 1 - ((1 - marginRatio) / leverage)
      : 1 + ((1 - marginRatio) / leverage);
    
    setLiquidationPrice(effectivePrice * liquidationMultiplier);
    
    // Fetch price impact
    fetchPriceImpact();

  }, [amount, leverage, direction, currentPrice, marketId, calculatePriceImpact, selectedMarket, priceImpact?.execution_price]);

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
      
      const result = await openPosition(direction, amount, leverage, marketId);
      
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
      {!publicKey ? (
        <div className="flex justify-center py-4">
          <WalletMultiButton />
        </div>
      ) : (
        <>
          {/* Wallet Balance */}
          <div className="bg-gray-700 p-3 rounded-md">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Wallet Balance:</span>
              <span>{walletBalance !== null ? `${walletBalance.toFixed(4)} SOL` : 'Loading...'}</span>
            </div>
          </div>
          
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
                Max {selectedMarket?.max_leverage || 10}x
              </span>
            </div>
            <input
              type="range"
              min="1"
              max={selectedMarket?.max_leverage || 10}
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
              <span>
                ${currentPrice.toFixed(2)}
                {priceImpact && priceImpact.price_impact_percent > 0 && (
                  <span className="text-yellow-400 ml-1">
                    → ${priceImpact.execution_price.toFixed(2)}
                  </span>
                )}
              </span>
            </div>
            {priceImpact && priceImpact.price_impact_percent > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Price Impact:</span>
                <span className="text-yellow-400">
                  {priceImpact.price_impact_percent.toFixed(2)}%
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Liquidation Price:</span>
              <span className={direction === 'long' ? 'text-red-400' : 'text-green-400'}>
                ${liquidationPrice.toFixed(2)}
              </span>
            </div>
            {fundingRate !== null && (
              <div className="flex justify-between">
                <span className="text-gray-400">Funding Rate:</span>
                <span className={fundingRate >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {fundingRate >= 0 ? '+' : ''}{(fundingRate * 100).toFixed(4)}% / hr
                </span>
              </div>
            )}
            {selectedMarket && (
              <div className="flex justify-between">
                <span className="text-gray-400">Fee:</span>
                <span>{selectedMarket.fee_bps / 100}%</span>
              </div>
            )}
            {priceData?.source && (
              <div className="flex justify-between">
                <span className="text-gray-400">Price Source:</span>
                <span className={priceData.source === 'pyth' ? 'text-green-400' : 'text-yellow-400'}>
                  {priceData.source === 'pyth' ? 'Pyth Oracle' : 'Simulation'}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || amount <= 0}
            className={`w-full py-3 rounded-md font-medium ${
              direction === 'long'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            } ${
              (isSubmitting || amount <= 0) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting
              ? 'Processing...'
              : `${direction === 'long' ? 'Long' : 'Short'} ${positionSize.toFixed(2)} SOL`}
          </button>

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
        </>
      )}
    </form>
  );
};

export default TradeForm; 