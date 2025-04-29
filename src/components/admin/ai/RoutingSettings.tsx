
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RoutingSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Routing</CardTitle>
        <CardDescription>Configure dynamic routing between different AI models</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Routing Rules</h3>
            <Button size="sm">Add Rule</Button>
          </div>
          
          <div className="border rounded-lg divide-y">
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">Technical Questions</h4>
                <p className="text-sm text-muted-foreground">Route to: Gemini Pro</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Delete</Button>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sales Inquiries</h4>
                <p className="text-sm text-muted-foreground">Route to: Custom Sales Model</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Delete</Button>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">Support Requests</h4>
                <p className="text-sm text-muted-foreground">Route to: Knowledge Base Enhanced Model</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Delete</Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Fallback Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Default Model</label>
                  <p className="text-sm text-muted-foreground">Used when no routing rule matches</p>
                </div>
                <Button variant="outline">Select Model</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Failover Strategy</label>
                  <p className="text-sm text-muted-foreground">What to do when primary model fails</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoutingSettings;
