import React from 'react';
import { Plane } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Polyline, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem'
};

const center = { lat: 22.5, lng: 78.5 };

const cities = {
  DEL: { lat: 28.5562, lng: 77.1000, label: 'Delhi (DEL)' },
  BOM: { lat: 19.0896, lng: 72.8656, label: 'Mumbai (BOM)' },
  BLR: { lat: 13.1986, lng: 77.7066, label: 'Bengaluru (BLR)' },
  CCU: { lat: 22.6520, lng: 88.4463, label: 'Kolkata (CCU)' },
  HYD: { lat: 17.2403, lng: 78.4294, label: 'Hyderabad (HYD)' },
  PAT: { lat: 25.5913, lng: 85.0880, label: 'Patna (PAT)' },
};

const colors = { HIGH: '#ef4444', MEDIUM: '#f59e0b', LOW: '#22c55e' };

const routes = [
  { from: 'DEL', to: 'BOM', volatility: 'HIGH', opacity: 0.9, weight: 4 },
  { from: 'DEL', to: 'BLR', volatility: 'MEDIUM', opacity: 0.7, weight: 3 },
  { from: 'DEL', to: 'CCU', volatility: 'LOW', opacity: 0.6, weight: 2 },
  { from: 'BOM', to: 'BLR', volatility: 'LOW', opacity: 0.6, weight: 2 },
  { from: 'BLR', to: 'HYD', volatility: 'MEDIUM', opacity: 0.7, weight: 3 },
  { from: 'CCU', to: 'PAT', volatility: 'HIGH', opacity: 0.9, weight: 4 },
];

const RouteMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50 h-[550px] flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <Plane className="w-5 h-5 mr-2 text-blue-600" />
            Live Network Topology
          </h3>
          <p className="text-sm text-gray-500 mt-1">Real-time geographic distribution of fare volatility</p>
        </div>
      </div>
      
      <div className="flex-1 rounded-xl overflow-hidden relative z-0 border border-gray-200">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            options={{ disableDefaultUI: true }}
          >
            {routes.map((route, i) => (
              <Polyline
                key={i}
                path={[
                  { lat: cities[route.from].lat, lng: cities[route.from].lng },
                  { lat: cities[route.to].lat, lng: cities[route.to].lng }
                ]}
                options={{
                  strokeColor: colors[route.volatility],
                  strokeWeight: route.weight,
                  strokeOpacity: route.opacity,
                }}
              />
            ))}
            {Object.keys(cities).map((key) => (
              <Marker
                key={key}
                position={{ lat: cities[key].lat, lng: cities[key].lng }}
                label={{ text: cities[key].label, fontSize: '12px', fontWeight: 'bold' }}
              />
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            Loading Google Maps...
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteMap;
