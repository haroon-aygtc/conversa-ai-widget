
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface BehaviorSettingsProps {
  config: any;
  onUpdate: (path: string, value: any) => void;
}

export function BehaviorSettings({ config, onUpdate }: BehaviorSettingsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Behavior Settings</CardTitle>
        <CardDescription>
          Configure how your widget behaves
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-open" className="block">Auto-open Widget</Label>
            <p className="text-sm text-gray-500">Automatically open the widget after a delay</p>
          </div>
          <Switch
            id="auto-open"
            checked={config.behavior.autoOpen}
            onCheckedChange={(checked) => onUpdate('behavior.autoOpen', checked)}
          />
        </div>

        {config.behavior.autoOpen && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Auto-open Delay (seconds): {config.behavior.autoOpenDelay/1000}</Label>
            </div>
            <Slider
              value={[config.behavior.autoOpenDelay/1000]}
              min={1}
              max={30}
              step={1}
              onValueChange={(value) => onUpdate('behavior.autoOpenDelay', value[0]*1000)}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1s</span>
              <span>30s</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div>
            <Label htmlFor="show-all-pages" className="block">Show on All Pages</Label>
            <p className="text-sm text-gray-500">Display widget on every page of your site</p>
          </div>
          <Switch
            id="show-all-pages"
            checked={config.behavior.showOnAllPages}
            onCheckedChange={(checked) => onUpdate('behavior.showOnAllPages', checked)}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <Label htmlFor="persist-conversation" className="block">Remember Conversations</Label>
            <p className="text-sm text-gray-500">Save chat history between page visits</p>
          </div>
          <Switch
            id="persist-conversation"
            checked={config.behavior.persistConversation}
            onCheckedChange={(checked) => onUpdate('behavior.persistConversation', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
