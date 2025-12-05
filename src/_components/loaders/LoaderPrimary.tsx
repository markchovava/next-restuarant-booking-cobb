import React from 'react';

export default function LoaderPrimary() {
  return (
    <div className="flex items-center justify-center w-full pt-20 ">
      <div className="relative">
        {/* Spinning ring */}
        <div className="w-20 h-20 border-4 border-slate-900 border-t-slate-500 rounded-full animate-spin"></div>
        
        {/* Pulsing inner circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-400 rounded-full animate-pulse"></div>
        
        {/* Loading text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-slate-900 text-xl  font-medium tracking-wide">
            Loading
            <span className="inline-block animate-bounce ml-1">.</span>
            <span className="inline-block animate-bounce ml-0.5" style={{animationDelay: '0.2s'}}>.</span>
            <span className="inline-block animate-bounce ml-0.5" style={{animationDelay: '0.4s'}}>.</span>
          </span>
        </div>
      </div>
    </div>
  );
}