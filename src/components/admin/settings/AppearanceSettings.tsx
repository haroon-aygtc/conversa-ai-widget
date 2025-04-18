
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WidgetPosition } from "@/utils/widgetSettings";

export interface AppearanceSettingsProps {
  config: any;
  onUpdate: (path: string, value: any) => void;
}

export function AppearanceSettings({ config, onUpdate }: AppearanceSettingsProps) {
  const [selectedColor, setSelectedColor] = useState(config.appearance.theme.primaryColor);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Theme & Colors</CardTitle>
        <CardDescription>
          Customize how your widget looks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="primary-color">Primary Color</Label>
          <div className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-full border cursor-pointer"
              style={{ backgroundColor: selectedColor }}
              onClick={() => document.getElementById('color-picker')?.click()}
            ></div>
            <Input
              id="color-picker"
              type="color"
              value={selectedColor}
              className="w-0 h-0 opacity-0 absolute"
              onChange={(e) => {
                setSelectedColor(e.target.value);
                onUpdate('appearance.theme.primaryColor', e.target.value);
              }}
            />
            <Input
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                onUpdate('appearance.theme.primaryColor', e.target.value);
              }}
              className="flex-1"
              placeholder="#7c3aed"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Button Style</Label>
          <div className="grid grid-cols-3 gap-2">
            {["rounded", "square", "pill"].map((style) => (
              <Button
                key={style}
                type="button"
                variant={config.appearance.theme.buttonStyle === style ? "default" : "outline"}
                onClick={() => onUpdate('appearance.theme.buttonStyle', style)}
                className="capitalize"
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Widget Position</Label>
          <div className="grid grid-cols-2 gap-2">
            {(["bottom-right", "bottom-left", "top-right", "top-left"] as WidgetPosition[]).map((position) => (
              <Button
                key={position}
                type="button"
                variant={config.appearance.position === position ? "default" : "outline"}
                onClick={() => onUpdate('appearance.position', position)}
                className="capitalize"
              >
                {position.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
