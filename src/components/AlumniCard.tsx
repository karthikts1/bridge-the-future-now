
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, Briefcase, Mail, MessageSquare, Star } from "lucide-react";

interface AlumniCardProps {
  id: string;
  name: string;
  avatarUrl?: string;
  position?: string;
  company?: string;
  graduationYear: string;
  field: string;
  similarityScore?: number;
  reasons?: string[];
  onConnect: (id: string) => void;
  onMessage: (id: string) => void;
}

export function AlumniCard({
  id,
  name,
  avatarUrl,
  position,
  company,
  graduationYear,
  field,
  similarityScore,
  reasons = [],
  onConnect,
  onMessage,
}: AlumniCardProps) {
  const { toast } = useToast();
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const compatibilityPercentage = similarityScore ? Math.round(similarityScore * 100) : 0;

  const handleConnect = () => {
    onConnect(id);
    toast({
      title: "Connection request sent",
      description: `You've sent a connection request to ${name}.`
    });
  };

  const handleMessage = () => {
    onMessage(id);
    toast({
      title: "Message initiated",
      description: `You can now chat with ${name}.`
    });
  };

  return (
    <Card className="overflow-hidden border-2 border-accent hover:border-primary transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-accent">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-secondary text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-primary">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {position && company ? `${position} at ${company}` : 
                 position ? position : 
                 company ? `Works at ${company}` : 
                 "Alumni"}
              </p>
            </div>
          </div>
          {similarityScore !== undefined && (
            <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{compatibilityPercentage}%</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-secondary" />
            <span className="text-muted-foreground">Class of {graduationYear}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-secondary" />
            <span className="text-muted-foreground">{field}</span>
          </div>
        </div>

        {reasons.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Why this match:</p>
            <div className="flex flex-wrap gap-1">
              {reasons.slice(0, 3).map((reason, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-6 py-4 bg-accent/20 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-primary text-primary hover:bg-primary/10"
          onClick={handleConnect}
        >
          <Mail className="h-4 w-4 mr-2" />
          Connect
        </Button>
        <Button
          size="sm"
          className="w-full bg-secondary hover:bg-secondary/90 text-white"
          onClick={handleMessage}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
      </CardFooter>
    </Card>
  );
}
