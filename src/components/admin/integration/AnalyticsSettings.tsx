
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AnalyticsSettings = () => {
  return (
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
  );
};
