const Income = require("../models/Income");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");
const convertForUser = require("../utils/userCurrency");

// ==============================
// Monthly Income vs Expense
// ==============================

const getMonthlyAnalytics = async (req, res) => {

    try {

        const incomes = await Income.find({ user: req.user.id });
        const expenses = await Expense.find({ user: req.user.id });

        const monthlyData = {};

        incomes.forEach((income) => {

            const month = new Date(income.date).toLocaleString(
                "default",
                { month: "long" }
            );

            if (!monthlyData[month]) {

                monthlyData[month] = {
                    income: 0,
                    expense: 0,
                    balance: 0
                };

            }

            monthlyData[month].income += income.amount;

        });

        expenses.forEach((expense) => {

            const month = new Date(expense.date).toLocaleString(
                "default",
                { month: "long" }
            );

            if (!monthlyData[month]) {

                monthlyData[month] = {
                    income: 0,
                    expense: 0,
                    balance: 0
                };

            }

            monthlyData[month].expense += expense.amount;

        });

        const analytics = await Promise.all(

            Object.keys(monthlyData).map(async (month) => {

                const convertedIncome = await convertForUser(
                    req.user.id,
                    monthlyData[month].income
                );

                const convertedExpense = await convertForUser(
                    req.user.id,
                    monthlyData[month].expense
                );

                const convertedBalance = await convertForUser(
                    req.user.id,
                    monthlyData[month].income -
                    monthlyData[month].expense
                );

                return {

                    month,

                    income: convertedIncome.amount,

                    expense: convertedExpense.amount,

                    balance: convertedBalance.amount,

                    currency: convertedIncome.currency

                };

            })

        );

        res.json({

            count: analytics.length,

            analytics

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Expense Category Analytics
// ==============================

const getCategoryAnalytics = async (req, res) => {

    try {

        const expenses = await Expense.find({
            user: req.user.id
        });

        const categoryData = {};

        expenses.forEach((expense) => {

            if (!categoryData[expense.category]) {

                categoryData[expense.category] = 0;

            }

            categoryData[expense.category] += expense.amount;

        });

        const analytics = await Promise.all(

            Object.keys(categoryData).map(async (category) => {

                const converted = await convertForUser(
                    req.user.id,
                    categoryData[category]
                );

                return {

                    category,

                    total: converted.amount,

                    currency: converted.currency

                };

            })

        );

        res.json({

            count: analytics.length,

            analytics

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Monthly Expense Bar Chart
// ==============================

const getMonthlyExpense = async (req, res) => {

    try {

        const result = await Expense.aggregate([

            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)
                }
            },

            {
                $group: {

                    _id: {
                        $month: "$date"
                    },

                    total: {
                        $sum: "$amount"
                    }

                }
            },

            {
                $sort: {
                    _id: 1
                }
            }

        ]);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const data = await Promise.all(

            result.map(async (item) => {

                const converted = await convertForUser(
                    req.user.id,
                    item.total
                );

                return {

                    month: months[item._id - 1],

                    total: converted.amount,

                    currency: converted.currency

                };

            })

        );

        res.json(data);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getMonthlyAnalytics,

    getCategoryAnalytics,

    getMonthlyExpense

};