
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateWidgetConfig, WidgetConfig, WidgetPosition } from "@/utils/widgetSettings";

const SettingsPanel = () => {
  const [config, setConfig] = useState<WidgetConfig>(generateWidgetConfig({
    widgetId: "widget_demo123"
  }));
  
  const [selectedColor, setSelectedColor] = useState(config.appearance.theme.primaryColor);
  
  const updateConfig = (path: string, value: any) => {
    const newConfig = { ...config };
    
    // Update nested property using path string (e.g., "appearance.theme.primaryColor")
    const keys = path.split('.');
    let current: any = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-4 mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Theme & Colors</CardTitle>
              <CardDescription>
                Customize how your widget looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-10 h-10 rounded-full border cursor-pointer"
                    style={{ backgroundColor: selectedColor }}
                    onClick={() => document.getElementById('color-picker')?.click()}
                  ></div>
                  <Input
                    id="color-picker"
                    type="color"
                    value={selectedColor}
                    className="w-0 h-0 opacity-0 absolute"
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                      updateConfig('appearance.theme.primaryColor', e.target.value);
                    }}
                  />
                  <Input
                    value={selectedColor}
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                      updateConfig('appearance.theme.primaryColor', e.target.value);
                    }}
                    className="flex-1"
                    placeholder="#7c3aed"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Button Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["rounded", "square", "pill"].map((style) => (
                    <Button
                      key={style}
                      type="button"
                      variant={config.appearance.theme.buttonStyle === style ? "default" : "outline"}
                      onClick={() => updateConfig('appearance.theme.buttonStyle', style)}
                      className="capitalize"
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Widget Position</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(["bottom-right", "bottom-left", "top-right", "top-left"] as WidgetPosition[]).map((position) => (
                    <Button
                      key={position}
                      type="button"
                      variant={config.appearance.position === position ? "default" : "outline"}
                      onClick={() => updateConfig('appearance.position', position)}
                      className="capitalize"
                    >
                      {position.replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-4 mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Behavior Settings</CardTitle>
              <CardDescription>
                Configure how your widget behaves
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-open" className="block">Auto-open Widget</Label>
                  <p className="text-sm text-gray-500">Automatically open the widget after a delay</p>
                </div>
                <Switch
                  id="auto-open"
                  checked={config.behavior.autoOpen}
                  onCheckedChange={(checked) => updateConfig('behavior.autoOpen', checked)}
                />
              </div>
              
              {config.behavior.autoOpen && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Auto-open Delay (seconds): {config.behavior.autoOpenDelay/1000}</Label>
                  </div>
                  <Slider
                    value={[config.behavior.autoOpenDelay/1000]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => updateConfig('behavior.autoOpenDelay', value[0]*1000)}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1s</span>
                    <span>30s</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label htmlFor="show-all-pages" className="block">Show on All Pages</Label>
                  <p className="text-sm text-gray-500">Display widget on every page of your site</p>
                </div>
                <Switch
                  id="show-all-pages"
                  checked={config.behavior.showOnAllPages}
                  onCheckedChange={(checked) => updateConfig('behavior.showOnAllPages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label htmlFor="persist-conversation" className="block">Remember Conversations</Label>
                  <p className="text-sm text-gray-500">Save chat history between page visits</p>
                </div>
                <Switch
                  id="persist-conversation"
                  checked={config.behavior.persistConversation}
                  onCheckedChange={(checked) => updateConfig('behavior.persistConversation', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4 mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Messages & Text</CardTitle>
              <CardDescription>
                Customize widget text and messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="widget-title">Widget Title</Label>
                <Input
                  id="widget-title"
                  value={config.appearance.title}
                  onChange={(e) => updateConfig('appearance.title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="widget-subtitle">Widget Subtitle (optional)</Label>
                <Input
                  id="widget-subtitle"
                  value={config.appearance.subtitle}
                  onChange={(e) => updateConfig('appearance.subtitle', e.target.value)}
                  placeholder="Ask me anything"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Input
                  id="welcome-message"
                  value={config.appearance.welcomeMessage}
                  onChange={(e) => updateConfig('appearance.welcomeMessage', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="input-placeholder">Input Placeholder</Label>
                <Input
                  id="input-placeholder"
                  value={config.appearance.inputPlaceholder}
                  onChange={(e) => updateConfig('appearance.inputPlaceholder', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
