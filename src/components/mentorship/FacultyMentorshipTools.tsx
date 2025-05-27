
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, BarChart3, MessageSquare } from "lucide-react";

export function FacultyMentorshipTools() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="font-bold text-lg text-purple-800 mb-2">Faculty Mentorship Dashboard</h3>
        <p className="text-purple-600">Oversee and facilitate mentorship connections between students and alumni.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Active Pairs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">24</div>
            <p className="text-sm text-purple-600">Currently mentoring</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-purple-600" />
              Pending Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">8</div>
            <p className="text-sm text-purple-600">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">87%</div>
            <p className="text-sm text-purple-600">Completion rate</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-4 w-4 text-purple-600" />
              Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">5</div>
            <p className="text-sm text-purple-600">Active programs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Recent Mentorship Requests</CardTitle>
            <CardDescription>Students seeking mentorship approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Computer Science → Tech Industry</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Approve</Button>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-muted-foreground">Business → Finance</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Approve</Button>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Program Management</CardTitle>
            <CardDescription>Manage mentorship programs and policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Users className="h-4 w-4 mr-2" />
              Manage Mentor Pool
            </Button>
            <Button variant="outline" className="w-full border-purple-300">
              <Settings className="h-4 w-4 mr-2" />
              Program Settings
            </Button>
            <Button variant="outline" className="w-full border-purple-300">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
