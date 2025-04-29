
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WidgetProvider } from "./context/WidgetContext";
import { ThemeProvider } from "./hooks/use-theme";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import WidgetStandalone from "./pages/WidgetStandalone";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <WidgetProvider>
        <TooltipProvider>
          <div className="min-h-screen w-full">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/widget" element={<WidgetStandalone />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </WidgetProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
