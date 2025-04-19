
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";

export const WebsiteEmbed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Integration</CardTitle>
        <CardDescription>
          Add your AI chat widget to any website with a simple script
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-medium">Allowed Domains</h3>
          <p className="text-sm text-gray-500">
            Control which websites can embed your chat widget. Leave empty to allow all domains.
          </p>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="domain" className="sr-only">Add Domain</Label>
              <Input 
                id="domain"
                placeholder="example.com" 
              />
            </div>
            <Button className="flex-shrink-0">Add Domain</Button>
          </div>
          
          <div className="p-3 border rounded-md space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span>example.com</span>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-red-600">Remove</Button>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span>mysite.net</span>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-red-600">Remove</Button>
            </div>
          </div>
        </div>
        
        <EmbedCodeSection />
      </CardContent>
    </Card>
  );
};

const EmbedCodeSection = () => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium">Embed Code</h3>
          <p className="text-sm text-gray-500">
            Copy this code snippet and paste it before the closing &lt;/body&gt; tag on your website
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-1">
          <Copy className="h-4 w-4" />
          <span>Copy Code</span>
        </Button>
      </div>
      
      <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
        <pre className="text-sm font-mono whitespace-pre-wrap">
{`<script>
  (function(w,d,s,o,f,js,fjs){
    w['MyChat']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  })(window,document,'script','myChat','https://cdn.example.com/widget.js');
  myChat('init', { widgetId: 'widget_demo123' });
</script>`}
        </pre>
      </div>
      
      <AdvancedOptions />
    </div>
  );
};

const AdvancedOptions = () => {
  return (
    <div className="pt-2">
      <h4 className="font-medium mb-2">Advanced Options</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-initialize" className="text-sm">Auto Initialize</Label>
            <p className="text-xs text-gray-500">Automatically initialize the widget on page load</p>
          </div>
          <Switch id="auto-initialize" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="debug-mode" className="text-sm">Debug Mode</Label>
            <p className="text-xs text-gray-500">Log detailed information to the browser console</p>
          </div>
          <Switch id="debug-mode" />
        </div>
      </div>
    </div>
  );
};
