'use client';

import React, { useEffect, useRef } from 'react';

interface GridBackgroundProps {
  spacing?: number;
  color?: string;
  opacity?: number;
  animate?: boolean;
  className?: string;
}

export default function GridBackground({
  spacing = 40,
  color = 'rgba(255, 255, 255, 0.1)',
  opacity = 0.15,
  animate = false,
  className = '',
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, scrollY: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = opacity;
    
    // Calculate offset to create scrolling illusion
    const offset = animate ? (scrollY % spacing) : 0;
    
    // Vertical lines
    for (let x = offset; x < width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines with parallax effect
    for (let y = offset; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Add subtle glow effect at intersections
    if (animate) {
      ctx.fillStyle = 'rgba(100, 120, 255, 0.05)';
      for (let x = offset; x < width; x += spacing) {
        for (let y = offset; y < height; y += spacing) {
          const pulseSize = 3 + Math.sin(Date.now() / 1000 + x / 100 + y / 100) * 2;
          ctx.beginPath();
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateCanvasSize = () => {
      // Make the canvas height match the document height
      const docHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight,
        document.body.clientHeight, 
        document.documentElement.clientHeight,
        window.innerHeight * 1.5
      );
      
      canvas.width = window.innerWidth;
      canvas.height = docHeight;
      
      drawGrid(ctx, canvas.width, canvas.height, scrollYRef.current);
    };
    
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      if (typeof animate === 'function' && animate()) {
        // Only redraw when animating and scrolling
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          if (canvas && ctx) {
            drawGrid(ctx, canvas.width, canvas.height, scrollYRef.current);
          }
        });
      }
    };
    
    // Create a delay animation function to create smooth animation
    const animate = () => {
      if (canvas && ctx) {
        // Simulate a slow automatic scroll for subtle animation
        scrollYRef.current += 0.2;
        drawGrid(ctx, canvas.width, canvas.height, scrollYRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Handle resize for responsive canvas
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('scroll', handleScroll);
    
    // Initial setup
    updateCanvasSize();
    
    // Content can change the document height after initial load
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    
    resizeObserver.observe(document.body);
    
    // Start animation if enabled
    if (animate) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, color, opacity, spacing]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full -z-10 ${className}`}
      style={{ 
        pointerEvents: 'none',
        height: '100%',
        minHeight: '100vh',
        position: 'absolute'
      }}
    />
  );
} 