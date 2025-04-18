
// Types for widget configuration

export type WidgetPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export type WidgetTheme = {
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
  buttonStyle: "rounded" | "square" | "pill";
};

export type WidgetBehavior = {
  autoOpen: boolean;
  autoOpenDelay: number; // in milliseconds, 0 = no delay
  showOnAllPages: boolean;
  initialMessage: string;
  persistConversation: boolean; // whether to save conversation across page reloads
};

export type WidgetAppearance = {
  position: WidgetPosition;
  theme: WidgetTheme;
  logo?: string;
  title: string;
  subtitle?: string;
  welcomeMessage: string;
  inputPlaceholder: string;
  sendButtonText: string;
};

export interface WidgetConfig {
  widgetId: string;
  behavior: WidgetBehavior;
  appearance: WidgetAppearance;
}

// Default configuration
export const defaultWidgetConfig: WidgetConfig = {
  widgetId: "",
  behavior: {
    autoOpen: false,
    autoOpenDelay: 3000, // 3 seconds
    showOnAllPages: true,
    initialMessage: "Hello! How can I help you today?",
    persistConversation: true,
  },
  appearance: {
    position: "bottom-right",
    theme: {
      primaryColor: "#7c3aed", // Purple
      textColor: "#ffffff", // White
      backgroundColor: "#ffffff", // White
      buttonStyle: "rounded",
    },
    title: "Conversa AI",
    subtitle: "Ask me anything",
    welcomeMessage: "Hello! I'm your AI assistant. How can I help you today?",
    inputPlaceholder: "Type your message...",
    sendButtonText: "Send",
  },
};

// Generate widget configuration with overrides
export const generateWidgetConfig = (overrides: Partial<WidgetConfig> = {}): WidgetConfig => {
  return {
    ...defaultWidgetConfig,
    ...overrides,
    behavior: {
      ...defaultWidgetConfig.behavior,
      ...(overrides.behavior || {}),
    },
    appearance: {
      ...defaultWidgetConfig.appearance,
      ...(overrides.appearance || {}),
      theme: {
        ...defaultWidgetConfig.appearance.theme,
        ...(overrides.appearance?.theme || {}),
      },
    },
  };
};

// Save widget configuration to localStorage (for demo purposes)
export const saveWidgetConfig = (config: WidgetConfig): void => {
  localStorage.setItem("conversa-widget-config", JSON.stringify(config));
};

// Load widget configuration from localStorage (for demo purposes)
export const loadWidgetConfig = (): WidgetConfig | null => {
  const saved = localStorage.getItem("conversa-widget-config");
  return saved ? JSON.parse(saved) : null;
};
