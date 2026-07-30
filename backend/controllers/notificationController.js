const Notification = require("../models/Notification");

// ==============================
// Get All Notifications
// ==============================
const getNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.json(notifications);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==============================
// Create Notification
// ==============================
const createNotification = async (req, res) => {
    try {

        const { title, message, type } = req.body;

        const notification = await Notification.create({
            user: req.user.id,
            title,
            message,
            type
        });

        res.status(201).json(notification);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==============================
// Mark Notification as Read
// ==============================
const markAsRead = async (req, res) => {
    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        notification.isRead = true;

        await notification.save();

        res.json(notification);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==============================
// Mark All Notifications as Read
// ==============================
const markAllAsRead = async (req, res) => {
    try {

        await Notification.updateMany(
            {
                user: req.user.id,
                isRead: false
            },
            {
                isRead: true
            }
        );

        res.json({
            message: "All notifications marked as read"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==============================
// Delete Notification
// ==============================
const deleteNotification = async (req, res) => {
    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        await notification.deleteOne();

        res.json({
            message: "Notification deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
};