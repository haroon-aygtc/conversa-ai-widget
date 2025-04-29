
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdvancedSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>Configure advanced system options</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Performance Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Max Token Limit</label>
                  <p className="text-sm text-muted-foreground">Maximum tokens to process per request</p>
                </div>
                <Input type="number" className="w-24" defaultValue="1024" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Response Timeout</label>
                  <p className="text-sm text-muted-foreground">Maximum time to wait for AI response (seconds)</p>
                </div>
                <Input type="number" className="w-24" defaultValue="30" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Content Filtering</label>
                  <p className="text-sm text-muted-foreground">Filter sensitive or inappropriate content</p>
                </div>
                <Button variant="outline">Configure Filters</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">CORS Policy</label>
                  <p className="text-sm text-muted-foreground">Allow specific domains to access your widget</p>
                </div>
                <Button variant="outline">Configure CORS</Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button>Save Advanced Settings</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;
