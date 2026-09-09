import React from 'react';
import { Home, LineChart, Map, BookOpen, FileText, Phone, Search, FileDown, Menu, X } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home Dashboard', icon: Home },
  { id: 'overview', label: 'Real-Time Price Index', icon: LineChart },
  { id: 'cpiBenchmark', label: 'About Airfare CPI', icon: BookOpen },
  { id: 'routeAnalytics', label: 'City-Pair Heatmaps', icon: Map },
  { id: 'flightSearch', label: 'Flight Search', icon: Search },
  { id: 'reports', label: 'Reports & Data Export', icon: FileDown },
  { id: 'apiDocs', label: 'API Documentation', icon: FileText },
  { id: 'methodology', label: 'Methodology', icon: FileText },
  { id: 'contact', label: 'Contact Helpdesk', icon: Phone },
];

const SidebarNavigation = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      <aside 
        className={`fixed z-40 inset-y-0 left-0 transform transition-all duration-300 ease-in-out bg-[#1e293b] ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 md:w-20"} md:relative shadow-xl flex flex-col`}
      >
        <div className={`p-5 flex items-center border-b border-gray-700 bg-gray-900/50 ${isSidebarOpen ? 'justify-between' : 'justify-center md:justify-center'}`}>
          {isSidebarOpen && <h2 className="text-white font-bold text-sm tracking-widest uppercase truncate">MoSPI Analytics</h2>}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1 overflow-x-hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false); // Close on mobile
                }}
                className={`w-full flex items-center px-6 py-3.5 text-sm font-semibold transition-all duration-200 border-l-4 group
                  ${isActive 
                    ? 'border-blue-400 text-white bg-white/10' 
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 hover:border-gray-600'
                  } ${isSidebarOpen ? 'space-x-3 justify-start' : 'justify-center md:px-0'}`}
                title={!isSidebarOpen ? tab.label : ''}
              >
                <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-blue-400' : 'opacity-70 group-hover:text-white'}`} />
                {isSidebarOpen && <span className="truncate">{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Official Saffron, White, and Green Accent Bottom Border */}
        <div className="w-full h-1.5 flex mt-auto shrink-0">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;
