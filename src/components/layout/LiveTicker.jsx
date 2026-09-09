import React from 'react';
import { Megaphone } from 'lucide-react';

const LiveTicker = () => {
  const alerts = [
    "Alert: High volatility detected on DEL-BOM sector (Base fare +12% in 4hrs).",
    "MoSPI Update: National Airfare Price Index base year revised to 2012=100.",
    "System Status: Real-time scraping active across 5 primary trunk corridors.",
    "Data Integrity: Last API fetch completed successfully at 14:00 IST.",
    "Notice: Route Analytics module now integrates T-15 and T-30 advance purchase windows."
  ];

  return (
    <div className="w-full bg-[#800000] border-y border-[#5e0000] flex text-sm overflow-hidden z-20 shrink-0">
      
      {/* Formal Static "What's New" Block */}
      <div className="bg-[#5e0000] text-white font-bold px-6 py-2 flex items-center shadow-[2px_0_5px_rgba(0,0,0,0.3)] z-10 shrink-0 uppercase tracking-wider text-xs">
        <Megaphone className="w-4 h-4 mr-2 text-yellow-400" />
        Latest Updates
      </div>

      {/* Scrolling Text Area */}
      <div className="flex-1 overflow-hidden relative flex items-center">
        {/* Double container for seamless CSS marquee */}
        <div className="flex animate-ticker whitespace-nowrap items-center min-w-full">
          <div className="flex space-x-12 px-6">
            {alerts.map((alert, idx) => (
              <span key={`a-${idx}`} className="text-white flex items-center font-medium">
                <span className="text-yellow-400 mr-3">॥</span>
                {alert}
              </span>
            ))}
          </div>
          <div className="flex space-x-12 px-6">
            {alerts.map((alert, idx) => (
              <span key={`b-${idx}`} className="text-white flex items-center font-medium">
                <span className="text-yellow-400 mr-3">॥</span>
                {alert}
              </span>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LiveTicker;
