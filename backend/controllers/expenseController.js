const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;

        const expense = await Expense.create({
            user: req.user.id,
            title,
            amount,
            category,
            date,
            description
        });

        res.status(201).json({
            message: "Expense added successfully",
            expense
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Expenses
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user.id
        }).sort({ date: -1 });

        res.json({
            count: expenses.length,
            expenses
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Expense
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Expense updated successfully",
            updatedExpense
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await Expense.findByIdAndDelete(req.params.id);

        res.json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
};