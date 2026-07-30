const Currency = require("../models/Currency");
const convertCurrency = require("./convertCurrency");

const convertForUser = async (userId, amount) => {

    const currency = await Currency.findOne({
        user: userId
    });

    if (!currency || currency.currency === "INR") {

        return {
            amount,
            currency: "INR"
        };

    }

    const converted = await convertCurrency(
        amount,
        "INR",
        currency.currency
    );

    return {
        amount: converted,
        currency: currency.currency
    };

};

module.exports = convertForUser;