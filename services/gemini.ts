
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PROJECTS, SKILLS } from "../constants";

const getSystemInstruction = () => {
  const projectsSummary = PROJECTS.map(p => `- ${p.title}: ${p.description} (Stack: ${p.techStack.join(', ')})`).join('\n');
  const skillsSummary = SKILLS.map(s => `- ${s.name} (${s.level}% proficiency)`).join('\n');

  return `
    You are DebabrataAI, the personal assistant for this portfolio website. 
    The portfolio belongs to a Senior Software Engineer.
    
    Here is some information you should know:
    - SKILLS:
    ${skillsSummary}
    
    - PROJECTS in the Library:
    ${projectsSummary}
    
    - YOUR GOAL:
    Help users navigate the portfolio, answer questions about the engineer's skills, 
    recommend projects based on their interests, and explain technical concepts used in the library.
    
    - TONE: 
    Professional, knowledgeable, friendly, and concise. Use Markdown for formatting.
    
    - RESTRICTIONS:
    Only answer questions related to the portfolio, technology, or projects. 
    If asked something unrelated, politely steer the conversation back.
  `;
};

export class GeminiService {
  // Refactored to follow the guideline: Create a new GoogleGenAI instance right before making an API call.
  // This ensures the application always uses the most up-to-date API key.
  async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      // Use ai.models.generateContent to query the model with context and history.
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ role: h.role, parts: h.parts })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: getSystemInstruction(),
          temperature: 0.7,
          // maxOutputTokens is omitted as per recommendation to avoid blocking responses when using thinking models.
        }
      });

      // Directly access the .text property from the GenerateContentResponse object.
      return response.text || "I'm sorry, I couldn't process that.";
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      return "I'm having a bit of trouble connecting right now. Please try again in a moment!";
    }
  }
}

export const geminiService = new GeminiService();
