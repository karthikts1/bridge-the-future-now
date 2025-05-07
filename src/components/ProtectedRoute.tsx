
import { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
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
          navigate("/login", { state: { from: location } });
          toast({
            title: "Session expired",
            description: "Your session has expired. Please sign in again.",
            variant: "destructive"
          });
        }
      } else {
        // If no user data, redirect to login
        localStorage.removeItem("isAuthenticated");
        navigate("/login", { state: { from: location } });
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
          variant: "destructive"
        });
      }
    }
  }, [user, setUser, navigate, isAuthenticated, toast, location]);

  // Wait for user data to load before rendering
  if (isAuthenticated && !user) {
    return null; // Show nothing while loading user data from localStorage
  }

  if (!isAuthenticated) {
    // Save the current location they were trying to go to
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
