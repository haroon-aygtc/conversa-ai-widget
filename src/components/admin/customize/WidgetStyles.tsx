
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WidgetStyles: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Widget Styles</CardTitle>
        <CardDescription>
          Configure the visual appearance of your chat widget
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Minimal", preview: "rounded-md shadow-sm" },
            { name: "Floating", preview: "rounded-full shadow-md" },
            { name: "Classic", preview: "rounded-none shadow-lg" },
            { name: "Modern", preview: "rounded-lg shadow-xl" },
            { name: "Playful", preview: "rounded-3xl shadow-md" },
            { name: "Custom", preview: "rounded-sm shadow-sm" }
          ].map((style) => (
            <div key={style.name} className="border rounded-lg overflow-hidden">
              <div className={`h-32 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center ${style.preview}`}>
                <div className="w-16 h-16 bg-primary/30 rounded"></div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{style.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <Button size="sm" variant="outline">Preview</Button>
                  <Button size="sm">Apply</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WidgetStyles;
