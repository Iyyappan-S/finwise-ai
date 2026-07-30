const model = require("../config/gemini");

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const result = await model.generateContent(message);

        const response = result.response.text();

        res.json({
            reply: response
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "AI Error",
            error: error.message
        });
    }
};

module.exports = {
    chatWithAI
};