
import { useState } from "react";
import ChatWidget from "@/components/widget/ChatWidget";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WidgetStandalone = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-600">Conversa AI Widget</h1>
            <div className="flex gap-4">
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Link to="/admin">
                <Button>Admin Panel</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md h-[600px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          {/* This is the standalone widget view */}
          <div className="h-full flex flex-col">
            <div className="bg-purple-600 text-white p-4">
              <h2 className="font-medium">Conversa AI Assistant</h2>
            </div>
            
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
              {/* Chat messages will appear here */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                    AI
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p>Hello! How can I help you today?</p>
                  </div>
                </div>
                
                <div className="flex items-start justify-end">
                  <div className="bg-purple-600 text-white p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p>I'd like to learn more about your services.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                    AI
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p>I'd be happy to tell you about our services! Our company specializes in AI-powered solutions for businesses of all sizes.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type your message..."
                />
                <Button>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WidgetStandalone;
