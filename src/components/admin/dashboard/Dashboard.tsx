
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import WidgetPreview from "@/components/widget/WidgetPreview";
import { BarChart3, BrainCircuit, BookOpen, MessageCircle, Palette } from "lucide-react";

interface DashboardProps {
  config: any;
}

const Dashboard: React.FC<DashboardProps> = ({ config }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">-0.1s from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+45 from last week</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your widget's recent interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New conversation started</p>
                      <p className="text-xs text-muted-foreground">user1234@example.com</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{i * 5}m ago</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2">
                <BrainCircuit className="h-5 w-5" />
                <span>Edit AI Prompts</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2">
                <Palette className="h-5 w-5" />
                <span>Customize Widget</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2">
                <BookOpen className="h-5 w-5" />
                <span>Knowledge Base</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2">
                <BarChart3 className="h-5 w-5" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Widget Preview</CardTitle>
            <CardDescription>Live preview of your current widget configuration</CardDescription>
          </div>
          <Button>Edit Widget</Button>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="w-[320px] border rounded-lg overflow-hidden shadow-lg">
            <WidgetPreview config={config} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
