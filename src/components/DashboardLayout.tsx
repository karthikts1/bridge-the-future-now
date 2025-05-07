
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { useUser } from "@/contexts/UserContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { user } = useUser();

  // Check if the user is authenticated
  if (!user || localStorage.getItem("isAuthenticated") !== "true") {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-accent/30">
      <Navbar isAuthenticated={true} />
      <div className="flex-1 container grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 py-6">
        <aside className="hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 bg-white rounded-lg shadow-lg p-6 border border-accent/20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Welcome, {user.name}
            </h1>
            <p className="text-muted-foreground">
              {user.role === 'student' && 'Access your student resources and connect with alumni'}
              {user.role === 'alumni' && 'Share your experience and mentor students'}
              {user.role === 'faculty' && 'Manage academic resources and support students'}
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
