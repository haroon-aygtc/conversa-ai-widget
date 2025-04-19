
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Edit, FileText, Plus, Tag, Trash2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  type: "response" | "prompt" | "greeting" | "fallback";
  content: string;
  tags: string[];
  isActive: boolean;
}

const TemplatesManager = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Default Greeting",
      description: "Standard greeting for new conversations",
      type: "greeting",
      content: "Hi there! How can I assist you today?",
      tags: ["greeting", "default"],
      isActive: true
    },
    {
      id: "2",
      name: "Product Support",
      description: "Template for product support queries",
      type: "response",
      content: "I understand you're having an issue with {{product_name}}. Let me help you troubleshoot that.",
      tags: ["support", "product"],
      isActive: true
    },
    {
      id: "3",
      name: "Technical Query",
      description: "Template for handling technical questions",
      type: "prompt",
      content: "You are a technical support specialist for {{company_name}}. The user has a question about {{topic}}.",
      tags: ["technical", "support"],
      isActive: false
    }
  ]);
  
  const [currentTemplate, setCurrentTemplate] = useState<Template>({
    id: "",
    name: "",
    description: "",
    type: "response",
    content: "",
    tags: [],
    isActive: true
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState("");
  
  const handleAddTag = () => {
    if (newTag && !currentTemplate.tags.includes(newTag)) {
      setCurrentTemplate({
        ...currentTemplate,
        tags: [...currentTemplate.tags, newTag]
      });
      setNewTag("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setCurrentTemplate({
      ...currentTemplate,
      tags: currentTemplate.tags.filter(t => t !== tag)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentTemplate.name || !currentTemplate.content) return;
    
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
      type: "response",
      content: "",
      tags: [],
      isActive: true
    });
    setIsEditing(false);
  };
  
  const editTemplate = (template: Template) => {
    setCurrentTemplate(template);
    setIsEditing(true);
  };
  
  const duplicateTemplate = (template: Template) => {
    const duplicated = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
    };
    setTemplates([...templates, duplicated]);
  };
  
  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    if (isEditing && currentTemplate.id === id) {
      setCurrentTemplate({
        id: "",
        name: "",
        description: "",
        type: "response",
        content: "",
        tags: [],
        isActive: true
      });
      setIsEditing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="templates">All Templates</TabsTrigger>
          <TabsTrigger value="responses">Response Templates</TabsTrigger>
          <TabsTrigger value="prompts">Prompt Templates</TabsTrigger>
          <TabsTrigger value="snippets">Snippets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Template Library</h3>
                <Button onClick={() => {
                  setCurrentTemplate({
                    id: "",
                    name: "",
                    description: "",
                    type: "response",
                    content: "",
                    tags: [],
                    isActive: true
                  });
                  setIsEditing(false);
                }} size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>New Template</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                {templates.map((template) => (
                  <Card key={template.id} className={`border ${template.isActive ? 'border-blue-200' : 'border-gray-200'}`}>
                    <CardHeader className="py-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            {template.name}
                          </CardTitle>
                          <CardDescription className="text-xs mt-1">{template.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => editTemplate(template)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => duplicateTemplate(template)}
                            className="h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Duplicate</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteTemplate(template.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="text-xs font-mono bg-gray-50 p-2 rounded max-h-24 overflow-y-auto">
                        {template.content}
                      </div>
                    </CardContent>
                    <CardFooter className="py-2 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded capitalize">
                        {template.type}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{isEditing ? 'Edit Template' : 'Create Template'}</CardTitle>
                  <CardDescription>
                    {isEditing 
                      ? 'Make changes to the selected template' 
                      : 'Create a new reusable template for your AI assistant'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Template Name</Label>
                      <Input
                        id="name"
                        value={currentTemplate.name}
                        onChange={(e) => setCurrentTemplate({...currentTemplate, name: e.target.value})}
                        placeholder="Product Support Template"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={currentTemplate.description}
                        onChange={(e) => setCurrentTemplate({...currentTemplate, description: e.target.value})}
                        placeholder="Used for responding to product inquiries"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Template Type</Label>
                      <Select 
                        value={currentTemplate.type}
                        onValueChange={(value: "response" | "prompt" | "greeting" | "fallback") => 
                          setCurrentTemplate({...currentTemplate, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="response">Response Template</SelectItem>
                          <SelectItem value="prompt">Prompt Template</SelectItem>
                          <SelectItem value="greeting">Greeting</SelectItem>
                          <SelectItem value="fallback">Fallback Message</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={currentTemplate.content}
                        onChange={(e) => setCurrentTemplate({...currentTemplate, content: e.target.value})}
                        placeholder="Template content with {{placeholders}}"
                        rows={6}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500">
                        Use placeholders like &#123;&#123;user_query&#125;&#125; or &#123;&#123;product_name&#125;&#125;
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {currentTemplate.tags.map(tag => (
                          <div key={tag} className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full flex items-center">
                            <span>{tag}</span>
                            <button 
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag"
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={handleAddTag}
                          className="flex items-center gap-1"
                        >
                          <Tag className="h-4 w-4" />
                          <span>Add</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-end space-x-2">
                      {isEditing && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setCurrentTemplate({
                              id: "",
                              name: "",
                              description: "",
                              type: "response",
                              content: "",
                              tags: [],
                              isActive: true
                            });
                            setIsEditing(false);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button type="submit">
                        {isEditing ? 'Update Template' : 'Create Template'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="responses" className="mt-0">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Response Templates</h3>
            <p className="text-gray-500 mb-6">
              Create and manage templates specifically for AI responses.
            </p>
            <div className="grid gap-4">
              {templates
                .filter(t => t.type === "response")
                .map(template => (
                  <div key={template.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{template.name}</h4>
                      <Button variant="outline" size="sm" onClick={() => editTemplate(template)}>Edit</Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="prompts" className="mt-0">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Prompt Templates</h3>
            <p className="text-gray-500 mb-6">
              Create and manage system prompt templates for different scenarios.
            </p>
            <div className="grid gap-4">
              {templates
                .filter(t => t.type === "prompt")
                .map(template => (
                  <div key={template.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{template.name}</h4>
                      <Button variant="outline" size="sm" onClick={() => editTemplate(template)}>Edit</Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="snippets" className="mt-0">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Snippet Library</h3>
            <p className="text-gray-500 mb-6">
              Create and manage reusable text snippets for greetings, fallbacks, and common responses.
            </p>
            <div className="grid gap-4">
              {templates
                .filter(t => t.type === "greeting" || t.type === "fallback")
                .map(template => (
                  <div key={template.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{template.name}</h4>
                      <Button variant="outline" size="sm" onClick={() => editTemplate(template)}>Edit</Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplatesManager;
