require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function listModels() {
  try {
    const response = await ai.models.list();

    for await (const model of response) {
      console.log({
        name: model.name,
        displayName: model.displayName,
        supportedActions: model.supportedActions,
      });
    }
  } catch (error) {
    console.error("Failed to list models:", error.message);
  }
}

listModels();