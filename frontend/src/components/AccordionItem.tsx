'use client';

import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  title,
  children,
  className = '',
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={`border-b border-gray-800 py-5 ${className}`}>
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center justify-center ml-4">
          <div className="relative w-6 h-6">
            <span className={`absolute top-1/2 left-0 right-0 w-full h-0.5 bg-white transform -translate-y-1/2 transition-transform ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}></span>
            <span className={`absolute top-1/2 left-0 right-0 w-full h-0.5 bg-white transform -translate-y-1/2 transition-transform ${isOpen ? 'rotate-0' : 'rotate-90'}`}></span>
          </div>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
} 