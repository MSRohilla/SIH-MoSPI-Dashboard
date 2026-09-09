import React, { useState } from 'react';
import { Terminal, Code, Database, Copy, CheckCircle2 } from 'lucide-react';

const EndpointBlock = ({ method, path, description, curlSnippet, pythonSnippet, jsSnippet, jsonResponse }) => {
  const [activeTab, setActiveTab] = useState('curl');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActiveSnippet = () => {
    if (activeTab === 'curl') return curlSnippet;
    if (activeTab === 'python') return pythonSnippet;
    return jsSnippet;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
      {/* Endpoint Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded border border-emerald-200 mr-3 uppercase tracking-wide">
            {method}
          </span>
          <code className="text-gray-800 font-mono text-sm md:text-base font-semibold">{path}</code>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Request Side */}
        <div className="border-r border-gray-200 p-0 flex flex-col bg-[#0f172a]">
          <div className="flex border-b border-gray-700 bg-slate-900 px-4 pt-3">
            <button 
              onClick={() => setActiveTab('curl')}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${activeTab === 'curl' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              cURL
            </button>
            <button 
              onClick={() => setActiveTab('python')}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${activeTab === 'python' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Python
            </button>
            <button 
              onClick={() => setActiveTab('js')}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${activeTab === 'js' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Node.js
            </button>
          </div>
          <div className="p-4 flex-1 relative group">
            <button 
              onClick={() => handleCopy(getActiveSnippet())}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-gray-300 p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Copy Code"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-xs text-blue-300 font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
              {getActiveSnippet()}
            </pre>
          </div>
        </div>

        {/* Response Side */}
        <div className="p-0 flex flex-col bg-slate-900">
          <div className="border-b border-gray-700 bg-slate-800 px-6 py-2.5 flex items-center">
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Example Response (200 OK)</span>
          </div>
          <div className="p-4 flex-1 relative">
            <pre className="text-xs text-emerald-300 font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
              {jsonResponse}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApiDocs = () => {
  return (
    <div className="p-6 md:p-8 animate-fade-in max-w-[1400px] mx-auto">
      
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight flex items-center">
          <Terminal className="w-7 h-7 mr-3 text-blue-600" />
          API Documentation
        </h2>
        <p className="text-gray-500 mt-2 text-lg">Official REST APIs for integrating National Airfare Price Index datasets into third-party dashboards and macro-economic models.</p>
      </div>

      <div className="space-y-6">
        
        <EndpointBlock 
          method="GET"
          path="/api/v1/cpi/current"
          description="Fetches the latest national aggregate index and daily delta."
          curlSnippet={`curl -X GET "https://api.mospi.gov.in/api/v1/cpi/current" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
          pythonSnippet={`import requests

url = "https://api.mospi.gov.in/api/v1/cpi/current"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())`}
          jsSnippet={`const response = await fetch("https://api.mospi.gov.in/api/v1/cpi/current", {
  headers: {
    "Authorization": "Bearer YOUR_API_KEY"
  }
});

const data = await response.json();
console.log(data);`}
          jsonResponse={`{
  "timestamp": "2026-09-09T09:00:00Z",
  "index_value": 142.8,
  "base_year": 2012,
  "daily_delta_percentage": 0.4,
  "status": "official"
}`}
        />

        <EndpointBlock 
          method="GET"
          path="/api/v1/routes/{route_id}/trend"
          description="Returns the 30-day historical index & 7-day forecast for a specific city-pair."
          curlSnippet={`curl -X GET "https://api.mospi.gov.in/api/v1/routes/DEL-BOM/trend?days=30" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
          pythonSnippet={`import requests

route_id = "DEL-BOM"
url = f"https://api.mospi.gov.in/api/v1/routes/{route_id}/trend?days=30"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())`}
          jsSnippet={`const routeId = "DEL-BOM";
const response = await fetch(\`https://api.mospi.gov.in/api/v1/routes/\${routeId}/trend?days=30\`, {
  headers: {
    "Authorization": "Bearer YOUR_API_KEY"
  }
});

const data = await response.json();
console.log(data);`}
          jsonResponse={`{
  "route_id": "DEL-BOM",
  "data_points": 30,
  "trend": [
    { "date": "2026-09-08", "index": 112.4, "sma7": 110.1 },
    { "date": "2026-09-07", "index": 110.2, "sma7": 109.8 }
  ],
  "forecast_7d": [
    { "date": "2026-09-09", "index_forecast": 113.1 },
    { "date": "2026-09-10", "index_forecast": 114.5 }
  ]
}`}
        />

        <EndpointBlock 
          method="GET"
          path="/api/v1/anomalies"
          description="Lists recent flagged anomalous fare transactions requiring validation."
          curlSnippet={`curl -X GET "https://api.mospi.gov.in/api/v1/anomalies?severity=high" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
          pythonSnippet={`import requests

url = "https://api.mospi.gov.in/api/v1/anomalies"
params = {"severity": "high"}
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers, params=params)
print(response.json())`}
          jsSnippet={`const response = await fetch("https://api.mospi.gov.in/api/v1/anomalies?severity=high", {
  headers: {
    "Authorization": "Bearer YOUR_API_KEY"
  }
});

const data = await response.json();
console.log(data);`}
          jsonResponse={`{
  "count": 2,
  "anomalies": [
    {
      "tx_id": "AI-809-XYZ",
      "route": "CCU-PAT",
      "base_fare": 9500,
      "expected_avg": 4200,
      "z_score": 3.4,
      "flagged_at": "2026-09-09T08:15:00Z"
    },
    {
      "tx_id": "6E-102-ABC",
      "route": "DEL-BLR",
      "base_fare": 15400,
      "expected_avg": 6800,
      "z_score": 4.1,
      "flagged_at": "2026-09-09T08:10:00Z"
    }
  ]
}`}
        />

      </div>
    </div>
  );
};

export default ApiDocs;
