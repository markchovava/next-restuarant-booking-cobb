"use client"

import React, { useState, useMemo } from 'react';

interface DateOption {
  date: Date;
  dayName: string;
  dayNumber: number;
  monthName: string;
  fullDate: string;
  isToday: boolean;
}

interface Next30DaysCalendarProps {
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
  disabled?: boolean;
}

export const Next30DaysCalendar: React.FC<Next30DaysCalendarProps> = ({
  value,
  onChange,
  className = "",
  disabled = false
}) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(value);
  const [isOpen, setIsOpen] = useState(false);

  const dates = useMemo(() => {
    const today = new Date();
    const dateOptions: DateOption[] = [];
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      dateOptions.push({
        date,
        dayName: dayNames[date.getDay()],
        dayNumber: date.getDate(),
        monthName: monthNames[date.getMonth()],
        fullDate: date.toISOString().split('T')[0],
        isToday: i === 0
      });
    }
    
    return dateOptions;
  }, []);

  const handleSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    onChange?.(dateStr);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (!selectedDate) return "Select a date";
    const selected = dates.find(d => d.fullDate === selectedDate);
    if (!selected) return "Select a date";
    return `${selected.dayName}, ${selected.monthName} ${selected.dayNumber}`;
  };

  const formatFullDate = (dateOption: DateOption) => {
    const year = dateOption.date.getFullYear();
    return `${dateOption.dayName}, ${dateOption.monthName} ${dateOption.dayNumber}, ${year}`;
  };

  return (
    <div className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full text-left bg-transparent border border-gray-300 
          focus:outline-none focus:border-transparent
          transition-all duration-200
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-gray-400'}
          ${isOpen ? ' border-transparent' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={selectedDate ? 'text-gray-900 font-medium' : 'text-gray-400'}>
              {getDisplayValue()}
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
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
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-50 w-full mt-2 bg-white/50 border border-gray-200  shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-500 to-slate-600 px-4 py-3">
              <h3 className="text-white font-semibold text-sm">Next 30 Days</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 divide-y divide-gray-100">
                {dates.map((dateOption) => {
                  const isSelected = selectedDate === dateOption.fullDate;
                  
                  return (
                    <button
                      key={dateOption.fullDate}
                      type="button"
                      onClick={() => handleSelect(dateOption.fullDate)}
                      className={`
                        px-4 py-3 text-left transition-all duration-150
                        ${isSelected
                          ? 'bg-slate-50 border-l-4 border-l-slate-500'
                          : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`
                            flex flex-col items-center justify-center w-14 h-14 rounded-lg
                            ${dateOption.isToday 
                              ? 'bg-slate-500 text-white' 
                              : isSelected 
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-gray-100 text-gray-700'
                            }
                          `}>
                            <span className="text-xs font-medium uppercase">{dateOption.dayName}</span>
                            <span className="text-xl font-bold">{dateOption.dayNumber}</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className={`font-medium ${isSelected ? 'text-slate-700' : 'text-gray-900'}`}>
                              {formatFullDate(dateOption)}
                            </span>
                            {dateOption.isToday && (
                              <span className="text-xs text-slate-600 font-semibold mt-0.5">Today</span>
                            )}
                          </div>
                        </div>
                        
                        {isSelected && (
                          <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};