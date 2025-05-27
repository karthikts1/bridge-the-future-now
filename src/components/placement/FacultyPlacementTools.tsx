
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, TrendingUp, FileText } from "lucide-react";

export function FacultyPlacementTools() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="font-bold text-lg text-purple-800 mb-2">Faculty Placement Dashboard</h3>
        <p className="text-purple-600">Manage placement programs and support student job placement efforts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">156</div>
            <p className="text-sm text-purple-600">Seeking placement</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-purple-600" />
              Job Postings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">42</div>
            <p className="text-sm text-purple-600">This month</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              Placement Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">78%</div>
            <p className="text-sm text-purple-600">This year</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              Resume Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">23</div>
            <p className="text-sm text-purple-600">Pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Student job applications requiring review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium">Sarah Kim - Software Engineer at Google</p>
                <p className="text-sm text-muted-foreground">Applied 2 days ago</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium">Michael Chen - Data Analyst at Netflix</p>
                <p className="text-sm text-muted-foreground">Applied 1 week ago</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Approved</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Placement Management</CardTitle>
            <CardDescription>Manage placement programs and resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Briefcase className="h-4 w-4 mr-2" />
              Post New Job Opening
            </Button>
            <Button variant="outline" className="w-full border-purple-300">
              <FileText className="h-4 w-4 mr-2" />
              Review Resumes
            </Button>
            <Button variant="outline" className="w-full border-purple-300">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
