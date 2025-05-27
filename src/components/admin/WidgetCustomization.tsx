
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppearanceSettings } from "./settings/AppearanceSettings";
import { BehaviorSettings } from "./settings/BehaviorSettings";
import { MessagesSettings } from "./settings/MessagesSettings";
import { BrandingSettings } from "./settings/BrandingSettings";
import WidgetPreview from "../widget/WidgetPreview";
import EmbedCode from "../widget/EmbedCode";
import { generateWidgetConfig } from "@/utils/widgetSettings";
import { Button } from "@/components/ui/button";
import { Save, Eye, Code, Palette, Settings, MessageSquare, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WidgetCustomization = () => {
  const [config, setConfig] = useState(generateWidgetConfig({
    widgetId: "widget_demo123"
  }));
  
  const { toast } = useToast();

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

  const handleSaveConfig = () => {
    // Here you would typically save to your backend
    toast({
      title: "Settings Saved",
      description: "Your widget configuration has been saved successfully.",
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Widget Customization</h1>
          <p className="text-muted-foreground">
            Configure the appearance, behavior, and content of your chat widget
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSaveConfig} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="xl:col-span-2">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Behavior
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="branding" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Branding
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="appearance" className="mt-0">
                <AppearanceSettings config={config} onUpdate={updateConfig} />
              </TabsContent>

              <TabsContent value="behavior" className="mt-0">
                <BehaviorSettings config={config} onUpdate={updateConfig} />
              </TabsContent>

              <TabsContent value="messages" className="mt-0">
                <MessagesSettings config={config} onUpdate={updateConfig} />
              </TabsContent>

              <TabsContent value="branding" className="mt-0">
                <BrandingSettings config={config} onUpdate={updateConfig} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Preview and Code Panel */}
        <div className="xl:col-span-1 space-y-6">
          {/* Live Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
              <CardDescription>
                See how your widget will look on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                <WidgetPreview config={config} />
              </div>
            </CardContent>
          </Card>

          {/* Embed Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Embed Code
              </CardTitle>
              <CardDescription>
                Copy this code to add the widget to your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmbedCode widgetId="widget_demo123" />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Statistics</CardTitle>
              <CardDescription>Current widget performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Sessions</span>
                <span className="font-medium">245</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Response Rate</span>
                <span className="font-medium">98.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                <span className="font-medium">1.2s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">User Satisfaction</span>
                <span className="font-medium">4.8/5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WidgetCustomization;
