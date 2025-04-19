
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Book, Edit, FileText, Plus, Trash2 } from "lucide-react";

interface ContextItem {
  id: string;
  name: string;
  description: string;
  content: string;
  type: "business" | "persona" | "instruction" | "knowledge";
  priority: "high" | "medium" | "low";
  isActive: boolean;
  tags: string[];
}

const ContextManager = () => {
  const [contextItems, setContextItems] = useState<ContextItem[]>([
    {
      id: "1",
      name: "Company Information",
      description: "Core business details and services offered",
      content: "Our company, TechSolutions Inc., provides AI-driven customer service solutions. We offer chatbot development, AI training, and integration services for businesses of all sizes.",
      type: "business",
      priority: "high",
      isActive: true,
      tags: ["business", "services"]
    },
    {
      id: "2",
      name: "Support Agent Persona",
      description: "Friendly and helpful support agent personality",
      content: "You are a helpful customer support agent named Alex. You're friendly but professional. You should aim to solve the customer's problem efficiently while being empathetic to their concerns.",
      type: "persona",
      priority: "medium",
      isActive: true,
      tags: ["persona", "support"]
    },
    {
      id: "3",
      name: "Technical Limitations",
      description: "Things the AI should not discuss or attempt",
      content: "Do not provide specific pricing without referring to our pricing page. Do not attempt to process refunds or discuss other customers' information. If asked about competitors, focus on our own services instead.",
      type: "instruction",
      priority: "high",
      isActive: true,
      tags: ["restrictions", "policy"]
    }
  ]);
  
  const [currentContext, setCurrentContext] = useState<ContextItem>({
    id: "",
    name: "",
    description: "",
    content: "",
    type: "business",
    priority: "medium",
    isActive: true,
    tags: []
  });
  
  const [newTag, setNewTag] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [strictMode, setStrictMode] = useState(true);
  
  const handleAddTag = () => {
    if (newTag && !currentContext.tags.includes(newTag)) {
      setCurrentContext({
        ...currentContext,
        tags: [...currentContext.tags, newTag]
      });
      setNewTag("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setCurrentContext({
      ...currentContext,
      tags: currentContext.tags.filter(t => t !== tag)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentContext.name || !currentContext.content) return;
    
    if (isEditing) {
      setContextItems(contextItems.map(item => 
        item.id === currentContext.id ? currentContext : item
      ));
    } else {
      const newContextItem = {
        ...currentContext,
        id: Date.now().toString(),
      };
      setContextItems([...contextItems, newContextItem]);
    }
    
    // Reset form
    setCurrentContext({
      id: "",
      name: "",
      description: "",
      content: "",
      type: "business",
      priority: "medium",
      isActive: true,
      tags: []
    });
    setIsEditing(false);
  };
  
  const editContext = (context: ContextItem) => {
    setCurrentContext(context);
    setIsEditing(true);
  };
  
  const deleteContext = (id: string) => {
    setContextItems(contextItems.filter(item => item.id !== id));
    if (isEditing && currentContext.id === id) {
      setCurrentContext({
        id: "",
        name: "",
        description: "",
        content: "",
        type: "business",
        priority: "medium",
        isActive: true,
        tags: []
      });
      setIsEditing(false);
    }
  };
  
  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'business':
        return <FileText className="h-4 w-4" />;
      case 'persona':
        return <Book className="h-4 w-4" />;
      case 'instruction':
        return <AlertTriangle className="h-4 w-4" />;
      case 'knowledge':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="context" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="context">Context Items</TabsTrigger>
          <TabsTrigger value="settings">Context Settings</TabsTrigger>
          <TabsTrigger value="prioritization">Prioritization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="context" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Context Library</h3>
                <Button 
                  onClick={() => {
                    setCurrentContext({
                      id: "",
                      name: "",
                      description: "",
                      content: "",
                      type: "business",
                      priority: "medium",
                      isActive: true,
                      tags: []
                    });
                    setIsEditing(false);
                  }}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Context</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  {contextItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className={`border rounded-lg px-4 ${item.isActive ? 'bg-white' : 'bg-gray-50'}`}>
                      <AccordionTrigger className="py-4">
                        <div className="flex items-center gap-2 text-left">
                          {getTypeIcon(item.type)}
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`capitalize text-xs px-1.5 py-0.5 rounded ${getPriorityClass(item.priority)}`}>
                                {item.priority}
                              </span>
                              <span className="capitalize text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                                {item.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pb-2">
                          <p className="text-sm text-gray-500">{item.description}</p>
                          <div className="bg-gray-50 p-2 rounded text-sm">
                            {item.content}
                          </div>
                          <div className="flex flex-wrap gap-1 my-2">
                            {item.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-end space-x-2 pt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => editContext(item)}
                              className="flex items-center gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              <span>Edit</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => deleteContext(item.id)}
                              className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete</span>
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {contextItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                    No context items defined yet
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{isEditing ? 'Edit Context Item' : 'Create Context Item'}</CardTitle>
                  <CardDescription>
                    {isEditing 
                      ? 'Make changes to your selected context item' 
                      : 'Add specific context information to guide your AI assistant'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="context-name">Name</Label>
                      <Input
                        id="context-name"
                        value={currentContext.name}
                        onChange={(e) => setCurrentContext({...currentContext, name: e.target.value})}
                        placeholder="Company Information"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (optional)</Label>
                      <Input
                        id="description"
                        value={currentContext.description}
                        onChange={(e) => setCurrentContext({...currentContext, description: e.target.value})}
                        placeholder="Basic details about our company"
                      />
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="context-type">Context Type</Label>
                        <Select
                          value={currentContext.type}
                          onValueChange={(value: "business" | "persona" | "instruction" | "knowledge") => 
                            setCurrentContext({...currentContext, type: value})}
                        >
                          <SelectTrigger id="context-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business">Business Information</SelectItem>
                            <SelectItem value="persona">AI Persona</SelectItem>
                            <SelectItem value="instruction">Instructions/Rules</SelectItem>
                            <SelectItem value="knowledge">Knowledge Base</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={currentContext.priority}
                          onValueChange={(value: "high" | "medium" | "low") => 
                            setCurrentContext({...currentContext, priority: value})}
                        >
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High (Always include)</SelectItem>
                            <SelectItem value="medium">Medium (Usually include)</SelectItem>
                            <SelectItem value="low">Low (Context-dependent)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={currentContext.content}
                        onChange={(e) => setCurrentContext({...currentContext, content: e.target.value})}
                        placeholder="Provide the context information that will guide the AI responses..."
                        rows={6}
                        className="resize-y"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {currentContext.tags.map(tag => (
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
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={handleAddTag}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="is-active"
                          checked={currentContext.isActive}
                          onCheckedChange={(checked) => setCurrentContext({...currentContext, isActive: checked})}
                        />
                        <Label htmlFor="is-active">Active</Label>
                      </div>
                      
                      <div className="flex gap-2">
                        {isEditing && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setCurrentContext({
                                id: "",
                                name: "",
                                description: "",
                                content: "",
                                type: "business",
                                priority: "medium",
                                isActive: true,
                                tags: []
                              });
                              setIsEditing(false);
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button type="submit">
                          {isEditing ? 'Update Context' : 'Create Context'}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Context Behavior Settings</CardTitle>
              <CardDescription>
                Configure how context is used in AI responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <Label htmlFor="strict-mode" className="text-base font-medium">Strict Context Mode</Label>
                  <p className="text-sm text-gray-500">When enabled, AI will only respond to topics related to provided context</p>
                </div>
                <Switch
                  id="strict-mode"
                  checked={strictMode}
                  onCheckedChange={setStrictMode}
                />
              </div>
              
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="context-limit">Context Token Limit</Label>
                    <Select defaultValue="1000">
                      <SelectTrigger id="context-limit">
                        <SelectValue placeholder="Select limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">500 tokens</SelectItem>
                        <SelectItem value="1000">1000 tokens</SelectItem>
                        <SelectItem value="2000">2000 tokens</SelectItem>
                        <SelectItem value="4000">4000 tokens</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Maximum context size to include in each request</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="context-strategy">Context Strategy</Label>
                    <Select defaultValue="priority">
                      <SelectTrigger id="context-strategy">
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priority">Priority-based</SelectItem>
                        <SelectItem value="recency">Recency-based</SelectItem>
                        <SelectItem value="relevance">Relevance-based</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Priority + Relevance)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">How to select context when token limit is reached</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="default-contexts" className="text-base font-medium">Default Contexts</Label>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Select which context items should be included in every conversation
                  </p>
                  <div className="mt-2 p-3 border rounded-md bg-gray-50">
                    {contextItems
                      .filter(item => item.priority === "high" && item.isActive)
                      .map(item => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(item.type)}
                            <span>{item.name}</span>
                          </div>
                          <Badge variant="outline">Always included</Badge>
                        </div>
                      ))}
                    
                    {contextItems.filter(item => item.priority === "high" && item.isActive).length === 0 && (
                      <p className="text-center py-2 text-gray-500">No default contexts configured</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prioritization" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Context Prioritization</CardTitle>
              <CardDescription>
                Adjust how different context types are prioritized when generating responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Business Information Priority</Label>
                  <Select defaultValue="high">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    How important is business information when generating responses
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-base">AI Persona Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    How important is persona information when generating responses
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-base">Instructions/Rules Priority</Label>
                  <Select defaultValue="high">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    How important are instructions when generating responses
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-base">Knowledge Base Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    How important is knowledge base data when generating responses
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Priorities</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContextManager;
