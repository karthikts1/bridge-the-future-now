
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, X, User, LogIn } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-alumni-300 rounded-lg w-8 h-8 flex items-center justify-center">
            <span className="font-bold text-white">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-alumni-600">AlumniConnect</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            About Us
          </Link>
          <Link to="/features" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Features
          </Link>
          <Link to="/contact" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-alumni-300 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-alumni-400 hover:bg-alumni-500">Register</Button>
              </Link>
            </div>
          )}
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/" 
                  className="text-base font-medium" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/features" 
                  className="text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/contact" 
                  className="text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 mt-4 pt-4 border-t">
                    <Link 
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link 
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-alumni-400 hover:bg-alumni-500">Register</Button>
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
