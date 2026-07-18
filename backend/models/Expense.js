const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    description: {
        type: String
    }

},
{
    timestamps: true
}
);

module.exports = mongoose.model("Expense", expenseSchema);