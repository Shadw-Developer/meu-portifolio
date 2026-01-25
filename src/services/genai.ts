import { GoogleGenAI, Type } from "@google/genai";
import { ImageSize } from "../types";

// Initialize AI Client
// Note: process.env.API_KEY is guaranteed to be available by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * 1. AI Powered Chatbot & 5. Analyze Images
 * Model: gemini-3-pro-preview
 * Supports text and image analysis.
 */
export const sendChatMessage = async (
  history: { role: string; parts: { text?: string }[] }[],
  message: string,
  imageData?: string,
  mimeType?: string
) => {
  const model = "gemini-3-pro-preview";
  
  const contentParts: any[] = [{ text: message }];
  
  if (imageData && mimeType) {
    contentParts.unshift({
      inlineData: {
        data: imageData,
        mimeType: mimeType,
      },
    });
  }

  const chat = ai.chats.create({
    model,
    history: history as any, // Cast to match SDK type
  });

  const response = await chat.sendMessageStream({
    message: { parts: contentParts } as any // Handle multiple parts in message
  });

  return response;
};

/**
 * 2. Think more when needed (Architecture Advisor)
 * Model: gemini-3-pro-preview
 * Config: thinkingBudget: 32768
 */
export const askArchitect = async (prompt: string) => {
  const response = await ai.models.generateContentStream({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 32768,
      },
    },
  });
  return response;
};

/**
 * 3. Use Google Search data
 * Model: gemini-3-flash-preview
 * Tool: googleSearch
 */
export const searchMarketTrends = async (query: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response;
};

/**
 * 4. Use Google Maps data
 * Model: gemini-2.5-flash
 * Tool: googleMaps
 */
export const queryLocationServices = async (query: string, userLoc?: { lat: number; lng: number }) => {
  const toolConfig: any = {};
  
  if (userLoc) {
    toolConfig.retrievalConfig = {
      latLng: {
        latitude: userLoc.lat,
        longitude: userLoc.lng
      }
    };
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: userLoc ? toolConfig : undefined
    },
  });
  return response;
};

/**
 * 6. Generate images with Nano Banana Pro
 * Model: gemini-3-pro-image-preview
 */
export const generateHighFidelityImage = async (prompt: string, size: ImageSize) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        imageSize: size,
      },
    },
  });
  return response;
};

/**
 * 7. Nano banana powered app (Edit Images)
 * Model: gemini-2.5-flash-image
 */
export const editImage = async (originalBase64: string, prompt: string, mimeType: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [
        {
          inlineData: {
            data: originalBase64,
            mimeType: mimeType,
          },
        },
        { text: prompt },
      ],
    },
  });
  return response;
};

/**
 * Helper to extract image from response parts
 */
export const extractImageFromResponse = (response: any): string | null => {
  if (!response.candidates?.[0]?.content?.parts) return null;
  
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData && part.inlineData.data) {
      return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
    }
  }
  return null;
};
