import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import InfoTooltip from '../ui/InfoTooltip';

const AdvancePurchaseTopology = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/advance-purchase');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching topology data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full h-full flex flex-col relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-lg">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      )}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-gray-800 font-semibold text-lg flex items-center">
            Advance Purchase Topology
            <div className="ml-2 mt-1">
              <InfoTooltip text="Illustrates the inelastic demand curve and base fare escalation across major airlines as the departure date approaches." />
            </div>
          </h3>
          <p className="text-sm text-gray-500 mt-1">Price vs. T+n Days</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="window" 
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} 
              axisLine={false} 
              tickLine={false} 
              dy={10} 
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `₹${value}`} 
              dx={-10} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                fontSize: '13px'
              }}
              formatter={(value, name) => [`₹${value}`, name.replace(/([A-Z])/g, ' $1').trim()]}
              labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 500 }} iconType="circle" formatter={(value) => value.replace(/([A-Z])/g, ' $1').trim()} />
            <Line type="monotone" dataKey="IndiGo" stroke="#1e3a8a" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="AirIndia" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="SpiceJet" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="Akasa" stroke="#818cf8" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancePurchaseTopology;
