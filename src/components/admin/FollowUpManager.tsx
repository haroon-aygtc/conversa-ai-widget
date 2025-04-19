
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { 
  ArrowDown, 
  ArrowUp, 
  CornerDownRight, 
  Edit, 
  ExternalLink, 
  MessageSquare, 
  Plus, 
  Trash2 
} from "lucide-react";

interface FollowUpOption {
  id: string;
  question: string;
  type: "new-prompt" | "static-reply" | "redirect";
  content: string;
  position: "below" | "inline" | "above";
  isActive: boolean;
  displayLimit?: number;
}

const FollowUpManager = () => {
  const [followUps, setFollowUps] = useState<FollowUpOption[]>([
    {
      id: "1",
      question: "Tell me more about your pricing",
      type: "static-reply",
      content: "Our pricing plans start at $9/month for the basic plan, $29/month for the professional plan, and $99/month for the enterprise plan.",
      position: "below",
      isActive: true
    },
    {
      id: "2",
      question: "How do I set up my account?",
      type: "new-prompt",
      content: "Explain the account setup process for a new user, including verification steps and initial configuration.",
      position: "below",
      isActive: true
    },
    {
      id: "3",
      question: "View our documentation",
      type: "redirect",
      content: "https://docs.example.com",
      position: "inline",
      isActive: true
    }
  ]);
  
  const [currentFollowUp, setCurrentFollowUp] = useState<FollowUpOption>({
    id: "",
    question: "",
    type: "static-reply",
    content: "",
    position: "below",
    isActive: true,
    displayLimit: 3
  });
  
  const [enableFollowUps, setEnableFollowUps] = useState(true);
  const [maxFollowUps, setMaxFollowUps] = useState(3);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentFollowUp.question || !currentFollowUp.content) return;
    
    if (isEditing) {
      setFollowUps(followUps.map(f => 
        f.id === currentFollowUp.id ? currentFollowUp : f
      ));
    } else {
      const newFollowUp = {
        ...currentFollowUp,
        id: Date.now().toString(),
      };
      setFollowUps([...followUps, newFollowUp]);
    }
    
    // Reset form
    setCurrentFollowUp({
      id: "",
      question: "",
      type: "static-reply",
      content: "",
      position: "below",
      isActive: true,
      displayLimit: 3
    });
    setIsEditing(false);
  };
  
  const editFollowUp = (followUp: FollowUpOption) => {
    setCurrentFollowUp(followUp);
    setIsEditing(true);
  };
  
  const deleteFollowUp = (id: string) => {
    setFollowUps(followUps.filter(f => f.id !== id));
    if (isEditing && currentFollowUp.id === id) {
      setCurrentFollowUp({
        id: "",
        question: "",
        type: "static-reply",
        content: "",
        position: "below",
        isActive: true,
        displayLimit: 3
      });
      setIsEditing(false);
    }
  };
  
  const moveFollowUp = (id: string, direction: 'up' | 'down') => {
    const index = followUps.findIndex(f => f.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === followUps.length - 1)) {
      return;
    }
    
    const newFollowUps = [...followUps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newFollowUps[index], newFollowUps[newIndex]] = [newFollowUps[newIndex], newFollowUps[index]];
    setFollowUps(newFollowUps);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Follow-up Questions</CardTitle>
          <CardDescription>
            Configure follow-up options that appear after AI responses to guide the conversation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <Label htmlFor="enable-followups" className="text-base font-medium">Enable Follow-up Questions</Label>
                <p className="text-sm text-gray-500">Show suggested follow-up questions after AI responses</p>
              </div>
              <Switch
                id="enable-followups"
                checked={enableFollowUps}
                onCheckedChange={setEnableFollowUps}
              />
            </div>
            
            {enableFollowUps && (
              <>
                <div className="grid sm:grid-cols-2 gap-4 pb-4 border-b">
                  <div className="space-y-2">
                    <Label htmlFor="max-followups">Maximum Follow-ups</Label>
                    <Select
                      value={String(maxFollowUps)}
                      onValueChange={(value) => setMaxFollowUps(Number(value))}
                    >
                      <SelectTrigger id="max-followups">
                        <SelectValue placeholder="Select maximum" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>
                            {num} {num === 1 ? 'question' : 'questions'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-position">Default Position</Label>
                    <Select
                      value={currentFollowUp.position}
                      onValueChange={(value: "below" | "inline" | "above") => 
                        setCurrentFollowUp({...currentFollowUp, position: value})}
                    >
                      <SelectTrigger id="default-position">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below">Below Response</SelectItem>
                        <SelectItem value="inline">Inline (End of Response)</SelectItem>
                        <SelectItem value="above">Above Response</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">Follow-up Options</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setCurrentFollowUp({
                        id: "",
                        question: "",
                        type: "static-reply",
                        content: "",
                        position: "below",
                        isActive: true,
                        displayLimit: 3
                      });
                      setIsEditing(false);
                    }}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Follow-up</span>
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {followUps.map((followUp, index) => (
                    <div 
                      key={followUp.id} 
                      className={`border rounded-lg p-3 ${followUp.isActive ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <CornerDownRight className="h-4 w-4 text-gray-500 mt-1" />
                          <div>
                            <p className="font-medium">{followUp.question}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                followUp.type === 'static-reply' ? 'bg-blue-100 text-blue-800' : 
                                followUp.type === 'new-prompt' ? 'bg-purple-100 text-purple-800' : 
                                'bg-green-100 text-green-800'
                              }`}>
                                {followUp.type === 'static-reply' ? 'Static Reply' : 
                                 followUp.type === 'new-prompt' ? 'New Prompt' : 'Redirect'}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded capitalize">
                                {followUp.position === 'below' ? 'Below' : 
                                 followUp.position === 'inline' ? 'Inline' : 'Above'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => moveFollowUp(followUp.id, 'up')}
                            disabled={index === 0}
                            className="h-7 w-7"
                          >
                            <ArrowUp className="h-4 w-4" />
                            <span className="sr-only">Move Up</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => moveFollowUp(followUp.id, 'down')}
                            disabled={index === followUps.length - 1}
                            className="h-7 w-7"
                          >
                            <ArrowDown className="h-4 w-4" />
                            <span className="sr-only">Move Down</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => editFollowUp(followUp)}
                            className="h-7 w-7"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteFollowUp(followUp.id)}
                            className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      
                      {followUp.type === 'static-reply' && (
                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          <MessageSquare className="h-3 w-3 text-gray-400 inline-block mr-1" />
                          {followUp.content.length > 100 
                            ? followUp.content.substring(0, 100) + '...' 
                            : followUp.content}
                        </div>
                      )}
                      
                      {followUp.type === 'redirect' && (
                        <div className="mt-2 text-sm text-blue-600 flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          {followUp.content}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {followUps.length === 0 && (
                    <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                      No follow-up questions defined yet
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      {enableFollowUps && (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Follow-up' : 'Create Follow-up'}</CardTitle>
            <CardDescription>
              {isEditing
                ? 'Edit your selected follow-up question'
                : 'Create a new follow-up question to guide user conversations'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question Text</Label>
                <Input
                  id="question"
                  value={currentFollowUp.question}
                  onChange={(e) => setCurrentFollowUp({...currentFollowUp, question: e.target.value})}
                  placeholder="What pricing plans do you offer?"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="follow-up-type">Follow-up Type</Label>
                <Select
                  value={currentFollowUp.type}
                  onValueChange={(value: "static-reply" | "new-prompt" | "redirect") => 
                    setCurrentFollowUp({...currentFollowUp, type: value})}
                >
                  <SelectTrigger id="follow-up-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static-reply">Static Reply (Pre-defined answer)</SelectItem>
                    <SelectItem value="new-prompt">New Prompt (Dynamic AI response)</SelectItem>
                    <SelectItem value="redirect">Redirect (External link)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">
                  {currentFollowUp.type === 'static-reply' ? 'Reply Text' : 
                   currentFollowUp.type === 'new-prompt' ? 'Prompt Instructions' : 'URL'}
                </Label>
                {currentFollowUp.type === 'redirect' ? (
                  <Input
                    id="content"
                    value={currentFollowUp.content}
                    onChange={(e) => setCurrentFollowUp({...currentFollowUp, content: e.target.value})}
                    placeholder="https://example.com/pricing"
                  />
                ) : (
                  <Textarea
                    id="content"
                    value={currentFollowUp.content}
                    onChange={(e) => setCurrentFollowUp({...currentFollowUp, content: e.target.value})}
                    placeholder={currentFollowUp.type === 'static-reply' 
                      ? "Our pricing plans include Basic ($9/mo), Pro ($29/mo), and Enterprise ($99/mo)."
                      : "Explain the pricing options in detail, including features and limitations of each plan."}
                    rows={4}
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select
                  value={currentFollowUp.position}
                  onValueChange={(value: "below" | "inline" | "above") => 
                    setCurrentFollowUp({...currentFollowUp, position: value})}
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below">Below Response (Buttons)</SelectItem>
                    <SelectItem value="inline">Inline (At end of response text)</SelectItem>
                    <SelectItem value="above">Above Response (Header)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is-active"
                    checked={currentFollowUp.isActive}
                    onCheckedChange={(checked) => setCurrentFollowUp({...currentFollowUp, isActive: checked})}
                  />
                  <Label htmlFor="is-active">Active</Label>
                </div>
                
                <div className="flex gap-2">
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setCurrentFollowUp({
                          id: "",
                          question: "",
                          type: "static-reply",
                          content: "",
                          position: "below",
                          isActive: true,
                          displayLimit: 3
                        });
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit">
                    {isEditing ? 'Update Follow-up' : 'Create Follow-up'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FollowUpManager;
