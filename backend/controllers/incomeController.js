const Income = require("../models/Income");

// Add Income
const addIncome = async (req, res) => {
    try {
        const { source, amount, category, date, description } = req.body;

        const income = await Income.create({
            user: req.user.id,
            source,
            amount,
            category,
            date,
            description
        });

        res.status(201).json({
            message: "Income added successfully",
            income
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Income
const getIncome = async (req, res) => {
    try {
        const incomes = await Income.find({
            user: req.user.id
        }).sort({ date: -1 });

        res.json({
            count: incomes.length,
            incomes
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Income
const updateIncome = async (req, res) => {

    try {

        const income = await Income.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!income) {
            return res.status(404).json({
                message: "Income not found"
            });
        }

        const updatedIncome = await Income.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Income updated successfully",
            updatedIncome
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Income
const deleteIncome = async (req, res) => {
    try {
        const income = await Income.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!income) {
            return res.status(404).json({
                message: "Income not found"
            });
        }

        await Income.findByIdAndDelete(req.params.id);

        res.json({
            message: "Income deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addIncome,
    getIncome,
    updateIncome,
    deleteIncome
};
