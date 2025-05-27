
import { useUser } from "@/contexts/UserContext";
import { FeatureCard } from "@/components/FeatureCard";
import { AlumniCard } from "@/components/AlumniCard";
import { getRelatedFaculty, getAllUsers } from "@/services/mockData";
import { getSimilarAlumni } from "@/utils/cosineSimilarity";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Users, 
  Book 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DebugInfo } from "./DebugInfo";

export function StudentDashboard() {
  const { user } = useUser();
  const { toast } = useToast();
  
  // Get all users including registered users from localStorage
  const registeredUsersString = localStorage.getItem("registeredUsers");
  let registeredUsers = [];
  
  if (registeredUsersString) {
    try {
      registeredUsers = JSON.parse(registeredUsersString);
    } catch (error) {
      console.error("Failed to parse registered users:", error);
    }
  }
  
  const allUsers = [...getAllUsers(), ...registeredUsers];
  const recommendedAlumni = getSimilarAlumni(user!, allUsers);
  const relatedFaculty = user?.courses ? getRelatedFaculty(user.courses) : [];

  const handleConnectWithAlumni = (id: string) => {
    const alumni = recommendedAlumni.find(alumni => alumni.id === id);
    if (alumni) {
      toast({
        title: "Connection request sent",
        description: `You've sent a connection request to ${alumni.name}.`
      });
    }
  };

  const handleMessageAlumni = (id: string) => {
    const alumni = recommendedAlumni.find(alumni => alumni.id === id);
    if (alumni) {
      toast({
        title: "Message initiated",
        description: `You can now chat with ${alumni.name}.`
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="font-bold text-xl text-blue-800">Student Resources</h2>
        <p className="text-blue-600">Access your academic resources, connect with mentors, and explore career opportunities.</p>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Student Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard 
            icon={<Book className="h-5 w-5" />}
            title="Academic Support"
            description="Access course materials, assignments, and study resources"
            linkTo="/dashboard/academic"
            buttonText="View Resources"
            color="blue"
          />
          <FeatureCard 
            icon={<Users className="h-5 w-5" />}
            title="Mentorship Programs"
            description="Connect with alumni mentors for academic and career guidance"
            linkTo="/dashboard/mentorship"
            buttonText="Find a Mentor"
            color="blue"
          />
          <FeatureCard 
            icon={<MessageSquare className="h-5 w-5" />}
            title="Student Forums"
            description="Engage in discussions with peers and alumni"
            linkTo="/dashboard/forums"
            buttonText="Join Discussions"
            color="blue"
          />
        </div>
      </div>

      <DebugInfo 
        allUsers={allUsers}
        recommendedAlumni={recommendedAlumni}
        user={user}
      />

      {recommendedAlumni.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Recommended Alumni Connections
            <span className="text-sm text-muted-foreground ml-2 font-normal">
              (Based on skills, interests, and career goals)
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendedAlumni.map(alumni => (
              <AlumniCard 
                key={alumni.id}
                id={alumni.id}
                name={alumni.name}
                avatarUrl={alumni.avatar}
                position={alumni.position}
                company={alumni.company}
                graduationYear={alumni.graduationYear}
                field={alumni.field}
                similarityScore={alumni.similarityScore}
                reasons={alumni.reasons}
                onConnect={handleConnectWithAlumni}
                onMessage={handleMessageAlumni}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Course Faculty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedFaculty.length > 0 ? relatedFaculty.map(faculty => (
            <Card key={faculty.id} className="border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{faculty.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{faculty.position}, {faculty.department}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{faculty.bio}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard/messages">Contact Faculty</Link>
                </Button>
              </CardContent>
            </Card>
          )) : (
            <p className="text-muted-foreground col-span-3">No faculty information available for your courses.</p>
          )}
        </div>
      </div>

      <div>
        <Link to="/dashboard/messages">
          <Button variant="bright" className="w-full md:w-auto bg-blue-500 hover:bg-blue-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            Access Student Messaging
          </Button>
        </Link>
      </div>
    </div>
  );
}
