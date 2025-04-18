
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface MessagesSettingsProps {
  config: any;
  onUpdate: (path: string, value: any) => void;
}

export function MessagesSettings({ config, onUpdate }: MessagesSettingsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Messages & Text</CardTitle>
        <CardDescription>
          Customize widget text and messages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="widget-title">Widget Title</Label>
          <Input
            id="widget-title"
            value={config.appearance.title}
            onChange={(e) => onUpdate('appearance.title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="widget-subtitle">Widget Subtitle (optional)</Label>
          <Input
            id="widget-subtitle"
            value={config.appearance.subtitle}
            onChange={(e) => onUpdate('appearance.subtitle', e.target.value)}
            placeholder="Ask me anything"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="welcome-message">Welcome Message</Label>
          <Input
            id="welcome-message"
            value={config.appearance.welcomeMessage}
            onChange={(e) => onUpdate('appearance.welcomeMessage', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="input-placeholder">Input Placeholder</Label>
          <Input
            id="input-placeholder"
            value={config.appearance.inputPlaceholder}
            onChange={(e) => onUpdate('appearance.inputPlaceholder', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
