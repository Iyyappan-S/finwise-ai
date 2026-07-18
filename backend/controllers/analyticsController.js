const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getMonthlyAnalytics = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id });
        const expenses = await Expense.find({ user: req.user.id });

        const monthlyData = {};

        incomes.forEach((income) => {
            const month = new Date(income.date).toLocaleString("default", {
                month: "long"
            });

            if (!monthlyData[month]) {
                monthlyData[month] = { income: 0, expense: 0, balance: 0 };
            }

            monthlyData[month].income += income.amount;
        });

        expenses.forEach((expense) => {
            const month = new Date(expense.date).toLocaleString("default", {
                month: "long"
            });

            if (!monthlyData[month]) {
                monthlyData[month] = { income: 0, expense: 0, balance: 0 };
            }

            monthlyData[month].expense += expense.amount;
        });

        const analytics = Object.keys(monthlyData).map((month) => {
            return {
                month,
                income: monthlyData[month].income,
                expense: monthlyData[month].expense,
                balance: monthlyData[month].income - monthlyData[month].expense
            };
        });

        res.json({
            count: analytics.length,
            analytics
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getCategoryAnalytics = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });

        const categoryData = {};

        expenses.forEach((expense) => {
            if (!categoryData[expense.category]) {
                categoryData[expense.category] = 0;
            }

            categoryData[expense.category] += expense.amount;
        });

        const analytics = Object.keys(categoryData).map((category) => ({
            category,
            total: categoryData[category]
        }));

        res.json({
            count: analytics.length,
            analytics
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getMonthlyAnalytics,
    getCategoryAnalytics
};  