import React from 'react';
import { TrendingUp, AlertTriangle, Activity, Database } from 'lucide-react';

const KPIGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* KPI 1 */}
      <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex items-start justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">National Index</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-gray-900">142.8</h3>
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +4.18% MoM
            </span>
          </div>
        </div>
        <div className="p-2 bg-blue-50 rounded-2xl">
          <Activity className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* KPI 2 */}
      <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex items-start justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">CPI Divergence</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-gray-900">+1.84%</h3>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Leading Indicator
            </span>
          </div>
        </div>
        <div className="p-2 bg-amber-50 rounded-2xl">
          <TrendingUp className="w-6 h-6 text-amber-600" />
        </div>
      </div>

      {/* KPI 3 */}
      <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex items-start justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">Volatile Sector</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-gray-900">DEL-CCU</h3>
            <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> 18.4% surge
            </span>
          </div>
        </div>
        <div className="p-2 bg-red-50 rounded-2xl">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
      </div>

      {/* KPI 4 */}
      <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex items-start justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">Ingestion Volume</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-gray-900">128,450</h3>
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              99.2% Valid
            </span>
          </div>
        </div>
        <div className="p-2 bg-purple-50 rounded-2xl">
          <Database className="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </div>
  );
};

export default KPIGrid;
