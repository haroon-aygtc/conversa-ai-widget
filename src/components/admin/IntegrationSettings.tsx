
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code2, 
  Copy, 
  CreditCard, 
  FileJson, 
  Globe, 
  Mail, 
  MessageSquareCode, 
  RefreshCw, 
  Webhook 
} from "lucide-react";

const IntegrationSettings = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="embed" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="embed">Website Embed</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="services">3rd Party Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="embed" className="mt-0">
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys and access to your AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Get notified about events in your chat system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="text-base font-medium">Enable Webhooks</h3>
                  <p className="text-sm text-gray-500">Send event notifications to your servers</p>
                </div>
                <Switch id="enable-webhooks" defaultChecked />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Webhook URL</h4>
                <Input
                  placeholder="https://your-server.com/webhook"
                />
                
                <div className="space-y-2">
                  <h4 className="font-medium">Webhook Secret</h4>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value="whsec_xxxxxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline" className="whitespace-nowrap">
                      Reveal
                    </Button>
                    <Button variant="outline" className="whitespace-nowrap">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    This secret is used to validate that webhook requests are coming from us.
                  </p>
                </div>
                
                <div className="space-y-3 pt-2">
                  <h4 className="font-medium">Events to Send</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="event-conversation-started" className="text-sm">Conversation Started</Label>
                        <p className="text-xs text-gray-500">When a new conversation begins</p>
                      </div>
                      <Switch id="event-conversation-started" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="event-message-received" className="text-sm">Message Received</Label>
                        <p className="text-xs text-gray-500">When a user sends a message</p>
                      </div>
                      <Switch id="event-message-received" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="event-message-sent" className="text-sm">Message Sent</Label>
                        <p className="text-xs text-gray-500">When the AI responds to a user</p>
                      </div>
                      <Switch id="event-message-sent" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="event-error" className="text-sm">Error Occurred</Label>
                        <p className="text-xs text-gray-500">When an error occurs in processing</p>
                      </div>
                      <Switch id="event-error" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save Webhook Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Integrations</CardTitle>
              <CardDescription>
                Connect analytics services to track usage and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="#E37400">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 23.2C5.9 23.2.8 18.1.8 12S5.9.8 12 .8s11.2 5.1 11.2 11.2-5.1 11.2-11.2 11.2z" />
                          <path d="M12 4.2C7.7 4.2 4.2 7.7 4.2 12H12V4.2z" />
                          <path d="M19.2 10.8h-7.9l-5.7 5.7c1.7 2.8 4.8 4.7 8.4 4.7 5.4 0 9.8-4.4 9.8-9.8 0-5.4-4.4-9.8-9.8-9.8" />
                        </svg>
                        Google Analytics
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Track user interactions with your chat widget in Google Analytics
                      </p>
                    </div>
                    <Switch id="enable-ga" />
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="ga-id">Measurement ID</Label>
                      <Input
                        id="ga-id"
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Label htmlFor="ga-events" className="text-sm">Track Events</Label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="ga-event-open" defaultChecked />
                          <Label htmlFor="ga-event-open" className="text-sm">Widget Open</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="ga-event-message" defaultChecked />
                          <Label htmlFor="ga-event-message" className="text-sm">Message Sent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="ga-event-followup" defaultChecked />
                          <Label htmlFor="ga-event-followup" className="text-sm">Follow-up Click</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="ga-event-error" />
                          <Label htmlFor="ga-event-error" className="text-sm">Errors</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="#00A2E2">
                          <path d="M19.4 6.2C18.6 5.3 17.5 4.9 16.3 4.9C15.1 4.9 14 5.3 13.2 6.2L12 7.4L10.8 6.2C9.9 5.3 8.9 4.9 7.7 4.9C6.5 4.9 5.4 5.3 4.6 6.2C2.9 8 2.9 10.9 4.6 12.7L12 20L19.4 12.7C21.1 10.9 21.1 8 19.4 6.2Z" />
                        </svg>
                        Segment
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Send data to Segment to connect with other analytics tools
                      </p>
                    </div>
                    <Switch id="enable-segment" />
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="segment-write-key">Write Key</Label>
                      <Input
                        id="segment-write-key"
                        placeholder="Your Segment write key"
                        type="password"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg opacity-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Custom Analytics</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Add custom analytics scripts (Available in Pro plan)
                      </p>
                    </div>
                    <Switch id="enable-custom" disabled />
                  </div>
                  
                  <div className="mt-4">
                    <Textarea
                      disabled
                      placeholder="Paste your custom analytics code here..."
                      rows={3}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Upgrade to Pro to access custom analytics integration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Integration</CardTitle>
              <CardDescription>
                Configure email notifications and conversation exports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="text-base font-medium">Enable Email Notifications</h3>
                  <p className="text-sm text-gray-500">Get email alerts for important events</p>
                </div>
                <Switch id="enable-email" />
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email-recipients">Notification Recipients</Label>
                  <Input
                    id="email-recipients"
                    placeholder="admin@example.com, support@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label className="text-sm">Notification Events</Label>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-daily-summary" defaultChecked />
                      <Label htmlFor="email-daily-summary" className="text-sm">Daily Summary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-unresolved" defaultChecked />
                      <Label htmlFor="email-unresolved" className="text-sm">Unresolved Questions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-feedback" />
                      <Label htmlFor="email-feedback" className="text-sm">User Feedback</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-errors" />
                      <Label htmlFor="email-errors" className="text-sm">Critical Errors</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>CRM Integration</CardTitle>
              <CardDescription>
                Connect customer data with your chat system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-800 p-2 rounded-md">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Salesforce</h4>
                      <p className="text-sm text-gray-500">
                        Connect your Salesforce CRM to sync customer data
                      </p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 text-red-800 p-2 rounded-md">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">HubSpot</h4>
                      <p className="text-sm text-gray-500">
                        Connect your HubSpot account for contact management
                      </p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-800 p-2 rounded-md">
                      <MessageSquareCode className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Slack</h4>
                      <p className="text-sm text-gray-500">
                        Send chat notifications to your Slack channels
                      </p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-800 p-2 rounded-md">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Stripe</h4>
                      <p className="text-sm text-gray-500">
                        Process payments directly through chat
                      </p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 text-gray-800 p-2 rounded-md">
                      <Code2 className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Custom Integration</h4>
                      <p className="text-sm text-gray-500">
                        Connect to custom APIs or services via webhooks
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500 w-full text-center">
                More integrations coming soon! Have a specific request?
                <Button variant="link" className="px-1">Let us know</Button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationSettings;

function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
