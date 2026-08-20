const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4
        });

        console.log("✅ MongoDB Connected");
        console.log(conn.connection.host);
    } catch (err) {
        console.error("❌ Full Error:");
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
