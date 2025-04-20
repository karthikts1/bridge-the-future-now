
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-alumni-300 rounded-lg w-8 h-8 flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-alumni-600">AlumniConnect</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Bridging the gap between students and alumni through meaningful connections, mentorship, 
            and opportunity sharing.
          </p>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} AlumniConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
