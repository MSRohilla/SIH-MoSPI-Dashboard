import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Real-Time Price Index",
    description: "Monitor live domestic airfares and track inflation.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    cta: "View Live Index",
    tabId: "overview"
  },
  {
    id: 2,
    title: "About Airfare CPI",
    description: "Understand the methodology behind India's standardized aviation CPI.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
    cta: "Read Methodology",
    tabId: "cpiBenchmark"
  },
  {
    id: 3,
    title: "City-Pair Heatmaps",
    description: "Visualize route volatility and spot price anomalies instantly.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    cta: "Explore Map",
    tabId: "routeAnalytics"
  }
];

const HomeHeroSlider = ({ setActiveTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-slate-900 group shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image - fixed object-cover to fit cleanly without scaling distortion */}
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover object-center"
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-transparent"></div>
          
          {/* Text Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
              <div 
                className={`max-w-2xl transition-all duration-1000 delay-100 transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-900/50 border border-blue-400/30 text-blue-200 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                  MoSPI Dashboard Portal
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl font-light">
                  {slide.description}
                </p>
                <button 
                  onClick={() => setActiveTab && setActiveTab(slide.tabId)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 md:py-3.5 md:px-8 rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-500/50"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Reduced size */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full bg-black/20 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md border border-white/10 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full bg-black/20 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md border border-white/10 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'bg-blue-500 w-8' : 'bg-white/50 w-2.5 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeHeroSlider;
