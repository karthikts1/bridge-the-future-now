
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, User, LogIn, LogOut, MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { NotificationBell } from "@/components/NotificationBell";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export function Navbar({ isAuthenticated: propIsAuthenticated }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  const isAuthenticated = propIsAuthenticated !== undefined 
    ? propIsAuthenticated 
    : (localStorage.getItem("isAuthenticated") === "true" && user !== null);

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    setUser(null);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate("/login");
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl tracking-tight text-white">AlumniConnect</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              isActive("/") ? "text-white font-bold" : "text-white/90 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors ${
              isActive("/about") ? "text-white font-bold" : "text-white/90 hover:text-white"
            }`}
          >
            About Us
          </Link>
          <Link 
            to="/services" 
            className={`text-sm font-medium transition-colors ${
              isActive("/services") ? "text-white font-bold" : "text-white/90 hover:text-white"
            }`}
          >
            Services
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium transition-colors ${
              isActive("/contact") ? "text-white font-bold" : "text-white/90 hover:text-white"
            }`}
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              {/* Messages link */}
              <Link 
                to="/dashboard/messages" 
                className="hidden md:flex text-white hover:text-white/80"
                title="Messages"
              >
                <MessageSquare className="h-5 w-5" />
              </Link>
              
              {/* Notification bell */}
              <NotificationBell />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="border-2 border-accent hover:border-white cursor-pointer">
                    <AvatarImage src={user?.avatar || ""} />
                    <AvatarFallback className="bg-secondary text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {user?.role}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/messages" className="cursor-pointer w-full">Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile" className="cursor-pointer w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link to="/login">
                <Button 
                  variant="contrast" 
                  size="sm" 
                  className="font-medium shadow-lg"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  variant="bright"
                  size="sm" 
                  className="font-medium shadow-lg"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-primary/80"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/" 
                  className={`text-base font-medium ${isActive("/") ? "text-primary" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`text-base font-medium ${isActive("/about") ? "text-primary" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/services" 
                  className={`text-base font-medium ${isActive("/services") ? "text-primary" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-base font-medium ${isActive("/contact") ? "text-primary" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {isAuthenticated && (
                  <Link 
                    to="/dashboard/messages" 
                    className={`text-base font-medium ${isActive("/dashboard/messages") ? "text-primary" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Messages
                  </Link>
                )}
                
                {isAuthenticated ? (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-white">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                      </div>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="block w-full mb-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 mt-4 pt-4 border-t">
                    <Link 
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="bright" className="w-full shadow-md">
                        <LogIn className="h-4 w-4 mr-2" />
                        Log In
                      </Button>
                    </Link>
                    <Link 
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="bright" className="w-full shadow-md">Register</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
