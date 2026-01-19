
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly to satisfy guidelines and ensure key consistency.
export const getFashionAdvice = async (userPrompt: string) => {
  try {
    // Create a new GoogleGenAI instance right before making an API call to ensure it uses the latest configuration.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are a professional fashion stylist for a high-end women's apparel portal called Vogue Aura. Your task is to provide expert advice on matching jackets and dresses. Keep your tone elegant, encouraging, and sophisticated. Use Russian, English, or Chinese based on user input. Focus on textures, colors, and occasion-specific styling.",
        temperature: 0.7,
      },
    });

    return response.text || "I couldn't generate advice at this moment. Try asking about a specific color or fabric!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The fashion studio is currently busy. Please try again in a moment!";
  }
};
