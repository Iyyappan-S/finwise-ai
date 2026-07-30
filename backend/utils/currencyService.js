const axios = require("axios");

const BASE_URL = "https://open.er-api.com/v6/latest";

const getExchangeRates = async (baseCurrency = "USD") => {
    try {

        const response = await axios.get(
            `${BASE_URL}/${baseCurrency}`
        );

        return response.data.rates;

    } catch (err) {

        console.log("Currency API Error:", err.message);

        return null;

    }
};

module.exports = {
    getExchangeRates
};