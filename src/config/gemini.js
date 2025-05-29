import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize AI with API Key directly
const ai = new GoogleGenerativeAI("AIzaSyCwPkiJYgpqvz7QT6kHVBZxD5mQx6_Vjsk");

export const onSent = async (prompt) => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ AI generation failed:", error.message);
    throw new Error("AI generation failed");
  }
};

export default onSent;
