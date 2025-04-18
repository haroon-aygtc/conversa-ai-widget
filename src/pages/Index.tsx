
import { useState } from "react";
import ChatWidget from "@/components/widget/ChatWidget";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Simulate widget being embedded on a demo page
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-600">Conversa AI</h1>
            <Link to="/admin">
              <Button variant="outline">Admin Panel</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">AI-Powered Chat Widget</h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Intelligent, context-aware chat system for your website
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Link to="/widget">
              <Button size="lg">View Standalone Widget</Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setShowDemo(!showDemo)}
            >
              {showDemo ? "Hide Demo" : "Show Demo"}
            </Button>
          </div>

          {showDemo && (
            <div className="border border-gray-200 rounded-xl p-6 bg-slate-50">
              <h3 className="text-xl font-semibold mb-4">Website Demo</h3>
              <p className="text-gray-600 mb-4">
                This is a demonstration of how the chat widget appears embedded on a website.
                The button in the bottom-right corner opens the chat interface.
              </p>
              <p className="text-gray-600 mb-4">
                Admins can customize the widget's appearance, behavior, and AI capabilities
                through the admin panel.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <div className="bg-white p-4 rounded shadow-sm w-64 h-40 flex items-center justify-center">
                  <p className="text-gray-500">Content Block</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm w-64 h-40 flex items-center justify-center">
                  <p className="text-gray-500">Content Block</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm w-64 h-40 flex items-center justify-center">
                  <p className="text-gray-500">Content Block</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                title="Embeddable Widget"
                description="Easily integrate with any website using a simple script tag"
                icon="🔌"
              />
              <FeatureCard 
                title="Context-Aware AI"
                description="Smart responses based on configured knowledge domains"
                icon="🧠"
              />
              <FeatureCard 
                title="Admin Controls"
                description="Comprehensive admin panel to configure AI behavior"
                icon="⚙️"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Embed the actual widget component */}
      <ChatWidget />
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="text-3xl mb-3">{icon}</div>
    <h4 className="font-bold text-lg mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
