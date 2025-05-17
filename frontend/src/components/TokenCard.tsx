'use client';

import React, { useState } from 'react';
import MagneticWrapper from '@/components/MagneticWrapper';

interface TokenCardProps {
  symbol: string;
  name: string;
  imageUrl?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function TokenCard({
  symbol,
  name,
  imageUrl,
  color = '#4f46e5',
  className = '',
  onClick
}: TokenCardProps) {
  const [imageError, setImageError] = useState(false);
  // Generate a random glow color if none provided
  const glowColor = color || `hsl(${Math.random() * 360}, 70%, 50%)`;
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Get the short symbol for display (first 2 characters)
  const displaySymbol = symbol.substring(0, 2).toUpperCase();
  
  return (
    <MagneticWrapper strength={25}>
      <div 
        className={`relative group cursor-pointer transition-transform duration-300 hover:scale-110 ${className}`}
        onClick={onClick}
      >
        <div 
          className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: glowColor, filter: 'blur(10px)' }}
        />
        
        <div className="relative rounded-full overflow-hidden border border-gray-700 group-hover:border-opacity-0 transition-all">
          <div 
            className="w-16 h-16 flex items-center justify-center bg-black"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          >
            {imageUrl && !imageError ? (
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-12 h-12 object-contain" 
                onError={handleImageError}
              />
            ) : (
              <div 
                className="w-12 h-12 flex items-center justify-center text-2xl font-bold"
                style={{ color: glowColor }}
              >
                {displaySymbol}
              </div>
            )}
          </div>
        </div>
        
        <div 
          className="absolute -bottom-2 left-0 right-0 text-center text-xs opacity-0 group-hover:opacity-100 transform group-hover:translate-y-5 transition-all duration-300"
          style={{ color: glowColor }}
        >
          {symbol.toUpperCase()}
        </div>
      </div>
    </MagneticWrapper>
  );
} 