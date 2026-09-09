import React from 'react';
import { Plane } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Polyline, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem'
};

const center = {
  lat: 22.5,
  lng: 78.5
};

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
            Route Pricing Volatility Map
          </h3>
          <p className="text-sm text-gray-500">Live monitoring of pricing anomalies across network topology (Powered by Google Maps)</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-3 text-xs font-bold text-gray-600">
            <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span> High</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-amber-500 rounded-full mr-1"></span> Med</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> Low</span>
          </div>
          <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-green-600 uppercase">System Active</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-inner">
        {!isLoaded ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Loading Google Maps...
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4.5}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: [
                {
                  "elementType": "geometry",
                  "stylers": [{"color": "#f5f5f5"}]
                },
                {
                  "elementType": "labels.icon",
                  "stylers": [{"visibility": "off"}]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [{"color": "#616161"}]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [{"color": "#f5f5f5"}]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "labels.text.fill",
                  "stylers": [{"color": "#bdbdbd"}]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [{"color": "#cbf0ff"}]
                }
              ]
            }}
          >
            {/* Markers for Airports */}
            {Object.keys(cities).map(city => (
              <Marker
                key={city}
                position={{ lat: cities[city].lat, lng: cities[city].lng }}
                label={{
                  text: city,
                  color: '#1e293b',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  className: 'mt-6 bg-white px-1 rounded shadow-sm border border-gray-200'
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 6,
                  fillColor: '#2563eb',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
              />
            ))}

            {/* Polylines for Routes */}
            {routes.map((route, idx) => {
              const start = cities[route.from];
              const end = cities[route.to];
              return (
                <Polyline
                  key={idx}
                  path={[
                    { lat: start.lat, lng: start.lng },
                    { lat: end.lat, lng: end.lng }
                  ]}
                  options={{
                    strokeColor: colors[route.volatility],
                    strokeOpacity: route.opacity,
                    strokeWeight: route.weight,
                    geodesic: true, // Creates realistic curved flight paths on a globe
                  }}
                />
              );
            })}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default RouteMap;
