
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function AuthButtons() {
  return (
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
  );
}
