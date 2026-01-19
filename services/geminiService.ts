
import { GoogleGenAI, Type } from "@google/genai";
import { ValuationData, RealEstateDeal } from "../types";

const SYSTEM_INSTRUCTION = `You are the Sovereign Concierge for Federgreen Consulting. 
Your goal is to assist users in navigating our institutional capital advisory platform. 
You ONLY answer based on the following site structure and services:
- Home: Institutional Asset Architecture.
- Work: Business Plans, Investor Decks, Financial Modeling.
- Services: Capital Advisory (Analysis, Raising Capital, Risk Mitigation, Secured Depositors, Scaling, Due Diligence, KYC/AML).
- Areas: Real Estate, Technology, Health, Sports, Renewable Energy, Aerospace, Mining, Manufacturing.
- Funding: Debt, Equity, Private Funds, New World of Finance (BTC/USDT Lending, Fine Art, Commodities).
- Tools: Enterprise Valuation, RE Underwriting.

If a user asks about a service NOT listed, politely explain that Federgreen Consulting specializes in the above institutional nodes and suggest a relevant alternative from our list. Be professional, concise, and elite.`;

export const askConcierge = async (query: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: query }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 40,
      topP: 0.95
    }
  });
  return response.text;
};

export const getBusinessValuation = async (data: ValuationData) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a senior Goldman Sachs valuation expert. Perform a deep-dive enterprise valuation on the following business data: ${JSON.stringify(data)}.`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedValue: { type: Type.STRING },
          viabilityScore: { type: Type.NUMBER },
          riskAssessment: { type: Type.STRING },
          fundingRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          detailedAnalysis: { type: Type.STRING }
        },
        required: ["estimatedValue", "viabilityScore", "riskAssessment", "fundingRecommendations", "detailedAnalysis"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const underwriteRealEstate = async (deal: RealEstateDeal) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Underwrite this institutional real estate deal: ${JSON.stringify(deal)}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendation: { type: Type.STRING }, 
          dscr: { type: Type.NUMBER },
          estimatedRoi: { type: Type.NUMBER },
          keyRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING }
        },
        required: ["recommendation", "dscr", "estimatedRoi", "keyRisks", "summary"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};
