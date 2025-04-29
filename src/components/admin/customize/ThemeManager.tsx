
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ThemeManager: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Manager</CardTitle>
        <CardDescription>
          Choose from pre-designed themes or create your own
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Modern Clean", colors: ["#ffffff", "#f1f5f9", "#0f172a", "#3b82f6"] },
            { name: "Dark Mode", colors: ["#0f172a", "#1e293b", "#f8fafc", "#38bdf8"] },
            { name: "Nature", colors: ["#f0fdf4", "#dcfce7", "#166534", "#22c55e"] },
            { name: "Corporate", colors: ["#f8fafc", "#f1f5f9", "#0f172a", "#6366f1"] },
            { name: "Vibrant", colors: ["#fdf4ff", "#f5d0fe", "#701a75", "#d946ef"] },
            { name: "Custom", colors: ["#cbd5e1", "#94a3b8", "#334155", "#475569"] }
          ].map((theme) => (
            <div key={theme.name} className="border rounded-lg overflow-hidden">
              <div className="h-32 flex">
                {theme.colors.map((color) => (
                  <div key={color} className="flex-1" style={{ backgroundColor: color }}></div>
                ))}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{theme.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <Button size="sm" variant="outline">Preview</Button>
                  <Button size="sm">Apply</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Create Custom Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-medium">Theme Name</label>
                <Input placeholder="E.g., My Brand Theme" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Primary Color</label>
                  <div className="flex">
                    <div className="w-10 h-10 rounded-l-md" style={{ backgroundColor: "#3b82f6" }}></div>
                    <Input value="#3b82f6" className="rounded-l-none" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-medium">Secondary Color</label>
                  <div className="flex">
                    <div className="w-10 h-10 rounded-l-md" style={{ backgroundColor: "#8b5cf6" }}></div>
                    <Input value="#8b5cf6" className="rounded-l-none" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="font-medium">Preview</label>
              <div className="border rounded-lg p-4 h-[200px] mt-2 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Theme preview will appear here</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button>Save Custom Theme</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeManager;
