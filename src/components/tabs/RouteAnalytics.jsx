import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, Legend, PieChart, Pie } from 'recharts';
import { scatterDistanceData, regionalFaresData } from '../../data/mockData';
import { Map, MapPin, Navigation } from 'lucide-react';
import RouteMap from '../dashboard/RouteMap';

const CATEGORY_COLORS = {
  Metro: '#0B3B60',
  Regional: '#FF9933',
  Leisure: '#138808',
  UDAN: '#6366F1'
};

const routeWeightData = [
  { name: 'DEL-BOM', category: 'Metro Trunk', weight: 32, color: '#1e3a8a' }, // navy
  { name: 'DEL-BLR', category: 'Tech Corridor', weight: 24, color: '#4f46e5' }, // indigo
  { name: 'CCU-PAT', category: 'Regional High-Density', weight: 16, color: '#0d9488' }, // teal
  { name: 'DEL-DED', category: 'UDAN Regional', weight: 12, color: '#d97706' }, // amber
  { name: 'Others', category: 'Tier-2/3 Network', weight: 16, color: '#64748b' } // slate
];

const RouteAnalytics = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full opacity-0 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Route Analytics</h2>
        <div className="flex space-x-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 flex items-center">
            <Map className="w-3 h-3 mr-1" /> 124 Routes Tracked
          </span>
        </div>
      </div>

      <div className="mb-6 opacity-0 animate-slide-up-delayed">
        <RouteMap />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Scatter Chart: Distance vs Fare */}
        <div className="bg-white p-5 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col opacity-0 animate-slide-up">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">Distance vs Fare Distribution</h3>
            <p className="text-sm text-gray-500">Categorized by Route Type</p>
          </div>
          <div className="flex-1 w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis type="number" dataKey="distance" name="Distance (km)" unit="km" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="fare" name="Fare (₹)" unit="₹" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Scatter name="Routes" data={scatterDistanceData}>
                  {scatterDistanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            {Object.keys(CATEGORY_COLORS).map(key => (
              <div key={key} className="flex items-center text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: CATEGORY_COLORS[key] }}></span>
                {key}
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Regional Fares */}
        <div className="bg-white p-5 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col opacity-0 animate-slide-up-delayed">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">Zonal Fare Averages</h3>
            <p className="text-sm text-gray-500">Metro vs Regional comparison across India</p>
          </div>
          <div className="flex-1 w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalFaresData} margin={{ top: 10, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="region" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} cursor={{ fill: '#F3F4F6' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Metro" fill="#0B3B60" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Regional" fill="#FF9933" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Route Weightage */}
        <div className="bg-white p-5 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col opacity-0 animate-slide-up-slow">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">Route Traffic Share</h3>
            <p className="text-sm text-gray-500">CPI Basket Passenger Volume Weightage</p>
          </div>
          <div className="flex-1 w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded shadow-lg border border-gray-100 text-sm">
                          <p className="font-bold text-gray-900 mb-1">{data.name}</p>
                          <p className="text-gray-500 mb-1">{data.category}</p>
                          <p className="text-blue-600 font-bold">Weight: {data.weight}%</p>
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
                <Pie
                  data={routeWeightData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="weight"
                  stroke="none"
                >
                  {routeWeightData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Volatile Routes Table */}
      <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden opacity-0 animate-slide-up-slow">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-red-600" />
            Top 5 Most Volatile Routes (7 Days)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volatility Index</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare Range (₹)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">DEL</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">SXR</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Leisure</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">+24.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5,400 - 18,200</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">BOM</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">GOI</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Leisure</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">+18.2%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,100 - 12,500</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">DEL</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">CCU</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Metro</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600 font-bold">+14.1%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4,800 - 9,200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RouteAnalytics;
