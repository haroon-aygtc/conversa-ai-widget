
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, FileJson, Plus } from "lucide-react";

export const ApiSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Access</CardTitle>
        <CardDescription>
          Manage API keys and access to your AI assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ApiKeySection />
        <ApiConfigSection />
        <ApiDocsSection />
      </CardContent>
    </Card>
  );
};

const ApiKeySection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">API Keys</h3>
      <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex-1">
          <p className="font-medium">Primary API Key</p>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="password"
              value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
              readOnly
              className="font-mono"
            />
            <Button variant="outline" size="sm" className="flex items-center gap-1 whitespace-nowrap">
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
          </div>
        </div>
        <div>
          <Button variant="outline" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Regenerate</span>
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Create New API Key</span>
        </Button>
      </div>
    </div>
  );
};

const ApiConfigSection = () => {
  return (
    <div className="space-y-4 pt-6 border-t">
      <h3 className="text-base font-medium">API Settings</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enable-api" className="text-sm">Enable API Access</Label>
            <p className="text-xs text-gray-500">Allow access to your assistant via API</p>
          </div>
          <Switch id="enable-api" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enable-cors" className="text-sm">Enable CORS</Label>
            <p className="text-xs text-gray-500">Allow cross-origin requests to your API</p>
          </div>
          <Switch id="enable-cors" defaultChecked />
        </div>
      </div>
    </div>
  );
};

const ApiDocsSection = () => {
  return (
    <div className="space-y-4 pt-6 border-t">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">API Documentation</h3>
        <Button variant="link" className="flex items-center gap-1">
          <FileJson className="h-4 w-4" />
          <span>View Swagger Docs</span>
        </Button>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Quick Example (Node.js)</h4>
        <pre className="bg-gray-900 text-gray-100 p-3 rounded-md text-xs overflow-x-auto">
{`const response = await fetch('https://api.example.com/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk_live_xxxxxxxxxxxxxxxxxxxxxxxx'
  },
  body: JSON.stringify({
    message: "Hello, how can you help me?",
    conversation_id: "conv_123456"
  })
});

const data = await response.json();
console.log(data.response);`}
        </pre>
      </div>
    </div>
  );
};
