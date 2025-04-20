
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Users, Briefcase, Mail, MessageSquare } from "lucide-react";

interface AlumniCardProps {
  id: string;
  name: string;
  avatarUrl?: string;
  position?: string; // Made optional
  company?: string; // Made optional
  graduationYear: string;
  field: string;
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
  onConnect,
  onMessage,
}: AlumniCardProps) {
  const { toast } = useToast();
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
    <Card className="overflow-hidden border border-alumni-100 hover:border-alumni-200 transition-all">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-alumni-300 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {position && company ? `${position} at ${company}` : 
               position ? position : 
               company ? `Works at ${company}` : 
               "Alumni"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-alumni-500" />
            <span className="text-muted-foreground">Class of {graduationYear}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-alumni-500" />
            <span className="text-muted-foreground">{field}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-muted/30 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleConnect}
        >
          <Mail className="h-4 w-4 mr-2" />
          Connect
        </Button>
        <Button
          size="sm"
          className="w-full bg-alumni-400 hover:bg-alumni-500"
          onClick={handleMessage}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
      </CardFooter>
    </Card>
  );
}
