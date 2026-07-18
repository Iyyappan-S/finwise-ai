const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getTransactions = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id });
        const expenses = await Expense.find({ user: req.user.id });

        const incomeTransactions = incomes.map((income) => ({
            id: income._id,
            type: "Income",
            title: income.source,
            amount: income.amount,
            category: income.category,
            date: income.date,
            description: income.description
        }));

        const expenseTransactions = expenses.map((expense) => ({
            id: expense._id,
            type: "Expense",
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            description: expense.description
        }));

        const transactions = [
            ...incomeTransactions,
            ...expenseTransactions
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json({
            count: transactions.length,
            transactions
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getTransactions
};