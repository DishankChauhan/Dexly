'use client';

import React from 'react';
import MagneticWrapper from '@/components/MagneticWrapper';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  borderGradient?: boolean;
  onClick?: () => void;
}

export default function FeatureCard({
  title,
  description,
  icon,
  className = '',
  borderGradient = false,
  onClick
}: FeatureCardProps) {
  return (
    <MagneticWrapper strength={15}>
      <div 
        className={`
          relative group p-6 rounded-xl cursor-pointer transition-all duration-300
          ${borderGradient 
            ? 'p-[1px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent'
            : 'border border-gray-800 hover:border-blue-500/50'
          }
          ${className}
        `}
        onClick={onClick}
      >
        <div className={`${borderGradient ? 'bg-black rounded-xl p-6' : ''} h-full`}>
          {icon && (
            <div className="mb-5">
              {icon}
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-3 group-hover:text-glow">{title}</h3>
          
          <p className="text-gray-400 text-sm">
            {description}
          </p>
        </div>
        
        {/* Hover effect - glowing border */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.2) 0%, transparent 80%)',
            pointerEvents: 'none'
          }}
        />
      </div>
    </MagneticWrapper>
  );
} 