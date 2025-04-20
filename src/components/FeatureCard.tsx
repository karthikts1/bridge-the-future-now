
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
}

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  linkTo, 
  buttonText 
}: FeatureCardProps) {
  return (
    <Card className="border border-alumni-100 hover:border-alumni-200 transition-all h-full flex flex-col">
      <CardContent className="flex-1 pt-6">
        <div className="h-12 w-12 rounded-full bg-alumni-100 flex items-center justify-center mb-4">
          <div className="text-alumni-500">{icon}</div>
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={linkTo} className="w-full">
          <Button 
            className="w-full bg-alumni-400 hover:bg-alumni-500"
            size="sm"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
