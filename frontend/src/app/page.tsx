'use client';

import Link from 'next/link';
import { useMarkets } from '@/hooks/useMarkets';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import WalletContextProvider from '@/components/WalletContextProvider';

export default function LandingPage() {
  const { markets, isLoading } = useMarkets();
  
  return (
    <WalletContextProvider>
      <main className="min-h-screen bg-[#0A0C1B] text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px] -top-20 -right-20"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] top-1/3 -left-20"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[80px] bottom-1/4 right-1/4"></div>
        </div>

        {/* Hero Section */}
        <header className="relative z-10 bg-[#0F1429]/80 backdrop-blur-md py-4 border-b border-purple-500/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 mr-8">
                  Dexly
                </Link>
                <nav className="hidden md:flex space-x-6">
                  <Link href="/trade" className="hover:text-purple-400 transition-colors">
                    Trade
                  </Link>
                  <Link href="/portfolio" className="hover:text-purple-400 transition-colors">
                    Portfolio
                  </Link>
                  <Link href="/admin" className="hover:text-purple-400 transition-colors">
                    Admin
                  </Link>
                </nav>
              </div>
              <WalletMultiButton />
            </div>
          </div>
        </header>

        <section className="relative z-10 py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
              The Future of Wealth Creation
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Trade perpetual futures with up to 100x leverage on Solana. 
              Low fees, high performance, and fully on-chain settlement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/trade" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-10 rounded-lg font-medium text-lg relative group overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover:opacity-90 transition-opacity"></span>
                <span className="absolute inset-0 w-full h-full border border-white/20 rounded-lg group-hover:border-white/40 transition-colors"></span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></span>
                <span className="relative">Trade Now</span>
              </Link>
              <a 
                href="https://github.com/solana-labs/anchor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1A1F35] text-white py-4 px-10 rounded-lg font-medium text-lg border border-purple-500/30 hover:border-purple-500/60 transition-colors relative group"
              >
                <span className="absolute inset-0 rounded-lg bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative">View Documentation</span>
              </a>
            </div>
          </div>
        </section>

        {/* Markets Section */}
        <section className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Available Markets
            </h2>
            
            {isLoading ? (
              <div className="text-center">Loading markets...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {markets && markets.map(market => (
                  <div 
                    key={market.id} 
                    className="bg-[#1A1F35]/80 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all relative group shadow-md"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                    <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.1)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex justify-between items-center mb-4 relative">
                      <h3 className="text-xl font-bold text-white">{market.asset_symbol}</h3>
                      <span className={market.is_active ? 'text-green-400' : 'text-red-400'}>
                        {market.is_active ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6 relative">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price:</span>
                        <span className="font-medium text-white">${market.mark_price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Funding Rate:</span>
                        <span className={market.funding_rate >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {market.funding_rate >= 0 ? '+' : ''}{(market.funding_rate * 100).toFixed(4)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Leverage:</span>
                        <span className="text-white">{market.max_leverage}x</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/trade?market=${market.id}`}
                      className="relative block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-center py-3 rounded-md font-medium transition-all shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    >
                      Trade Now
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10 py-16 bg-[#0F1429]/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">$826M</div>
                <p className="text-gray-400">TVL</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">$50B+</div>
                <p className="text-gray-400">Cumulative Volume</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">19,256,573</div>
                <p className="text-gray-400">Total Trades</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Your All-In-One DEX
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1A1F35]/60 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)] relative group hover:border-purple-500/40 transition-all">
                <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.1)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-purple-400">Lightning Fast Speeds</h3>
                <p className="text-gray-300 mb-4">
                  Built on Solana to leverage its 100 milliseconds finality for seamless trade and yield opportunities.
                </p>
              </div>
              
              <div className="bg-[#1A1F35]/60 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)] relative group hover:border-purple-500/40 transition-all">
                <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.1)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-purple-400">Deep Liquidity</h3>
                <p className="text-gray-300 mb-4">
                  JIT liquidity mechanism ensures orders of any size get filled with near-zero slippage at the lowest fees.
                </p>
              </div>
              
              <div className="bg-[#1A1F35]/60 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)] relative group hover:border-purple-500/40 transition-all">
                <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.1)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-purple-400">Higher Leverage</h3>
                <p className="text-gray-300 mb-4">
                  Trade the hottest markets with up to 20x leverage. Go up to 50x leverage when you trade SOL, BTC or ETH.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Level up your trading
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Join thousands of traders on the fastest derivatives exchange built on Solana.
            </p>
            <Link 
              href="/trade" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-10 rounded-lg font-medium text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-shadow relative group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-lg"></span>
              <span className="relative">Launch App</span>
            </Link>
          </div>
        </section>

        {/* Community Section */}
        <section className="relative z-10 py-16 bg-[#0F1429]/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Join the Dexly Community
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                className="bg-[#1A1F35] text-white py-3 px-6 rounded-lg font-medium border border-purple-500/30 hover:border-purple-500/60 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.283a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.283.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                </svg>
                Join our Discord
              </a>
              <a 
                href="#" 
                className="bg-[#1A1F35] text-white py-3 px-6 rounded-lg font-medium border border-purple-500/30 hover:border-purple-500/60 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Follow us on X
              </a>
              <a 
                href="#" 
                className="bg-[#1A1F35] text-white py-3 px-6 rounded-lg font-medium border border-purple-500/30 hover:border-purple-500/60 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Contribute to Dexly
              </a>
              <a 
                href="#" 
                className="bg-[#1A1F35] text-white py-3 px-6 rounded-lg font-medium border border-purple-500/30 hover:border-purple-500/60 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
                Explore Bug Bounties
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-[#0F1429]/80 backdrop-blur-md py-12 border-t border-purple-500/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
                  Dexly
                </Link>
                <p className="text-gray-400 mt-2">Decentralized Perpetual Futures Exchange</p>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Discord
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Documentation
                </a>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Dexly Protocol. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </WalletContextProvider>
  );
} 