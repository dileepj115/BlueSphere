import { GoogleGenAI, Type } from "@google/genai";
import { SEOAdvice } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSEOStrategy = async (focusArea: string, location: string): Promise<SEOAdvice> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const prompt = `
    Act as an SEO Expert for a photographer based in ${location}.
    The user specializes in: ${focusArea}.
    
    Provide a specific SEO strategy in JSON format with the following fields:
    - keywords: A list of 10 high-value, long-tail keywords relevant to the location and niche.
    - metaDescription: A compelling HTML meta description (under 160 characters) for their home page.
    - blogIdeas: 5 blog post titles that would rank well for local search.
    - localSEOStrategy: A concise paragraph explaining how to improve local visibility (e.g., Google Business Profile tips) specifically for this photographer type.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            metaDescription: { type: Type.STRING },
            blogIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            localSEOStrategy: { type: Type.STRING }
          },
          required: ["keywords", "metaDescription", "blogIdeas", "localSEOStrategy"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as SEOAdvice;
  } catch (error) {
    console.error("Error generating SEO strategy:", error);
    throw error;
  }
};