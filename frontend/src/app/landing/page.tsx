'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePriceData } from '@/hooks/usePriceData';
import { useEffect, useState } from 'react';
import MagneticWrapper from '@/components/MagneticWrapper';
import AnimatedText from '@/components/AnimatedText';
import GlowingChart from '@/components/GlowingChart';
import GridBackground from '@/components/GridBackground';
import ParallaxEffect from '@/components/ParallaxEffect';
import TokenCard from '@/components/TokenCard';
import FeatureCard from '@/components/FeatureCard';
import AccordionItem from '@/components/AccordionItem';
import FloatingTokens from '@/components/FloatingTokens';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import SafeImage from '@/components/SafeImage';

// Import images
// Remove image imports since we'll use public paths

// Dynamically import Solana wallet component with SSR disabled
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

// Update image references in the component
const images = {
  hero: '/image/image1.png',
  features: '/image/image2.png',
  market: '/image/image3.png',
  footer: '/image/image4.png'
};

export default function LandingPage() {
  const { publicKey } = useWallet();
  const { priceData } = usePriceData();
  const [isScrolling, setIsScrolling] = useState(false);
  const [chartData, setChartData] = useState<Array<{ time: string; value: number }>>([]);
  const router = useRouter();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    // Log to verify image paths
    console.log('Checking image paths...');
    const imagePaths = Object.values(images);

    Promise.all(
      imagePaths.map(
        path =>
          new Promise((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => {
              console.log(`Image ${path} loaded successfully`);
              resolve(true);
            };
            img.onerror = () => {
              console.error(`Error loading ${path}`);
              reject(new Error(`Failed to load ${path}`));
            };
            img.src = path;
          })
      )
    )
      .then(() => {
        console.log('All images loaded successfully');
        setImagesLoaded(true);
      })
      .catch(error => console.error('Image loading error:', error));
  }, []);
  
  useEffect(() => {
    // Log to verify client side rendering is happening
    console.log("Component mounted");
    
    // Log if images exist at the paths
    const checkImages = async () => {
      try {
        const img = await fetch('/image/image1.png');
        
        console.log('Image status:', img.status);
      } catch (error) {
        console.error('Error checking images:', error);
      }
    };
    
    checkImages();
    
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Generate sample chart data
  useEffect(() => {
    const generateChartData = () => {
      const basePrice = 175;
      const data = [];
      const now = new Date();
      
      for (let i = 0; i < 100; i++) {
        // Create unique dates by incrementing days instead of minutes
        const date = new Date(now);
        date.setDate(date.getDate() - (100 - i));
        
        // Format date as YYYY-MM-DD (required format for lightweight-charts)
        const formattedDate = date.toISOString().split('T')[0];
        
        // Create some realistic price movement
        const randomFactor = 0.5 - Math.random();
        const trendFactor = Math.sin(i / 20) * 5;
        const noise = (i % 5 === 0) ? randomFactor * 8 : randomFactor * 3;
        const price = basePrice + trendFactor + noise + (i / 5);
        
        data.push({
          time: formattedDate,
          value: parseFloat(price.toFixed(2)),
        });
      }
      
      setChartData(data);
    };
    
    generateChartData();
  }, []);

  // Handle wallet button click
  const handleWalletClick = () => {
    // Use the Solana wallet adapter
    const walletButtonElement = document.querySelector('.wallet-adapter-button-trigger');
    if (walletButtonElement) {
      (walletButtonElement as HTMLElement).click();
    } else {
      // Fallback to redirect if button not found
      router.push('/');
      setTimeout(() => {
        const button = document.querySelector('.wallet-adapter-button-trigger');
        if (button) {
          (button as HTMLElement).click();
        }
      }, 100);
    }
  };
  
  // Handle trade button click
  const handleTradeClick = () => {
    router.push('/trade');
  };
  
  // Handle portfolio button click
  const handlePortfolioClick = () => {
    router.push('/portfolio');
  };
  
  // Handle docs button click
  const handleDocsClick = () => {
    window.open('https://docs.dexly.com', '_blank');
  };
  
  // Handle learn more button click
  const handleLearnMoreClick = () => {
    // Scroll to the features section
    const featuresSection = document.querySelector('#features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white overflow-hidden">
      {/* Debug component to test image loading - this will be visible at the top of the page */}
      <div className="fixed top-0 left-0 z-50 bg-black/80 text-white p-4 m-2 rounded-lg max-w-sm">
        <p>Image loaded: {imagesLoaded ? 'Yes' : 'No'}</p>
        <div className="mt-2 flex items-center gap-2">
          <p>Test image:</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/image/image1.png" 
            alt="Test" 
            className="w-10 h-10 object-cover rounded"
            onLoad={() => console.log('Debug image loaded!')}
            onError={() => console.error('Debug image failed to load!')}
          />
        </div>
      </div>
      
      {/* Background effects */}
      <GridBackground animate={true} spacing={30} />
      <FloatingTokens count={20} />
      
      {/* Background effects - keep the glows but make them part of parallax */}
      <ParallaxEffect speed={10} direction="left" className="fixed top-1/4 -left-10 pointer-events-none">
        <div className="w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </ParallaxEffect>
      <ParallaxEffect speed={15} direction="right" className="fixed bottom-1/4 -right-10 pointer-events-none">
        <div className="w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </ParallaxEffect>
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolling ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MagneticWrapper strength={40}>
                <Link href="/">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 text-glow cursor-pointer">Dexly</h1>
                </Link>
              </MagneticWrapper>
            </div>
            <div className="flex items-center space-x-8">
              <button onClick={handleTradeClick} className="text-gray-300 hover:text-white transition-colors">
                Trade
              </button>
              <button onClick={handlePortfolioClick} className="text-gray-300 hover:text-white transition-colors">
                Portfolio
              </button>
              <button onClick={handleDocsClick} className="text-gray-300 hover:text-white transition-colors">
                Docs
              </button>
              <MagneticWrapper strength={20}>
                <button onClick={handleWalletClick} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all">
                  Select Wallet
                </button>
              </MagneticWrapper>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="w-full bg-black relative overflow-hidden pt-24">
        {/* Hero Background Image without overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/image1.png"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-green-800/30 inline-block px-4 py-1 mb-4 rounded-md">
                <h2 className="text-5xl md:text-6xl font-bold leading-tight text-white">Next-Gen</h2>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Trading Platform.
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-lg">
                Execute trades with lightning speed on our high-performance decentralized platform. Leverage up to 10x on major tokens with minimal slippage.
              </p>
              
              <div className="flex flex-row gap-4 mb-12">
                <button onClick={handleWalletClick} className="px-8 py-4 rounded-lg text-lg font-medium bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40">
                  Select Wallet
                </button>
                <button onClick={handleLearnMoreClick} className="border border-gray-700 hover:border-gray-500 bg-black/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-medium transition-all">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-sm opacity-75"></div>
              <div className="relative bg-black rounded-xl p-6 border border-gray-800">
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">SOL/USD Perpetual</p>
                    <div className="flex items-center">
                      <p className="text-3xl font-bold">${priceData?.price?.toFixed(2) || '173.45'}</p>
                      <span className="ml-2 bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-sm">+2.8%</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert("Layout options")}
                      className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => alert("Refresh data")}
                      className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4 mb-6 border border-gray-800">
                  <div className="h-48 relative overflow-hidden">
                    {chartData.length > 0 && (
                      <GlowingChart 
                        data={chartData} 
                        height={192} 
                        lineColor="#4f46e5" 
                        areaColor="rgba(79, 70, 229, 0.2)" 
                      />
                    )}
                    <div className="absolute top-2 left-2 right-2 flex justify-between">
                      <div className="text-xs text-gray-400">24h Change: <span className="text-green-400">+2.8%</span></div>
                      <div className="text-xs text-gray-400">24h Volume: <span className="text-white">$48.2M</span></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 p-3 rounded border border-gray-800">
                      <p className="text-xs text-gray-400">Leverage</p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">5.0x</p>
                        <div className="flex">
                          <button onClick={() => alert("Decrease leverage")} className="text-gray-400 hover:text-white">-</button>
                          <button onClick={() => alert("Increase leverage")} className="text-gray-400 hover:text-white ml-3">+</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/50 p-3 rounded border border-gray-800">
                      <p className="text-xs text-gray-400">Size</p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">$1,000</p>
                        <button onClick={() => alert("Set maximum size")} className="text-gray-400 hover:text-white text-xs">MAX</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => alert("Opening long position")}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-medium transition-colors"
                    >
                      Long
                    </button>
                    <button 
                      onClick={() => alert("Opening short position")}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-medium transition-colors"
                    >
                      Short
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section (replacing Visual Showcase with coins) */}
      <div id="features-section" className="w-full bg-black py-20 relative overflow-hidden">
        {/* Image without blended edges */}
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/image2.png"
            alt="Feature section background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
          
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Futuristic Trading Experience</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Our sleek interface combines function with aesthetics for an unmatched trading experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden group bg-black/40 backdrop-blur-md rounded-xl p-8 border border-gray-800 transform transition-transform hover:scale-105">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-blue-600/0 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex flex-col items-center">
                <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Lightning Fast Execution</h3>
                <p className="text-gray-400 text-center">Experience sub-second transaction finality powered by Solana's blazing fast blockchain technology.</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden group bg-black/40 backdrop-blur-md rounded-xl p-8 border border-gray-800 transform transition-transform hover:scale-105">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-purple-600/0 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex flex-col items-center">
                <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Up to 10x Leverage</h3>
                <p className="text-gray-400 text-center">Amplify your trading potential with up to 10x leverage for maximized returns on your positions.</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden group bg-black/40 backdrop-blur-md rounded-xl p-8 border border-gray-800 transform transition-transform hover:scale-105">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-green-600/0 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex flex-col items-center">
                <div className="bg-green-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Secure & Non-Custodial</h3>
                <p className="text-gray-400 text-center">Trade with confidence knowing your funds remain under your control with our non-custodial architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Supported Tokens Section */}
      <div className="w-full bg-black py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 relative">
              All Major Tokens
              <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">+</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Explore our range of supported digital currencies for seamless transactions across major blockchains.
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 justify-center">
            <TokenCard name="Solana" symbol="SOL" color="#9945FF" />
            <TokenCard name="Ethereum" symbol="ETH" color="#627EEA" />
            <TokenCard name="Bitcoin" symbol="BTC" color="#F7931A" />
            <TokenCard name="USDC" symbol="USDC" color="#2775CA" />
            <TokenCard name="Avalanche" symbol="AVAX" color="#E84142" />
            <TokenCard name="Cardano" symbol="ADA" color="#0033AD" />
          </div>
        </div>
      </div>
      
      {/* Market Section */}
      <div className="w-full bg-black py-20 relative">
        {/* Image without diffused edges */}
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/image3.png"
            alt="Market section background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Popular Markets</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Trade a variety of perpetual futures markets with deep liquidity and competitive spreads.
            </p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-5 border-b border-gray-800 text-sm py-3 px-4 bg-gray-900/30">
              <div className="font-medium">Market</div>
              <div className="font-medium">Price</div>
              <div className="font-medium">24h Change</div>
              <div className="font-medium">24h Volume</div>
              <div className="font-medium text-right">Trade</div>
            </div>
            
            <div className="divide-y divide-gray-800">
              <div className="grid grid-cols-5 py-4 px-4 hover:bg-gray-900/20 transition-colors">
                <div className="font-medium">SOL-PERP</div>
                <div>$173.45</div>
                <div className="text-green-400">+2.8%</div>
                <div>$48.2M</div>
                <div className="text-right">
                  <button 
                    onClick={() => router.push('/trade?market=SOL-PERP')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Trade
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-5 py-4 px-4 hover:bg-gray-900/20 transition-colors">
                <div className="font-medium">BTC-PERP</div>
                <div>$62,145.78</div>
                <div className="text-green-400">+1.4%</div>
                <div>$324.5M</div>
                <div className="text-right">
                  <button 
                    onClick={() => router.push('/trade?market=BTC-PERP')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Trade
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-5 py-4 px-4 hover:bg-gray-900/20 transition-colors">
                <div className="font-medium">ETH-PERP</div>
                <div>$3,421.92</div>
                <div className="text-red-400">-0.7%</div>
                <div>$178.9M</div>
                <div className="text-right">
                  <button 
                    onClick={() => router.push('/trade?market=ETH-PERP')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Trade
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-5 py-4 px-4 hover:bg-gray-900/20 transition-colors">
                <div className="font-medium">AVAX-PERP</div>
                <div>$29.87</div>
                <div className="text-green-400">+3.2%</div>
                <div>$22.1M</div>
                <div className="text-right">
                  <button 
                    onClick={() => router.push('/trade?market=AVAX-PERP')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Trade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile App Section - NEW */}
      <div className="w-full bg-black py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold mb-6">Trade On The Go</h2>
              <p className="text-xl text-gray-300 mb-6">
                Access your portfolio, execute trades, and monitor markets from anywhere with our powerful mobile trading app.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-blue-600/20 p-1 mt-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300">Real-time price charts and market data</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600/20 p-1 mt-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300">Execute trades with a simple tap</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600/20 p-1 mt-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300">Set price alerts and notifications</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600/20 p-1 mt-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300">Track your portfolio performance</span>
                </li>
              </ul>
              <div className="flex gap-4">
                <button className="flex items-center bg-black border border-gray-700 rounded-lg px-4 py-2">
                  <svg viewBox="0 0 384 512" width="30" className="mr-3">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-xl font-semibold font-heading">App Store</div>
                  </div>
                </button>
                <button className="flex items-center bg-black border border-gray-700 rounded-lg px-4 py-2">
                  <svg viewBox="0 0 512 512" width="30" className="mr-3">
                    <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-xl font-semibold font-heading">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="order-1 md:order-2 max-w-xs mx-auto md:max-w-none">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[40px] blur opacity-70"></div>
                <div className="relative bg-gray-900 rounded-[36px] border-[10px] border-black overflow-hidden p-1 shadow-2xl">
                  <div className="rounded-[22px] overflow-hidden h-full w-full bg-black">
                    <div className="pt-5 px-3 pb-2 bg-black flex justify-between items-center">
                      <div className="text-xs">9:41 AM</div>
                      <div className="flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.95-4.95-13.096-4.95-18.046 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0c-3.248-3.247-8.533-3.247-11.78 0a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06zm3.183 3.183c2.344-2.344 6.143-2.344 8.486 0a.75.75 0 010 1.06l-.53.53a.75.75 0 01-1.061 0c-1.6-1.6-4.196-1.6-5.795 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a.75.75 0 011.06 0 .75.75 0 010 1.06l-.53.53a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                        </svg>
                      </div>
                    </div>
                    <div className="px-3 py-4 text-center">
                      <h3 className="text-xl font-bold mb-2 text-purple-500">Dexly Mobile</h3>
                      <div className="bg-blue-900/30 rounded-lg p-2 mb-4">
                        <div className="text-xs text-gray-400">BTC/USD Perpetual</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xl font-bold">$62,145.78</div>
                          <div className="text-green-400 text-sm">+1.4%</div>
                        </div>
                      </div>
                      <div className="h-32 bg-black rounded-lg border border-gray-800 mb-4 overflow-hidden">
                        <svg viewBox="0 0 400 150" className="w-full h-full">
                          <path d="M0,75 C50,55 100,95 150,85 C200,75 250,45 300,65 C350,85 400,30 450,60" fill="none" stroke="#4f46e5" strokeWidth="3"/>
                          <path d="M0,75 C50,55 100,95 150,85 C200,75 250,45 300,65 C350,85 400,30 450,60 L450,150 L0,150 Z" fill="url(#grad1)" fillOpacity="0.2"/>
                          <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.7"/>
                              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-green-500 text-white font-medium py-2 rounded">Buy</button>
                        <button className="bg-red-500 text-white font-medium py-2 rounded">Sell</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="w-full bg-black py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <ParallaxEffect speed={8} direction="up">
              <div className="inline-block bg-blue-900/20 rounded-full px-4 py-1 mb-4">
                <span className="text-sm font-medium text-blue-400">Get Answers to Your Questions</span>
                </div>
            </ParallaxEffect>
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find the answers you need with our comprehensive FAQ section, covering all aspects of our trading platform.
            </p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800">
            <div className="p-6 md:p-8">
              <AccordionItem title="How does leverage trading work on your platform?" defaultOpen={true}>
                <p className="mb-3">
                  Our platform offers leverage trading up to 10x, allowing you to amplify your exposure to market movements without tying up large amounts of capital.
                </p>
                <p>
                  When you open a leveraged position, you only need to commit a fraction of the total position size (called margin). Your profits and losses are then calculated based on the full position size, not just your margin.
                </p>
              </AccordionItem>
              
              <AccordionItem title="What are the fees for trading on your platform?">
                <p className="mb-3">
                  We maintain competitive and transparent fee structures:
                </p>
                <ul className="list-disc pl-5 mb-3">
                  <li>Maker fee: 0.02%</li>
                  <li>Taker fee: 0.05%</li>
                  <li>Settlement fee: 0.01%</li>
                </ul>
                <p>
                  Volume-based discounts are available for high-frequency traders. There are no hidden fees or charges.
                </p>
              </AccordionItem>
              
              <AccordionItem title="How do you ensure the security of user funds?">
                <p className="mb-3">
                  Security is our top priority. We implement several layers of protection:
                </p>
                <ul className="list-disc pl-5">
                  <li>Non-custodial architecture - you maintain full control of your funds</li>
                  <li>Regular security audits by leading blockchain security firms</li>
                  <li>Smart contract insurance coverage</li>
                  <li>Multi-signature authorization for critical operations</li>
                  <li>Real-time monitoring for suspicious activities</li>
                </ul>
              </AccordionItem>
              
              <AccordionItem title="What cryptocurrencies can I trade on the platform?">
                <p>
                  Our platform supports trading for major cryptocurrencies including but not limited to BTC, ETH, SOL, AVAX, ADA, and various stablecoins such as USDC, USDT, and DAI. We continually expand our offerings based on market demand and liquidity.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-2">Start Trading</h2>
          <h2 className="text-4xl font-bold mb-6">in Minutes.</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connect your wallet and gain access to institutional-grade trading tools with competitive fees and best-in-class execution.
          </p>
          
          <div className="flex flex-row justify-center gap-6">
            <button 
              onClick={handleWalletClick}
              className="px-8 py-4 rounded-lg text-lg font-medium bg-white text-black hover:bg-gray-100 transition-all"
            >
              Start Now
            </button>
            <button 
              onClick={() => window.open('https://github.com/yourusername/dexly', '_blank')}
              className="px-8 py-4 rounded-lg text-lg font-medium border border-white/30 hover:border-white/60 bg-transparent backdrop-blur-sm transition-all"
            >
              Connect with Me
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full bg-black py-24 border-t border-gray-800 relative z-10">
        {/* Footer background image without overlay */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/image4.png"
            alt="Footer background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <ParallaxEffect speed={6} direction="up" className="mb-8 md:mb-0">
              <div>
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Dexly</h3>
                <p className="text-gray-400">
                  The next generation cryptocurrency trading platform with advanced features and competitive fees.
                </p>
                <p className="text-gray-500 text-sm mt-4">© 2023 Dexly. All rights reserved.</p>
              </div>
            </ParallaxEffect>
            
            <ParallaxEffect speed={8} direction="up" className="mb-8 md:mb-0">
              <div>
                <h4 className="font-medium mb-4">Features</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => router.push('/features/leverage')} className="text-gray-400 hover:text-white transition-colors">Leverage Trading</button></li>
                  <li><button onClick={() => router.push('/features/charts')} className="text-gray-400 hover:text-white transition-colors">Advanced Charts</button></li>
                  <li><button onClick={() => router.push('/features/orders')} className="text-gray-400 hover:text-white transition-colors">Order Types</button></li>
                  <li><button onClick={() => router.push('/features/wallet')} className="text-gray-400 hover:text-white transition-colors">Wallet Integration</button></li>
                </ul>
              </div>
            </ParallaxEffect>
            
            <ParallaxEffect speed={10} direction="up" className="mb-8 md:mb-0">
              <div>
                <h4 className="font-medium mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => window.open('https://docs.dexly.com', '_blank')} className="text-gray-400 hover:text-white transition-colors">Documentation</button></li>
                  <li><button onClick={() => window.open('https://api.dexly.com', '_blank')} className="text-gray-400 hover:text-white transition-colors">API References</button></li>
                  <li><button onClick={() => window.open('https://docs.dexly.com/tutorials', '_blank')} className="text-gray-400 hover:text-white transition-colors">Tutorials</button></li>
                  <li><button onClick={() => window.open('https://status.dexly.com', '_blank')} className="text-gray-400 hover:text-white transition-colors">Status</button></li>
                </ul>
              </div>
            </ParallaxEffect>
            
            <ParallaxEffect speed={12} direction="up">
              <div>
                <h4 className="font-medium mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => window.open('https://github.com/yourusername/dexly', '_blank')} className="text-gray-400 hover:text-white transition-colors">GitHub</button></li>
                  <li><button onClick={() => window.open('https://twitter.com/dexly', '_blank')} className="text-gray-400 hover:text-white transition-colors">Twitter</button></li>
                  <li><button onClick={() => window.open('https://discord.gg/dexly', '_blank')} className="text-gray-400 hover:text-white transition-colors">Discord</button></li>
                  <li><button onClick={() => router.push('/contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
                </ul>
              </div>
            </ParallaxEffect>
          </div>
        </div>
      </footer>
    </main>
  );
} 