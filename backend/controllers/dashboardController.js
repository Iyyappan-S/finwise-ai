const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Currency = require("../models/Currency");
const User = require("../models/User");

const convertCurrency = require("../utils/convertCurrency");
const createNotification = require("../utils/createNotification");

const getDashboard = async (req, res) => {

    try {

        const incomes = await Income.find({
            user: req.user.id
        });

        const expenses = await Expense.find({
            user: req.user.id
        });

        const user = await User.findById(req.user.id);

        const totalIncome = incomes.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        const totalExpense = expenses.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        const balance = totalIncome - totalExpense;

        const totalTransactions =
            incomes.length + expenses.length;

        // Low balance notification
        if (balance < 1000) {

            await createNotification(
                req.user.id,
                "Low Balance 💸",
                "Your account balance is below ₹1000.",
                "balance"
            );

        }

        // User currency
        const currencyData = await Currency.findOne({
            user: req.user.id
        });

        const preferredCurrency = currencyData
            ? currencyData.currency
            : "INR";

        let convertedIncome = totalIncome;
        let convertedExpense = totalExpense;
        let convertedBalance = balance;

        if (preferredCurrency !== "INR") {

            convertedIncome = await convertCurrency(
                totalIncome,
                "INR",
                preferredCurrency
            );

            convertedExpense = await convertCurrency(
                totalExpense,
                "INR",
                preferredCurrency
            );

            convertedBalance = await convertCurrency(
                balance,
                "INR",
                preferredCurrency
            );

        }

        res.json({

            totalIncome: convertedIncome,

            totalExpense: convertedExpense,

            balance: convertedBalance,

            totalTransactions,

            currency: preferredCurrency,

            role: user.role

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {
    getDashboard
};