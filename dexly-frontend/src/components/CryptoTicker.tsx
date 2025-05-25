'use client';

import { useState, useEffect } from 'react';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export function CryptoTicker() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,cardano,polygon,binancecoin,ripple,dogecoin,avalanche-2,chainlink,polkadot,uniswap,litecoin,bitcoin-cash,stellar&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24h'
        );
        const data = await response.json();
        
        // Duplicate the data to create seamless loop
        setCryptoData([...data, ...data]);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        // Fallback data
        setCryptoData([
          { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 67420, price_change_percentage_24h: 2.34, image: '' },
          { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3145, price_change_percentage_24h: 1.87, image: '' },
          { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 156, price_change_percentage_24h: -0.92, image: '' },
          { id: 'binancecoin', symbol: 'BNB', name: 'BNB', current_price: 665.5, price_change_percentage_24h: -1.62, image: '' },
          { id: 'ripple', symbol: 'XRP', name: 'XRP', current_price: 2.3, price_change_percentage_24h: -2.07, image: '' },
          { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', current_price: 0.35, price_change_percentage_24h: 3.45, image: '' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // Update every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="py-4 bg-slate-900/80 backdrop-blur-sm border-y border-white/10">
        <div className="animate-pulse flex space-x-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 min-w-0">
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              <div className="w-20 h-4 bg-gray-600 rounded"></div>
              <div className="w-16 h-4 bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 bg-slate-900/80 backdrop-blur-sm border-y border-white/10 overflow-hidden">
      <div className="crypto-ticker">
        <div className="crypto-ticker-content">
          {cryptoData.map((crypto, index) => (
            <div key={`${crypto.id}-${index}`} className="crypto-item">
              <div className="flex items-center space-x-3">
                {crypto.image && (
                  <img 
                    src={crypto.image} 
                    alt={crypto.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-white font-medium text-sm">
                  {crypto.symbol.toUpperCase()}
                </span>
                <span className="text-white text-sm">
                  ${crypto.current_price.toLocaleString(undefined, { 
                    minimumFractionDigits: crypto.current_price < 1 ? 4 : 2,
                    maximumFractionDigits: crypto.current_price < 1 ? 4 : 2
                  })}
                </span>
                <span className={`text-sm font-medium ${
                  crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                  {crypto.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 