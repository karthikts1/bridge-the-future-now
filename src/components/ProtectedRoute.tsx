
import { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { UserRole } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Check localStorage for saved user data if not in context
  useEffect(() => {
    if (isAuthenticated && !user) {
      const savedUserData = localStorage.getItem("userData");
      if (savedUserData) {
        try {
          const parsedUser = JSON.parse(savedUserData);
          setUser(parsedUser);
        } catch (error) {
          // If parsing fails, clear localStorage
          localStorage.removeItem("userData");
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        }
      } else {
        // If no user data, redirect to login
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      }
    }
  }, [user, setUser, navigate, isAuthenticated]);

  // Save user data to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [user]);

  if (!isAuthenticated || !user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to access this page",
      variant: "destructive"
    });
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    toast({
      title: "Access denied",
      description: `You need ${allowedRoles.join(' or ')} permissions to access this page`,
      variant: "destructive"
    });
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
