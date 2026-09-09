import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Calendar, Filter } from 'lucide-react';

const ReportCard = ({ title, description, reportType }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format) => {
    setIsDownloading(true);
    try {
      // Construct URL with query params
      const url = new URL('/api/reports/export', window.location.origin);
      url.searchParams.append('reportType', reportType);
      url.searchParams.append('format', format);
      if (startDate) url.searchParams.append('startDate', startDate);
      if (endDate) url.searchParams.append('endDate', endDate);

      // Fetch the file
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const blob = await response.blob();
      
      // Extract filename from headers if possible, otherwise construct a default
      let filename = `${reportType}_report.${format === 'excel' ? 'xlsx' : 'csv'}`;
      const disposition = response.headers.get('Content-Disposition');
      if (disposition && disposition.indexOf('filename=') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) { 
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // Create a temporary link to trigger download
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download report. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="mb-4 flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
      
      {/* Date Range Picker */}
      <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-100">
        <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          <Filter className="w-3.5 h-3.5 mr-1.5" /> Filter by Date
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-8 block w-full border-gray-300 rounded border p-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">End Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pl-8 block w-full border-gray-300 rounded border p-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button 
          onClick={() => handleDownload('csv')}
          disabled={isDownloading}
          className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium py-2 px-4 rounded text-sm transition-colors disabled:opacity-50"
        >
          <FileText className="w-4 h-4 mr-2 text-gray-400" />
          CSV
        </button>
        <button 
          onClick={() => handleDownload('excel')}
          disabled={isDownloading}
          className="flex items-center justify-center bg-[#107c41] hover:bg-[#0c6b37] text-white font-medium py-2 px-4 rounded text-sm transition-colors shadow-sm disabled:opacity-50"
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Excel
        </button>
      </div>
    </div>
  );
};

const Reports = () => {
  const reportsData = [
    {
      title: "Monthly Airfare CPI Summary",
      reportType: "cpi-summary",
      description: "Aggregated monthly base fare averages and overall volume. Ideal for broad macroeconomic analysis and historical inflation tracking."
    },
    {
      title: "Route-wise Volatility Report",
      reportType: "volatility",
      description: "Details the price spread (Max minus Min) across all tracked routes grouped by advance purchase windows. Useful for anomaly pattern detection."
    },
    {
      title: "Raw Extraction Logs",
      reportType: "raw-logs",
      description: "Unfiltered, raw flight pricing data directly from the ingestion pipeline including specific flight IDs, base fares, and exact timestamps."
    }
  ];

  return (
    <div className="p-6 md:p-8 animate-fade-in max-w-[1400px] mx-auto">
      <div className="mb-8 flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight flex items-center">
            <Download className="w-6 h-6 mr-2 text-blue-600" />
            Reports & Data Export
          </h2>
          <p className="text-sm text-gray-500 mt-2">Generate and download official analytical extracts from the National Airfare Price Index database.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportsData.map((report, idx) => (
          <ReportCard 
            key={idx}
            title={report.title}
            description={report.description}
            reportType={report.reportType}
          />
        ))}
      </div>
    </div>
  );
};

export default Reports;
