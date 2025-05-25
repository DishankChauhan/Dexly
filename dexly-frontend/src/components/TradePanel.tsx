'use client';

import { useState, useEffect } from 'react';
import { Market, TradeDirection, OrderParams, TradeSimulation } from '@/types';
import { formatPrice, formatCurrency, validateTradeInputs } from '@/lib/utils';
import { apiService } from '@/lib/api';

interface TradePanelProps {
  market: Market;
}

export function TradePanel({ market }: TradePanelProps) {
  const [direction, setDirection] = useState<TradeDirection>(TradeDirection.Long);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [size, setSize] = useState('');
  const [leverage, setLeverage] = useState(1);
  const [collateral, setCollateral] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [simulation, setSimulation] = useState<TradeSimulation | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate trade when inputs change
  useEffect(() => {
    const simulateTrade = async () => {
      if (!size || !collateral || !market) return;

      const validation = validateTradeInputs(size, leverage, collateral, market.maxLeverage);
      if (!validation.isValid) return;

      setIsSimulating(true);
      try {
        const params: OrderParams = {
          marketId: market.id,
          direction,
          size,
          collateral,
          leverage,
          orderType,
          ...(orderType === 'LIMIT' && { price: limitPrice })
        };

        const response = await apiService.simulateTrade(params);
        if (response.success && response.data) {
          setSimulation(response.data);
        }
      } catch (error) {
        console.error('Trade simulation failed:', error);
      } finally {
        setIsSimulating(false);
      }
    };

    const timeoutId = setTimeout(simulateTrade, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [size, collateral, leverage, direction, orderType, limitPrice, market]);

  const handleSubmit = async () => {
    if (!size || !collateral) return;

    const validation = validateTradeInputs(size, leverage, collateral, market.maxLeverage);
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }

    setIsSubmitting(true);
    try {
      const params: OrderParams = {
        marketId: market.id,
        direction,
        size,
        collateral,
        leverage,
        orderType,
        ...(orderType === 'LIMIT' && { price: limitPrice })
      };

      const response = await apiService.openPosition(params);
      if (response.success) {
        // Reset form
        setSize('');
        setCollateral('');
        setLimitPrice('');
        setSimulation(null);
        alert('Position opened successfully!');
      }
    } catch (error) {
      console.error('Failed to open position:', error);
      alert('Failed to open position');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLong = direction === TradeDirection.Long;

  return (
    <div className="bg-gray-800 p-4 space-y-4">
      <h3 className="text-lg font-semibold">Trade {market.assetSymbol}-PERP</h3>

      {/* Direction Selector */}
      <div className="flex space-x-2">
        <button
          onClick={() => setDirection(TradeDirection.Long)}
          className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
            isLong 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Long
        </button>
        <button
          onClick={() => setDirection(TradeDirection.Short)}
          className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
            !isLong 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Short
        </button>
      </div>

      {/* Order Type */}
      <div className="flex space-x-2">
        <button
          onClick={() => setOrderType('MARKET')}
          className={`flex-1 py-1 px-3 rounded text-sm transition-colors ${
            orderType === 'MARKET' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setOrderType('LIMIT')}
          className={`flex-1 py-1 px-3 rounded text-sm transition-colors ${
            orderType === 'LIMIT' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Limit
        </button>
      </div>

      {/* Limit Price (if limit order) */}
      {orderType === 'LIMIT' && (
        <div>
          <label className="block text-sm text-gray-400 mb-1">Limit Price</label>
          <input
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            placeholder="0.00"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* Size */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Size ({market.assetSymbol})</label>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="0.00"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Collateral */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Collateral (USDC)</label>
        <input
          type="number"
          value={collateral}
          onChange={(e) => setCollateral(e.target.value)}
          placeholder="0.00"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Leverage Slider */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Leverage: {leverage}x
        </label>
        <input
          type="range"
          min="1"
          max={market.maxLeverage}
          value={leverage}
          onChange={(e) => setLeverage(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1x</span>
          <span>{market.maxLeverage}x</span>
        </div>
      </div>

      {/* Trade Simulation */}
      {simulation && (
        <div className="bg-gray-700 rounded p-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Entry Price:</span>
            <span>{formatPrice(parseFloat(simulation.entryPrice), '$')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Liquidation Price:</span>
            <span className="text-red-400">{formatPrice(parseFloat(simulation.liquidationPrice), '$')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Fee:</span>
            <span>{formatCurrency(parseFloat(simulation.fee))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Slippage:</span>
            <span>{(simulation.slippage * 100).toFixed(3)}%</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!size || !collateral || isSubmitting || isSimulating}
        className={`w-full py-3 rounded font-medium transition-colors ${
          isLong
            ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-800'
            : 'bg-red-600 hover:bg-red-700 disabled:bg-red-800'
        } disabled:cursor-not-allowed`}
      >
        {isSubmitting 
          ? 'Opening Position...' 
          : `${isLong ? 'Long' : 'Short'} ${market.assetSymbol}`
        }
      </button>
    </div>
  );
}