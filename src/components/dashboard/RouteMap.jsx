import React from 'react';
import { Plane, AlertTriangle } from 'lucide-react';

// Relative coordinates for an abstract India-shaped topology map
const cities = {
  DEL: { x: 35, y: 25, label: 'Delhi (DEL)' },
  PAT: { x: 62, y: 38, label: 'Patna (PAT)' },
  CCU: { x: 75, y: 50, label: 'Kolkata (CCU)' },
  BOM: { x: 18, y: 62, label: 'Mumbai (BOM)' },
  HYD: { x: 38, y: 68, label: 'Hyderabad (HYD)' },
  BLR: { x: 33, y: 85, label: 'Bengaluru (BLR)' },
};

const routes = [
  { from: 'DEL', to: 'BOM', volatility: 'HIGH', label: '+12% Variance' },
  { from: 'DEL', to: 'BLR', volatility: 'MEDIUM', label: '+5% Variance' },
  { from: 'DEL', to: 'CCU', volatility: 'LOW', label: 'Stable' },
  { from: 'BOM', to: 'BLR', volatility: 'LOW', label: 'Stable' },
  { from: 'BLR', to: 'HYD', volatility: 'MEDIUM', label: '+4% Variance' },
  { from: 'CCU', to: 'PAT', volatility: 'HIGH', label: '+15% Variance' },
];

const colors = {
  HIGH: '#ef4444', // Red
  MEDIUM: '#f59e0b', // Amber
  LOW: '#22c55e', // Green
};

const RouteMap = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50 h-[550px] flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <Plane className="w-5 h-5 mr-2 text-blue-600" />
            Live Network Topology (Abstract Map)
          </h3>
          <p className="text-sm text-gray-500 mt-1">Real-time geographic distribution of fare volatility</p>
        </div>
        <div className="flex space-x-3 text-xs font-semibold">
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> High Volatility</div>
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Moderate</div>
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span> Stable</div>
        </div>
      </div>
      
      <div className="flex-1 rounded-xl overflow-hidden relative border border-gray-100 bg-[#f8fafc]">
        {/* Custom Zero-Dependency SVG Topology Map */}
        <svg className="w-full h-full" style={{ minHeight: '400px' }}>
          
          {/* Background Grid for aesthetics */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Draw connecting route lines */}
          {routes.map((route, i) => {
            const start = cities[route.from];
            const end = cities[route.to];
            const color = colors[route.volatility];
            const isHigh = route.volatility === 'HIGH';
            
            // Calculate midpoint for the label
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;

            return (
              <g key={`route-${i}`}>
                {/* Main Line */}
                <line 
                  x1={`${start.x}%`} y1={`${start.y}%`} 
                  x2={`${end.x}%`} y2={`${end.y}%`} 
                  stroke={color} 
                  strokeWidth={isHigh ? 4 : 2}
                  strokeDasharray={isHigh ? "6, 6" : "none"}
                  opacity={0.7}
                  className={isHigh ? "animate-pulse" : ""}
                />
                
                {/* Route Label Background */}
                <rect 
                  x={`${midX - 5}%`} y={`${midY - 2}%`} 
                  width="10%" height="4%" 
                  fill="white" 
                  rx="4"
                  stroke={color}
                  strokeWidth="1"
                />
                
                {/* Route Label Text */}
                <text 
                  x={`${midX}%`} y={`${midY}%`} 
                  fill={color} 
                  fontSize="10" 
                  fontWeight="bold" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                >
                  {route.label}
                </text>
              </g>
            );
          })}

          {/* Draw Cities / Nodes */}
          {Object.entries(cities).map(([code, city]) => (
            <g key={code} className="cursor-pointer hover:opacity-80 transition-opacity">
              {/* Outer Glow */}
              <circle cx={`${city.x}%`} cy={`${city.y}%`} r="12" fill="#3b82f6" opacity="0.2" className="animate-ping" />
              {/* Inner Node */}
              <circle cx={`${city.x}%`} cy={`${city.y}%`} r="6" fill="#1e293b" stroke="white" strokeWidth="2" />
              {/* City Label Box */}
              <rect x={`${city.x + 2}%`} y={`${city.y - 4}%`} width="12%" height="5%" fill="white" rx="4" opacity="0.9" />
              {/* City Name */}
              <text x={`${city.x + 3}%`} y={`${city.y - 1}%`} fill="#0f172a" fontSize="12" fontWeight="bold">
                {city.label}
              </text>
              {/* Active Tracking Status */}
              <text x={`${city.x + 3}%`} y={`${city.y + 2}%`} fill="#64748b" fontSize="9">
                Live Tracking Active
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm border border-gray-200 max-w-xs">
          <p className="text-xs text-gray-600 flex items-start">
            <AlertTriangle className="w-4 h-4 text-amber-500 mr-1.5 shrink-0" />
            <span>Abstract geographic representation. Dashed lines indicate routes experiencing &gt;10% price variance in the last 4 hours.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
