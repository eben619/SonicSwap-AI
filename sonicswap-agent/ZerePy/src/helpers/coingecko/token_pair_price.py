import requests
import os

def get_token_price(base_token: str, quote_currency: str = "usd"):
    """
    Fetch the price of a token in the specified quote currency from CoinGecko.

    :param base_token: The token symbol or CoinGecko ID (e.g., "ethereum", "bitcoin", "celo").
    :param quote_currency: The currency to get the price in (default is "usd").
    :return: The price of the token or an error message.
    """
    url = "https://api.coingecko.com/api/v3/simple/price"
    api_key = os.getenv("COINGECKO_API_KEY")  # Load API key from environment variables

    headers = {"x-cg-api-key": api_key} if api_key else {}  # Include header only if API key exists

    params = {
        "ids": base_token.lower(),
        "vs_currencies": quote_currency.lower()
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data.get(base_token.lower(), {}).get(quote_currency.lower(), "Price not available")
    
    except requests.exceptions.RequestException as e:
        return f"Error fetching price: {e}"

# Example usage:
#price = get_token_price("sonic-3", "usd")
#print(f" Price in USD: {price}")
