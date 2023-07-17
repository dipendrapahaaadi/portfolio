import React, { useState } from "react";

function App() {

    const [netProfitLoss, setNetProfitLoss] = useState(0);
    const [coins, setCoins] = useState([]);

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

    async function handleSubmit() {

        const coin = document.getElementById("coin").value;

        const quantity = parseFloat(document.getElementById('quantity').value);
        const purchasedPrice = parseFloat(document.getElementById("purchasedPrice").value);

       

        const currentPrice = (await fetchMarketPrice(coin)).toFixed(1);


        const calculatedProfitLoss = quantity * currentPrice - quantity * purchasedPrice;

        const investmentValue = quantity * purchasedPrice;
        const currentValue = quantity * currentPrice;

        const newCoin = {
            coin,
            quantity,
            purchasedPrice,
            currentPrice,
            calculatedProfitLoss,
            investmentValue,
            currentValue
        };


        setCoins((prevCoins) => [...prevCoins, newCoin]);
        setNetProfitLoss((prevNetProfitLoss) => prevNetProfitLoss + calculatedProfitLoss);


    }


    return (
        <div className="app-container">
            <h1 className="title">Portfolio Tracker</h1>

            <label htmlFor="coin"  className="form-label">Coin: </label>
            <select name="coin" id="coin" className="form-input">
                <option value="bitcoin">BTC</option>
                <option value="ethereum">ETH</option>
            </select>
            <br />

            <label htmlFor="quantity" className="form-label">Quantity: </label>
            <input type="number" name="quantity" id="quantity" className="form-input"/>
            <br />

            <label htmlFor="purchasedPrice" className="form-label">Purchased Price: </label>
            <input type="number" name="purchasedPrice" id="purchasedPrice" className="form-input"/>
            <br />

            <button type="submit" onClick={handleSubmit} className="submit-btn">Add coin</button>

            <h2 className="section-title">Portfolio Summary</h2>
            <p className="net-profit-loss">Net profit/loss: {netProfitLoss.toFixed(2)}</p>
            <h2 className="section-title">Coins in Portfolio</h2>
            <table className="coin-table">
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Quantity</th>
                        <th>Purchased Price</th>
                        <th>Current Price</th>
                        <th>Investment Value</th>
                        <th>Current Value</th>
                        <th>Profit/Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin, index) => (
                        <tr key={index}>
                            <td>{coin.coin}</td>
                            <td>{coin.quantity}</td>
                            <td>{coin.purchasedPrice}</td>
                            <td>{coin.currentPrice}</td>
                            <td>{coin.investmentValue}</td>
                            <td>{coin.currentValue}</td>
                            <td>{coin.calculatedProfitLoss.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="clear-portfolio-btn">Clear Portfolio</button>
        </div>
    );
}

export default App;
