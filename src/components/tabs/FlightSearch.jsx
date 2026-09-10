import React, { useState } from 'react';
import { Search, MapPin, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import InfoTooltip from '../ui/InfoTooltip';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('BOM');
  const [travelDate, setTravelDate] = useState('');
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      const response = await fetch(`/api/flight-search?origin=${origin}&destination=${destination}&date=${travelDate}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Flight search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 animate-fade-in max-w-[1200px] mx-auto overflow-hidden">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#0f172a] tracking-tight">Real-Time Flight Search</h2>
        <p className="text-sm text-gray-500 mt-1">Search live flight prices to view their exact Base Fare calculation and Airfare CPI contribution.</p>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Origin</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <select 
                value={origin} 
                onChange={e => setOrigin(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-md border p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
              >
                <option value="DEL">New Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="BLR">Bangalore (BLR)</option>
                <option value="CCU">Kolkata (CCU)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Destination</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <select 
                value={destination} 
                onChange={e => setDestination(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-md border p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
              >
                <option value="BOM">Mumbai (BOM)</option>
                <option value="DEL">New Delhi (DEL)</option>
                <option value="BLR">Bangalore (BLR)</option>
                <option value="PAT">Patna (PAT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Travel Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="date" 
                required
                value={travelDate}
                onChange={e => setTravelDate(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-md border p-2.5 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button 
              type="submit" 
              disabled={isSearching}
              className="w-full bg-[#0f172a] hover:bg-blue-900 text-white font-medium py-2.5 px-4 rounded-md text-sm shadow-sm transition-colors flex justify-center items-center h-[42px]"
            >
              {isSearching ? 'Searching...' : <><Search className="w-4 h-4 mr-2" /> Search Flights</>}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {results && results.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No Flights Found</h3>
          <p className="text-gray-500">We couldn't find any data for the selected route and date combination.</p>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden w-full">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                Search Results: {origin} <ArrowRight className="w-4 h-4 mx-2 text-gray-400 shrink-0" /> {destination}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Displaying extracted fares and isolated base fare metrics.</p>
            </div>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#f8fafc]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Flight</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Departure</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                    <span className="flex items-center justify-end">
                      Base Fare
                      <InfoTooltip text="The pure fare cost isolated from taxes, fees, and surcharges. Used as the core variable for the Price Index." />
                    </span>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Taxes & Fees</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    <span className="flex items-center justify-center">
                      Route Airfare Index
                      <InfoTooltip text="Calculated as (Base Fare / Base Year Avg Fare) * 100 for this specific route." />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{flight.airline}</div>
                          <div className="text-xs text-gray-500">{flight.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{flight.dep}</div>
                      <div className="text-xs text-gray-500">Non-stop</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-blue-600">₹{flight.baseFare}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">₹{flight.tax}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900">₹{flight.baseFare + flight.tax}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-[#0f172a] flex items-center">
                          {flight.index}
                          {flight.index > 100 ? <TrendingUp className="w-4 h-4 text-red-500 ml-1" /> : <TrendingUp className="w-4 h-4 text-green-500 ml-1 transform rotate-180" />}
                        </span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${flight.index > 105 ? 'bg-red-100 text-red-700' : flight.index < 100 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {flight.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
