const RecurringTransaction = require("../models/RecurringTransaction");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

// ===============================
// Add Recurring Transaction
// ===============================
const addRecurringTransaction = async (req, res) => {
    try {

        const recurring = await RecurringTransaction.create({
            user: req.user.id,
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            type: req.body.type,
            frequency: req.body.frequency,
            nextDate: req.body.nextDate,
            description: req.body.description
        });

        res.status(201).json(recurring);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// ===============================
// Get All Recurring Transactions
// ===============================
const getRecurringTransactions = async (req, res) => {

    try {

        const recurring = await RecurringTransaction.find({
            user: req.user.id
        }).sort({
            nextDate: 1
        });

        res.json(recurring);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// ===============================
// Update Recurring Transaction
// ===============================
const updateRecurringTransaction = async (req, res) => {

    try {

        const recurring = await RecurringTransaction.findById(req.params.id);

        if (!recurring) {
            return res.status(404).json({
                message: "Recurring transaction not found"
            });
        }

        if (recurring.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const updated = await RecurringTransaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.json(updated);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// ===============================
// Delete Recurring Transaction
// ===============================
const deleteRecurringTransaction = async (req, res) => {

    try {

        const recurring = await RecurringTransaction.findById(req.params.id);

        if (!recurring) {
            return res.status(404).json({
                message: "Recurring transaction not found"
            });
        }

        if (recurring.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await recurring.deleteOne();

        res.json({
            message: "Recurring transaction deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// ===============================
// Process Recurring Transactions
// ===============================
const processRecurringTransactions = async (req, res) => {

    try {

        const today = new Date();

        const recurringTransactions =
            await RecurringTransaction.find({
                user: req.user.id,
                isActive: true,
                nextDate: {
                    $lte: today
                }
            });

        let created = 0;

        for (const transaction of recurringTransactions) {

            if (transaction.type === "Income") {

                await Income.create({

                    user: req.user.id,
                    title: transaction.title,
                    amount: transaction.amount,
                    category: transaction.category,
                    description: transaction.description,
                    date: transaction.nextDate

                });

            } else {

                await Expense.create({

                    user: req.user.id,
                    title: transaction.title,
                    amount: transaction.amount,
                    category: transaction.category,
                    description: transaction.description,
                    date: transaction.nextDate

                });

            }

            // Update next recurring date

            let next = new Date(transaction.nextDate);

            switch (transaction.frequency) {

                case "Daily":
                    next.setDate(next.getDate() + 1);
                    break;

                case "Weekly":
                    next.setDate(next.getDate() + 7);
                    break;

                case "Monthly":
                    next.setMonth(next.getMonth() + 1);
                    break;

                case "Yearly":
                    next.setFullYear(next.getFullYear() + 1);
                    break;

                default:
                    next.setMonth(next.getMonth() + 1);

            }

            transaction.nextDate = next;

            await transaction.save();

            created++;

        }

        res.json({

            message: `${created} recurring transactions processed successfully.`

        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

module.exports = {

    addRecurringTransaction,
    getRecurringTransactions,
    updateRecurringTransaction,
    deleteRecurringTransaction,
    processRecurringTransactions

};