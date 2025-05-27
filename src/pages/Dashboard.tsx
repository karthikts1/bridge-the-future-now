
import { useUser } from "@/contexts/UserContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { AlumniDashboard } from "@/components/dashboard/AlumniDashboard";
import { FacultyDashboard } from "@/components/dashboard/FacultyDashboard";

export default function Dashboard() {
  const { user } = useUser();

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'alumni':
        return <AlumniDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      default:
        return <div>Please complete your profile to access dashboard features.</div>;
    }
  };

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

        {renderDashboardByRole()}
      </div>
    </DashboardLayout>
  );
}
