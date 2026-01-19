
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ValuationData, RealEstateDeal } from "../types";

// This is a global instance for most calls
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are the Sovereign Concierge for Federgreen Consulting. 
Your goal is to assist users in navigating our institutional capital advisory platform. 
You ONLY answer based on the following site structure and services:
- Home: Institutional Asset Architecture.
- Work: Business Plans, Investor Decks, Financial Modeling.
- Services: Capital Advisory (Analysis, Raising Capital, Risk Mitigation, Secured Depositors, Scaling, Due Diligence, KYC/AML).
- Areas: Real Estate, Technology, Health, Sports, Renewable Energy, Aerospace, Mining, Manufacturing.
- Funding: Debt, Equity, Private Funds, New World of Finance (BTC/USDT Lending, Fine Art, Commodities).
- Tools: Enterprise Valuation, RE Underwriting, FEDERGREEN Suite (Image/Video Gen).

For macro-economic queries, use the provided Search Grounding data to be precise. 
If a user asks about a service NOT listed, politely explain that Federgreen specializes in the above institutional nodes. 
Be professional, concise, and elite.`;

/**
 * API STATUS NODE: Gemini 2.5 Flash Lite
 */
export const checkApiStatus = async (): Promise<boolean> => {
  try {
    await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: 'ping'
    });
    return true;
  } catch (error) {
    console.error("API Status Check Failed:", error);
    return false;
  }
};

/**
 * STRATEGIC NODE: Gemini 3 Pro
 */
export const askConcierge = async (query: string, history: any[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: query }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 32768 },
      tools: [{ googleSearch: {} }],
      temperature: 0.7,
    }
  });
  return response.text;
};

/**
 * SPEECH NODE: Gemini 2.5 Flash TTS
 */
export const generateSpeech = async (text: string) => {
  const response = await ai.models.generateContent({
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

/**
 * VISION NODE: Gemini 3 Pro
 */
export const analyzeImage = async (base64ImageData: string, mimeType: string, prompt: string) => {
  const imagePart = {
    inlineData: { data: base64ImageData, mimeType },
  };
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
      systemInstruction: "You are a senior analyst at Federgreen Consulting specializing in visual asset assessment. Provide a concise, institutional-grade analysis based on the user's query and the provided image.",
      thinkingConfig: { thinkingBudget: 32768 },
    }
  });
  return response.text;
};

/**
 * PORTAL NODE: Document Summarizer
 */
export const summarizePortalDocument = async (fileName: string, context: string) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize this client document: ${fileName}. Context: ${context}.`,
        config: {
            systemInstruction: "You are a Senior Compliance and Strategy Analyst. Provide a highly professional, 3-point summary of the document's likely strategic importance and any immediate action items for the client.",
            temperature: 0.3
        }
    });
    return response.text;
};

/**
 * PORTAL NODE: Response Intelligent Drafter
 */
export const draftAdvisorResponse = async (message: string, clientStatus: string) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Draft a professional response to this advisor message: "${message}". Client current status: ${clientStatus}`,
        config: {
            systemInstruction: "You are a FEDERGREEN Communications Assistant for a High-Net-Worth client. Draft a response that is professional, respectful, and clarifies any next steps. Keep it concise.",
            thinkingConfig: { thinkingBudget: 4096 }
        }
    });
    return response.text;
};

/**
 * VIDEO NODE: Veo 3.1 Fast
 */
export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16') => {
  const veoAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await veoAI.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio,
    }
  });
  return operation;
};

export const getVideoOperation = async (operation: any) => {
  const veoAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return await veoAI.operations.getVideosOperation({ operation });
};

/**
 * WORK TOOL: Strategic Narrative Generator
 */
export const generateBusinessNarrative = async (concept: string, industry: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a high-level strategic narrative for a ${industry} business focused on: ${concept}. Align with current global macro-economic trends.`,
    config: {
      systemInstruction: "You are a Chief Strategy Officer at Federgreen. Produce elite, board-ready strategic narratives. Use Google Search for trend alignment.",
      tools: [{ googleSearch: {} }],
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text;
};

/**
 * WORK TOOL: Investor Q&A Simulator
 */
export const simulateInvestorQA = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Simulate 3 critical questions a Tier-1 VC or Credit Committee would ask regarding: ${topic}. Provide brief, sophisticated guidance for each.`,
    config: {
      systemInstruction: "You are a cynical but constructive institutional investor. Focus on risk, scalability, and exit tranches.",
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text;
};

/**
 * WORK TOOL: Capital Structure Optimizer
 */
export const optimizeCapitalStructure = async (ebitda: number, assets: number, goal: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Optimize capital structure for an entity with $${ebitda} EBITDA and $${assets} Assets. Primary goal: ${goal}.`,
    config: {
      systemInstruction: "You are a Senior Financial Architect. Suggest optimal WACC, Debt/Equity ratios, and specific instrument tranches (Mezzanine, Unitranche, etc.) grounded in current market yields.",
      tools: [{ googleSearch: {} }],
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text;
};

/**
 * PORTAL NODE: Client Briefing
 */
export const generateClientBriefing = async (clientData: any) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a client briefing based on this data: ${JSON.stringify(clientData)}.`,
        config: {
            systemInstruction: "You are a Senior Partner at Federgreen. Provide a concise, professional, and optimistic summary for your client. Start with a greeting, highlight the 'Project Status', mention the 'Next Milestone', and flag any 'Critical Notices'. Be elite and direct.",
            tools: [{ googleSearch: {} }]
        }
    });
    return response.text;
};

/**
 * PORTAL NODE: Investor Briefing
 */
export const generateInvestorBriefing = async (investorProfile: any) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Generate a market briefing for an investor with this profile: ${JSON.stringify(investorProfile)}.`,
        config: {
            systemInstruction: "You are a Chief Investment Strategist at Federgreen. Provide a sophisticated, data-driven market briefing grounded in real-time news. Focus on trends relevant to the investor's interests. Highlight one key opportunity and one key risk. Be institutional-grade.",
            tools: [{ googleSearch: {} }],
            thinkingConfig: { thinkingBudget: 16384 }
        }
    });
    return response.text;
};

/**
 * PORTAL NODE: Deal Analysis
 */
export const analyzeInvestmentDeal = async (investorProfile: any, dealData: any) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze this deal: ${JSON.stringify(dealData)} for an investor with this profile: ${JSON.stringify(investorProfile)}.`,
        config: {
            systemInstruction: "You are a seasoned due diligence analyst. Provide a succinct, unbiased analysis. Create two lists: 'Strategic Alignment' (pros) and 'Institutional Risks' (cons). Conclude with a 'Final Recommendation' as 'APPROVE', 'REVIEW', or 'REJECT' based on the alignment.",
            temperature: 0.2
        }
    });
    return response.text;
};

/**
 * TACTICAL NODE: Gemini 3 Flash
 */
export const getMarketSentiment = async (prices: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Current Market Prices: ${JSON.stringify(prices)}. Provide an institutional sentiment report based on the latest global news.`,
    config: {
      systemInstruction: "You are a senior macro-economist at Federgreen Consulting. Ground your analysis in recent global news events via Google Search.",
      tools: [{ googleSearch: {} }],
      temperature: 0.4
    }
  });
  
  const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    sources: links.map((c: any) => ({ title: c.web?.title, uri: c.web?.uri }))
  };
};

/**
 * HUB NODE: Gemini 2.5 Flash
 */
export const findNearbyHubs = async (coords: { lat: number, lng: number }, sector: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Locate tier-1 institutional hubs, banks, or corporate headquarters related to ${sector} near these coordinates.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: coords.lat,
            longitude: coords.lng
          }
        }
      }
    },
  });

  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    analysis: response.text,
    hubs: chunks.map((c: any) => ({
      title: c.maps?.title || "Institutional Point",
      uri: c.maps?.uri
    }))
  };
};

/**
 * ANALYTICAL NODE: Gemini 3 Pro
 */
export const getBusinessValuation = async (data: ValuationData) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Perform a deep-dive enterprise valuation on the following business data: ${JSON.stringify(data)}. Use Search grounding to verify industry multiples.`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      tools: [{ googleSearch: {} }],
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

/**
 * FLASH NODE: Gemini 2.5 Flash Lite
 */
export const underwriteRealEstate = async (deal: RealEstateDeal) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: `Underwrite this real estate deal: ${JSON.stringify(deal)}.`,
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
