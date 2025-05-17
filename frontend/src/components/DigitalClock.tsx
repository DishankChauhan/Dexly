'use client';

import { useState, useEffect } from 'react';

interface DigitalClockProps {
  className?: string;
  showSeconds?: boolean;
  showDate?: boolean;
  glowColor?: string;
}

const DigitalClock: React.FC<DigitalClockProps> = ({
  className = '',
  showSeconds = true,
  showDate = false,
  glowColor = 'rgba(79, 70, 229, 0.7)' // Default purple glow
}) => {
  const [time, setTime] = useState('00:00:00');
  const [date, setDate] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      if (showSeconds) {
        setTime(`${hours}:${minutes}:${seconds}`);
      } else {
        setTime(`${hours}:${minutes}`);
      }
      
      // Format date
      if (showDate) {
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        setDate(`${day}/${month}/${year}`);
      }
    };
    
    // Update immediately
    updateTime();
    
    // Then update every second
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [showSeconds, showDate]);
  
  return (
    <div className={`digital-clock ${className}`}>
      <div className="time">{time}</div>
      {showDate && <div className="date">{date}</div>}
      
      <style jsx>{`
        .digital-clock {
          font-family: 'Digital-7', 'DS-Digital', monospace;
          text-shadow: 0 0 5px ${glowColor};
          letter-spacing: 0.05em;
        }
        
        .time {
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .date {
          font-size: 0.875rem;
          opacity: 0.8;
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

export default DigitalClock; 