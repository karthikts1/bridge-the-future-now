
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { UserRole } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, setUser } = useUser();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    const loadUserData = () => {
      if (isAuthenticated && !user) {
        const savedUserData = localStorage.getItem("userData");
        if (savedUserData) {
          try {
            const parsedUser = JSON.parse(savedUserData);
            setUser(parsedUser);
          } catch (error) {
            localStorage.removeItem("userData");
            localStorage.removeItem("isAuthenticated");
            toast({
              title: "Session expired",
              description: "Your session has expired. Please sign in again.",
              variant: "destructive"
            });
          }
        } else {
          localStorage.removeItem("isAuthenticated");
          toast({
            title: "Authentication required",
            description: "Please sign in to access this page",
            variant: "destructive"
          });
        }
      }
      setIsLoading(false);
    };

    loadUserData();
  }, [isAuthenticated, user, setUser, toast]);

  // Show loading while checking authentication
  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    toast({
      title: "Access denied",
      description: `You need ${allowedRoles.join(' or ')} permissions to access this page`,
      variant: "destructive"
    });
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
