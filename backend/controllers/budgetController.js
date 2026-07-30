const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const createNotification = require("../utils/createNotification");
const convertForUser = require("../utils/userCurrency");

// ===============================
// Add Budget
// ===============================
const addBudget = async (req, res) => {
    try {

        const { category, amount, month, year } = req.body;

        const budget = await Budget.create({
            user: req.user.id,
            category,
            amount,
            month,
            year
        });

        res.status(201).json(budget);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ===============================
// Get All Budgets
// ===============================
const getBudgets = async (req, res) => {

    try {

        const budgets = await Budget.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.json(budgets);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Update Budget
// ===============================
const updateBudget = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        if (budget.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const updatedBudget = await Budget.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedBudget);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Delete Budget
// ===============================
const deleteBudget = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        if (budget.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await budget.deleteOne();

        res.json({
            message: "Budget deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Budget Progress
// ===============================
const getBudgetProgress = async (req, res) => {

    try {

        const budgets = await Budget.find({
            user: req.user.id
        });

        const expenses = await Expense.find({
            user: req.user.id
        });

        const result = await Promise.all(

            budgets.map(async (budget) => {

                const spent = expenses

                    .filter(
                        expense =>
                            expense.category === budget.category &&
                            new Date(expense.date).getMonth() + 1 === budget.month &&
                            new Date(expense.date).getFullYear() === budget.year
                    )

                    .reduce(
                        (sum, expense) => sum + expense.amount,
                        0
                    );

                // Notifications

                if (spent >= budget.amount) {

                    await createNotification(
                        req.user.id,
                        "Budget Exceeded 🚨",
                        `${budget.category} budget has been exceeded.`,
                        "budget"
                    );

                }
                else if (spent >= budget.amount * 0.8) {

                    await createNotification(
                        req.user.id,
                        "Budget Warning ⚠️",
                        `${budget.category} budget has reached 80%.`,
                        "budget"
                    );

                }

                // Currency Conversion

                const budgetAmount = await convertForUser(
                    req.user.id,
                    budget.amount
                );

                const spentAmount = await convertForUser(
                    req.user.id,
                    spent
                );

                const remainingAmount = await convertForUser(
                    req.user.id,
                    budget.amount - spent
                );

                return {

                    ...budget.toObject(),

                    amount: budgetAmount.amount,

                    spent: spentAmount.amount,

                    remaining: remainingAmount.amount,

                    currency: budgetAmount.currency,

                    percentage: Math.min(
                        (spent / budget.amount) * 100,
                        100
                    )

                };

            })

        );

        res.json(result);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {

    addBudget,

    getBudgets,

    updateBudget,

    deleteBudget,

    getBudgetProgress

};