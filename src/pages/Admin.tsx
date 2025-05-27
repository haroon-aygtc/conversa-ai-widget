import { useState, useEffect } from "react";
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
  Globe,
  Search,
  Bell,
  User,
  ChevronDown,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
import WidgetCustomization from "@/components/admin/WidgetCustomization";

const Admin = () => {
  const [config, setConfig] = useState(generateWidgetConfig({
    widgetId: "widget_demo123"
  }));

  const [activeSection, setActiveSection] = useState("dashboard");
  const [activeSubSection, setActiveSubSection] = useState("appearance");
  const [searchQuery, setSearchQuery] = useState("");

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
      id: 'dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard',
      badge: 'New'
    },
    { 
      id: 'widget-customization', 
      icon: Palette, 
      label: 'Widget Customization',
      badge: 'Updated'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings',
      subMenus: [
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
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'integration', icon: Globe, label: 'Integrations', badge: '5' },
    { 
      id: 'users', 
      icon: User, 
      label: 'User Management',
      badge: 'Pro'
    }
  ];

  const handleMenuItemClick = (sectionId: string, subSectionId?: string) => {
    setActiveSection(sectionId);
    if (subSectionId) {
      setActiveSubSection(subSectionId);
    } else {
      // Set default sub-section based on section
      switch (sectionId) {
        case 'settings':
          setActiveSubSection('advanced');
          break;
        case 'ai':
          setActiveSubSection('prompts');
          break;
        case 'content':
          setActiveSubSection('templates');
          break;
        default:
          setActiveSubSection('');
      }
    }
  };

  const renderContent = () => {
    if (activeSection === 'dashboard') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,543</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2s</div>
                <p className="text-xs text-muted-foreground">-0.1s from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">+45 from last week</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your widget's recent interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New conversation started</p>
                          <p className="text-xs text-muted-foreground">user1234@example.com</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{i * 5}m ago</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you can perform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2">
                    <BrainCircuit className="h-5 w-5" />
                    <span>Edit AI Prompts</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2">
                    <Palette className="h-5 w-5" />
                    <span>Customize Widget</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Knowledge Base</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Widget Preview</CardTitle>
                <CardDescription>Live preview of your current widget configuration</CardDescription>
              </div>
              <Button>Edit Widget</Button>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="w-[320px] border rounded-lg overflow-hidden shadow-lg">
                <WidgetPreview config={config} />
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Widget Customization - New consolidated section
    if (activeSection === 'widget-customization') {
      return <WidgetCustomization />;
    }

    // Settings section
    if (activeSection === 'settings') {
      if (activeSubSection === 'advanced') {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced system options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Performance Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Max Token Limit</label>
                      <p className="text-sm text-muted-foreground">Maximum tokens to process per request</p>
                    </div>
                    <Input type="number" className="w-24" defaultValue="1024" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Response Timeout</label>
                      <p className="text-sm text-muted-foreground">Maximum time to wait for AI response (seconds)</p>
                    </div>
                    <Input type="number" className="w-24" defaultValue="30" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Content Filtering</label>
                      <p className="text-sm text-muted-foreground">Filter sensitive or inappropriate content</p>
                    </div>
                    <Button variant="outline">Configure Filters</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">CORS Policy</label>
                      <p className="text-sm text-muted-foreground">Allow specific domains to access your widget</p>
                    </div>
                    <Button variant="outline">Configure CORS</Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save Advanced Settings</Button>
              </div>
            </CardContent>
          </Card>
        );
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
      if (activeSubSection === 'routing') {
        return (
          <Card>
            <CardHeader>
              <CardTitle>AI Routing</CardTitle>
              <CardDescription>Configure dynamic routing between different AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Routing Rules</h3>
                  <Button size="sm">Add Rule</Button>
                </div>
                
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Technical Questions</h4>
                      <p className="text-sm text-muted-foreground">Route to: Gemini Pro</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Delete</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sales Inquiries</h4>
                      <p className="text-sm text-muted-foreground">Route to: Custom Sales Model</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Delete</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Support Requests</h4>
                      <p className="text-sm text-muted-foreground">Route to: Knowledge Base Enhanced Model</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Delete</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">Fallback Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium">Default Model</label>
                        <p className="text-sm text-muted-foreground">Used when no routing rule matches</p>
                      </div>
                      <Button variant="outline">Select Model</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium">Failover Strategy</label>
                        <p className="text-sm text-muted-foreground">What to do when primary model fails</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
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

    // Top level sections
    switch (activeSection) {
      case 'analytics':
        return <ChatAnalytics />;
      case 'integration':
        return <IntegrationSettings />;
      case 'users':
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage users and permissions</CardDescription>
                </div>
                <Button>Add User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium text-sm">User</th>
                      <th className="text-left p-3 font-medium text-sm">Email</th>
                      <th className="text-left p-3 font-medium text-sm">Role</th>
                      <th className="text-left p-3 font-medium text-sm">Status</th>
                      <th className="text-right p-3 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
                      { name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
                      { name: "Robert Johnson", email: "robert@example.com", role: "Viewer", status: "Invited" },
                      { name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
                      { name: "Thomas Wilson", email: "thomas@example.com", role: "Viewer", status: "Inactive" },
                    ].map((user, i) => (
                      <tr key={i}>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                          <Badge variant={user.role === "Admin" ? "default" : 
                                          user.role === "Editor" ? "secondary" : "outline"}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={user.status === "Active" ? "success" : 
                                          user.status === "Invited" ? "warning" : "destructive"}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">Edit</Button>
                            <Button size="sm" variant="ghost">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="bg-muted/20 p-3 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Showing 5 of 20 users</p>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">Previous</Button>
                    <Button size="sm" variant="outline">Next</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
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
      <div className="min-h-screen flex w-full bg-background">
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

        <SidebarInset>
          <header className="bg-background border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <SidebarTrigger className="mr-4" />
                  <h1 className="text-xl font-semibold text-primary">
                    {getSectionTitle()}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="mr-4">
                    <ThemeToggle />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-[300px] overflow-auto">
                        {[1, 2, 3].map(i => (
                          <DropdownMenuItem key={i} className="flex flex-col items-start p-4">
                            <p className="text-sm font-medium">New conversation started</p>
                            <p className="text-xs text-muted-foreground">5 minutes ago</p>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="justify-center text-center">
                        <Button variant="ghost" className="w-full" size="sm">
                          View all notifications
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span>Admin User</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Help</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
