
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Forums from "./pages/Forums";
import Mentorship from "./pages/Mentorship";
import Career from "./pages/Career";
import Placement from "./pages/Placement";
import Academic from "./pages/Academic";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/forums"
              element={
                <ProtectedRoute>
                  <Forums />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/mentorship"
              element={
                <ProtectedRoute allowedRoles={['student', 'alumni', 'faculty']}>
                  <Mentorship />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/career"
              element={
                <ProtectedRoute allowedRoles={['student', 'alumni', 'faculty']}>
                  <Career />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/placement"
              element={
                <ProtectedRoute allowedRoles={['student', 'alumni', 'faculty']}>
                  <Placement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/academic"
              element={
                <ProtectedRoute allowedRoles={['student', 'alumni', 'faculty']}>
                  <Academic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
