import pandas as pd
import numpy as np
import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'airfare.db')

_baseline_stats = {}

def load_and_train_model():
    """
    Computes Z-score parameters (mean, std) grouped by route, window, and day_of_week
    from historical baseline data.
    """
    global _baseline_stats
    conn = sqlite3.connect(db_path)
    df = pd.read_sql_query("SELECT route, advance_window, base_fare, date FROM flight_pricing ORDER BY date DESC LIMIT 5000", conn)
    conn.close()
    
    if df.empty:
        return
        
    df['date'] = pd.to_datetime(df['date'])
    df['day_of_week'] = df['date'].dt.dayofweek
    
    # Calculate Mean and Std Deviation for each cohort
    grouped = df.groupby(['route', 'advance_window', 'day_of_week'])['base_fare'].agg(['mean', 'std']).reset_index()
    
    _baseline_stats.clear()
    for _, row in grouped.iterrows():
        key = (row['route'], row['advance_window'], row['day_of_week'])
        # Fill NaN std with a small default variance (e.g. 500) if there's only 1 sample
        _baseline_stats[key] = {
            'mean': row['mean'],
            'std': row['std'] if pd.notna(row['std']) and row['std'] > 0 else 500.0
        }
    print(f"Z-Score Outlier Detection initialized with {len(_baseline_stats)} cohorts.")

def detect_anomaly(route: str, window: str, base_fare: float, tx_date: str):
    """
    Returns (is_anomalous: bool, anomaly_score: float)
    Using Z-score: if |z| > 2.5, it's considered an anomaly.
    """
    if not _baseline_stats:
        load_and_train_model()
        
    day_of_week = pd.to_datetime(tx_date).dayofweek
    key = (route, window, day_of_week)
    
    if key not in _baseline_stats:
        # Fallback if no exact historical match
        return False, 0.0
        
    stats = _baseline_stats[key]
    z_score = (base_fare - stats['mean']) / stats['std']
    
    is_anomalous = abs(z_score) > 2.5
    
    return is_anomalous, round(z_score, 2)

# Run initial load
load_and_train_model()
