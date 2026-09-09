import React from 'react';
import { Calculator, Server, Filter, BarChart, ShieldCheck, Database, Calendar } from 'lucide-react';

const Methodology = () => {
  return (
    <div className="p-6 md:p-8 animate-fade-in max-w-[1200px] mx-auto space-y-8">
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight">Index Methodology</h2>
        <p className="text-gray-500 mt-2 text-lg">Detailed mathematical framework, data collection pipeline, and cohort dynamics for the National Airfare Price Index.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Index Formula */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Calculator className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Mathematical Framework (Modified Laspeyres)</h3>
              <p className="text-sm text-gray-500">Measuring the inflation of a fixed basket of aviation routes.</p>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-8 my-6 shadow-inner flex items-center justify-center overflow-x-auto">
            {/* Styled Math Block */}
            <div className="text-slate-100 text-2xl md:text-3xl font-serif tracking-widest whitespace-nowrap">
              CPI = <span className="text-slate-400">[</span> 
              <span className="text-white"> Σ (</span>
              <span className="text-emerald-400 font-bold">P<sub className="text-sm">it</sub></span>
              <span className="text-slate-400"> × </span>
              <span className="text-amber-400 font-bold">W<sub className="text-sm">i</sub></span>
              <span className="text-white">)</span>
              <span className="text-slate-500 mx-3">/</span>
              <span className="text-white">Σ (</span>
              <span className="text-blue-400 font-bold">P<sub className="text-sm">i0</sub></span>
              <span className="text-slate-400"> × </span>
              <span className="text-amber-400 font-bold">W<sub className="text-sm">i</sub></span>
              <span className="text-white">)</span>
              <span className="text-slate-400"> ]</span> 
              <span className="text-slate-300"> × 100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
              <div className="text-emerald-700 font-bold text-lg mb-1">P<sub className="text-xs">it</sub> : Current Price</div>
              <p className="text-sm text-emerald-600 leading-tight">The 7-day smoothed average base fare of a specific route cohort at time <i>t</i>.</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <div className="text-blue-700 font-bold text-lg mb-1">P<sub className="text-xs">i0</sub> : Base Price (2012)</div>
              <p className="text-sm text-blue-600 leading-tight">The historical average base fare of that identical route cohort during the Base Year.</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
              <div className="text-amber-700 font-bold text-lg mb-1">W<sub className="text-xs">i</sub> : Route Weight</div>
              <p className="text-sm text-amber-600 leading-tight">The fixed passenger traffic weight assigned to that route based on annual DGCA volume data.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Data Ingestion & Cleaning Pipeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center mb-8">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <Database className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Data Ingestion & Cleaning Pipeline</h3>
              <p className="text-sm text-gray-500">How raw OTA data is transformed into a verified macroeconomic index.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-2">
            
            {/* Step 1 */}
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-5 relative text-center">
              <div className="mx-auto bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center mb-3 border border-slate-100">
                <Server className="w-5 h-5 text-slate-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">1. Scraping</h4>
              <p className="text-xs text-slate-500">Live API ingestion from Airlines and OTAs.</p>
            </div>

            <div className="hidden md:block text-slate-300">➔</div>

            {/* Step 2 */}
            <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-5 relative text-center">
              <div className="mx-auto bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center mb-3 border border-blue-100">
                <Filter className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800 text-sm mb-1">2. Tax Segregation</h4>
              <p className="text-xs text-blue-600">Isolating base fare from UDF and taxes.</p>
            </div>

            <div className="hidden md:block text-slate-300">➔</div>

            {/* Step 3 */}
            <div className="flex-1 bg-amber-50 border border-amber-200 rounded-lg p-5 relative text-center">
              <div className="mx-auto bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center mb-3 border border-amber-100">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="font-bold text-amber-800 text-sm mb-1">3. ML Outlier Filter</h4>
              <p className="text-xs text-amber-700">Z-Score evaluation (Z &gt; 2.5) removes anomalies.</p>
            </div>

            <div className="hidden md:block text-slate-300">➔</div>

            {/* Step 4 */}
            <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-lg p-5 relative text-center">
              <div className="mx-auto bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center mb-3 border border-emerald-100">
                <BarChart className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-bold text-emerald-800 text-sm mb-1">4. Index Aggregation</h4>
              <p className="text-xs text-emerald-700">Weighted SMA calculation into Final CPI.</p>
            </div>

          </div>
        </div>

        {/* Section 3: Advance Windows */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <Calendar className="w-6 h-6 text-orange-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Advance Purchase Booking Dynamics</h3>
              <p className="text-sm text-gray-500">The index strictly categorizes fares based on the lead-time before departure.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex-1 min-w-[200px] border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <span className="inline-block bg-red-100 text-red-700 font-bold text-xs px-3 py-1 rounded-full mb-3 border border-red-200">T+1 Window</span>
              <p className="text-sm text-gray-600">Booking 24 hours prior to departure. Captures extreme inelastic corporate and emergency demand. Highest pricing volatility.</p>
            </div>
            
            <div className="flex-1 min-w-[200px] border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <span className="inline-block bg-amber-100 text-amber-700 font-bold text-xs px-3 py-1 rounded-full mb-3 border border-amber-200">T+7 Window</span>
              <p className="text-sm text-gray-600">Booking 7 days in advance. Standard short-term business travel. Represents medium-to-high pricing tiers.</p>
            </div>
            
            <div className="flex-1 min-w-[200px] border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <span className="inline-block bg-blue-100 text-blue-700 font-bold text-xs px-3 py-1 rounded-full mb-3 border border-blue-200">T+15 Window</span>
              <p className="text-sm text-gray-600">Booking 15 days in advance. Balanced mix of proactive business and leisure travel. Used as the primary benchmark.</p>
            </div>
            
            <div className="flex-1 min-w-[200px] border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <span className="inline-block bg-emerald-100 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full mb-3 border border-emerald-200">T+30 Window</span>
              <p className="text-sm text-gray-600">Booking 30+ days in advance. Pure leisure travel with highest elasticity. Represents the baseline floor pricing.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Methodology;
