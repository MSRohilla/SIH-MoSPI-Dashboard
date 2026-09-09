import pandas as pd
import numpy as np
import sqlite3
from datetime import datetime, timedelta
import random
import os

# Ensure the database is created in the backend folder
db_path = os.path.join(os.path.dirname(__file__), 'airfare.db')

# Setup parameters
days = 30
start_date = datetime(2026, 9, 1)
airlines = ['IndiGo', 'Air India', 'SpiceJet', 'Akasa']
routes = ['DEL-BOM', 'DEL-BLR', 'CCU-PAT', 'DEL-DED']
advance_windows = ['T+1', 'T+7', 'T+15', 'T+30']

# Logical baseline pricing
route_baselines = {
    'DEL-BOM': 4000,
    'DEL-BLR': 5000,
    'CCU-PAT': 2500,
    'DEL-DED': 2000,
}

airline_multipliers = {
    'Air India': 1.15,
    'IndiGo': 1.0,
    'SpiceJet': 0.95,
    'Akasa': 0.90,
}

window_elasticity = {
    'T+30': 1.0,
    'T+15': 1.3,
    'T+7':  1.8,
    'T+1':  2.8,
}

data = []

# Generate 5000 rows across 30 days
print("Generating mock data...")
for i in range(5000):
    tx_date = start_date + timedelta(days=random.randint(0, days - 1))
    
    # Introduce some temporal noise/trends
    day_trend = np.sin((tx_date.day / 30) * np.pi) * 0.15 + 1.0
    
    route = random.choice(routes)
    airline = random.choice(airlines)
    window = random.choice(advance_windows)
    
    # Calculate price
    base = route_baselines[route] * airline_multipliers[airline] * window_elasticity[window] * day_trend
    
    # Add noise
    noise = random.uniform(0.9, 1.1)
    base_fare = int(base * noise)
    
    taxes = int(base_fare * 0.18)
    total_fare = base_fare + taxes
    
    # Status
    status = random.choices(['Verified', 'Ingested', 'Anomalous'], weights=[0.8, 0.15, 0.05])[0]
    
    # Generate Tx ID
    tx_id = f"TXN-{random.randint(100000, 999999)}{random.choice(['A','B','C','D'])}"
    
    data.append({
        'tx_id': tx_id,
        'date': tx_date.strftime('%Y-%m-%d'),
        'route': route,
        'airline': airline,
        'advance_window': window,
        'base_fare': base_fare,
        'taxes': taxes,
        'total_fare': total_fare,
        'status': status
    })

df = pd.DataFrame(data)
df.sort_values(by='date', inplace=True)

print(f"Saving {len(df)} rows to SQLite database at {db_path}...")
conn = sqlite3.connect(db_path)
df.to_sql('flight_pricing', conn, if_exists='replace', index=False)
conn.close()

print("Database seeding complete!")
