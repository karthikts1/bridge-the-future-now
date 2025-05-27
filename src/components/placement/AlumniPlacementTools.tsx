
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Share2, MessageSquare } from "lucide-react";

export function AlumniPlacementTools() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-lg text-blue-800 mb-2">Alumni Placement Hub</h3>
        <p className="text-blue-600">Share job opportunities and help students with their career journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Post Job Opening
            </CardTitle>
            <CardDescription>
              Share opportunities from your company with students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Post New Job
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Refer Students
            </CardTitle>
            <CardDescription>
              Recommend qualified students to your network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-blue-300">
              Make Referral
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Resume Review
            </CardTitle>
            <CardDescription>
              Help students improve their resumes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-blue-300">
              Review Resumes
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle>Your Contributions</CardTitle>
          <CardDescription>Track your impact on student placements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium">Software Engineer Position at TechCorp</p>
              <p className="text-sm text-muted-foreground">Posted 1 week ago - 15 applications</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Marketing Intern at StartupXYZ</p>
              <p className="text-sm text-muted-foreground">Filled last month - 1 student hired</p>
            </div>
            <Badge variant="secondary">Completed</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
