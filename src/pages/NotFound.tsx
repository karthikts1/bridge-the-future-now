
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-6xl font-extrabold text-academic-primary mb-6">404</h1>
          <p className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</p>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for. 
            It might have been removed, renamed, or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
            <Button 
              asChild
              className="bg-academic-600 hover:bg-academic-700"
            >
              <Link to={isAuthenticated ? "/dashboard" : "/"}>
                <Home className="mr-2 h-4 w-4" />
                {isAuthenticated ? "Return to Dashboard" : "Return to Home"}
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button 
                variant="outline" 
                asChild
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
