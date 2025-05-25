'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { CryptoTicker } from '@/components/CryptoTicker';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const features = [
    {
      title: "Perpetual Futures",
      description: "Trade crypto perpetuals with up to 100x leverage on the most advanced platform",
      icon: "⚡",
      link: "/trade",
      buttonText: "Trade Now"
    },
    {
      title: "Portfolio Analytics",
      description: "Advanced portfolio tracking with real-time PnL, risk metrics, and performance analytics",
      icon: "📊",
      link: "/portfolio",
      buttonText: "View Portfolio"
    },
    {
      title: "Competitive Trading",
      description: "Join tournaments, climb leaderboards, and compete with the best traders globally",
      icon: "🏆",
      link: "/leaderboard",
      buttonText: "Join Competition"
    }
  ];

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background with your image1 */}
        <div className="absolute inset-0">
          <Image
            src="/image/image1.png"
            alt="Dexly Trading Platform"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-purple-900/20 to-slate-900/30"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-2xl animate-pulse-glow animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            The Future of{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Perpetual Trading
            </span>{' '}
            for All
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Trade, leverage and build generational wealth with advanced perpetual futures on Solana
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/trade"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              Trade Now
            </Link>
            <Link 
              href="/portfolio"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-xl text-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Start Earning
            </Link>
          </div>
        </div>
      </section>

      {/* Crypto Ticker */}
      <CryptoTicker />

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-sm">
        <div className="absolute inset-0">
          <Image
            src="/image/image2.png"
            alt="Trading Stats"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                $826M
              </div>
              <div className="text-gray-300 text-lg">TVL</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                $50B+
              </div>
              <div className="text-gray-300 text-lg">Cumulative Volume</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                19,256,573
              </div>
              <div className="text-gray-300 text-lg">Total Trades</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="/image/image3.png"
            alt="Platform Features"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-45"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                All-In-One
              </span>{' '}
              Trading Platform
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 h-full">
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.link}
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    {feature.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900/80 to-purple-900/40">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8">
                The{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Lightning-Fast
                </span>
                <br />
                Perps Platform on Solana
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience the best of centralized exchanges with complete decentralization.
                Built on Solana for maximum speed and minimum costs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: 'Lightning Speed', desc: 'Sub-second execution on Solana blockchain for seamless trading' },
                { title: 'Deep Liquidity', desc: 'Advanced AMM ensures minimal slippage on large orders' },
                { title: 'Risk Management', desc: 'Professional-grade liquidation engine and margin system' },
                { title: 'Cross-Margin', desc: 'Efficient capital utilization across all positions' }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="text-lg font-bold mb-3 text-cyan-400">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Trading Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="/image/image5.png"
            alt="Advanced Trading"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-purple-900/20 to-slate-900/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: 'AI-Powered Insights', desc: 'Advanced machine learning algorithms analyze market trends in real-time', icon: '🤖' },
                  { title: 'Smart Liquidation', desc: 'Intelligent liquidation engine protects your positions from market volatility', icon: '🛡️' },
                  { title: 'Order Management', desc: 'Advanced order types including stop-loss, take-profit, and trailing orders', icon: '⚙️' },
                  { title: 'Real-time Analytics', desc: 'Live market data and portfolio performance tracking with instant updates', icon: '📈' }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-3 text-cyan-400">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Advanced Trading
                </span>
                <br />
                Tools & Analytics
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Harness the power of institutional-grade trading tools designed for both beginners and professionals. 
                Our advanced features give you the edge you need to succeed in volatile markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/trade"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-center"
                >
                  Explore Tools
                </Link>
                <Link
                  href="/analytics"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-center"
                >
                  View Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="/image/image6.png"
            alt="Security and Trust"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/20 to-purple-900/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Secure & Trusted
            </span>
            <br />
            by Thousands
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Your funds are protected by industry-leading security measures and smart contract audits. 
            Trade with confidence knowing your assets are safe.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Multi-Sig Security',
                description: 'Advanced multi-signature wallets protect all protocol funds with institutional-grade security',
                icon: '🔐',
                stat: '100%'
              },
              {
                title: 'Smart Contract Audits',
                description: 'Comprehensive audits by leading security firms ensure code integrity and safety',
                icon: '🔍',
                stat: '3+'
              },
              {
                title: 'Insurance Coverage',
                description: 'Protocol insurance covers user funds against smart contract risks and exploits',
                icon: '🛡️',
                stat: '$10M+'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-6">{item.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/security"
              className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>🔒</span> Security Details
            </Link>
            <Link
              href="/audits"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>📋</span> View Audits
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="/image/image4.png"
            alt="Community"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">
            Join the{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Dexly Community
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>💬</span> Join our Discord
            </button>
            <button className="bg-[#1DA1F2] hover:bg-[#1A91DA] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>🐦</span> Follow us on X
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>📚</span> Read our Docs
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-800 border-t border-white/10 py-16 overflow-hidden">
        {/* Background Image 4 */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/image/image4.png"
            alt="Footer Background"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-5 bg-slate-900/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                Dexly
              </div>
              <p className="text-gray-400 mb-6">
                Next-generation perpetual futures trading on Solana. Trade with confidence, leverage with precision.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-xl">🐦</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-xl">💬</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xl">📱</a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-xl">📧</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">Platform</h4>
              <div className="space-y-2">
                <Link href="/trade" className="block text-gray-400 hover:text-white transition-colors">Trade Perpetuals</Link>
                <Link href="/portfolio" className="block text-gray-400 hover:text-white transition-colors">Portfolio</Link>
                <Link href="/leaderboard" className="block text-gray-400 hover:text-white transition-colors">Leaderboard</Link>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Analytics</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">API Reference</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Tutorial</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Press Kit</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 mb-4">
              &copy; 2024 Dexly Protocol. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Risk Disclosure</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
