import { useEffect, useState } from "react";
import { CurrencyDropdown } from "./Dropdown";
import {HiArrowsRightLeft} from "react-icons/hi2";
import { API_HOST, FAVORITES_KEY } from "../constants";

export const CurrencyConverter = () => {

    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState();
    const [converting, setConverting] = useState(false);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []);

    // Fetch currencies from API
    const fetchCurrencies = async () => {
        try{
            const res = await fetch(`${API_HOST}/currencies`);
            const data = await res.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.error("Error Fetching:",error);
        }
    };

    useEffect(() => {
        fetchCurrencies();
    },[]);

    // Convert currency
    const convertCurrency = async () => {
        if (!amount || parseInt(amount) < 0) return;
        setConverting(true);
        try {
          const res = await fetch(
            `${API_HOST}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
          );
          const data = await res.json();
    
          setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
          console.error("Error Fetching", error);
        } finally {
          setConverting(false);
        }
    };

    // Handle favorite currencies
    const handleFavorite = (currency) => {
        let updatedFavorites = [...favorites];
        favorites.includes(currency) ? updatedFavorites = favorites.filter((f) => f !== currency) : updatedFavorites.push(currency)
        setFavorites(updatedFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    };

    // Swap currencies
    const swapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-xl shadow-md">

            <h2 className="font-bold text-3xl text-center mb-10 text-gray-700">Currency Converter</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <CurrencyDropdown
                    favorites={favorites}
                    currencies={currencies}
                    title="From:"
                    currency={fromCurrency}
                    setCurrency={setFromCurrency}
                    handleFavorite={handleFavorite}
                />
                {/* swap currency button */}
                <div className="flex justify-center -mb-5 sm:mb-0">
                    <button onClick={swapCurrencies} className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                        <HiArrowsRightLeft className="text-xl text-gray-700" />
                    </button>
                </div>
                {/* swap currency button */}
                <CurrencyDropdown
                    favorites={favorites}
                    currencies={currencies}
                    currency={toCurrency}
                    setCurrency={setToCurrency}
                    title="To:"
                    handleFavorite={handleFavorite}
                />
            </div>

            {/* Amount */}
            <div className="mt-4">
                <label htmlFor = "amount" className="block text-sm font-medium text-gray-700">
                    Amount:
                </label>
                <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                />
            </div>
            {/* Amount */}

            {/* Convert Button */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={convertCurrency}
                    className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    ${converting ? "animate-pulse" : ""}`}
                >
                    Convert
                </button>
            </div>
            {/* Convert Button */}

            {/* Result */}
            {convertedAmount && (
                <div className="mt-4 text-lg font-light text-right ">
                    Converted Amount: <span className="text-green-600 font-bold">{convertedAmount}</span>
                </div>
            )}
            {/* Result */}

        </div>
    )
};