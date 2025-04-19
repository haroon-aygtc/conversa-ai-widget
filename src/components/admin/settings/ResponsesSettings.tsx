
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface ResponsesSettingsProps {
  config: any;
  onUpdate: (path: string, value: any) => void;
}

export function ResponsesSettings({ config, onUpdate }: ResponsesSettingsProps) {
  const [activeFormat, setActiveFormat] = useState("standard");
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Response Formatting</CardTitle>
        <CardDescription>
          Customize how AI responses are formatted and displayed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="structure" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="snippets">Snippets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="structure" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label>Response Format</Label>
              <div className="grid grid-cols-2 gap-2">
                {["standard", "detailed", "concise", "faq"].map((format) => (
                  <Button
                    key={format}
                    type="button"
                    variant={activeFormat === format ? "default" : "outline"}
                    onClick={() => {
                      setActiveFormat(format);
                      onUpdate('responses.format', format);
                    }}
                    className="capitalize"
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="include-headers" className="block">Include Headers</Label>
                <p className="text-sm text-gray-500">Add section headers in responses</p>
              </div>
              <Switch
                id="include-headers"
                checked={config.responses?.includeHeaders || false}
                onCheckedChange={(checked) => onUpdate('responses.includeHeaders', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="include-bullets" className="block">Bullet Points</Label>
                <p className="text-sm text-gray-500">Format lists as bullet points</p>
              </div>
              <Switch
                id="include-bullets"
                checked={config.responses?.useBullets || false}
                onCheckedChange={(checked) => onUpdate('responses.useBullets', checked)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="response-tone">Response Tone</Label>
              <Select 
                value={config.responses?.tone || "friendly"} 
                onValueChange={(value) => onUpdate('responses.tone', value)}
              >
                <SelectTrigger id="response-tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-length">Maximum Response Length</Label>
              <Select 
                value={config.responses?.maxLength || "medium"} 
                onValueChange={(value) => onUpdate('responses.maxLength', value)}
              >
                <SelectTrigger id="max-length">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brief">Brief (1-2 paragraphs)</SelectItem>
                  <SelectItem value="medium">Medium (2-3 paragraphs)</SelectItem>
                  <SelectItem value="detailed">Detailed (3+ paragraphs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="use-markdown" className="block">Use Markdown</Label>
                <p className="text-sm text-gray-500">Format responses with markdown</p>
              </div>
              <Switch
                id="use-markdown"
                checked={config.responses?.useMarkdown || false}
                onCheckedChange={(checked) => onUpdate('responses.useMarkdown', checked)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="snippets" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="greeting-snippet">Greeting Snippet</Label>
              <Textarea
                id="greeting-snippet"
                placeholder="Hi there! How can I help you today?"
                value={config.responses?.snippets?.greeting || ""}
                onChange={(e) => onUpdate('responses.snippets.greeting', e.target.value)}
                className="min-h-24"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fallback-snippet">Fallback Snippet</Label>
              <Textarea
                id="fallback-snippet"
                placeholder="I'm sorry, I don't have enough information to answer that question."
                value={config.responses?.snippets?.fallback || ""}
                onChange={(e) => onUpdate('responses.snippets.fallback', e.target.value)}
                className="min-h-24"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="closing-snippet">Closing Snippet</Label>
              <Textarea
                id="closing-snippet"
                placeholder="Is there anything else I can help you with?"
                value={config.responses?.snippets?.closing || ""}
                onChange={(e) => onUpdate('responses.snippets.closing', e.target.value)}
                className="min-h-24"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
