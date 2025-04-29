
import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  BrainCircuit,
  FileText,
  Palette,
  BarChart3,
  Globe,
  User,
  ChevronLeft,
  Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  activeSection: string;
  activeSubSection: string;
  onMenuItemClick: (sectionId: string, subSectionId?: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeSection, 
  activeSubSection,
  onMenuItemClick 
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isMobile, setOpenMobile } = useSidebar();

  const handleMenuItemClick = (sectionId: string, subSectionId?: string) => {
    onMenuItemClick(sectionId, subSectionId);
    
    // Close mobile sidebar after navigation
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard',
      badge: 'New'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings',
      subMenus: [
        { id: 'appearance', label: 'Appearance' },
        { id: 'behavior', label: 'Behavior' },
        { id: 'messages', label: 'Messages' },
        { id: 'advanced', label: 'Advanced', badge: 'New' }
      ]
    },
    { 
      id: 'ai', 
      icon: BrainCircuit, 
      label: 'AI Configuration',
      subMenus: [
        { id: 'prompts', label: 'Prompts' },
        { id: 'models', label: 'Models' },
        { id: 'context', label: 'Context' },
        { id: 'routing', label: 'Routing', badge: 'Beta' }
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
        { id: 'branding', label: 'Branding' },
        { id: 'themes', label: 'Themes', badge: 'New' },
        { id: 'widgets', label: 'Widget Styles' }
      ]
    },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'integration', icon: Globe, label: 'Integrations', badge: '5' },
    { 
      id: 'users', 
      icon: User, 
      label: 'User Management',
      badge: 'Pro'
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 px-4 py-2">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search" 
              placeholder="Search..." 
              className="pl-8 w-full bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {menuItems.map((item) => (
          <SidebarGroup key={item.id}>
            <SidebarGroupLabel>{item.label} {item.badge && <Badge className="ml-2">{item.badge}</Badge>}</SidebarGroupLabel>
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
                    {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.subMenus.map(subMenu => (
                      <SidebarMenuSubItem key={subMenu.id}>
                        <SidebarMenuSubButton
                          isActive={activeSection === item.id && activeSubSection === subMenu.id}
                          onClick={() => handleMenuItemClick(item.id, subMenu.id)}
                        >
                          <span>{subMenu.label}</span>
                          {subMenu.badge && <Badge className="ml-auto">{subMenu.badge}</Badge>}
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
                    {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
