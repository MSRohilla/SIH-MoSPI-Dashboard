import React from 'react';
import { Plane, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const center = [22.5, 78.5]; // Approx center of India

const cities = {
  DEL: { lat: 28.5562, lng: 77.1000, label: 'Delhi (DEL)' },
  BOM: { lat: 19.0896, lng: 72.8656, label: 'Mumbai (BOM)' },
  BLR: { lat: 13.1986, lng: 77.7066, label: 'Bengaluru (BLR)' },
  CCU: { lat: 22.6520, lng: 88.4463, label: 'Kolkata (CCU)' },
  HYD: { lat: 17.2403, lng: 78.4294, label: 'Hyderabad (HYD)' },
  PAT: { lat: 25.5913, lng: 85.0880, label: 'Patna (PAT)' },
};

// Volatility colors
const colors = {
  HIGH: '#ef4444', // Red
  MEDIUM: '#f59e0b', // Amber
  LOW: '#22c55e', // Green
};

const routes = [
  { from: 'DEL', to: 'BOM', volatility: 'HIGH', opacity: 0.9, weight: 4 },
  { from: 'DEL', to: 'BLR', volatility: 'MEDIUM', opacity: 0.7, weight: 3 },
  { from: 'DEL', to: 'CCU', volatility: 'LOW', opacity: 0.6, weight: 2 },
  { from: 'BOM', to: 'BLR', volatility: 'LOW', opacity: 0.6, weight: 2 },
  { from: 'BLR', to: 'HYD', volatility: 'MEDIUM', opacity: 0.7, weight: 3 },
  { from: 'CCU', to: 'PAT', volatility: 'HIGH', opacity: 0.9, weight: 4 },
];

const RouteMap = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50 h-[550px] flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <Plane className="w-5 h-5 mr-2 text-blue-600" />
            Live Network Topology (Google Maps)
          </h3>
          <p className="text-sm text-gray-500 mt-1">Real-time geographic distribution of fare volatility</p>
        </div>
        <div className="flex space-x-3 text-xs font-semibold">
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> High Volatility</div>
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Moderate</div>
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span> Stable</div>
        </div>
      </div>
      
      <div className="flex-1 rounded-xl overflow-hidden relative z-0 border border-gray-200">
        <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }} zoomControl={true}>
          {/* Using Google Maps Tile Server directly to bypass API Key requirements */}
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="Map data &copy; Google"
          />
          
          {/* Draw routes */}
          {routes.map((route, i) => {
            const start = cities[route.from];
            const end = cities[route.to];
            const positions = [
              [start.lat, start.lng],
              [end.lat, end.lng]
            ];
            
            return (
              <Polyline
                key={`route-${i}`}
                positions={positions}
                pathOptions={{ 
                  color: colors[route.volatility], 
                  weight: route.weight,
                  opacity: route.opacity,
                  dashArray: route.volatility === 'HIGH' ? '5, 5' : null
                }}
              />
            );
          })}
          
          {/* Draw Cities */}
          {Object.entries(cities).map(([code, city]) => (
            <CircleMarker 
              key={code}
              center={[city.lat, city.lng]}
              radius={7}
              pathOptions={{ fillColor: '#ea4335', color: '#ffffff', weight: 2, fillOpacity: 1 }}
            >
              <Popup>
                <div className="font-bold text-gray-900">{city.label}</div>
                <div className="text-xs text-gray-500 mt-1">Live tracking active</div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RouteMap;
