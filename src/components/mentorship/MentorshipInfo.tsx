
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase } from "lucide-react";

interface MentorshipInfoProps {
  userRole: string;
}

export function MentorshipInfo({ userRole }: MentorshipInfoProps) {
  const getInfoContent = () => {
    switch (userRole) {
      case 'student':
        return {
          title: "How Mentorship Works",
          description: "Our mentorship program connects current students with experienced alumni",
          steps: [
            {
              icon: <Users className="h-6 w-6 text-alumni-500" />,
              title: "1. Find a Mentor",
              description: "Browse profiles and find mentors that match your career interests."
            },
            {
              icon: <Briefcase className="h-6 w-6 text-alumni-500" />,
              title: "2. Connect",
              description: "Send a request explaining your goals and what you hope to learn."
            },
            {
              icon: <Users className="h-6 w-6 text-alumni-500" />,
              title: "3. Meet Regularly",
              description: "Schedule sessions with your mentor to discuss your career path."
            }
          ]
        };
      case 'alumni':
        return {
          title: "Become a Mentor",
          description: "Share your experience and guide the next generation of professionals",
          steps: [
            {
              icon: <Users className="h-6 w-6 text-alumni-500" />,
              title: "1. Create Profile",
              description: "Set up your mentor profile with your expertise and availability."
            },
            {
              icon: <Briefcase className="h-6 w-6 text-alumni-500" />,
              title: "2. Receive Requests",
              description: "Students will send mentorship requests based on your background."
            },
            {
              icon: <Users className="h-6 w-6 text-alumni-500" />,
              title: "3. Guide & Support",
              description: "Provide guidance, share experiences, and help students grow."
            }
          ]
        };
      case 'faculty':
        return {
          title: "Faculty Mentorship Program",
          description: "Support and coordinate mentorship activities between students and alumni",
          steps: [
            {
              icon: <Users className="h-6 w-6 text-alumni-500" />,
              title: "1. Monitor Programs",
              description: "Oversee mentorship matching and program effectiveness."
            },
            {
              icon: <Briefcase className="h-6 w-6 text-alumni-500" />,
              title: "2. Facilitate Connections",
              description: "Help students find suitable mentors and support relationships."
            },
            {
              icon: <Users className="h-6 w-6 text-alumni-500" />,
              title: "3. Provide Support",
              description: "Offer additional academic guidance and career counseling."
            }
          ]
        };
      default:
        return {
          title: "Mentorship Programs",
          description: "Connect and grow through mentorship opportunities",
          steps: []
        };
    }
  };

  const content = getInfoContent();

  return (
    <Card className="border-alumni-100">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.steps.map((step, index) => (
          <div key={index} className="space-y-2 text-center">
            <div className="h-12 w-12 rounded-full bg-alumni-100 flex items-center justify-center mx-auto">
              {step.icon}
            </div>
            <h3 className="font-medium">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
