import React from 'react';
import { Home, LineChart, Map, BookOpen, FileText, Phone, Search, FileDown } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'cpiBenchmark', label: 'About Airfare CPI', icon: BookOpen },
  { id: 'overview', label: 'Real-Time Price Index', icon: LineChart },
  { id: 'flightSearch', label: 'Flight Search', icon: Search },
  { id: 'routeAnalytics', label: 'City-Pair Heatmaps', icon: Map },
  { id: 'reports', label: 'Reports & Data Export', icon: FileDown },
  { id: 'apiDocs', label: 'API Documentation', icon: FileText },
  { id: 'methodology', label: 'Methodology', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Phone },
];

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full bg-[#1e293b] shadow-md relative z-30">
      <div className="max-w-[1400px] mx-auto px-6">
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3.5 px-4 text-sm font-semibold transition-all duration-200 border-b-4 whitespace-nowrap
                  ${isActive 
                    ? 'border-blue-400 text-white bg-white/10' 
                    : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5 hover:border-gray-500'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'opacity-70'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Official Saffron, White, and Green Accent Bottom Border */}
      <div className="w-full h-1.5 flex">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-[#FFFFFF]"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>
    </div>
  );
};

export default Navigation;
