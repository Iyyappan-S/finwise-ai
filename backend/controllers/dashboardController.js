const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getDashboard = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id });
        const expenses = await Expense.find({ user: req.user.id });

        const totalIncome = incomes.reduce((sum, item) => {
            return sum + item.amount;
        }, 0);

        const totalExpense = expenses.reduce((sum, item) => {
            return sum + item.amount;
        }, 0);

        const balance = totalIncome - totalExpense;

        res.json({
            totalIncome,
            totalExpense,
            balance,
            incomeCount: incomes.length,
            expenseCount: expenses.length
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getDashboard
};