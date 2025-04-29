import { useEffect, useState } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { toast } from "@/components/ui/use-toast";

import {
  BrainCircuit,
  Palette,
  BarChart3,
  FileText,
  MessageCircle,
  BookOpen,
  User
} from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [config, setConfig] = useState(generateWidgetConfig({
    widgetId: "widget_demo123"
  }));

  // Default to dashboard if no path is present
  const [activeSection, setActiveSection] = useState("dashboard");
  const [activeSubSection, setActiveSubSection] = useState("");

  // Parse the URL path on mount and when location changes
  useEffect(() => {
    // Extract the path after /admin/
    const path = location.pathname.replace('/admin/', '');
    
    if (path) {
      const segments = path.split('/');
      const section = segments[0] || 'dashboard';
      
      setActiveSection(section);
      if (segments.length > 1 && segments[1]) {
        setActiveSubSection(segments[1]);
      } else {
        // Set default subsection based on section
        setDefaultSubSection(section);
      }
    } else {
      // Default to dashboard for /admin
      setActiveSection('dashboard');
      setActiveSubSection('');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  const setDefaultSubSection = (sectionId: string) => {
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
  };

  const updateConfig = (path: string, value: any) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current: any = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
    
    // Show success toast
    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleMenuItemClick = (sectionId: string, subSectionId?: string) => {
    setActiveSection(sectionId);
    
    // If subsection is provided, use it; otherwise set default based on section
    if (subSectionId) {
      setActiveSubSection(subSectionId);
      navigate(`/admin/${sectionId}/${subSectionId}`);
    } else {
      // For sections without subsections
      navigate(`/admin/${sectionId}`);
      
      // Set default subsection if applicable
      setDefaultSubSection(sectionId);
    }
  };

  const getSectionTitle = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'settings', label: 'Settings', 
        subMenus: [
          { id: 'appearance', label: 'Appearance' },
          { id: 'behavior', label: 'Behavior' },
          { id: 'messages', label: 'Messages' },
          { id: 'advanced', label: 'Advanced' }
        ] 
      },
      { id: 'ai', label: 'AI Configuration',
        subMenus: [
          { id: 'prompts', label: 'Prompts' },
          { id: 'models', label: 'Models' },
          { id: 'context', label: 'Context' },
          { id: 'routing', label: 'Routing' }
        ]
      },
      { id: 'content', label: 'Content', 
        subMenus: [
          { id: 'templates', label: 'Templates' },
          { id: 'responses', label: 'Responses' },
          { id: 'followups', label: 'Follow-ups' },
          { id: 'knowledge', label: 'Knowledge Base' }
        ]
      },
      { id: 'customize', label: 'Customize',
        subMenus: [
          { id: 'branding', label: 'Branding' },
          { id: 'themes', label: 'Themes' },
          { id: 'widgets', label: 'Widget Styles' }
        ]
      },
      { id: 'analytics', label: 'Analytics' },
      { id: 'integration', label: 'Integrations' },
      { id: 'users', label: 'User Management' },
    ];
    
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

  const renderContent = () => {
    // Dashboard
    if (activeSection === 'dashboard') {
      return <Dashboard config={config} />;
    }

    // Settings section
    if (activeSection === 'settings') {
      switch (activeSubSection) {
        case 'appearance':
          return (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <AppearanceSettings config={config} onUpdate={updateConfig} />
              </div>
              <div className="flex flex-col space-y-6">
                <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
                  <h3 className="text-lg font-medium mb-4">Live Preview</h3>
                  <WidgetPreview config={config} />
                </div>
                <EmbedCode widgetId="widget_demo123" />
              </div>
            </div>
          );
        case 'behavior':
          return <BehaviorSettings config={config} onUpdate={updateConfig} />;
        case 'messages':
          return <MessagesSettings config={config} onUpdate={updateConfig} />;
        case 'advanced':
          return <AdvancedSettings />;
      }
    }

    // AI Configuration section
    if (activeSection === 'ai') {
      switch (activeSubSection) {
        case 'prompts':
          return <PromptTemplateEditor />;
        case 'models':
          return <ModelSelector />;
        case 'context':
          return <ContextManager />;
        case 'routing':
          return <RoutingSettings />;
      }
    }

    // Content section
    if (activeSection === 'content') {
      switch (activeSubSection) {
        case 'templates':
          return <TemplatesManager />;
        case 'responses':
          return <ResponsesSettings config={config} onUpdate={updateConfig} />;
        case 'followups':
          return <FollowUpManager />;
        case 'knowledge':
          return <KnowledgeBaseUploader />;
      }
    }

    // Customize section
    if (activeSection === 'customize') {
      switch (activeSubSection) {
        case 'branding':
          return <BrandingSettings config={config} onUpdate={updateConfig} />;
        case 'themes':
          return <ThemeManager />;
        case 'widgets':
          return <WidgetStyles />;
      }
    }

    // Top level sections
    switch (activeSection) {
      case 'analytics':
        return <ChatAnalytics />;
      case 'integration':
        return <IntegrationSettings />;
      case 'users':
        return <UserManagement />;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="admin-layout bg-background">
        <AdminSidebar 
          activeSection={activeSection} 
          activeSubSection={activeSubSection}
          onMenuItemClick={handleMenuItemClick} 
        />

        <SidebarInset className="admin-content">
          <AdminHeader title={getSectionTitle()} />

          <main className="admin-main">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
