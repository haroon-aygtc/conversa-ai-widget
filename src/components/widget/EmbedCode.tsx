
import { useState } from "react";
import { getEmbedCodeSnippet } from "@/utils/embeddableScriptGenerator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyIcon, CheckIcon } from "lucide-react";

interface EmbedCodeProps {
  widgetId: string;
}

const EmbedCode = ({ widgetId }: EmbedCodeProps) => {
  const [copied, setCopied] = useState(false);
  const embedCode = getEmbedCodeSnippet(widgetId);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium">Widget Embed Code</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" />
              Copy Code
            </>
          )}
        </Button>
      </div>
      <div className="p-4 bg-gray-50">
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto font-mono text-gray-800">
          {embedCode}
        </pre>
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Add this code to your website just before the closing <code>&lt;/body&gt;</code> tag.
          The widget will automatically initialize and display on your site.
        </p>
      </div>
    </Card>
  );
};

export default EmbedCode;
