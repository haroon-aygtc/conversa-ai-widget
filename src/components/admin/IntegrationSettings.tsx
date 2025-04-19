import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebsiteEmbed } from "./integration/WebsiteEmbed";
import { ApiSettings } from "./integration/ApiSettings";
import { WebhookSettings } from "./integration/WebhookSettings";
import { AnalyticsSettings } from "./integration/AnalyticsSettings";
import { ServicesSettings } from "./integration/ServicesSettings";

const IntegrationSettings = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full max-w-[1600px] mx-auto p-6">
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
