const fs = require('fs');
const readline = require('readline');

async function processData() {
  const fileStream = fs.createReadStream('sample_sample_fare.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let isFirstLine = true;
  
  // Aggregation objects
  const dateFares = {}; // { 'YYYY-MM-DD': { total: 0, count: 0 } }
  const carrierFares = {}; // { 'IndiGo': { base: 0, taxes: 0, count: 0 } }
  const advanceFares = {}; // { '45': { total: 0, count: 0 } }
  
  let totalRows = 0;

  for await (const line of rl) {
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }
    
    // scrape_date,flight_date,route,carrier,advance_days,base_fare,taxes_and_fees,total_fare
    const parts = line.split(',');
    if (parts.length < 8) continue;
    
    const flightDate = parts[1];
    const carrier = parts[3];
    const advanceDays = parts[4];
    const baseFare = parseFloat(parts[5]);
    const taxes = parseFloat(parts[6]);
    const totalFare = parseFloat(parts[7]);
    
    if (isNaN(totalFare)) continue;

    // Daily average
    if (!dateFares[flightDate]) dateFares[flightDate] = { sum: 0, count: 0 };
    dateFares[flightDate].sum += totalFare;
    dateFares[flightDate].count += 1;

    // Carrier breakdown
    if (!carrierFares[carrier]) carrierFares[carrier] = { base: 0, taxes: 0, count: 0 };
    carrierFares[carrier].base += baseFare;
    carrierFares[carrier].taxes += taxes;
    carrierFares[carrier].count += 1;

    // Advance days (Lead time)
    if (!advanceFares[advanceDays]) advanceFares[advanceDays] = { sum: 0, count: 0 };
    advanceFares[advanceDays].sum += totalFare;
    advanceFares[advanceDays].count += 1;
    
    totalRows++;
  }

  // --- Process Daily Index & SMA ---
  const sortedDates = Object.keys(dateFares).sort();
  const dailyIndexData = [];
  
  for (let i = 0; i < sortedDates.length; i++) {
    const date = sortedDates[i];
    const avgFare = dateFares[date].sum / dateFares[date].count;
    
    // Format date nicely (e.g., 'Sep 01')
    const d = new Date(date);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    
    // Calculate 7-day SMA
    let smaSum = 0;
    let smaCount = 0;
    for (let j = Math.max(0, i - 6); j <= i; j++) {
      const pastDate = sortedDates[j];
      smaSum += (dateFares[pastDate].sum / dateFares[pastDate].count);
      smaCount++;
    }
    const sma7 = smaSum / smaCount;
    
    // Normalize index (assume first day is base 100 or just use average fare)
    // Let's use the average fare directly to show real values, or divide by 50 to look like an index
    dailyIndexData.push({
      date: dateStr,
      dailyIndex: Number(avgFare.toFixed(0)),
      sma7: Number(sma7.toFixed(0))
    });
  }

  // --- Process Carrier Breakdown ---
  const airlineBreakdownData = Object.keys(carrierFares).map(carrier => {
    const data = carrierFares[carrier];
    return {
      airline: carrier,
      BaseFare: Number((data.base / data.count).toFixed(0)),
      Taxes: Number((data.taxes / data.count).toFixed(0)),
      Ancillary: 0 // Mocking ancillary as 0 since it's not in CSV
    };
  }).sort((a, b) => (b.BaseFare + b.Taxes) - (a.BaseFare + a.Taxes));

  // --- Process Lead Time Elasticity ---
  // Advance days are 1, 7, 15, 30, 45. Sort descending (45 down to 1)
  const sortedAdvance = Object.keys(advanceFares).map(Number).sort((a, b) => b - a);
  const leadTimeData = [];
  
  let baseFareAvg = null;
  sortedAdvance.forEach(days => {
    const avgFare = advanceFares[days].sum / advanceFares[days].count;
    if (baseFareAvg === null) baseFareAvg = avgFare;
    
    // Elasticity metric (mock calculation: price multiplier from base)
    const elasticity = avgFare / baseFareAvg;
    
    leadTimeData.push({
      daysOut: `T-${days}`,
      avgFare: Number(avgFare.toFixed(0)),
      elasticity: Number(elasticity.toFixed(2))
    });
  });
  
  // Output JS file content
  const outputContent = `
export const dailyIndexData = ${JSON.stringify(dailyIndexData, null, 2)};

export const airlineBreakdownData = ${JSON.stringify(airlineBreakdownData, null, 2)};

export const leadTimeData = ${JSON.stringify(leadTimeData, null, 2)};

// Keep existing mock data for other components that we didn't override
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
  { airline: 'Akasa Air', fareIndex: 135 },
];

export const auditFeedData = [
  { id: 'TXN-88291A', route: 'DEL-CCU', airline: 'IndiGo', price: '₹7,450', date: '2026-09-08 09:12', status: 'Verified' },
  { id: 'TXN-88291B', route: 'BOM-BLR', airline: 'Air India', price: '₹6,120', date: '2026-09-08 09:10', status: 'Verified' },
  { id: 'TXN-88291C', route: 'DEL-PAT', airline: 'SpiceJet', price: '₹12,890', date: '2026-09-08 09:05', status: 'Anomalous' },
  { id: 'TXN-88291D', route: 'MAA-HYD', airline: 'Akasa', price: '₹3,200', date: '2026-09-08 08:58', status: 'Verified' },
  { id: 'TXN-88291E', route: 'DEL-BOM', airline: 'IndiGo', price: '₹5,800', date: '2026-09-08 08:45', status: 'Ingested' },
];

export const scatterDistanceData = [
  { route: 'DEL-BOM', distance: 1148, fare: 5500, category: 'Metro' },
  { route: 'BLR-DEL', distance: 1740, fare: 7200, category: 'Metro' },
  { route: 'CCU-PAT', distance: 470, fare: 3200, category: 'Regional' },
  { route: 'HYD-MAA', distance: 520, fare: 3400, category: 'Regional' },
  { route: 'BOM-GOI', distance: 435, fare: 4100, category: 'Leisure' },
  { route: 'DEL-SXR', distance: 810, fare: 6500, category: 'Leisure' },
  { route: 'MAA-IXM', distance: 420, fare: 2800, category: 'UDAN' },
  { route: 'DEL-DED', distance: 200, fare: 2500, category: 'UDAN' },
];

export const regionalFaresData = [
  { region: 'North', Metro: 6200, Regional: 3500 },
  { region: 'South', Metro: 5800, Regional: 3200 },
  { region: 'East', Metro: 6500, Regional: 4100 },
  { region: 'West', Metro: 5900, Regional: 3600 },
];

export const cpiBasketData = [
  { name: 'Road Transport', value: 55 },
  { name: 'Railways', value: 30 },
  { name: 'Airfare', value: 10 },
  { name: 'Waterways', value: 5 },
];
`;

  fs.writeFileSync('src/data/mockData.js', outputContent);
  console.log('Successfully aggregated', totalRows, 'rows and updated src/data/mockData.js');
}

processData().catch(console.error);
