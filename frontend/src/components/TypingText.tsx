'use client';

import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  typingSpeed?: number;
  className?: string;
  startDelay?: number;
  digitClockStyle?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  typingSpeed = 100,
  className = '',
  startDelay = 500,
  digitClockStyle = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blinkCursor, setBlinkCursor] = useState(true);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    
    // Start delay before typing begins
    const initialDelay = setTimeout(() => {
      // Start the typing effect
      if (currentIndex < text.length) {
        const typingInterval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText(prev => prev + text[currentIndex]);
            setCurrentIndex(prev => prev + 1);
          } else {
            clearInterval(typingInterval);
          }
        }, typingSpeed);
        
        return () => clearInterval(typingInterval);
      }
    }, startDelay);
    
    return () => clearTimeout(initialDelay);
  }, [text, typingSpeed, startDelay]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setBlinkCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);

  const baseClassName = `inline-block ${digitClockStyle ? 'font-mono tracking-wider' : ''}`;
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <div className={combinedClassName}>
      <span className={digitClockStyle ? 'digital-clock-font' : ''}>
        {displayedText}
      </span>
      <span className={`text-blue-500 ${blinkCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ${digitClockStyle ? 'digital-clock-font' : ''}`}>|</span>
      
      {/* Add digital clock font styles */}
      {digitClockStyle && (
        <style jsx global>{`
          .digital-clock-font {
            font-family: 'Digital-7', 'DS-Digital', monospace;
            text-shadow: 0 0 5px rgba(79, 70, 229, 0.7);
            letter-spacing: 0.05em;
          }
          
          @font-face {
            font-family: 'Digital-7';
            src: url('https://fonts.cdnfonts.com/css/ds-digital') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      )}
    </div>
  );
};

export default TypingText; 