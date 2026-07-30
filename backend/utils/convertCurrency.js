const { getExchangeRates } = require("./currencyService");

const convertCurrency = async (
    amount,
    fromCurrency,
    toCurrency
) => {

    if (fromCurrency === toCurrency) {
        return amount;
    }

    const rates = await getExchangeRates(fromCurrency);

    if (!rates || !rates[toCurrency]) {
        throw new Error("Unable to fetch exchange rates.");
    }

    const convertedAmount = amount * rates[toCurrency];

    return Number(convertedAmount.toFixed(2));
};

module.exports = convertCurrency;