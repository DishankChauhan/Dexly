'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setIsLoading(true);
    setHasError(false);
    
    // Try to load the image
    const img = new window.Image();
    img.src = src;
    
    img.onload = () => {
      console.log('Successfully loaded image from:', src);
      setImgSrc(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.error('Failed to load image from path:', src);
      setHasError(true);
      setIsLoading(false);
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      }
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  // Show a placeholder while loading
  if (isLoading) {
    return (
      <div 
        className={`${props.className || ''} bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse`}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      />
    );
  }
  
  // Show error state
  if (hasError && !imgSrc) {
    return (
      <div 
        className={`${props.className || ''} bg-black/50 flex items-center justify-center`}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      >
        <span className="text-red-500">Image not found</span>
      </div>
    );
  }

  // Show the image if we have a source
  return imgSrc ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt || 'Image'}
      className={props.className}
      style={{ 
        position: 'absolute',
        height: '100%', 
        width: '100%', 
        objectFit: 'cover',
        ...props.style
      }}
    />
  ) : null;
} 