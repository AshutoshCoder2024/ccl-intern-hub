import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Internships from "./pages/Internships";
import ApplicationGuide from "./pages/ApplicationGuide";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import EnhancedAdminDashboard from "./pages/EnhancedAdminDashboard";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/internships" element={<ProtectedRoute><Internships /></ProtectedRoute>} />
              <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/admin" element={<EnhancedAdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
