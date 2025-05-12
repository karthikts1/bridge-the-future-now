
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
  color?: string; // Added color as an optional prop
}

export function FeatureCard({ icon, title, description, linkTo, buttonText, color = "primary" }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map color names to Tailwind classes
  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, { border: string, bg: string, button: string }> = {
      blue: { 
        border: 'border-blue-300', 
        bg: 'bg-blue-50', 
        button: 'bg-blue-500 hover:bg-blue-600' 
      },
      green: { 
        border: 'border-green-300', 
        bg: 'bg-green-50', 
        button: 'bg-green-500 hover:bg-green-600' 
      },
      purple: { 
        border: 'border-purple-300', 
        bg: 'bg-purple-50', 
        button: 'bg-purple-500 hover:bg-purple-600' 
      },
      primary: { 
        border: 'border-accent', 
        bg: 'bg-accent/10', 
        button: '' // Uses the default Button styles
      }
    };
    
    return colorMap[colorName] || colorMap.primary;
  };
  
  const colorClasses = getColorClasses(color);
  
  return (
    <div 
      className={`group rounded-lg border-2 ${isHovered ? `${colorClasses.border} ${colorClasses.bg}` : 'border-accent bg-white'} p-6 shadow-md transition-all hover:shadow-xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mb-4 inline-block rounded-full ${isHovered ? 'bg-primary text-white' : 'bg-accent text-primary'} p-3 transition-colors group-hover:bg-primary group-hover:text-white`}>
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-primary">{title}</h3>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <Link to={linkTo}>
        <Button 
          variant={isHovered ? "bright" : "outline"} 
          className={`w-full font-medium shadow-md transition-all ${isHovered && color !== 'primary' ? colorClasses.button : ''}`}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
