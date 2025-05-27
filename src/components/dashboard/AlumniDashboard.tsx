
import { FeatureCard } from "@/components/FeatureCard";
import { 
  MessageSquare, 
  Users, 
  Briefcase 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AlumniDashboard() {
  return (
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
}
