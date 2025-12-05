"use client"
import React, { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  options?: string[] | number[]
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  min = 1,
  max = 20,
  placeholder = "Select...",
  className = "",
  disabled = false,
  options = Array.from({ length: 10 - 1 + 1 }, (_, i) => min + i)
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | undefined>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (val: number) => {
    setSelectedValue(val);
    onChange?.(val);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const currentIndex = selectedValue ? options.indexOf(selectedValue) : -1;
      const nextIndex = Math.min(currentIndex + 1, options.length - 1);
      setSelectedValue(options[nextIndex]);
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      const currentIndex = selectedValue ? options.indexOf(selectedValue) : options.length;
      const prevIndex = Math.max(currentIndex - 1, 0);
      setSelectedValue(options[prevIndex]);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full text-left border border-transparent
          focus:outline-none focus:border-transparent b
          transition-all duration-200
          ${disabled ? 'bg-white cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-gray-400'}
          ${isOpen ? ' border-transparent bg-white' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={selectedValue !== undefined ? 'text-gray-100' : 'text-white'}>
            {selectedValue !== undefined ? selectedValue : placeholder}
          </span>
          <svg
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white/50 border border-transparent shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`
                px-4 py-2 cursor-pointer transition-colors duration-150
                ${selectedValue === opt
                  ? 'bg-slate-500 text-white'
                  : 'text-black hover:bg-gray-100'
                }
              `}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};