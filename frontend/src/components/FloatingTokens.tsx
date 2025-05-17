'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingToken {
  symbol: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface FloatingTokensProps {
  symbols?: string[];
  count?: number;
  className?: string;
}

export default function FloatingTokens({
  symbols = ['BTC', 'ETH', 'SOL', 'USDC', 'AVAX', 'ADA'],
  count = 15,
  className = '',
}: FloatingTokensProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tokensRef = useRef<FloatingToken[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize tokens
    const initTokens = () => {
      const tokens: FloatingToken[] = [];
      for (let i = 0; i < count; i++) {
        tokens.push({
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 10 + Math.random() * 15,
          speed: 0.2 + Math.random() * 0.3,
          opacity: 0.1 + Math.random() * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
      tokensRef.current = tokens;
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initTokens();
    };
    
    const animateTokens = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      tokensRef.current.forEach(token => {
        // Update position
        token.y += token.speed;
        token.rotation += token.rotationSpeed;
        
        // Reset token if it goes off screen
        if (token.y > canvas.height + 50) {
          token.y = -50;
          token.x = Math.random() * canvas.width;
        }
        
        // Draw token
        ctx.save();
        ctx.translate(token.x, token.y);
        ctx.rotate(token.rotation);
        ctx.font = `${token.size}px var(--font-mono)`;
        ctx.fillStyle = `rgba(255, 255, 255, ${token.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(token.symbol, 0, 0);
        ctx.restore();
      });
      
      requestAnimationFrame(animateTokens);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const animationId = requestAnimationFrame(animateTokens);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [count, symbols]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-5 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}