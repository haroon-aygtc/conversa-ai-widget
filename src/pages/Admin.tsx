
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChatAnalytics from "@/components/admin/ChatAnalytics";
import KnowledgeBaseUploader from "@/components/admin/KnowledgeBaseUploader";
import PromptTemplateEditor from "@/components/admin/PromptTemplateEditor";
import ModelSelector from "@/components/admin/ModelSelector";
import EmbedCode from "@/components/widget/EmbedCode";
import WidgetPreview from "@/components/widget/WidgetPreview";
import SettingsPanel from "@/components/admin/SettingsPanel";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-600">Conversa AI Admin</h1>
            <div className="flex gap-4">
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Link to="/widget">
                <Button>View Widget</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <Tabs defaultValue="settings" className="w-full">
            <div className="border-b px-6 py-3">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="prompts">Prompts & Context</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
                <TabsTrigger value="models">AI Models</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="settings" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Widget Settings</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <SettingsPanel />
                  <div className="flex flex-col space-y-6">
                    <WidgetPreview 
                      config={{
                        widgetId: "widget_demo123",
                        behavior: {
                          autoOpen: false,
                          autoOpenDelay: 3000,
                          showOnAllPages: true,
                          initialMessage: "Hello! How can I help you today?",
                          persistConversation: true,
                        },
                        appearance: {
                          position: "bottom-right",
                          theme: {
                            primaryColor: "#7c3aed",
                            textColor: "#ffffff",
                            backgroundColor: "#ffffff",
                            buttonStyle: "rounded",
                          },
                          title: "Conversa AI",
                          subtitle: "Ask me anything",
                          welcomeMessage: "Hello! I'm your AI assistant. How can I help you today?",
                          inputPlaceholder: "Type your message...",
                          sendButtonText: "Send",
                        }
                      }} 
                    />
                    <EmbedCode widgetId="widget_demo123" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="prompts" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Prompts & Context Configuration</h2>
                <p className="text-gray-500 mb-6">Define how the AI responds to user queries by configuring prompt templates and context instructions.</p>
                <div className="bg-white p-6 rounded-md border border-gray-200">
                  <PromptTemplateEditor />
                </div>
              </TabsContent>
              
              <TabsContent value="knowledge" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Knowledge Base</h2>
                <p className="text-gray-500 mb-6">Upload articles and resources to improve AI response quality and reduce token usage.</p>
                <div className="bg-white p-6 rounded-md border border-gray-200">
                  <KnowledgeBaseUploader />
                </div>
              </TabsContent>
              
              <TabsContent value="models" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">AI Models Configuration</h2>
                <p className="text-gray-500 mb-6">Configure which AI models to use for different types of queries.</p>
                <div className="bg-white p-6 rounded-md border border-gray-200">
                  <ModelSelector />
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Analytics & Reporting</h2>
                <p className="text-gray-500 mb-6">View usage statistics and conversation analytics.</p>
                <div className="bg-white p-6 rounded-md border border-gray-200">
                  <div className="mt-4">
                    <ChatAnalytics />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
