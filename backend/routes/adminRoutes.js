const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    getDashboard,
    getUsers,
    deleteUser
} = require("../controllers/adminController");

router.get(
    "/dashboard",
    protect,
    adminOnly,
    getDashboard
);

router.get(
    "/users",
    protect,
    adminOnly,
    getUsers
);

router.delete(
    "/users/:id",
    protect,
    adminOnly,
    deleteUser
);

module.exports = router;