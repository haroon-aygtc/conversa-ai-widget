
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types
type WidgetTheme = {
  primaryColor: string;
  buttonStyle: 'rounded' | 'square';
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
};

type WidgetBehavior = {
  autoOpenDelay: number | null; // null = disabled
  showOnAllPages: boolean;
  greeting: string;
};

type AIConfig = {
  contextMode: 'strict' | 'open';
  maxTokens: number;
  temperature: number;
  preferredModel: 'gemini' | 'huggingface';
};

interface WidgetContextType {
  theme: WidgetTheme;
  setTheme: React.Dispatch<React.SetStateAction<WidgetTheme>>;
  behavior: WidgetBehavior;
  setBehavior: React.Dispatch<React.SetStateAction<WidgetBehavior>>;
  aiConfig: AIConfig;
  setAIConfig: React.Dispatch<React.SetStateAction<AIConfig>>;
  embedCode: string;
  widgetId: string;
}

// Create the context
const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

// Provider component
export const WidgetProvider = ({ children }: { children: ReactNode }) => {
  // Default values
  const [theme, setTheme] = useState<WidgetTheme>({
    primaryColor: '#7c3aed', // Purple
    buttonStyle: 'rounded',
    position: 'bottom-right',
  });

  const [behavior, setBehavior] = useState<WidgetBehavior>({
    autoOpenDelay: 5, // 5 seconds, null would disable
    showOnAllPages: true,
    greeting: 'Hello! How can I assist you today?',
  });

  const [aiConfig, setAIConfig] = useState<AIConfig>({
    contextMode: 'open',
    maxTokens: 1024,
    temperature: 0.7,
    preferredModel: 'gemini',
  });

  // Generate a unique widget ID if not already set
  const widgetId = "widget_" + Math.random().toString(36).substring(2, 11);

  // Generate embed code
  const embedCode = `<script src="https://your-domain.com/widget.js" data-widget-id="${widgetId}"></script>`;

  const value = {
    theme,
    setTheme,
    behavior,
    setBehavior,
    aiConfig,
    setAIConfig,
    embedCode,
    widgetId,
  };

  return <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>;
};

// Custom hook to use the context
export const useWidget = () => {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
};
