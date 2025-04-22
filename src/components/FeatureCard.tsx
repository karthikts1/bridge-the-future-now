
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
}

export function FeatureCard({ icon, title, description, linkTo, buttonText }: FeatureCardProps) {
  return (
    <div className="group rounded-lg border border-academic-muted/20 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
      <div className="mb-4 inline-block rounded-full bg-academic-light p-3 text-academic-primary group-hover:bg-academic-primary group-hover:text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-academic-dark">{title}</h3>
      <p className="mb-4 text-academic-muted">{description}</p>
      <Link to={linkTo}>
        <Button 
          className="w-full bg-academic-primary hover:bg-academic-primary/90 text-white"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
