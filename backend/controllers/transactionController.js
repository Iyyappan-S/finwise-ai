const Income = require("../models/Income");
const Expense = require("../models/Expense");
const convertForUser = require("../utils/userCurrency");

const getTransactions = async (req, res) => {

    try {

        const incomes = await Income.find({
            user: req.user.id
        });

        const expenses = await Expense.find({
            user: req.user.id
        });

        const incomeList = incomes.map(item => ({
            _id: item._id,
            title: item.title,
            amount: item.amount,
            category: item.category,
            description: item.description,
            date: item.date,
            type: "Income"
        }));

        const expenseList = expenses.map(item => ({
            _id: item._id,
            title: item.title,
            amount: item.amount,
            category: item.category,
            description: item.description,
            date: item.date,
            type: "Expense"
        }));

        const transactions = [
            ...incomeList,
            ...expenseList
        ];

        transactions.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

const convertedTransactions = await Promise.all(

    transactions.map(async (transaction) => {

        const converted = await convertForUser(
            req.user.id,
            transaction.amount
        );

        return {

            ...transaction,

            amount: converted.amount,

            currency: converted.currency

        };

    })

);

res.json(convertedTransactions);
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getTransactions
};