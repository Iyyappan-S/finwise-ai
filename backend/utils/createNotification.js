const Notification = require("../models/Notification");

const createNotification = async (
    userId,
    title,
    message,
    type = "general"
) => {
    try {

        await Notification.create({
            user: userId,
            title,
            message,
            type
        });

    } catch (error) {

        console.log("Notification Error:", error.message);

    }
};

module.exports = createNotification;