
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
    <div className="group rounded-lg border-2 border-accent bg-white p-6 shadow-md transition-all hover:shadow-xl">
      <div className="mb-4 inline-block rounded-full bg-accent p-3 text-primary group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-primary">{title}</h3>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <Link to={linkTo}>
        <Button 
          variant="bright"
          className="w-full font-medium"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
