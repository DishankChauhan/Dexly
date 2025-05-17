'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface ParallaxEffectProps {
  children: ReactNode;
  speed: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  threshold?: number; // Controls when the element becomes visible
}

export default function ParallaxEffect({
  children,
  speed,
  direction = 'up',
  className = '',
  threshold = 0.1, // By default, element appears when 10% visible
}: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Create IntersectionObserver to detect when element enters viewport
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: [threshold, 0.25, 0.5, 0.75, 1.0], // Multiple thresholds for smoother transitions
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
        
        // If it's visible, get the intersection ratio for smoother animations
        if (entry.isIntersecting) {
          // Store how visible the element is (0-1)
          const visibilityRatio = entry.intersectionRatio;
          // Make sure elements at the bottom appear properly
          if (entry.boundingClientRect.bottom < window.innerHeight * 1.5) {
            setIsVisible(true);
          }
        }
      });
    }, observerOptions);
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    // Handle scroll for parallax effect
    const handleScroll = () => {
      if (!ref.current || !isVisible) return;
      
      const scrollY = window.scrollY;
      const { top, height, bottom } = ref.current.getBoundingClientRect();
      
      // Calculate how far element is from the center of viewport for parallax effect
      const windowHeight = window.innerHeight;
      const elementMiddle = top + height / 2;
      const distanceFromCenter = elementMiddle - windowHeight / 2;
      
      // Scale factor for parallax (smaller = gentler effect)
      const scaleFactor = 0.05;
      
      // Reduce effect as element approaches bottom of viewport
      const bottomAdjustment = Math.min(1, (windowHeight - bottom + height) / (windowHeight * 0.5));
      const bottomFactor = bottom < windowHeight ? bottomAdjustment : 1;
      
      // Apply direction-specific parallax effects
      let newOffset = distanceFromCenter * scaleFactor * speed * bottomFactor;
      
      // Limit maximum offset to avoid extreme movement
      const maxOffset = Math.min(50, height * 0.3);
      newOffset = Math.max(Math.min(newOffset, maxOffset), -maxOffset);
      
      setOffset(newOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [speed, threshold, isVisible]);
  
  // Calculate transform based on direction
  const getTransform = () => {
    if (!isVisible) {
      // Initial transform when element is not yet visible
      switch (direction) {
        case 'up': return { transform: `translateY(20px)`, opacity: 0 };
        case 'down': return { transform: `translateY(-20px)`, opacity: 0 };
        case 'left': return { transform: `translateX(20px)`, opacity: 0 };
        case 'right': return { transform: `translateX(-20px)`, opacity: 0 };
        default: return { transform: `translateY(20px)`, opacity: 0 };
      }
    }
    
    // Visible state with parallax effect
    switch (direction) {
      case 'up': return { transform: `translateY(${offset}px)`, opacity: 1 };
      case 'down': return { transform: `translateY(${-offset}px)`, opacity: 1 };
      case 'left': return { transform: `translateX(${offset}px)`, opacity: 1 };
      case 'right': return { transform: `translateX(${-offset}px)`, opacity: 1 };
      default: return { transform: `translateY(${offset}px)`, opacity: 1 };
    }
  };
  
  return (
    <div 
      ref={ref}
      className={`transition-all will-change-transform ${className}`}
      style={{
        ...getTransform(),
        transition: 'transform 0.5s ease-out, opacity 0.7s ease-out',
      }}
    >
      {children}
    </div>
  );
} 