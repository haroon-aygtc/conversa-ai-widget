
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  responseType: "text" | "json" | "markdown";
  contextMode: "strict" | "open";
}

const PromptTemplateEditor = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([
    {
      id: "default",
      name: "General Assistant",
      description: "Default prompt for general questions",
      template: "You are a helpful assistant for {{business_name}}. Answer the following query: {{user_query}}",
      responseType: "text",
      contextMode: "open",
    },
  ]);
  
  const [currentTemplate, setCurrentTemplate] = useState<PromptTemplate>({
    id: "",
    name: "",
    description: "",
    template: "",
    responseType: "text",
    contextMode: "open",
  });
  
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentTemplate.name || !currentTemplate.template) return;
    
    if (isEditing) {
      setTemplates(templates.map(t => 
        t.id === currentTemplate.id ? currentTemplate : t
      ));
    } else {
      const newTemplate = {
        ...currentTemplate,
        id: Date.now().toString(),
      };
      setTemplates([...templates, newTemplate]);
    }
    
    // Reset form
    setCurrentTemplate({
      id: "",
      name: "",
      description: "",
      template: "",
      responseType: "text",
      contextMode: "open",
    });
    setIsEditing(false);
  };

  const editTemplate = (template: PromptTemplate) => {
    setCurrentTemplate(template);
    setIsEditing(true);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Prompt Templates</h3>
        <div className="space-y-4">
          {templates.map((template) => (
            <div 
              key={template.id}
              className="p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{template.name}</h4>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => editTemplate(template)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteTemplate(template.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
              <div className="mt-3 text-xs font-mono bg-gray-50 p-2 rounded border border-gray-100 whitespace-pre-wrap">
                {template.template}
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-500">Response: </span>
                <span className="ml-1 px-1.5 py-0.5 rounded bg-gray-100 text-gray-800">
                  {template.responseType}
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-gray-500">Context: </span>
                <span className={`ml-1 px-1.5 py-0.5 rounded ${
                  template.contextMode === 'strict' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {template.contextMode}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">
          {isEditing ? "Edit Template" : "Create New Template"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={currentTemplate.name}
              onChange={(e) => setCurrentTemplate({...currentTemplate, name: e.target.value})}
              placeholder="Customer Support, FAQ Assistant, etc."
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={currentTemplate.description}
              onChange={(e) => setCurrentTemplate({...currentTemplate, description: e.target.value})}
              placeholder="Brief description of this template's purpose"
            />
          </div>
          
          <div>
            <Label htmlFor="template">Prompt Template</Label>
            <Textarea
              id="template"
              value={currentTemplate.template}
              onChange={(e) => setCurrentTemplate({...currentTemplate, template: e.target.value})}
              placeholder="You are an AI assistant. {{user_query}}"
              rows={6}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use &#123;&#123;placeholders&#125;&#125; for dynamic content:
              <span className="bg-gray-100 px-1 mx-1 rounded">&#123;&#123;user_query&#125;&#125;</span>
              <span className="bg-gray-100 px-1 mx-1 rounded">&#123;&#123;business_name&#125;&#125;</span>
              <span className="bg-gray-100 px-1 mx-1 rounded">&#123;&#123;kb_results&#125;&#125;</span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="responseType">Response Type</Label>
              <Select
                value={currentTemplate.responseType}
                onValueChange={(value) => setCurrentTemplate({
                  ...currentTemplate, 
                  responseType: value as "text" | "json" | "markdown"
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="contextMode">Context Mode</Label>
              <Select
                value={currentTemplate.contextMode}
                onValueChange={(value) => setCurrentTemplate({
                  ...currentTemplate, 
                  contextMode: value as "strict" | "open"
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open (General Topics)</SelectItem>
                  <SelectItem value="strict">Strict (Stay on Topic)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            {isEditing && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setCurrentTemplate({
                    id: "",
                    name: "",
                    description: "",
                    template: "",
                    responseType: "text",
                    contextMode: "open",
                  });
                  setIsEditing(false);
                }}
                className="mr-2"
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {isEditing ? "Update Template" : "Create Template"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptTemplateEditor;
