import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { leadTimeData } from '../../data/mockData';

const LeadTimeChart = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col opacity-0 animate-slide-up-slow">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Lead Time Elasticity (T-n Days)</h3>
        <p className="text-sm text-gray-500">Advance Purchase vs Fare & Elasticity</p>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={leadTimeData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="daysOut" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar yAxisId="left" dataKey="avgFare" name="Average Fare (₹)" barSize={40} fill="#6366F1" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="elasticity" name="Price Elasticity" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadTimeChart;
