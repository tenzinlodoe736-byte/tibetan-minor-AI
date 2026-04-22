import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithTutor(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are a professional Tibetan language tutor and cultural expert named 'Sherab'. Your goal is to help users learn the Tibetan language (grammar, vocabulary, pronunciation tips) and explain Tibetan culture/history in detail. Respond in a mix of Tibetan and English to help the learner. Be encouraging, patient, and use clear explanations. When explaining cultural traditions, be thorough and respectful. If the user asks in Tibetan, try to respond primarily in Tibetan with translations.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the wisdom of the mountains... Please try again later.";
  }
}

export async function getCulturalInsight(topic: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the Tibetan cultural or historical topic: "${topic}" in detail. Include its significance, origins, and how it is practiced today. Provide key Tibetan terms related to this topic with their English translations.`,
      config: {
        systemInstruction: "You are a cultural historian specializing in Tibet. Provide rich, detailed, and respectful information suitable for an educational app. Use markdown for better formatting.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Insight Error:", error);
    return "The path to this insight is currently obscured. Let's try another topic.";
  }
}
