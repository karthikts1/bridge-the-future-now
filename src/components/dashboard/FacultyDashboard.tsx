
import { FeatureCard } from "@/components/FeatureCard";
import { 
  MessageSquare, 
  Users, 
  Briefcase, 
  Book 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FacultyDashboard() {
  return (
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
}
