import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { airlineBreakdownData } from '../../data/mockData';

const SecondaryChart = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col opacity-0 animate-slide-up-delayed">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Airline-wise Fare Breakdown</h3>
        <p className="text-sm text-gray-500">Base Fare, Taxes, and Ancillary</p>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={airlineBreakdownData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="airline" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="BaseFare" name="Base Fare" stackId="a" fill="#0B3B60" />
            <Bar dataKey="Taxes" name="Taxes & Fees" stackId="a" fill="#FF9933" />
            <Bar dataKey="Ancillary" name="Ancillary" stackId="a" fill="#138808" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SecondaryChart;
