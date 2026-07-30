const User = require("../models/User");
const { getExchangeRates } = require("../utils/currencyService");

// ==============================
// Get Current Currency
// ==============================
const getCurrency = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            currency: user.currency
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// ==============================
// Update Currency
// ==============================
const updateCurrency = async (req, res) => {
    try {

        const { currency } = req.body;

        const supportedCurrencies = [
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

        if (!supportedCurrencies.includes(currency)) {
            return res.status(400).json({
                message: "Unsupported currency"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.currency = currency;

        await user.save();

        res.json({
            message: "Currency updated successfully",
            currency: user.currency
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// ==============================
// Get Live Exchange Rates
// ==============================

const getRates = async (req, res) => {

    try {

        const { base } = req.query;

        const rates = await getExchangeRates(
            base || "USD"
        );

        res.json({
            base: base || "USD",
            rates
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getCurrency,
    updateCurrency,
    getRates
};