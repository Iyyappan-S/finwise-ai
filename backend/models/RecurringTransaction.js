const mongoose = require("mongoose");

const recurringTransactionSchema = new mongoose.Schema(
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

    type: {
        type: String,
        enum: ["Income", "Expense"],
        required: true
    },

    frequency: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "Yearly"],
        default: "Monthly"
    },

    nextDate: {
        type: Date,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "RecurringTransaction",
    recurringTransactionSchema
);