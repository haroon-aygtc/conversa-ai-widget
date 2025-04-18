
import { useState, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WidgetConfig } from "@/utils/widgetSettings";
import { motion, AnimatePresence } from "framer-motion";

interface WidgetPreviewProps {
  config: WidgetConfig;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const WidgetPreview = ({ config }: WidgetPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: config.appearance.welcomeMessage,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const {
    appearance: { position, theme },
  } = config;

  // Position classes based on config
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  // Button style based on config
  const buttonClasses = {
    rounded: "rounded-full",
    square: "rounded-md",
    pill: "rounded-full px-6",
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your message. This is a preview of the AI response to: "${message}"`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  // Auto-open if configured
  useEffect(() => {
    if (config.behavior.autoOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, config.behavior.autoOpenDelay);

      return () => clearTimeout(timer);
    }
  }, [config.behavior.autoOpen, config.behavior.autoOpenDelay]);

  return (
    <div className="widget-preview relative shadow-lg rounded-lg border border-gray-200 bg-gray-100 w-full h-[400px] overflow-hidden">
      {/* Header showing this is a preview */}
      <div className="bg-gray-200 text-gray-700 py-2 px-4 text-sm font-medium text-center border-b border-gray-300">
        Widget Preview
      </div>

      {/* Simulate website content */}
      <div className="p-4 bg-white h-[calc(100%-36px)] overflow-hidden relative">
        {/* Widget button */}
        <div className={`absolute ${positionClasses[position]} z-50`}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-12 w-12 ${buttonClasses[theme.buttonStyle]} shadow-lg`}
            style={{
              backgroundColor: isOpen ? "#64748b" : theme.primaryColor,
              color: theme.textColor,
            }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
          </Button>
        </div>

        {/* Chat window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`absolute ${
                position.includes("top") ? "top-16" : "bottom-16"
              } ${position.includes("right") ? "right-4" : "left-4"} w-72 sm:w-80 
                 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-40`}
              initial={{ opacity: 0, scale: 0.9, y: position.includes("top") ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: position.includes("top") ? -20 : 20 }}
              transition={{ duration: 0.2 }}
              style={{
                maxHeight: "300px",
              }}
            >
              {/* Chat header */}
              <div
                className="p-3 flex items-center border-b"
                style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
              >
                <div>
                  <h3 className="font-medium">{config.appearance.title}</h3>
                  {config.appearance.subtitle && (
                    <p className="text-xs opacity-90">{config.appearance.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 p-3 overflow-y-auto bg-gray-50" style={{ height: "180px" }}>
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "items-start"}`}
                    >
                      {msg.sender === "ai" && (
                        <div
                          className="h-8 w-8 rounded-full mr-2 flex items-center justify-center text-white text-sm"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          AI
                        </div>
                      )}
                      <div
                        className={`p-2 rounded-lg max-w-[85%] text-sm ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input area */}
              <div className="p-3 border-t bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-sm"
                    placeholder={config.appearance.inputPlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo website content */}
        <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50 pointer-events-none">
          <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPreview;
