"use client"
import React, { useState } from 'react'

interface ButtonOpenCloseProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  size?: number;
  className?: string;
}

export const ButtonOpenClose: React.FC<ButtonOpenCloseProps> = ({
  isOpen: controlledIsOpen,
  onToggle,
  size = 40,
  className = ''
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleClick = () => {
    const newState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newState);
    }
    onToggle?.(newState);
  };
  
  return (
    <button
      onClick={handleClick}
      className={`relative transition-all duration-400 hover:scale-110 active:scale-95 ${className}`}
      style={{ width: size, height: size }}
      aria-label={isOpen ? 'Close' : 'Open'}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-400"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        
        {/* Icon */}
        {isOpen ? (
          // Close icon (X)
          <g className="transition-opacity duration-400">
            <line
              x1="13"
              y1="13"
              x2="27"
              y2="27"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-400"
            />
            <line
              x1="27"
              y1="13"
              x2="13"
              y2="27"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-400"
            />
          </g>
        ) : (
          // Open icon (Plus or Menu)
          <g className="transition-opacity duration-400">
            <line
              x1="12"
              y1="15"
              x2="28"
              y2="15"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="20"
              x2="28"
              y2="20"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="25"
              x2="28"
              y2="25"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </button>
  );
};
