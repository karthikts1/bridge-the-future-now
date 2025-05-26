import { useUser } from "@/contexts/UserContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FeatureCard } from "@/components/FeatureCard";
import { AlumniCard } from "@/components/AlumniCard";
import { getRelatedFaculty, getAllUsers } from "@/services/mockData";
import { getSimilarAlumni } from "@/utils/cosineSimilarity";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Book 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useUser();
  const { toast } = useToast();
  
  // Get all users (including registered users from localStorage)
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
  console.log("All users:", allUsers);
  console.log("Current user:", user);
  
  // Data based on user type with cosine similarity
  const recommendedAlumni = user?.role === 'student' ? getSimilarAlumni(user, allUsers) : [];
  console.log("Recommended alumni:", recommendedAlumni);
  
  const relatedFaculty = user?.role === 'student' && user?.courses ? getRelatedFaculty(user.courses) : [];
  console.log("Related faculty:", relatedFaculty);

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

  // Student Dashboard
  const renderStudentDashboard = () => (
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

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Debug Info</h2>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p>Total users: {allUsers.length}</p>
          <p>Alumni users: {allUsers.filter(u => u.role === 'alumni').length}</p>
          <p>Recommended alumni: {recommendedAlumni.length}</p>
          <p>User field: {user?.field || 'Not set'}</p>
          <p>User courses: {user?.courses?.join(', ') || 'Not set'}</p>
        </div>
      </div>

      {recommendedAlumni.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Recommended Alumni Connections
            <span className="text-sm text-muted-foreground ml-2 font-normal">
              (Based on profile similarity)
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
  
  // Alumni Dashboard
  const renderAlumniDashboard = () => (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="font-bold text-xl text-green-800">Alumni Network</h2>
        <p className="text-green-600">Share your experience, mentor students, and connect with fellow alumni.</p>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Alumni Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard 
            icon={<Users className="h-5 w-5" />}
            title="Mentorship"
            description="Guide students through their academic and professional journey"
            linkTo="/dashboard/mentorship"
            buttonText="Become a Mentor"
            color="green"
          />
          <FeatureCard 
            icon={<Briefcase className="h-5 w-5" />}
            title="Career Network"
            description="Share job opportunities and connect with other professionals"
            linkTo="/dashboard/career"
            buttonText="View Network"
            color="green"
          />
          <FeatureCard 
            icon={<MessageSquare className="h-5 w-5" />}
            title="Alumni Forums"
            description="Engage in industry discussions and share insights"
            linkTo="/dashboard/forums"
            buttonText="Join Discussions"
            color="green"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-700">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Students Mentored</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-700">45</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Forum Contributions</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-700">8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Career Opportunities Shared</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-700">3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Events Hosted</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <Link to="/dashboard/messages">
          <Button variant="bright" className="w-full md:w-auto bg-green-500 hover:bg-green-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            Access Alumni Messaging
          </Button>
        </Link>
      </div>
    </div>
  );
  
  // Faculty Dashboard
  const renderFacultyDashboard = () => (
    <div className="space-y-6">
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h2 className="font-bold text-xl text-purple-800">Faculty Portal</h2>
        <p className="text-purple-600">Manage academic resources, support students, and collaborate with colleagues.</p>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Faculty Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard 
            icon={<Book className="h-5 w-5" />}
            title="Academic Resources"
            description="Manage course materials and academic resources"
            linkTo="/dashboard/academic"
            buttonText="Manage Resources"
            color="purple"
          />
          <FeatureCard 
            icon={<Users className="h-5 w-5" />}
            title="Student Support"
            description="Connect with students and provide academic guidance"
            linkTo="/dashboard/mentorship"
            buttonText="Support Students"
            color="purple"
          />
          <FeatureCard 
            icon={<Briefcase className="h-5 w-5" />}
            title="Placement Assistance"
            description="Help students with career placements and opportunities"
            linkTo="/dashboard/placement"
            buttonText="View Placements"
            color="purple"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Department Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Recent Department Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm"><strong>May 10:</strong> New research grant applications open</p>
              <p className="text-sm"><strong>May 8:</strong> Faculty meeting scheduled for next week</p>
              <p className="text-sm"><strong>May 5:</strong> Updated curriculum guidelines released</p>
              <p className="text-sm"><strong>May 1:</strong> Teaching assistant assignments updated</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Student Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Course Completion Rate</p>
                <div className="w-full bg-purple-200 rounded-full h-2.5 mt-1">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-right mt-1">85%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Assignment Submissions</p>
                <div className="w-full bg-purple-200 rounded-full h-2.5 mt-1">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <p className="text-xs text-right mt-1">72%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <Link to="/dashboard/messages">
          <Button variant="bright" className="w-full md:w-auto bg-purple-500 hover:bg-purple-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            Faculty Communication Portal
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === 'student' 
              ? "Explore resources and connect with alumni mentors"
              : user?.role === 'alumni' 
                ? "Share your experience and mentor students"
                : "Support students and manage academic resources"}
          </p>
        </div>

        {/* Render different dashboards based on user role */}
        {user?.role === 'student' && renderStudentDashboard()}
        {user?.role === 'alumni' && renderAlumniDashboard()}
        {user?.role === 'faculty' && renderFacultyDashboard()}
      </div>
    </DashboardLayout>
  );
}
