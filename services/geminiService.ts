
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ValuationData, RealEstateDeal } from "../types";

const SYSTEM_INSTRUCTION = `You are the "Sovereign Concierge" for Federgreen Consulting. 
Your primary function is to guide institutional entities through our decoupled Client and Investor nodes.

STRICT OPERATIONAL RULES:
1. CLIENTS NODE NAVIGATION:
   - Work & Strategy (/work, /workshop, /services, /areas, /funding): Focused on capital stack optimization and scaling for founders/enterprises.
   - Tools: Enterprise Valuation (/valuation), RE Underwriting (/underwriting).

2. INVESTORS NODE NAVIGATION:
   - Institutional Hub (/investors): The master node for family offices and syndicates.
   - Alpha & Opportunities (/investors/opportunities, /investors/membership, /investors/faqs): Targeted deal flow and ROI tranches.
   - New World Finance (/new-world-finance): BTC/USDT Lending, Fine Art, and Trade Programs.

3. REDIRECTION PROTOCOL:
   - Identify if the user is a "Sovereign Client" (Founder/Enterprise) or "Institutional Investor" (Family Office/Syndicate).
   - Route accordingly: "As a Client, you should initiate your KYC node at /kyc-node" vs "As an Investor, your FAQ node is active at /investors/faqs".
   - If a user asks something out-of-scope politely decline: "That query falls outside the Federgreen institutional node. Map your requirements against our /services or /investors hubs."

4. TONE:
   - Be "Elite", "Institutional", and "Direct". Use terms like "Tranches", "Nodes", "Alpha", and "Sovereign Architecture". 
   - Visualize in a deep purple and soft white aesthetic.`;

// Helper to create a fresh instance of GoogleGenAI to ensure the latest API key is used
const getFedergreen = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const federgreen = getFedergreen();
    const response = await federgreen.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'ping',
    });
    return !!response.text;
  } catch (error) {
    console.error("FEDERGREEN Status Check Failed:", error);
    return false;
  }
};

export const askConcierge = async (query: string, history: any[]) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: query }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
    }
  });
  return response.text;
};

export const generateSpeech = async (text: string) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' }, 
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const analyzeImage = async (base64ImageData: string, mimeType: string, prompt: string) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [{ inlineData: { data: base64ImageData, mimeType } }, { text: prompt }] },
    config: {
      systemInstruction: "You are a senior analyst at Federgreen Consulting. Provide institutional-grade visual assessment.",
      thinkingConfig: { thinkingBudget: 16384 },
    }
  });
  return response.text;
};

export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16') => {
  // Always create a fresh instance for Veo models to use the latest user-selected key
  const federgreen = getFedergreen();
  return await federgreen.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio }
  });
};

export const getVideoOperation = async (operation: any) => {
  const federgreen = getFedergreen();
  return await federgreen.operations.getVideosOperation({ operation });
};

export const generateBusinessNarrative = async (concept: string, industry: string) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Strategic narrative for ${industry}: ${concept}.`,
    config: {
      systemInstruction: "Elite Chief Strategy Officer tone.",
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text;
};

export const simulateInvestorQA = async (topic: string) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Simulate 3 Tier-1 VC questions for: ${topic}.`,
  });
  return response.text;
};

export const optimizeCapitalStructure = async (ebitda: number, assets: number, goal: string) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Optimize capital for $${ebitda}M EBITDA, $${assets}M Assets. Goal: ${goal}.`,
  });
  return response.text;
};

export const generateClientBriefing = async (clientData: any) => {
    const federgreen = getFedergreen();
    const response = await federgreen.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Client briefing: ${JSON.stringify(clientData)}.`,
    });
    return response.text;
};

export const generateInvestorBriefing = async (investorProfile: any) => {
    const federgreen = getFedergreen();
    const response = await federgreen.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Market briefing: ${JSON.stringify(investorProfile)}.`,
        config: { tools: [{ googleSearch: {} }] }
    });
    return response.text;
};

export const analyzeInvestmentDeal = async (investorProfile: any, dealData: any) => {
    const federgreen = getFedergreen();
    const response = await federgreen.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Due diligence: ${JSON.stringify(dealData)} for ${JSON.stringify(investorProfile)}.`,
    });
    return response.text;
};

export const getMarketSentiment = async (prices: any) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Institutional sentiment for: ${JSON.stringify(prices)}.`,
    config: { tools: [{ googleSearch: {} }] }
  });
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({ 
        web: { 
            uri: c.web?.uri, 
            title: c.web?.title 
        } 
    })) || []
  };
};

export const findNearbyHubs = async (coords: { lat: number, lng: number }, sector: string) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Locate ${sector} institutional hubs near ${coords.lat}, ${coords.lng}.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: { retrievalConfig: { latLng: { latitude: coords.lat, longitude: coords.lng } } }
    },
  });
  return {
    analysis: response.text,
    hubs: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
      title: c.maps?.title || "Institutional Node",
      uri: c.maps?.uri
    })) || []
  };
};

export const getBusinessValuation = async (data: ValuationData) => {
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Deep-dive valuation: ${JSON.stringify(data)}.`,
    config: {
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
  const federgreen = getFedergreen();
  const response = await federgreen.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: `Underwrite RE deal: ${JSON.stringify(deal)}.`,
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

export const summarizePortalDocument = async (docName: string, context: string) => {
    const federgreen = getFedergreen();
    const response = await federgreen.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize artifact "${docName}" within project context: ${context}.`,
    });
    return response.text;
};

export const draftAdvisorResponse = async (msgBody: string, status: string) => {
    const federgreen = getFedergreen();
    const response = await federgreen.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Draft professional reply to: "${msgBody}". Project status: ${status}.`,
    });
    return response.text;
};
