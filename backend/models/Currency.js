const mongoose = require("mongoose");


const currencySchema = new mongoose.Schema(
{

    // User who selected this currency
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    // User preferred currency
    currency: {
        type: String,
        default: "INR"
    },


    // Base currency for exchange rates
    base: {
        type: String,
        default: "INR"
    },


    // Exchange rates object
    rates: {

        type: Object,

        default: {}

    },


    updatedAt: {

        type: Date,

        default: Date.now

    }

},
{
    timestamps: true
}
);


module.exports = mongoose.model(
    "Currency",
    currencySchema
);