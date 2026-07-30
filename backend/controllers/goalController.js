const Goal = require("../models/Goal");

// ===============================
// Add Goal
// ===============================
const addGoal = async (req, res) => {

    try {

        const {
            title,
            targetAmount,
            targetDate,
            category
        } = req.body;

        const goal = await Goal.create({

            user: req.user.id,

            title,

            targetAmount,

            targetDate,

            category

        });

        res.status(201).json(goal);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Get All Goals
// ===============================
const getGoals = async (req, res) => {

    try {

        const goals = await Goal.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        res.json(goals);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Update Goal
// ===============================
const updateGoal = async (req, res) => {

    try {

        const goal = await Goal.findById(req.params.id);

        if (!goal) {

            return res.status(404).json({

                message: "Goal not found"

            });

        }

        if (goal.user.toString() !== req.user.id) {

            return res.status(401).json({

                message: "Not Authorized"

            });

        }

        const updatedGoal = await Goal.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        res.json(updatedGoal);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Delete Goal
// ===============================
const deleteGoal = async (req, res) => {

    try {

        const goal = await Goal.findById(req.params.id);

        if (!goal) {

            return res.status(404).json({

                message: "Goal not found"

            });

        }

        if (goal.user.toString() !== req.user.id) {

            return res.status(401).json({

                message: "Not Authorized"

            });

        }

        await goal.deleteOne();

        res.json({

            message: "Goal deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Add Savings
// ===============================
const addSavings = async (req, res) => {

    try {

        const { amount } = req.body;

        const goal = await Goal.findById(req.params.id);

        if (!goal) {

            return res.status(404).json({

                message: "Goal not found"

            });

        }

        if (goal.user.toString() !== req.user.id) {

            return res.status(401).json({

                message: "Not Authorized"

            });

        }

        goal.savedAmount += Number(amount);

        if (goal.savedAmount >= goal.targetAmount) {

            goal.savedAmount = goal.targetAmount;

            goal.status = "Completed";

        }

        await goal.save();

        res.json(goal);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Goal Progress
// ===============================
const getGoalProgress = async (req, res) => {

    try {

        const goals = await Goal.find({

            user: req.user.id

        });

        const progress = goals.map(goal => ({

            ...goal.toObject(),

            percentage:

                Math.min(

                    (goal.savedAmount / goal.targetAmount) * 100,

                    100

                ),

            remaining:

                goal.targetAmount -

                goal.savedAmount

        }));

        res.json(progress);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Goal Statistics
// ===============================
const getGoalStatistics = async (req, res) => {

    try {

        const goals = await Goal.find({
            user: req.user.id
        });

        const totalGoals = goals.length;

        const completedGoals = goals.filter(
            goal => goal.status === "Completed"
        ).length;

        const activeGoals = goals.filter(
            goal => goal.status === "Active"
        ).length;

        const totalTarget = goals.reduce(
            (sum, goal) => sum + goal.targetAmount,
            0
        );

        const totalSaved = goals.reduce(
            (sum, goal) => sum + goal.savedAmount,
            0
        );

        const overallProgress =
            totalTarget === 0
                ? 0
                : (totalSaved / totalTarget) * 100;

        res.json({

            totalGoals,

            completedGoals,

            activeGoals,

            totalTarget,

            totalSaved,

            overallProgress

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    addGoal,

    getGoals,

    updateGoal,

    deleteGoal,

    addSavings,

    getGoalProgress,

    getGoalStatistics

};