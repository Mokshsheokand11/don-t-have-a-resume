import { GoogleGenAI } from "@google/genai";
import { ResumeData } from "../types";

const genAI = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const modelName = "gemini-1.5-flash";

export const generateResumeSummary = async (data: Partial<ResumeData>) => {
  const model = genAI.getGenerativeModel({ model: modelName });
  const prompt = `Based on the following information, write a professional, concise 2-3 sentence resume summary:
  Skills: ${data.skills?.join(", ")}
  Experience: ${data.experience?.map(e => `${e.position} at ${e.company}`).join(", ")}
  Education: ${data.education?.map(e => e.degree).join(", ")}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    return "";
  }
};

export const improveDescription = async (text: string, field: string) => {
  const model = genAI.getGenerativeModel({ model: modelName });
  const prompt = `Rewrite the following resume bullet point to be more impactful and ATS-friendly for a ${field} role. Use action verbs and quantify results if possible: "${text}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error improving The description:", error);
    return text;
  }
};

