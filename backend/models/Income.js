const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        source: {
            type: String,
            required: true,
            trim: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        category: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        },

        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Income", incomeSchema);