const express = require("express");

const {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// Get All Notifications
// ==========================
router.get("/", protect, getNotifications);

// ==========================
// Create Notification
// ==========================
router.post("/", protect, createNotification);

// ==========================
// Mark All as Read
// ==========================
router.put("/read-all", protect, markAllAsRead);

// ==========================
// Mark One Notification as Read
// ==========================
router.put("/:id/read", protect, markAsRead);

// ==========================
// Delete Notification
// ==========================
router.delete("/:id", protect, deleteNotification);

module.exports = router;