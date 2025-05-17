'use client';

import React, { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  onComplete?: () => void;
}

export default function AnimatedText({
  text,
  className = '',
  speed = 50,
  delay = 0,
  tag: Tag = 'div',
  onComplete,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const characters = text.split('');
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.char');
    
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        element.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        if (index === elements.length - 1 && onComplete) {
          setTimeout(onComplete, 500);
        }
      }, delay + index * speed);
    });
  }, [text, speed, delay, onComplete]);
  
  return (
    <Tag ref={containerRef as React.RefObject<HTMLDivElement>} className={className}>
      {characters.map((char, index) => (
        <span key={`${char}-${index}`} className="char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
} 