import React, { useState, useEffect } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';

const GIGWHeader = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const [isHighContrast, setIsHighContrast] = useState(false);
  
  // Apply High Contrast
  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    if (!isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  // Font Size Adjustments
  const adjustFontSize = (adjustment) => {
    const root = document.documentElement;
    let currentSize = parseFloat(window.getComputedStyle(root).fontSize);
    
    if (adjustment === 'reset') {
      root.style.fontSize = '16px';
    } else if (adjustment === 'increase' && currentSize < 24) {
      root.style.fontSize = `${currentSize + 2}px`;
    } else if (adjustment === 'decrease' && currentSize > 12) {
      root.style.fontSize = `${currentSize - 2}px`;
    }
  };

  return (
    <header className="w-full flex flex-col font-sans shrink-0 bg-white">
      {/* Fixed Top Utility Header Strip */}
      <div className="bg-[#0f172a] text-white text-[11px] font-medium py-1.5 px-4 flex justify-between items-center relative z-50">
        
        {/* Left Side: Accessibility Links */}
        <div className="flex items-center space-x-4">
          <a href="#main-content" className="hover:text-blue-300 transition-colors focus:ring-1 focus:ring-white px-1">
            {language === 'English' ? 'Skip to Main Content' : 'मुख्य सामग्री पर जाएं'}
          </a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:text-blue-300 transition-colors focus:ring-1 focus:ring-white px-1">
            {language === 'English' ? 'Screen Reader Access' : 'स्क्रीन रीडर एक्सेस'}
          </a>
        </div>

        {/* Right Side: Global Settings */}
        <div className="flex items-center space-x-4">
          
          {/* Font Size Toggles */}
          <div className="flex items-center space-x-2 bg-white/10 px-2 py-0.5 rounded">
            <button onClick={() => adjustFontSize('decrease')} className="hover:text-blue-300 focus:ring-1 focus:ring-white px-1 font-bold" title="Decrease font size">A-</button>
            <button onClick={() => adjustFontSize('reset')} className="hover:text-blue-300 focus:ring-1 focus:ring-white px-1 font-bold" title="Standard font size">A</button>
            <button onClick={() => adjustFontSize('increase')} className="hover:text-blue-300 focus:ring-1 focus:ring-white px-1 font-bold" title="Increase font size">A+</button>
          </div>

          {/* High Contrast Toggle */}
          <button 
            onClick={toggleHighContrast}
            className="flex items-center hover:text-blue-300 transition-colors px-2 py-0.5 bg-white/10 rounded focus:ring-1 focus:ring-white"
            title="High Contrast Mode"
          >
            {isHighContrast ? <Sun className="w-3 h-3 mr-1.5" /> : <Moon className="w-3 h-3 mr-1.5" />}
            {language === 'English' ? (isHighContrast ? 'Standard Contrast' : 'High Contrast') : (isHighContrast ? 'मानक कंट्रास्ट' : 'उच्च कंट्रास्ट')}
          </button>

          {/* Language Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center hover:text-blue-300 transition-colors bg-white/10 px-2 py-0.5 rounded focus:ring-1 focus:ring-white"
              onClick={() => setLangOpen(!langOpen)}
            >
              {language}
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>
            
            {langOpen && (
              <div className="absolute right-0 mt-1 w-24 bg-white rounded shadow-lg overflow-hidden border border-gray-200 z-50">
                <button 
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-800 hover:bg-blue-50 font-medium transition-colors"
                  onClick={() => { setLanguage('English'); setLangOpen(false); }}
                >
                  English
                </button>
                <button 
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-800 hover:bg-blue-50 font-medium transition-colors"
                  onClick={() => { setLanguage('हिन्दी'); setLangOpen(false); }}
                >
                  हिन्दी
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Formal Thick Branding Banner */}
      <div className="max-w-[1400px] mx-auto w-full px-6 py-4 flex justify-between items-center bg-white relative z-40">
        
        {/* Left: Emblem and Ministry Details */}
        <div className="flex items-center space-x-5">
          {/* Real State Emblem Image */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="State Emblem of India" 
            className="h-20 w-auto object-contain"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          {/* Fallback if image fails to load */}
          <div className="hidden w-14 h-20 border border-gray-300 flex-col items-center justify-center bg-gray-50 rounded-sm">
             <div className="w-6 h-6 border border-gray-400 rounded-full mb-1 flex items-center justify-center">
               <span className="text-[8px] font-bold text-gray-500">🦁</span>
             </div>
             <span className="text-[6px] font-bold text-gray-500 tracking-wider text-center leading-[1.2]">सत्यमेव जयते<br/>GOVERNMENT<br/>OF INDIA</span>
          </div>
          
          <div className="flex flex-col justify-center border-l-2 border-gray-300 pl-5">
            <h1 className="text-xl md:text-2xl font-extrabold text-[#0B1528] tracking-tight">
              {language === 'English' ? 'Ministry of Statistics and Programme Implementation (MoSPI)' : 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय'}
            </h1>
            <h2 className="text-base md:text-lg font-bold text-gray-600 mt-0.5">
              {language === 'English' ? 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय' : 'Ministry of Statistics and Programme Implementation'}
            </h2>
          </div>
        </div>

        {/* Right: Campaign Logos */}
        <div className="flex items-center space-x-6 hidden lg:flex">
          {/* Swachh Bharat Logo - Uploaded Image */}
          <div className="flex flex-col items-center justify-center opacity-90 hover:opacity-100 transition-opacity" title="Swachh Bharat">
            <img src="/swachh-bharat.png" alt="Swachh Bharat Abhiyan" className="h-12 w-auto object-contain" />
          </div>

          <div className="h-10 w-px bg-gray-200 mx-2"></div>

          {/* Amrit Mahotsav Logo - Uploaded Image */}
          <div className="flex items-center justify-center space-x-2 opacity-90 hover:opacity-100 transition-opacity" title="Azadi Ka Amrit Mahotsav">
            <img src="/amrit-mahotsav.png" alt="Azadi Ka Amrit Mahotsav" className="h-14 w-auto object-contain" />
          </div>
        </div>

      </div>

    </header>
  );
};

export default GIGWHeader;
