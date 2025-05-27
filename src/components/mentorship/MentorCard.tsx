
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    position: string;
    company: string;
    experience: string;
    expertise: string[];
    availability: string;
    bio: string;
  };
  userRole: string;
  onAction: (mentorId: string) => void;
}

export function MentorCard({ mentor, userRole, onAction }: MentorCardProps) {
  const getActionButtonText = () => {
    switch (userRole) {
      case 'student':
        return 'Request Mentorship';
      case 'alumni':
        return 'Connect with Mentor';
      case 'faculty':
        return 'View Profile';
      default:
        return 'Connect';
    }
  };

  return (
    <Card className="overflow-hidden border-alumni-100">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-alumni-300 text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{mentor.name}</h3>
              <p className="text-sm text-muted-foreground">
                {mentor.position} at {mentor.company}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {mentor.experience} of experience • {mentor.availability}
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {mentor.expertise.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-alumni-100">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{mentor.bio}</p>
          </div>
          
          <Button 
            className="bg-alumni-400 hover:bg-alumni-500 mt-4 md:mt-0 md:self-start whitespace-nowrap"
            onClick={() => onAction(mentor.id)}
          >
            {getActionButtonText()}
          </Button>
        </div>
      </div>
    </Card>
  );
}
