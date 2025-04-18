
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const ModelSelector = () => {
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [huggingfaceApiKey, setHuggingfaceApiKey] = useState("");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([1024]);
  const [defaultModel, setDefaultModel] = useState("gemini");

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Default Model Settings</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2 block">Default AI Model</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={defaultModel === "gemini" ? "default" : "outline"}
                onClick={() => setDefaultModel("gemini")}
                className="flex-1"
              >
                Gemini
              </Button>
              <Button
                type="button"
                variant={defaultModel === "huggingface" ? "default" : "outline"}
                onClick={() => setDefaultModel("huggingface")}
                className="flex-1"
              >
                Hugging Face
              </Button>
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Model Temperature: {temperature}</Label>
            <Slider
              value={temperature}
              min={0}
              max={1}
              step={0.1}
              onValueChange={(value) => setTemperature(value)}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>More Focused (0.0)</span>
              <span>More Creative (1.0)</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Label className="mb-2 block">Max Response Tokens: {maxTokens}</Label>
          <Slider
            value={maxTokens}
            min={100}
            max={4000}
            step={100}
            onValueChange={(value) => setMaxTokens(value)}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Shorter (100)</span>
            <span>Longer (4000)</span>
          </div>
        </div>
      </div>
      
      <div>
        <Tabs defaultValue="gemini">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="gemini">Gemini API</TabsTrigger>
            <TabsTrigger value="huggingface">Hugging Face API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gemini" className="mt-0">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Gemini API Configuration</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gemini-api-key">API Key</Label>
                  <Input
                    id="gemini-api-key"
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="Enter your Gemini API Key"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Available Models</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <input
                        type="radio"
                        id="gemini-pro"
                        name="gemini-model"
                        defaultChecked
                        className="mr-2"
                      />
                      <label htmlFor="gemini-pro">
                        <span className="font-medium">Gemini Pro</span>
                        <span className="text-xs text-gray-500 ml-2">Default model for most use cases</span>
                      </label>
                    </div>
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <input
                        type="radio"
                        id="gemini-pro-vision"
                        name="gemini-model"
                        className="mr-2"
                      />
                      <label htmlFor="gemini-pro-vision">
                        <span className="font-medium">Gemini Pro Vision</span>
                        <span className="text-xs text-gray-500 ml-2">Supports image and text inputs</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="button">Save Settings</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="huggingface" className="mt-0">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Hugging Face API Configuration</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="huggingface-api-key">API Key</Label>
                  <Input
                    id="huggingface-api-key"
                    type="password"
                    value={huggingfaceApiKey}
                    onChange={(e) => setHuggingfaceApiKey(e.target.value)}
                    placeholder="Enter your Hugging Face API Key"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Available Models</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <input
                        type="radio"
                        id="mistral"
                        name="huggingface-model"
                        defaultChecked
                        className="mr-2"
                      />
                      <label htmlFor="mistral">
                        <span className="font-medium">Mistral 7B</span>
                        <span className="text-xs text-gray-500 ml-2">Efficient general purpose model</span>
                      </label>
                    </div>
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <input
                        type="radio"
                        id="llama"
                        name="huggingface-model"
                        className="mr-2"
                      />
                      <label htmlFor="llama">
                        <span className="font-medium">Llama 2</span>
                        <span className="text-xs text-gray-500 ml-2">Meta's open source LLM</span>
                      </label>
                    </div>
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <input
                        type="radio"
                        id="custom"
                        name="huggingface-model"
                        className="mr-2"
                      />
                      <label htmlFor="custom" className="flex items-center">
                        <span className="font-medium">Custom Model</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="button">Save Settings</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModelSelector;
