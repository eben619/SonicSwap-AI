import requests
import pandas as pd
import time
import os
import numpy as np

COINGECKO_API = "https://api.coingecko.com/api/v3"
COINGECKO_API_KEY = os.getenv("COINGECKO_API_KEY")
HEADERS = {
    "accept": "application/json",
    "x-cg-demo-api-key": COINGECKO_API_KEY
}


def fetch_price_history(token_id ="sonic-3",currency="usd", days=1):
    url = f"{COINGECKO_API}/coins/{token_id}/market_chart?vs_currency={currency}&days={days}"
    params = {"vs_currency": currency, "days": days}
    response = requests.get(url, headers=HEADERS, params=params)
    if response.status_code == 200:
       data = response.json()
       return [price[1] for price in data.get("prices", [])]
    else:
        print(f"Error fetching price data: {response.status_code}, {response.text}")
        return None


def calculate_volatility(prices):
    returns = np.diff(prices) / prices[:-1] 
    volatility = np.std(returns) * 100  
    net_direction = np.mean(returns) * 100
    return volatility,net_direction

#print(calculate_volatility(fetch_price_history()))