import React from 'react';
import HomeHeroSlider from '../ui/HomeHeroSlider';
import { ArrowRight, LineChart, Map, BookOpen, Search } from 'lucide-react';

const Home = ({ setActiveTab }) => {
  const features = [
    { id: 'overview', title: 'Real-Time Price Index', desc: 'Monitor live domestic airfares and track inflation.', icon: LineChart, color: 'bg-blue-50 text-blue-600' },
    { id: 'routeAnalytics', title: 'City-Pair Heatmaps', desc: 'Visualize route volatility and pricing anomalies.', icon: Map, color: 'bg-indigo-50 text-indigo-600' },
    { id: 'cpiBenchmark', title: 'Airfare CPI', desc: 'Understand the methodology behind the index.', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'flightSearch', title: 'Flight Search', desc: 'Search current fares mapped against the base index.', icon: Search, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="flex flex-col w-full min-h-full pb-10">
      <HomeHeroSlider setActiveTab={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">MoSPI Dashboard Modules</h2>
          <p className="text-slate-500 mt-1">Select a module to begin exploring national aviation pricing data.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <button 
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-left flex flex-col items-start group"
              >
                <div className={`p-3 rounded-lg \${feat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1">{feat.desc}</p>
                <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800">
                  Access Module <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
