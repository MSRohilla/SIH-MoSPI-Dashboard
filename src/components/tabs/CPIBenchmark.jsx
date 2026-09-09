import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cpiBasketData } from '../../data/mockData';
import { Target, TrendingDown, Scale } from 'lucide-react';

const COLORS = ['#0B3B60', '#FF9933', '#138808', '#6366F1'];

const CPIBenchmark = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full opacity-0 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">CPI Benchmark & Correlation</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 opacity-0 animate-slide-up">
        <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col items-center justify-center text-center">
          <Target className="w-10 h-10 text-blue-600 mb-3" />
          <p className="text-sm text-gray-500 font-medium">NAPI-CPI Correlation (r)</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">0.87</h3>
          <p className="text-xs text-green-600 mt-2 bg-green-50 px-2 py-1 rounded-full">Strong Positive</p>
        </div>
        <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col items-center justify-center text-center">
          <Scale className="w-10 h-10 text-amber-600 mb-3" />
          <p className="text-sm text-gray-500 font-medium">Airfare Weight in Transport CPI</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">10.0%</h3>
          <p className="text-xs text-gray-500 mt-2">MoSPI Base 2012=100</p>
        </div>
        <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col items-center justify-center text-center">
          <TrendingDown className="w-10 h-10 text-red-600 mb-3" />
          <p className="text-sm text-gray-500 font-medium">Policy Alert Threshold</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">&gt; 15%</h3>
          <p className="text-xs text-red-600 mt-2 bg-red-50 px-2 py-1 rounded-full">Deviation triggers review</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-0 animate-slide-up-delayed min-h-[400px] flex flex-col">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-bold text-gray-800">Transport CPI Basket Composition</h3>
            <p className="text-sm text-gray-500">Distribution of modes based on Official MoSPI data</p>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cpiBasketData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {cpiBasketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-0 animate-slide-up-slow flex flex-col justify-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Analysis Summary</h3>
          <div className="space-y-6 text-gray-700">
            <p>
              The <strong>National Airfare Price Index (NAPI)</strong> demonstrates a strong positive correlation (r = 0.87) with the official Transport and Communication CPI component published by MoSPI.
            </p>
            <p>
              Airfare currently constitutes approximately <strong>10%</strong> of the total transport basket weight. Due to dynamic pricing algorithms used by airlines, it introduces a highly volatile sub-component into the otherwise stable transport inflation metric.
            </p>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">Policy Implication</h4>
              <p className="text-sm text-blue-800">
                When NAPI deviates from the baseline CPI trend by more than 15%, it serves as a leading indicator of inflation spikes, triggering an automated policy alert for the Ministry of Civil Aviation and MoSPI for intervention planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPIBenchmark;
