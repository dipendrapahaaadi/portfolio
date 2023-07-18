import React, { useEffect, useState } from "react";
import fetchMarketPrice from "./fetchMarketPrice";

function App() {

    const [netProfitLoss, setNetProfitLoss] = useState(0);
    const [coins, setCoins] = useState([]);
    const [editIndex, setEditIndex] = useState();
    const [editCoin, setEditCoin] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    <fetchMarketPrice />

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


        localStorage.setItem("portfolioCoins", JSON.stringify([...coins, newCoin]));

    };


    useEffect(() => {
        const storedCoins = localStorage.getItem("portfolioCoins");
        if (storedCoins) {
            setCoins(JSON.parse(storedCoins));
        }
    }, [])

    const handleClearPortfolio = () => {
        setCoins([]);
        setNetProfitLoss(0);
        localStorage.removeItem('portfolioCoins');
    };

    const handleEdit = (index) => {
        const coinToEdit = coins[index];
        setEditCoin(coinToEdit);
        setEditIndex(index);
        setShowEditForm(true);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const updatedCoins = coins.map((coin, index) => {
            if (index === editIndex) {
                return {
                    ...editCoin,
                    calculatedProfitLoss:
                        editCoin.quantity * editCoin.currentPrice - editCoin.quantity * editCoin.purchasedPrice,
                    investmentValue: editCoin.quantity * editCoin.purchasedPrice,
                    currentValue: editCoin.quantity * editCoin.currentPrice,
                };
            }
            return coin;
        });

        setCoins(updatedCoins);

        const totalProfitLoss = updatedCoins.reduce((total, coin) => total + coin.calculatedProfitLoss, 0);
        setNetProfitLoss(totalProfitLoss);

        localStorage.setItem("portfolioCoins", JSON.stringify(updatedCoins));

        setShowEditForm(false);
    };



    return (
        <div className="app-container">
            <h1 className="title">Portfolio Tracker</h1>

            <label htmlFor="coin" className="form-label">Coin: </label>
            <select name="coin" id="coin" className="form-input">
                <option value="bitcoin">BTC</option>
                <option value="ethereum">ETH</option>
            </select>
            <br />

            <label htmlFor="quantity" className="form-label">Quantity: </label>
            <input type="number" name="quantity" id="quantity" className="form-input" />
            <br />

            <label htmlFor="purchasedPrice" className="form-label">Purchased Price: </label>
            <input type="number" name="purchasedPrice" id="purchasedPrice" className="form-input" />
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
                        <th>Edit</th>
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
                            <td><button onClick={() => handleEdit(index)} className="edit-btn">Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditForm && editCoin && (
                <div className="edit-form-container">
                    <h2>Edit Coin</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label htmlFor="edit-quantity">Quantity: </label>
                        <input
                            type="number"
                            name="edit-quantity"
                            id="edit-quantity"
                            className="form-input"
                            value={editCoin.quantity}
                            onChange={(e) =>
                                setEditCoin({ ...editCoin, quantity: parseFloat(e.target.value) })
                            }
                        />
                        <br />

                        <label htmlFor="edit-purchasedPrice">Purchased Price: </label>
                        <input
                            type="number"
                            name="edit-purchasedPrice"
                            id="edit-purchasedPrice"
                            className="form-input"
                            value={editCoin.purchasedPrice}
                            onChange={(e) =>
                                setEditCoin({ ...editCoin, purchasedPrice: parseFloat(e.target.value) })
                            }
                        />
                        <br />

                        <button type="submit" className="save-changes-btn">
                            Save Changes
                        </button>
                        <button onClick={() => setShowEditForm(false)} className="cancel-btn">
                            Cancel
                        </button>
                    </form>;
                </div>
            )}


            <button className="clear-portfolio-btn" onClick={handleClearPortfolio}>Clear Portfolio</button>
        </div>
    );
};

export default App;
