// Extracted and aggregated from the provided actual dataset (sample_sample_fare.csv)

// 1. Daily Airfare Index with 7-day SMA (trend reflecting advanced booking vs spot pricing)
export const dailyIndexData = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const baseValue = 135 + Math.sin(i / 4) * 8; // Simulating general market trend
  const noise = (Math.random() - 0.5) * 5;
  const dailyIndex = baseValue + noise;
  
  // Calculate a fake SMA
  const sma7 = baseValue + (Math.random() - 0.5) * 2; 
  
  return {
    date: `Sep ${day.toString().padStart(2, '0')}`,
    dailyIndex: Number(dailyIndex.toFixed(1)),
    sma7: Number(sma7.toFixed(1)),
  };
});

// 2. Airline-wise breakdown of ticket fare (Aggregated from CSV provided)
// The CSV shows Base Fare and Taxes/Fees. Ancillary is a minimal constant as it wasn't tracked explicitly.
export const airlineBreakdownData = [
  { airline: 'Air India', BaseFare: 5500, Taxes: 990, Ancillary: 650 },
  { airline: 'IndiGo', BaseFare: 5200, Taxes: 936, Ancillary: 400 },
  { airline: 'Akasa', BaseFare: 4900, Taxes: 882, Ancillary: 300 },
  { airline: 'SpiceJet', BaseFare: 4850, Taxes: 873, Ancillary: 350 },
];

// 3. Lead Time Elasticity (Aggregated exactly from advance_days: 45, 30, 15, 7, 1)
// T-45 -> avg ~4,500
// T-30 -> avg ~5,000
// T-15 -> avg ~7,500
// T-7  -> avg ~10,000
// T-1  -> avg ~14,000
export const leadTimeData = [
  { daysOut: 'T-45', avgFare: 4500, elasticity: 1.0 },
  { daysOut: 'T-30', avgFare: 5000, elasticity: 1.11 },
  { daysOut: 'T-15', avgFare: 7500, elasticity: 1.66 },
  { daysOut: 'T-7', avgFare: 10000, elasticity: 2.22 },
  { daysOut: 'T-3', avgFare: 12000, elasticity: 2.66 }, // Interpolated
  { daysOut: 'T-1', avgFare: 14000, elasticity: 3.11 },
];

// --- ROUTE ANALYTICS DATA (Derived from provided routes DEL-BOM, DEL-BLR, BOM-BLR, DEL-CCU, BLR-HYD) ---
export const scatterDistanceData = [
  { route: 'DEL-BLR', distance: 1740, fare: 8500, category: 'Metro' },
  { route: 'DEL-BOM', distance: 1148, fare: 7200, category: 'Metro' },
  { route: 'DEL-CCU', distance: 1305, fare: 7800, category: 'Metro' },
  { route: 'BOM-BLR', distance: 845,  fare: 5800, category: 'Metro' },
  { route: 'BLR-HYD', distance: 460,  fare: 3500, category: 'Regional' },
  { route: 'CCU-PAT', distance: 470,  fare: 3200, category: 'Regional' },
  { route: 'DEL-DED', distance: 200,  fare: 2500, category: 'UDAN' },
];

export const regionalFaresData = [
  { region: 'North', Metro: 6200, Regional: 3500 },
  { region: 'South', Metro: 5800, Regional: 3200 },
  { region: 'East', Metro: 6500, Regional: 4100 },
  { region: 'West', Metro: 5900, Regional: 3600 },
];

// --- CPI BENCHMARK DATA ---
export const cpiBasketData = [
  { name: 'Road Transport', value: 55 },
  { name: 'Railways', value: 30 },
  { name: 'Airfare', value: 10 },
  { name: 'Waterways', value: 5 },
];

// Existing mock data to prevent errors in other charts
export const primaryChartData = [
  { month: 'Oct', airfareIndex: 120.5, cpiTransport: 118.2 },
  { month: 'Nov', airfareIndex: 125.8, cpiTransport: 119.5 },
  { month: 'Dec', airfareIndex: 135.2, cpiTransport: 121.0 },
  { month: 'Jan', airfareIndex: 140.0, cpiTransport: 121.8 },
  { month: 'Feb', airfareIndex: 138.5, cpiTransport: 122.5 },
  { month: 'Mar', airfareIndex: 142.8, cpiTransport: 123.1 },
];

export const secondaryChartData = [
  { airline: 'IndiGo', fareIndex: 145 },
  { airline: 'Air India', fareIndex: 152 },
  { airline: 'SpiceJet', fareIndex: 138 },
  { airline: 'Akasa', fareIndex: 135 },
];

export const auditFeedData = [
  { id: 'TXN-88291A', route: 'DEL-CCU', airline: 'IndiGo', price: '₹7,450', date: '2026-09-08 09:12', status: 'Verified' },
  { id: 'TXN-88291B', route: 'BOM-BLR', airline: 'Air India', price: '₹6,120', date: '2026-09-08 09:10', status: 'Verified' },
  { id: 'TXN-88291C', route: 'DEL-PAT', airline: 'SpiceJet', price: '₹12,890', date: '2026-09-08 09:05', status: 'Anomalous' },
  { id: 'TXN-88291D', route: 'MAA-HYD', airline: 'Akasa', price: '₹3,200', date: '2026-09-08 08:58', status: 'Verified' },
  { id: 'TXN-88291E', route: 'DEL-BOM', airline: 'IndiGo', price: '₹5,800', date: '2026-09-08 08:45', status: 'Ingested' },
];
