
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export interface BrandingSettingsProps {
  config: any;
  onUpdate: (path: string, value: any) => void;
}

export function BrandingSettings({ config, onUpdate }: BrandingSettingsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Branding & Identity</CardTitle>
        <CardDescription>
          Customize the visual identity and branding of your AI assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="identity" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="visuals">Visuals</TabsTrigger>
            <TabsTrigger value="voice">Voice & Tone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="identity" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={config.branding?.companyName || ""}
                onChange={(e) => onUpdate('branding.companyName', e.target.value)}
                placeholder="Acme Corporation"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bot-name">AI Assistant Name</Label>
              <Input
                id="bot-name"
                value={config.branding?.botName || ""}
                onChange={(e) => onUpdate('branding.botName', e.target.value)}
                placeholder="AcmeBot"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-description">Company Description</Label>
              <Textarea
                id="company-description"
                value={config.branding?.companyDescription || ""}
                onChange={(e) => onUpdate('branding.companyDescription', e.target.value)}
                placeholder="A brief description of your company"
                className="min-h-24"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-branding" className="block">Show Bot Identity</Label>
                <p className="text-sm text-gray-500">Display bot name in conversations</p>
              </div>
              <Switch
                id="show-branding"
                checked={config.branding?.showBranding || true}
                onCheckedChange={(checked) => onUpdate('branding.showBranding', checked)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="visuals" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-md border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  {config.branding?.logo ? (
                    <img 
                      src={config.branding.logo} 
                      alt="Company logo" 
                      className="max-w-full max-h-full p-2" 
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <Button variant="outline" className="flex-1">
                  Upload Logo
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 512x512px, PNG or SVG format
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Bot Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  {config.branding?.botAvatar ? (
                    <img 
                      src={config.branding.botAvatar} 
                      alt="Bot avatar" 
                      className="max-w-full max-h-full rounded-full" 
                    />
                  ) : (
                    <Upload className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <Button variant="outline" className="flex-1">
                  Upload Avatar
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 256x256px, square aspect ratio
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-css">Custom CSS (Advanced)</Label>
              <Textarea
                id="custom-css"
                value={config.branding?.customCSS || ""}
                onChange={(e) => onUpdate('branding.customCSS', e.target.value)}
                placeholder=".chat-widget { /* custom styles */ }"
                className="min-h-24 font-mono text-sm"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="voice" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="brand-voice">Brand Voice</Label>
              <Textarea
                id="brand-voice"
                value={config.branding?.brandVoice || ""}
                onChange={(e) => onUpdate('branding.brandVoice', e.target.value)}
                placeholder="Describe the preferred voice and tone for your AI assistant"
                className="min-h-24"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: "Friendly and approachable, uses simple language, avoids technical jargon"
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand-values">Key Brand Values</Label>
              <Textarea
                id="brand-values"
                value={config.branding?.brandValues || ""}
                onChange={(e) => onUpdate('branding.brandValues', e.target.value)}
                placeholder="List key values your brand upholds"
                className="min-h-24"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: "Innovation, Reliability, Customer-focus, Sustainability"
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand-dont">Brand Don'ts</Label>
              <Textarea
                id="brand-dont"
                value={config.branding?.brandDonts || ""}
                onChange={(e) => onUpdate('branding.brandDonts', e.target.value)}
                placeholder="Topics or language to avoid"
                className="min-h-24"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: "Don't use overly technical terms, don't discuss competitors, avoid political topics"
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
