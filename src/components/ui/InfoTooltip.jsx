import React, { useState } from 'react';
import { Info } from 'lucide-react';

const InfoTooltip = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative flex items-center ml-1.5 cursor-pointer"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Info className="w-4 h-4 text-gray-400 hover:text-blue-500 transition-colors" />
      
      {isVisible && (
        <div className="absolute z-[60] w-max max-w-xs p-2.5 mt-2 text-xs leading-relaxed font-normal text-left text-slate-100 bg-slate-900 rounded-md shadow-lg pointer-events-none top-full left-1/2 transform -translate-x-1/2 before:content-[''] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-slate-900" style={{ fontVariant: 'normal' }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
