import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dailyIndexData } from '../../data/mockData';

const PrimaryChart = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col opacity-0 animate-slide-up">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Daily Airfare Price Index</h3>
        <p className="text-sm text-gray-500">With 7-Day Simple Moving Average (SMA)</p>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dailyIndexData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 11 }} 
              interval="preserveStartEnd"
              minTickGap={20}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line 
              type="monotone" 
              dataKey="dailyIndex" 
              name="Daily Index" 
              stroke="#94A3B8" 
              strokeWidth={1.5}
              dot={{ r: 2, fill: '#94A3B8' }}
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="sma7" 
              name="7-Day SMA" 
              stroke="#0B3B60" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PrimaryChart;
