
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
}

export function FeatureCard({ icon, title, description, linkTo, buttonText }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`group rounded-lg border-2 ${isHovered ? 'border-primary bg-accent/10' : 'border-accent bg-white'} p-6 shadow-md transition-all hover:shadow-xl`}
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
          className="w-full font-medium shadow-md transition-all"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
