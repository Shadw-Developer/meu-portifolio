import { GoogleGenAI, Type } from "@google/genai";
import { ImageSize } from "../types";

// Inicializa o cliente de IA
// Observação: process.env.API_KEY está garantidamente disponível pelo ambiente.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * 1. Chatbot com IA & Analisar Imagens
 * Modelo: gemini-3-pro-preview
 * Suporta análise de texto e imagem.
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
    history: history as any,
  });

  const response = await chat.sendMessageStream({
    message: { parts: contentParts } as any
  });

  return response;
};

/**
 * 2. Pensar mais quando necessário (Consultor de Arquitetura)
 * Modelo: gemini-3-pro-preview
 * Configuração: thinkingBudget: 32768
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
 * 3. Usar dados da Pesquisa Google
 * Modelo: gemini-3-flash-preview
 * Ferramenta: googleSearch
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
 * 4. Usar dados do Google Maps
 * Modelo: gemini-2.5-flash
 * Ferramenta: googleMaps
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
 * 6. Gerar imagens com Nano Banana Pro
 * Modelo: gemini-3-pro-image-preview
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
 * 7. Aplicativo com tecnologia Nano Banana (Editar Imagens)
 * Modelo: gemini-2.5-flash-image
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
 * Função auxiliar para extrair imagem das partes da resposta
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
