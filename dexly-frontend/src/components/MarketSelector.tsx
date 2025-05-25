'use client';

import { useState } from 'react';
import { Market } from '@/types';
import { formatPrice, formatPercentage, getPnLColor } from '@/lib/utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface MarketSelectorProps {
  markets: Market[];
  selectedMarket: Market | null;
  onMarketSelect: (market: Market) => void;
}

export function MarketSelector({ markets, selectedMarket, onMarketSelect }: MarketSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!selectedMarket) {
    return (
      <div className="text-gray-400">
        No markets available
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">{selectedMarket.assetSymbol}-PERP</span>
          <div className="flex flex-col text-xs">
            <span className="text-white">
              {selectedMarket.markPrice ? formatPrice(selectedMarket.markPrice, '$') : '--'}
            </span>
            {selectedMarket.priceChange24h !== undefined && (
              <span className={getPnLColor(selectedMarket.priceChange24h)}>
                {formatPercentage(selectedMarket.priceChange24h / 100)}
              </span>
            )}
          </div>
        </div>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs text-gray-400 px-3 py-2 border-b border-gray-700">
              Select Market
            </div>
            {markets.map((market) => (
              <button
                key={market.id}
                onClick={() => {
                  onMarketSelect(market);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-700 transition-colors ${
                  selectedMarket.id === market.id ? 'bg-gray-700' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{market.assetSymbol}-PERP</span>
                  <div className="text-xs text-gray-400">
                    {market.maxLeverage}x
                  </div>
                </div>
                <div className="flex flex-col items-end text-xs">
                  <span className="text-white">
                    {market.markPrice ? formatPrice(market.markPrice, '$') : '--'}
                  </span>
                  {market.priceChange24h !== undefined && (
                    <span className={getPnLColor(market.priceChange24h)}>
                      {formatPercentage(market.priceChange24h / 100)}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 