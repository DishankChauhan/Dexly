'use client';

import { useState, useEffect } from 'react';
import TypingText from './TypingText';
import DigitalClock from './DigitalClock';

interface CyberHeaderProps {
  className?: string;
}

const CyberHeader: React.FC<CyberHeaderProps> = ({ className = '' }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    // Start showing title after a small delay
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 800);
    
    // Trigger glitch effect at intervals
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 5000);
    
    return () => {
      clearTimeout(titleTimer);
      clearInterval(glitchInterval);
    };
  }, []);
  
  return (
    <div className={`cyber-header ${className} ${glitchActive ? 'glitch' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="bg-green-800/30 inline-block px-4 py-1 mb-2 rounded-md border-l-2 border-green-500">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white digital-text">
                Next-Gen
              </h2>
            </div>
            
            <div className="mb-4">
              {showTitle && (
                <TypingText 
                  text="Trading Platform."
                  className="text-4xl md:text-5xl font-bold digital-text bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
                  typingSpeed={80}
                  digitClockStyle={true}
                />
              )}
            </div>
            
            <p className="text-lg text-gray-300 max-w-xl">
              Execute trades with lightning speed on our high-performance decentralized platform.
              <span className="text-green-400"> 10x leverage</span> with minimal slippage.
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <DigitalClock 
              className="mb-2 text-green-400"
              showDate={true}
              glowColor="rgba(52, 211, 153, 0.7)"
            />
            
            <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-md border border-gray-700 digital-box">
              <div className="text-xs text-gray-400 mb-1">SYSTEM STATUS</div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2 pulse-animation"></div>
                <span className="text-green-400 text-sm digital-text">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .cyber-header {
          position: relative;
          overflow: hidden;
        }
        
        .digital-text {
          font-family: 'Digital-7', 'DS-Digital', monospace;
          letter-spacing: 0.05em;
        }
        
        .digital-box {
          position: relative;
        }
        
        .digital-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.7), transparent);
          animation: scan-line 3s linear infinite;
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        /* Glitch effect */
        .glitch {
          animation: glitch 0.2s linear;
        }
        
        @keyframes scan-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.5;
            box-shadow: 0 0 5px rgba(52, 211, 153, 0.7);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 10px rgba(52, 211, 153, 0.9);
          }
          100% {
            opacity: 0.5;
            box-shadow: 0 0 5px rgba(52, 211, 153, 0.7);
          }
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        @font-face {
          font-family: 'Digital-7';
          src: url('https://fonts.cdnfonts.com/css/ds-digital') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </div>
  );
};

export default CyberHeader; 