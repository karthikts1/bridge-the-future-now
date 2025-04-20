
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FeatureCard } from "@/components/FeatureCard";
import { AlumniCard } from "@/components/AlumniCard";
import { 
  MessageSquare, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Book 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Mock alumni data
const mockAlumni = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "Software Engineer",
    company: "Google",
    graduationYear: "2018",
    field: "Computer Science"
  },
  {
    id: "2",
    name: "Sarah Williams",
    position: "UX Designer",
    company: "Apple",
    graduationYear: "2019",
    field: "Design"
  },
  {
    id: "3",
    name: "Michael Chen",
    position: "Product Manager",
    company: "Amazon",
    graduationYear: "2017",
    field: "Business"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("User"); // In a real app, fetch user's name

  // Handler for alumni connections
  const handleConnectWithAlumni = (id: string) => {
    toast({
      title: "Connection request sent",
      description: `Your request has been sent to ${mockAlumni.find(a => a.id === id)?.name}`,
    });
  };

  // Handler for alumni messaging
  const handleMessageAlumni = (id: string) => {
    navigate("/dashboard/forums");
    toast({
      title: "Message thread opened",
      description: `You can now chat with ${mockAlumni.find(a => a.id === id)?.name}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in the alumni network today.
          </p>
        </div>

        {/* Features section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Features</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/features")}>
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard 
              icon={<MessageSquare className="h-5 w-5" />}
              title="Discussion Forums"
              description="Engage in conversations with alumni and current students."
              linkTo="/dashboard/forums"
              buttonText="Join Discussions"
            />
            <FeatureCard 
              icon={<Users className="h-5 w-5" />}
              title="Mentorship Programs"
              description="Connect with alumni mentors for career guidance."
              linkTo="/dashboard/mentorship"
              buttonText="Find a Mentor"
            />
            <FeatureCard 
              icon={<Briefcase className="h-5 w-5" />}
              title="Career Guidance"
              description="Get advice for your career path and job search."
              linkTo="/dashboard/career"
              buttonText="Explore Careers"
            />
          </div>
        </div>

        {/* Alumni suggestions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended Alumni Connections</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/connections")}>
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {mockAlumni.map(alumni => (
              <AlumniCard 
                key={alumni.id}
                id={alumni.id}
                name={alumni.name}
                position={alumni.position}
                company={alumni.company}
                graduationYear={alumni.graduationYear}
                field={alumni.field}
                onConnect={handleConnectWithAlumni}
                onMessage={handleMessageAlumni}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
