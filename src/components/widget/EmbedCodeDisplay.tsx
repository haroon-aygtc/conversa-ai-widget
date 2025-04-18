
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

interface EmbedCodeDisplayProps {
  embedCode: string;
}

const EmbedCodeDisplay = ({ embedCode }: EmbedCodeDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-600">Embed Code</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={copyToClipboard}
          className="h-8 text-xs"
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5 mr-1" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="h-3.5 w-3.5 mr-1" />
              Copy Code
            </>
          )}
        </Button>
      </div>
      <div className="p-4 bg-gray-50 overflow-x-auto">
        <SyntaxHighlighter 
          language="html" 
          style={vs}
          customStyle={{ 
            margin: 0, 
            padding: '0.5rem', 
            borderRadius: '0.25rem',
            fontSize: '0.8rem'
          }}
        >
          {embedCode}
        </SyntaxHighlighter>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Add this script tag to your website's HTML, preferably just before the closing &lt;/body&gt; tag.
        </p>
      </div>
    </div>
  );
};

export default EmbedCodeDisplay;
