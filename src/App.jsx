import React, { useState, useEffect } from 'react';
import GIGWHeader from './components/layout/GIGWHeader';
import Navigation from './components/layout/Navigation';
import LiveTicker from './components/layout/LiveTicker';
import Home from './components/tabs/Home';
import Overview from './components/tabs/Overview';
import RouteAnalytics from './components/tabs/RouteAnalytics';
import CPIBenchmark from './components/tabs/CPIBenchmark';
import Methodology from './components/tabs/Methodology';
import FlightSearch from './components/tabs/FlightSearch';
import Reports from './components/tabs/Reports';
import ApiDocs from './components/tabs/ApiDocs';
import Contact from './components/tabs/Contact';
import Footer from './components/layout/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Force Google Translate to re-scan when React mounts new tabs
  useEffect(() => {
    const select = document.querySelector('.goog-te-combo');
    if (select && select.value && select.value !== 'en') {
      setTimeout(() => {
        select.dispatchEvent(new Event('change'));
      }, 100);
    }
  }, [activeTab]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'overview':
        return <Overview />;
      case 'routeAnalytics':
        return <RouteAnalytics />;
      case 'cpiBenchmark':
        return <CPIBenchmark />;
      case 'methodology':
        return <Methodology />;
      case 'flightSearch':
        return <FlightSearch />;
      case 'reports':
        return <Reports />;
      case 'apiDocs':
        return <ApiDocs />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans">
      <GIGWHeader />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <LiveTicker />
      
      <main className="flex-grow w-full bg-[#f1f5f9] flex flex-col">
        {renderActiveTab()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
