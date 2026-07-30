const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        targetAmount: {
            type: Number,
            required: true
        },

        savedAmount: {
            type: Number,
            default: 0
        },

        targetDate: {
            type: Date,
            required: true
        },

        category: {
            type: String,
            enum: [
                "Emergency Fund",
                "Vacation",
                "Car",
                "Bike",
                "House",
                "Education",
                "Wedding",
                "Electronics",
                "Investment",
                "Other"
            ],
            default: "Other"
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Completed",
                "Cancelled"
            ],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Goal", goalSchema);