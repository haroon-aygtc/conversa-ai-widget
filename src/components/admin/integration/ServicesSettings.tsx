
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Code2, CreditCard, Globe, Mail, MessageSquareCode } from "lucide-react";

export const ServicesSettings = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
