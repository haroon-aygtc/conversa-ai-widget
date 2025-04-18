import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings,
  BrainCircuit,
  Database,
  Bot,
  BarChart3,
  ChevronLeft,
  MessageSquare,
  Palette,
  FileText,
  MessageCircle,
  BookOpen,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWidgetConfig } from "@/utils/widgetSettings";
import { AppearanceSettings } from "@/components/admin/settings/AppearanceSettings";
import { BehaviorSettings } from "@/components/admin/settings/BehaviorSettings";
import { MessagesSettings } from "@/components/admin/settings/MessagesSettings";
import ChatAnalytics from "@/components/admin/ChatAnalytics";
import KnowledgeBaseUploader from "@/components/admin/KnowledgeBaseUploader";
import PromptTemplateEditor from "@/components/admin/PromptTemplateEditor";
import ModelSelector from "@/components/admin/ModelSelector";
import EmbedCode from "@/components/widget/EmbedCode";
import WidgetPreview from "@/components/widget/WidgetPreview";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from "@/components/ui/sidebar";

const Admin = () => {
  const [config, setConfig] = useState(generateWidgetConfig({
    widgetId: "widget_demo123"
  }));

  const [activeSection, setActiveSection] = useState("settings");

  const updateConfig = (path: string, value: any) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current: any = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  const menuItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'prompts', icon: BrainCircuit, label: 'Prompts' },
    { id: 'knowledge', icon: Database, label: 'Knowledge' },
    { id: 'models', icon: Bot, label: 'Models' },
    { id: 'responses', icon: MessageSquare, label: 'Responses' },
    { id: 'branding', icon: Palette, label: 'Branding' },
    { id: 'templates', icon: FileText, label: 'Templates' },
    { id: 'followups', icon: MessageCircle, label: 'Follow-ups' },
    { id: 'context', icon: BookOpen, label: 'Context' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'integration', icon: Layers, label: 'Integration' },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader>
            <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700 px-4 py-2">
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-xl font-semibold text-purple-600">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h1>
                <div className="flex gap-4">
                  <Link to="/widget">
                    <Button>View Widget</Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
              {activeSection === 'settings' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <AppearanceSettings config={config} onUpdate={updateConfig} />
                    <BehaviorSettings config={config} onUpdate={updateConfig} />
                    <MessagesSettings config={config} onUpdate={updateConfig} />
                  </div>
                  <div className="flex flex-col space-y-6">
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <h3 className="text-lg font-medium mb-4">Live Preview</h3>
                      <WidgetPreview config={config} />
                    </div>
                    <EmbedCode widgetId="widget_demo123" />
                  </div>
                </div>
              )}

              {activeSection === 'prompts' && <PromptTemplateEditor />}
              {activeSection === 'knowledge' && <KnowledgeBaseUploader />}
              {activeSection === 'models' && <ModelSelector />}
              {activeSection === 'analytics' && <ChatAnalytics />}

              {/* Other sections will be implemented next */}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
