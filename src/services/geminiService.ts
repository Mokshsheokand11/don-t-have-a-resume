import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateResumeSummary = async (data: Partial<ResumeData>) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Based on the following information, write a professional, concise 2-3 sentence resume summary:
  Skills: ${data.skills?.join(", ")}
  Experience: ${data.experience?.map(e => `${e.position} at ${e.company}`).join(", ")}
  Education: ${data.education?.map(e => e.degree).join(", ")}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "";
  }
};

export const improveDescription = async (text: string, field: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Rewrite the following resume bullet point to be more impactful and ATS-friendly for a ${field} role. Use action verbs and quantify results if possible: "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error improving The description:", error);
    return text;
  }
};
