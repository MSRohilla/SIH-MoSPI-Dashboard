import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, BarChart, Bar, Cell } from 'recharts';
import { Filter, Search, ChevronDown, Download, AlertTriangle, TrendingUp, TrendingDown, Info, PanelLeftClose, Menu, Loader2, Calendar, Check, X } from 'lucide-react';
import InfoTooltip from '../ui/InfoTooltip';
import AdvancePurchaseTopology from '../dashboard/AdvancePurchaseTopology';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0f172a] text-white p-3 rounded shadow-lg border border-gray-700 text-sm">
        <p className="font-bold border-b border-gray-700 pb-2 mb-2">{label}</p>
        {data.actual_fare && <p className="mb-1"><span className="text-gray-400">Actual Avg:</span> ₹{data.actual_fare}</p>}
        {data.sma7 && <p className="mb-1"><span className="text-red-400">7-Day SMA:</span> {data.sma7}</p>}
        {data.forecast && <p className="mb-1"><span className="text-purple-400">Forecast:</span> {data.forecast}</p>}
        {data.tag && (
          <p className="mt-2 text-xs font-semibold px-2 py-1 bg-gray-800 rounded inline-block">
            {data.tag}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const Overview = () => {
  const [selectedAirlines, setSelectedAirlines] = useState(['IndiGo', 'Air India', 'SpiceJet', 'Akasa']);
  const [selectedRoute, setSelectedRoute] = useState('All Routes');
  const [purchaseWindow, setPurchaseWindow] = useState('T+15');
  const [dateRange, setDateRange] = useState('30');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [metrics, setMetrics] = useState({ cpi: 0, daily_change: 0, anomalies: 0 });
  const [chartData, setChartData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const toggleAirline = (airline) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  const fetchData = async () => {
    setIsUpdating(true);
    try {
      const params = new URLSearchParams();
      selectedAirlines.forEach(a => params.append('airlines', a));
      params.append('route', selectedRoute);
      params.append('advance_window', purchaseWindow);
      if (dateRange !== 'Custom') params.append('days', dateRange);
      const qs = params.toString();

      // Initial Fetch for cache/baseline
      const [resMetrics, resTrends, resLogs, resComp] = await Promise.all([
        fetch(`/api/metrics?${qs}`),
        fetch(`/api/trends?${qs}`),
        fetch(`/api/audit-log?${qs}`),
        fetch(`/api/airline-comparison?${qs}`)
      ]);

      setMetrics(await resMetrics.json());
      setChartData(await resTrends.json());
      setAuditLogs(await resLogs.json());
      setComparisonData(await resComp.json());
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Establish Server-Sent Events (SSE) Stream
    const params = new URLSearchParams();
    selectedAirlines.forEach(a => params.append('airlines', a));
    params.append('route', selectedRoute);
    params.append('advance_window', purchaseWindow);
    if (dateRange !== 'Custom') params.append('days', dateRange);
    
    const eventSource = new EventSource(`/api/stream/airfare-cpi?${params.toString()}`);
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.new_log && data.metrics) {
          // Prepend new row
          setAuditLogs(prev => [data.new_log, ...prev].slice(0, 50));
          // Update live metrics
          setMetrics(data.metrics);
          // (Note: To refresh charts smoothly, we trigger background fetch without spinner)
          fetchDataSilent(); 
        }
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [selectedAirlines, selectedRoute, purchaseWindow, dateRange]); // Refetch and re-subscribe when filters change

  const fetchDataSilent = async () => {
    try {
      const params = new URLSearchParams();
      selectedAirlines.forEach(a => params.append('airlines', a));
      params.append('route', selectedRoute);
      params.append('advance_window', purchaseWindow);
      if (dateRange !== 'Custom') params.append('days', dateRange);
      const qs = params.toString();
      const [resTrends, resComp] = await Promise.all([fetch(`/api/trends?${qs}`), fetch(`/api/airline-comparison?${qs}`)]);
      setChartData(await resTrends.json());
      setComparisonData(await resComp.json());
    } catch(err) {}
  };

  const handleUpdate = () => fetchData();

  const handleExportCSV = () => {
    const params = new URLSearchParams();
    selectedAirlines.forEach(a => params.append('airlines', a));
    params.append('route', selectedRoute);
    params.append('advance_window', purchaseWindow);
    if (dateRange !== 'Custom') params.append('days', dateRange);
    window.location.href = `/api/export-csv?${params.toString()}`;
  };

  const handleValidate = (id) => {
    setAuditLogs(prev => prev.map(log => {
      if (log.id === id) {
        if (log.status === 'Anomalous') {
          setMetrics(m => ({ ...m, anomalies: Math.max(0, m.anomalies - 1) }));
        }
        return { ...log, status: 'Verified' };
      }
      return log;
    }));
  };

  const handleReject = (id) => {
    setAuditLogs(prev => prev.map(log => {
      if (log.id === id) {
        if (log.status === 'Anomalous') {
          setMetrics(m => ({ ...m, anomalies: Math.max(0, m.anomalies - 1) }));
        }
        return { ...log, status: 'Rejected' };
      }
      return log;
    }));
  };

  return (
    <div className="flex h-full bg-[#f1f5f9] animate-fade-in w-full max-w-[1600px] mx-auto relative">

      {/* LEFT SIDEBAR: FILTERS */}
      <aside className={`bg-white border-r border-gray-200 shadow-sm flex flex-col h-full sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-0 overflow-hidden border-none'}`}>
        <div className="p-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between min-w-[288px]">
          <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase flex items-center">
            <Filter className="w-4 h-4 mr-2" /> Parameters
          </h3>
          <div className="flex items-center space-x-2">
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Reset</button>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-800 p-1 rounded hover:bg-gray-200">
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6 min-w-[288px]">
          {/* Airlines Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select Airlines</h4>
            <div className="space-y-2.5">
              {['IndiGo', 'Air India', 'SpiceJet', 'Akasa'].map(airline => (
                <label key={airline} className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedAirlines.includes(airline)}
                    onChange={() => toggleAirline(airline)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-blue-700 transition-colors">{airline}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* City-Pairs Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">City-Pairs</h4>
            <div className="relative">
              <select 
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white shadow-sm appearance-none cursor-pointer text-gray-700 font-medium"
              >
                <option>All Routes (National Avg)</option>
                <option>DEL-BOM (Metro)</option>
                <option>DEL-BLR (Metro)</option>
                <option>CCU-PAT (Regional)</option>
                <option>DEL-DED (UDAN)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Advance Purchase Window Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
              Advance Purchase Window
              <InfoTooltip text="The number of days between the ticket purchase date and the actual flight departure date (e.g., T+15 means booking 15 days in advance)." />
            </h4>
            <div className="space-y-2.5">
              {['T+1', 'T+7', 'T+15', 'T+30'].map(window => (
                <label key={window} className="flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="purchaseWindow"
                    value={window}
                    checked={purchaseWindow === window}
                    onChange={() => setPurchaseWindow(window)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 transition-all cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-blue-700 transition-colors">{window} Days</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
             <button 
               onClick={handleUpdate}
               disabled={isUpdating}
               className="w-full bg-[#0f172a] hover:bg-blue-900 text-white font-medium py-2.5 rounded-md text-sm shadow-sm transition-colors flex justify-center items-center disabled:bg-gray-400"
             >
               {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />} 
               {isUpdating ? 'Updating...' : 'Update Index'}
             </button>
          </div>
        </div>
      </aside>

      {/* MAIN DASHBOARD AREA */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="bg-white border border-gray-200 shadow-sm p-1.5 rounded-md z-10 hover:bg-gray-50 text-gray-700 transition-colors mr-4"
                title="Open Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">Real-Time Price Index Analysis</h2>
              <p className="text-sm text-gray-500 mt-1">Aggregated tracking for {selectedRoute} at {purchaseWindow} days advance purchase.</p>
            </div>
          </div>
          <button onClick={handleExportCSV} className="text-sm border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded shadow-sm flex items-center transition-colors">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  Current Airfare CPI
                  <InfoTooltip text="Calculated using a modified Laspeyres index (Base Year 2012 = 100). Excludes taxes and ancillary fees." />
                </p>
                <h3 className="text-3xl font-extrabold text-gray-900">{metrics.cpi ? metrics.cpi.toFixed(1) : '0'}</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">Index Base: 100 (Jan 2012)</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-md">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  Daily % Change
                  <InfoTooltip text="Percentage difference between today's average base fare and the 7-day trailing simple moving average." />
                </p>
                <h3 className={`text-3xl font-extrabold ${metrics.daily_change >= 0 ? 'text-gray-900' : 'text-green-600'}`}>
                  {metrics.daily_change > 0 ? '+' : ''}{metrics.daily_change}%
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">Versus 7-day moving average</p>
              </div>
              <div className="bg-amber-50 p-2 rounded-md">
                {metrics.daily_change >= 0 ? <TrendingUp className="w-5 h-5 text-amber-600" /> : <TrendingDown className="w-5 h-5 text-green-600" />}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  Anomalies Detected
                  <InfoTooltip text="Outliers detected by the Z-Score machine learning model (Z > 2.5) based on historical route volatility." />
                </p>
                <h3 className="text-3xl font-extrabold text-red-600">{metrics.anomalies}</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">Requiring manual validation</p>
              </div>
              <div className="bg-red-50 p-2 rounded-md">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Large Line Chart */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  Airfare Price Trend & 7-Day Forecast
                  <InfoTooltip text="Visualizes the daily average base fare index and a 7-day trailing moving average to smooth weekday/weekend noise." />
                </h3>
                <p className="text-sm text-gray-500">Comparing Base Fare Index vs 7-Day Moving Average</p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <select 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700 bg-white"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>
            
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} minTickGap={30} />
                  <YAxis domain={['auto', 'auto']} tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', paddingBottom: '10px' }} />
                  <Area type="monotone" dataKey="dailyIndex" name="Actual Daily Average" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorIndex)" />
                  <Line type="monotone" dataKey="sma7" name="7-Day Moving Average" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="forecast" name="7-Day Forecast" stroke="#8b5cf6" strokeWidth={2} dot={false} strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Airline Price Comparison Widget */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Airline Base Fare Avg</h3>
              <p className="text-sm text-gray-500">Comparison across selected airlines</p>
            </div>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                  <YAxis type="category" dataKey="airline" tick={{ fill: '#4B5563', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '4px', fontSize: '13px' }}
                    formatter={(value) => [`₹${value}`, 'Average Fare']}
                  />
                  <Bar dataKey="avg_base_fare" radius={[0, 4, 4, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#0ea5e9'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Advance Purchase Topology Chart */}
        <div className="mb-8 h-[400px]">
          <AdvancePurchaseTopology />
        </div>

        {/* Data Table: Separating Base Fares from Taxes */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900">Extracted Pricing Audit Log</h3>
            <p className="text-sm text-gray-500">Live breakdown of base fares vs variable taxes and fees.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#f8fafc]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Transaction ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Source</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Route</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Airline</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <span className="flex items-center justify-end">
                      Base Fare
                      <InfoTooltip text="The pure fare cost isolated from taxes, fees, and surcharges." />
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Taxes & Fees</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Direct Price</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-200">OTA Price</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Status</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditLogs.map((item, idx) => {
                  const statusStyles = {
                    'Verified': 'bg-green-50/50',
                    'Anomalous': 'bg-red-50/50 border-l-4 border-red-500',
                    'Ingested': 'bg-gray-50/30',
                    'Rejected': 'bg-gray-100 opacity-50'
                  };
                  const pillColors = {
                    'Verified': 'bg-green-100 text-green-800 border-green-200',
                    'Anomalous': 'bg-red-100 text-red-800 border-red-200',
                    'Ingested': 'bg-gray-100 text-gray-800 border-gray-200',
                    'Rejected': 'bg-gray-200 text-gray-500 border-gray-300'
                  };
                  
                  return (
                    <tr key={idx} className={`transition-colors ${statusStyles[item.status] || ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{item.source || 'Airline'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.route}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.airline}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">₹{item.base_fare}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">₹{item.taxes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900">{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-blue-600">{item.source !== 'Airline' && item.ota_price ? `₹${item.ota_price.toLocaleString()}` : '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${pillColors[item.status] || 'bg-gray-100'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {(item.status === 'Anomalous' || item.status === 'Ingested') && (
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={() => handleValidate(item.id)}
                              className="p-1 rounded-md text-green-600 hover:bg-green-100 transition-colors"
                              title="Validate"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleReject(item.id)}
                              className="p-1 rounded-md text-red-600 hover:bg-red-100 transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Overview;
