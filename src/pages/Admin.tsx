
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Settings, 
  BrainCircuit, 
  Database, 
  Bot, 
  BarChart3, 
  ChevronLeft 
} from "lucide-react";
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
      {/* Header with improved styling */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
                <ChevronLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-purple-600">Conversa AI Admin</h1>
            <div className="flex gap-4">
              <Link to="/widget">
                <Button>View Widget</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with improved layout and styling */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <Tabs defaultValue="settings" className="w-full">
            <div className="border-b px-6 py-3">
              <TabsList className="grid grid-cols-5 gap-4">
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="prompts" className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4" />
                  Prompts
                </TabsTrigger>
                <TabsTrigger value="knowledge" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Knowledge
                </TabsTrigger>
                <TabsTrigger value="models" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  Models
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="settings" className="mt-0 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Widget Settings</h2>
                    <SettingsPanel />
                  </div>
                  <div className="flex flex-col space-y-6">
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <h3 className="text-lg font-medium mb-4">Live Preview</h3>
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
                    </div>
                    <EmbedCode widgetId="widget_demo123" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="prompts" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Prompts & Context Configuration</h2>
                  </div>
                  <p className="text-gray-500">Define how the AI responds to user queries by configuring prompt templates and context instructions.</p>
                  <div className="bg-white rounded-lg border border-gray-200">
                    <PromptTemplateEditor />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="knowledge" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Knowledge Base</h2>
                  </div>
                  <p className="text-gray-500">Upload articles and resources to improve AI response quality and reduce token usage.</p>
                  <div className="bg-white rounded-lg border border-gray-200">
                    <KnowledgeBaseUploader />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="models" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">AI Models Configuration</h2>
                  </div>
                  <p className="text-gray-500">Configure which AI models to use for different types of queries.</p>
                  <div className="bg-white rounded-lg border border-gray-200">
                    <ModelSelector />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Analytics & Reporting</h2>
                  </div>
                  <p className="text-gray-500">View usage statistics and conversation analytics.</p>
                  <div className="bg-white rounded-lg border border-gray-200">
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
