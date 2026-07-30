import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Settings.css";

function Settings() {

    const [currency, setCurrency] = useState("INR");

    const currencies = [
        "INR",
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "AUD",
        "CAD",
        "SGD",
        "AED"
    ];

    useEffect(() => {
        loadCurrency();
    }, []);

    const loadCurrency = async () => {
        try {

            const res = await API.get("/currency");

            setCurrency(res.data.currency);

        } catch (err) {

            console.log(err);

        }
    };

    const saveCurrency = async () => {
        try {

            await API.put("/currency", {
                currency
            });

            alert("✅ Currency updated successfully.");

        } catch (err) {

            console.log(err);

        }
    };

    return (
        <div className="settings-page">

            <h1>⚙ Settings</h1>

            <div className="settings-card">

                <h2>Preferred Currency</h2>

                <select
                    value={currency}
                    onChange={(e) =>
                        setCurrency(e.target.value)
                    }
                >
                    {currencies.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

                <button
                    onClick={saveCurrency}
                    className="save-btn"
                >
                    Save Currency
                </button>

            </div>

        </div>
    );
}

export default Settings;