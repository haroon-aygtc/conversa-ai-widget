
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const WebhookSettings = () => {
  return (
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
  );
};
