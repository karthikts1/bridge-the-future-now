
import { useUser } from "@/contexts/UserContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FeatureCard } from "@/components/FeatureCard";
import { AlumniCard } from "@/components/AlumniCard";
import { getRecommendedAlumni } from "@/services/mockData";
import { 
  MessageSquare, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Book 
} from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const recommendedAlumni = user?.role === 'student' ? getRecommendedAlumni(user.field) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === 'student' 
              ? "Explore mentorship opportunities and connect with alumni"
              : "Share your experience and mentor students"}
          </p>
        </div>

        {/* Features section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard 
              icon={<MessageSquare className="h-5 w-5" />}
              title="Discussion Forums"
              description={user?.role === 'student' 
                ? "Engage in discussions with alumni and peers"
                : "Share your knowledge and experiences"}
              linkTo="/dashboard/forums"
              buttonText="Join Discussions"
            />
            <FeatureCard 
              icon={<Users className="h-5 w-5" />}
              title="Mentorship Programs"
              description={user?.role === 'student'
                ? "Connect with alumni mentors for guidance"
                : "Mentor students and shape future professionals"}
              linkTo="/dashboard/mentorship"
              buttonText={user?.role === 'student' ? "Find a Mentor" : "Become a Mentor"}
            />
            <FeatureCard 
              icon={<Briefcase className="h-5 w-5" />}
              title="Career Guidance"
              description={user?.role === 'student'
                ? "Get career advice from experienced professionals"
                : "Guide students in their career choices"}
              linkTo="/dashboard/career"
              buttonText="Explore Careers"
            />
          </div>
        </div>

        {/* Recommendations section - only for students */}
        {user?.role === 'student' && recommendedAlumni.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recommended Alumni in {user.field}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {recommendedAlumni.map(alumni => (
                <AlumniCard 
                  key={alumni.id}
                  {...alumni}
                  onConnect={(id) => console.log('Connect with', id)}
                  onMessage={(id) => console.log('Message', id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Activity section for alumni */}
        {user?.role === 'alumni' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg bg-alumni-50 border border-alumni-100">
                <h3 className="font-semibold mb-2">Students Mentored</h3>
                <p className="text-3xl font-bold text-alumni-500">12</p>
              </div>
              <div className="p-6 rounded-lg bg-alumni-50 border border-alumni-100">
                <h3 className="font-semibold mb-2">Forum Contributions</h3>
                <p className="text-3xl font-bold text-alumni-500">45</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
