import React, { useState } from 'react';
import { auditFeedData } from '../../data/mockData';
import { CheckCircle, AlertCircle, Clock, XCircle, FileJson } from 'lucide-react';
import Modal from '../ui/Modal';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Verified':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 transition-colors">
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </span>
      );
    case 'Anomalous':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 cursor-pointer hover:bg-red-200 transition-colors animate-pulse">
          <XCircle className="w-3 h-3 mr-1" />
          Anomalous
        </span>
      );
    case 'Flagged':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 cursor-pointer hover:bg-amber-200 transition-colors">
          <AlertCircle className="w-3 h-3 mr-1" />
          Flagged
        </span>
      );
    case 'Ingested':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors">
          <Clock className="w-3 h-3 mr-1" />
          Ingested
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer">
          {status}
        </span>
      );
  }
};

const DataTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Live Scraper Audit Feed</h3>
          <button 
            onClick={() => setIsLogsModalOpen(true)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 transition-colors"
          >
            <FileJson className="w-4 h-4 mr-1.5" />
            View Full Logs
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditFeedData.map((row) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(row)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{row.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.airline}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(row.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row Detail Modal */}
      <Modal 
        isOpen={!!selectedRow} 
        onClose={() => setSelectedRow(null)}
        title={selectedRow ? `Transaction Detail: ${selectedRow.id}` : ''}
      >
        {selectedRow && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900">{selectedRow.route}</h4>
                <p className="text-gray-500 font-medium">{selectedRow.airline} | Flight Date: T-14</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{selectedRow.price}</div>
                <div className="mt-1">{getStatusBadge(selectedRow.status)}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-2xl border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h5 className="font-bold text-gray-800 mb-2">Automated Validation Logic</h5>
              {selectedRow.status === 'Anomalous' ? (
                <p className="text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  <strong>Anomaly Detected:</strong> Fare exceeds the 3-sigma standard deviation for this route's historical 14-day advance booking curve. Manual review by MoSPI nodal officer required.
                </p>
              ) : selectedRow.status === 'Verified' ? (
                <p className="text-green-700 text-sm">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  <strong>Validation Passed:</strong> Fare falls within expected historical bounds (±5% moving average). Safely ingested into the NAPI calculation matrix.
                </p>
              ) : (
                <p className="text-blue-700 text-sm">
                  <Clock className="w-4 h-4 inline mr-1" />
                  <strong>Processing:</strong> Data has been scraped and is currently waiting in the Kafka queue for ML boundary validation.
                </p>
              )}
            </div>
            
            <div>
              <h5 className="font-bold text-gray-800 mb-2">Raw JSON Payload</h5>
              <pre className="bg-[#1A202C] text-green-400 p-4 rounded-2xl text-xs overflow-x-auto font-mono">
{JSON.stringify({
  transaction_id: selectedRow.id,
  scrape_timestamp: selectedRow.date,
  route: selectedRow.route,
  carrier: selectedRow.airline,
  fare_components: {
    base_fare: parseInt(selectedRow.price.replace(/[^0-9]/g, '')) * 0.8,
    taxes: parseInt(selectedRow.price.replace(/[^0-9]/g, '')) * 0.2
  },
  validation_status: selectedRow.status.toUpperCase()
}, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Modal>

      {/* Full Logs Modal */}
      <Modal 
        isOpen={isLogsModalOpen} 
        onClose={() => setIsLogsModalOpen(false)}
        title="Live System Logs"
      >
        <div className="bg-[#1A202C] text-gray-300 font-mono text-xs p-4 rounded-2xl h-[400px] overflow-y-auto">
          <div className="text-blue-400">[SYSTEM] Initialization complete. Connected to Kafka stream.</div>
          <div className="text-gray-400">2026-09-08 09:01:12 - Scraper agent spawned for MakeMyTrip (Route: DEL-BOM)</div>
          <div className="text-gray-400">2026-09-08 09:01:15 - Scraper agent spawned for Yatra (Route: DEL-BLR)</div>
          <div className="text-green-400">2026-09-08 09:02:01 - Successfully extracted 450 items from DEL-BOM.</div>
          <div className="text-yellow-400">2026-09-08 09:02:18 - WARN: CAPTCHA detected on Indigo portal. Rotating proxy...</div>
          <div className="text-gray-400">2026-09-08 09:02:30 - Proxy rotated successfully. Resuming extraction.</div>
          <div className="text-green-400">2026-09-08 09:05:00 - ML Pipeline: Processed 1200 rows. Anomalies detected: 14</div>
          <div className="text-red-400">2026-09-08 09:05:12 - ALERT: TXN-88291C flagged as ANOMALOUS (Z-Score: 3.4). Dispatching to review queue.</div>
          <div className="animate-pulse mt-4 text-white">Waiting for incoming streams...</div>
        </div>
      </Modal>
    </>
  );
};

export default DataTable;
