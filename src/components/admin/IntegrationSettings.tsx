
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebsiteEmbed } from "./integration/WebsiteEmbed";
import { ApiSettings } from "./integration/ApiSettings";
import { WebhookSettings } from "./integration/WebhookSettings";
import { AnalyticsSettings } from "./integration/AnalyticsSettings";
import { ServicesSettings } from "./integration/ServicesSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const IntegrationSettings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Integrations</h1>
            <p className="text-muted-foreground">Configure how your AI chat system integrates with other platforms</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search" 
                placeholder="Search integrations..." 
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>Add New Integration</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card className="col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                Website Integration
                <Badge>Active</Badge>
              </CardTitle>
              <CardDescription>Embed your chat widget on websites</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="sm">Configure</Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">API Access</CardTitle>
              <CardDescription>Access your chat system via API</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="sm">Configure</Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Webhooks</CardTitle>
              <CardDescription>Event notifications for your servers</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="sm">Configure</Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Analytics</CardTitle>
              <CardDescription>Connect to analytics platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="sm">Configure</Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">3rd Party Services</CardTitle>
              <CardDescription>Connect to external services</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="sm">Configure</Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="embed" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="embed">Website Embed</TabsTrigger>
            <TabsTrigger value="api">API Access</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="services">3rd Party Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="embed" className="mt-0">
            <WebsiteEmbed />
          </TabsContent>
          
          <TabsContent value="api" className="mt-0">
            <ApiSettings />
          </TabsContent>
          
          <TabsContent value="webhooks" className="mt-0">
            <WebhookSettings />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <AnalyticsSettings />
          </TabsContent>
          
          <TabsContent value="services" className="mt-0">
            <ServicesSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntegrationSettings;
