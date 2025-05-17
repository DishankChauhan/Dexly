'use client';

import React, { useRef, useState, useEffect } from 'react';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export default function MagneticWrapper({
  children,
  strength = 30,
  radius = 300,
  className = '',
}: MagneticWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [magneticStrength, setMagneticStrength] = useState(0);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHovered(true);
      // Animate strength from 0 to specified strength
      let startTime: number;
      function animate(time: number) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / 150, 1);
        setMagneticStrength(strength * progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Animate strength back to 0
      let startTime: number;
      const currentStrength = magneticStrength;
      function animate(time: number) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / 300, 1);
        setMagneticStrength(currentStrength * (1 - progress));
        setPosition({ x: position.x * (1 - progress), y: position.y * (1 - progress) });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current || !isHovered) return;
      
      const rect = wrapperRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < radius) {
        const factor = 1 - distance / radius;
        setPosition({
          x: distanceX * factor * magneticStrength / 100,
          y: distanceY * factor * magneticStrength / 100,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', handleMouseEnter);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isHovered, magneticStrength, position, radius, strength]);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
  };

  return (
    <div ref={wrapperRef} className={`magnetic-wrapper inline-block ${className}`}>
      <div style={style}>
        {children}
      </div>
    </div>
  );
} 