const User = require("../models/User");
const bcrypt = require("bcryptjs");

// =========================
// Get User Profile
// =========================
const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// =========================
// Update Profile
// =========================
const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = req.body.name || user.name;

        if (req.body.profileImage) {
            user.profileImage = req.body.profileImage;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImage: updatedUser.profileImage
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// =========================
// Change Password
// =========================
const changePassword = async (req, res) => {

    try {

        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        const match = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!match) {

            return res.status(400).json({
                message: "Old password is incorrect"
            });

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            newPassword,
            salt
        );

        await user.save();

        res.json({
            message: "Password changed successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};