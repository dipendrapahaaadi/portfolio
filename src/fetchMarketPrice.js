const fetchMarketPrice = async (symbol) => {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbol}`
        );
        console.log(response);
        const data = await response.json();
        return parseFloat(data[0].current_price);
    } catch (error) {
        const fetchMarketPriceError = console.error(`Error fetching market price for ${symbol}:`, error);
        return fetchMarketPriceError;
    }
};

export default fetchMarketPrice;