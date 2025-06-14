// import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";

// configure dotenv to load .env variables
dotenv.config();

// setup Express app
const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// initialize Google GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// route to generate image
app.post("/generate", async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    if (!userPrompt || typeof userPrompt !== "string") {
      return res
        .status(400)
        .json({ error: "Prompt is required and must be a string" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: userPrompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const part = response.candidates[0].content.parts.find((p) => p.inlineData);

    if (part && part.inlineData) {
      const base64Image = part.inlineData.data;
      res.json({ image: base64Image });
    } else {
      res.status(500).json({ error: "Image not found in Gemini response" });
    }
  } catch (err) {
    console.error("❌ Error generating image:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while generating the image" });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
