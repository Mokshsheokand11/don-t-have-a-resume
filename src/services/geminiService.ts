import { GoogleGenAI } from "@google/genai";
import { ResumeData } from "../types";

const modelName = "gemini-2.0-flash";

function getGenAI(): GoogleGenAI | null {
  const apiKey = (
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.GEMINI_API_KEY ||
    ""
  ).trim();
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

export const generateResumeSummary = async (data: Partial<ResumeData>) => {
  const genAI = getGenAI();
  if (!genAI) return "";

  const prompt = `Based on the following information, write a professional, concise 2-3 sentence resume summary:
  Skills: ${data.skills?.join(", ")}
  Experience: ${data.experience?.map((e) => `${e.position} at ${e.company}`).join(", ")}
  Education: ${data.education?.map((e) => e.degree).join(", ")}`;

  try {
    const response = await genAI.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text ?? "";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "";
  }
};

export const improveDescription = async (text: string, field: string) => {
  const genAI = getGenAI();
  if (!genAI) return text;

  const prompt = `Rewrite the following resume bullet point to be more impactful and ATS-friendly for a ${field} role. Use action verbs and quantify results if possible: "${text}"`;

  try {
    const response = await genAI.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text ?? text;
  } catch (error) {
    console.error("Error improving The description:", error);
    return text;
  }
};
