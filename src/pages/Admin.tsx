
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
  Layers,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWidgetConfig } from "@/utils/widgetSettings";
import { AppearanceSettings } from "@/components/admin/settings/AppearanceSettings";
import { BehaviorSettings } from "@/components/admin/settings/BehaviorSettings";
import { MessagesSettings } from "@/components/admin/settings/MessagesSettings";
import { ResponsesSettings } from "@/components/admin/settings/ResponsesSettings";
import { BrandingSettings } from "@/components/admin/settings/BrandingSettings";
import ChatAnalytics from "@/components/admin/ChatAnalytics";
import KnowledgeBaseUploader from "@/components/admin/KnowledgeBaseUploader";
import PromptTemplateEditor from "@/components/admin/PromptTemplateEditor";
import ModelSelector from "@/components/admin/ModelSelector";
import TemplatesManager from "@/components/admin/TemplatesManager";
import FollowUpManager from "@/components/admin/FollowUpManager";
import ContextManager from "@/components/admin/ContextManager";
import IntegrationSettings from "@/components/admin/IntegrationSettings";
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
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";

const Admin = () => {
  const [config, setConfig] = useState(generateWidgetConfig({
    widgetId: "widget_demo123"
  }));

  const [activeSection, setActiveSection] = useState("settings");
  const [activeSubSection, setActiveSubSection] = useState("appearance");

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
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings',
      subMenus: [
        { id: 'appearance', label: 'Appearance' },
        { id: 'behavior', label: 'Behavior' },
        { id: 'messages', label: 'Messages' }
      ]
    },
    { 
      id: 'ai', 
      icon: BrainCircuit, 
      label: 'AI Configuration',
      subMenus: [
        { id: 'prompts', label: 'Prompts' },
        { id: 'models', label: 'Models' },
        { id: 'context', label: 'Context' }
      ]
    },
    { 
      id: 'content', 
      icon: FileText, 
      label: 'Content',
      subMenus: [
        { id: 'templates', label: 'Templates' },
        { id: 'responses', label: 'Responses' },
        { id: 'followups', label: 'Follow-ups' },
        { id: 'knowledge', label: 'Knowledge Base' }
      ] 
    },
    { 
      id: 'customize', 
      icon: Palette, 
      label: 'Customize',
      subMenus: [
        { id: 'branding', label: 'Branding' }
      ]
    },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'integration', icon: Globe, label: 'Integrations' }
  ];

  const handleMenuItemClick = (sectionId: string, subSectionId?: string) => {
    setActiveSection(sectionId);
    if (subSectionId) {
      setActiveSubSection(subSectionId);
    } else {
      // Set default sub-section based on section
      switch (sectionId) {
        case 'settings':
          setActiveSubSection('appearance');
          break;
        case 'ai':
          setActiveSubSection('prompts');
          break;
        case 'content':
          setActiveSubSection('templates');
          break;
        case 'customize':
          setActiveSubSection('branding');
          break;
        default:
          setActiveSubSection('');
      }
    }
  };

  const renderContent = () => {
    // Settings section
    if (activeSection === 'settings') {
      if (activeSubSection === 'appearance') {
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <AppearanceSettings config={config} onUpdate={updateConfig} />
            </div>
            <div className="flex flex-col space-y-6">
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-medium mb-4">Live Preview</h3>
                <WidgetPreview config={config} />
              </div>
              <EmbedCode widgetId="widget_demo123" />
            </div>
          </div>
        );
      }
      if (activeSubSection === 'behavior') {
        return <BehaviorSettings config={config} onUpdate={updateConfig} />;
      }
      if (activeSubSection === 'messages') {
        return <MessagesSettings config={config} onUpdate={updateConfig} />;
      }
    }

    // AI Configuration section
    if (activeSection === 'ai') {
      if (activeSubSection === 'prompts') {
        return <PromptTemplateEditor />;
      }
      if (activeSubSection === 'models') {
        return <ModelSelector />;
      }
      if (activeSubSection === 'context') {
        return <ContextManager />;
      }
    }

    // Content section
    if (activeSection === 'content') {
      if (activeSubSection === 'templates') {
        return <TemplatesManager />;
      }
      if (activeSubSection === 'responses') {
        return <ResponsesSettings config={config} onUpdate={updateConfig} />;
      }
      if (activeSubSection === 'followups') {
        return <FollowUpManager />;
      }
      if (activeSubSection === 'knowledge') {
        return <KnowledgeBaseUploader />;
      }
    }

    // Customize section
    if (activeSection === 'customize') {
      if (activeSubSection === 'branding') {
        return <BrandingSettings config={config} onUpdate={updateConfig} />;
      }
    }

    // Top level sections
    switch (activeSection) {
      case 'analytics':
        return <ChatAnalytics />;
      case 'integration':
        return <IntegrationSettings />;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  const getSectionTitle = () => {
    const section = menuItems.find(item => item.id === activeSection);
    if (!section) return 'Dashboard';
    
    if (activeSubSection && section.subMenus) {
      const subSection = section.subMenus.find(sub => sub.id === activeSubSection);
      if (subSection) {
        return `${section.label} › ${subSection.label}`;
      }
    }

    return section.label;
  };

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
            {menuItems.map((item) => (
              <SidebarGroup key={item.id}>
                <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
                <SidebarMenu>
                  {item.subMenus ? (
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === item.id}
                        onClick={() => handleMenuItemClick(item.id)}
                        tooltip={item.label}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.subMenus.map(subMenu => (
                          <SidebarMenuSubItem key={subMenu.id}>
                            <SidebarMenuSubButton
                              isActive={activeSection === item.id && activeSubSection === subMenu.id}
                              onClick={() => handleMenuItemClick(item.id, subMenu.id)}
                            >
                              <span>{subMenu.label}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeSection === item.id}
                        onClick={() => handleMenuItemClick(item.id)}
                        tooltip={item.label}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <SidebarTrigger className="mr-4" />
                  <h1 className="text-xl font-semibold text-purple-600">
                    {getSectionTitle()}
                  </h1>
                </div>
                <div className="flex gap-4">
                  <Link to="/widget">
                    <Button>View Widget</Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
