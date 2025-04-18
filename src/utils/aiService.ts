
import { useState, useEffect } from "react";

// Define types
export type AIModel = "gemini" | "huggingface" | "openai";

export interface AIConfig {
  model: AIModel;
  temperature: number;
  maxTokens: number;
  contextMode: "strict" | "open";
  apiKey?: string;
}

export interface AIRequest {
  message: string;
  history?: {
    role: "user" | "assistant";
    content: string;
  }[];
  config: AIConfig;
  knowledgeBaseContext?: string[];
}

export interface AIResponse {
  text: string;
  metadata?: {
    sources?: string[];
    tokensUsed?: number;
    processingTime?: number;
  };
}

// Simulated AI response function (in a real app, this would call an actual API)
export const getAIResponse = async (request: AIRequest): Promise<AIResponse> => {
  // This is a placeholder that simulates an AI response
  console.log(`Processing request with ${request.config.model} model`);
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a simulated response based on the message
  let responseText: string;
  
  // Simple keyword-based responses for simulation
  if (request.message.toLowerCase().includes("hello") || 
      request.message.toLowerCase().includes("hi")) {
    responseText = "Hello! How can I assist you today?";
  } else if (request.message.toLowerCase().includes("help")) {
    responseText = "I'm here to help! What do you need assistance with?";
  } else if (request.message.toLowerCase().includes("feature") || 
             request.message.toLowerCase().includes("capability")) {
    responseText = "Our chat widget supports multiple AI models, context-awareness, and a knowledge base integration to provide accurate answers to your questions.";
  } else if (request.message.toLowerCase().includes("price") || 
             request.message.toLowerCase().includes("cost")) {
    responseText = "We offer flexible pricing options based on your needs. The basic plan starts at $29/month and includes up to 1000 AI requests.";
  } else if (request.message.toLowerCase().includes("api") || 
             request.message.toLowerCase().includes("integration")) {
    responseText = "Yes, our system provides API endpoints for custom integrations. You can connect it to your existing systems easily.";
  } else {
    // Default response with some context-awareness
    if (request.history && request.history.length > 0) {
      responseText = `I understand you're asking about "${request.message}". Could you provide more specific information about what you'd like to know?`;
    } else {
      responseText = `Thank you for your message: "${request.message}". How can I help you with this today?`;
    }
  }
  
  // Add knowledge base info if available
  if (request.knowledgeBaseContext && request.knowledgeBaseContext.length > 0) {
    responseText += "\n\nI found this relevant information that might help: " + 
                    request.knowledgeBaseContext[0];
  }
  
  return {
    text: responseText,
    metadata: {
      tokensUsed: Math.floor(Math.random() * 100) + 50,
      processingTime: Math.random() * 0.5,
    }
  };
};

// React hook for using the AI service
export const useAI = (config: AIConfig) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateResponse = async (message: string, history: {role: "user" | "assistant", content: string}[] = []) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getAIResponse({
        message,
        history,
        config,
      });
      
      setLoading(false);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setLoading(false);
      throw err;
    }
  };
  
  return {
    generateResponse,
    loading,
    error,
  };
};
