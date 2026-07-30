const User = require("../models/User");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

// ====================================
// Dashboard Statistics
// ====================================
const getDashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalIncome = await Income.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const totalExpense = await Expense.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.json({
            totalUsers,
            totalIncome:
                totalIncome.length > 0
                    ? totalIncome[0].total
                    : 0,
            totalExpense:
                totalExpense.length > 0
                    ? totalExpense[0].total
                    : 0,
            totalBalance:
                (totalIncome.length ? totalIncome[0].total : 0) -
                (totalExpense.length ? totalExpense[0].total : 0)
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// ====================================
// Get All Users
// ====================================
const getUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ====================================
// Delete User
// ====================================
const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.deleteOne();

        res.json({
            message: "User deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getDashboard,
    getUsers,
    deleteUser
};