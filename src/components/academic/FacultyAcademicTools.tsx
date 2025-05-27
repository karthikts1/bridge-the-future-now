
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, FileText, BarChart3 } from "lucide-react";

export function FacultyAcademicTools() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="font-bold text-lg text-purple-800 mb-2">Faculty Academic Dashboard</h3>
        <p className="text-purple-600">Manage academic resources and support student learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Help Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">18</div>
            <p className="text-sm text-purple-600">Pending review</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">67</div>
            <p className="text-sm text-purple-600">Published</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Active Tutors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">12</div>
            <p className="text-sm text-purple-600">Alumni tutors</p>
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
            <div className="text-2xl font-bold text-purple-700">91%</div>
            <p className="text-sm text-purple-600">Resolution rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Recent Help Requests</CardTitle>
            <CardDescription>Students seeking academic assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium">Help with Calculus Integration</p>
                <p className="text-sm text-muted-foreground">From: Emily Johnson - 2 hours ago</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Assign</Button>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium">Data Structures Assignment Help</p>
                <p className="text-sm text-muted-foreground">From: Alex Chen - 1 day ago</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Assign</Button>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Resource Management</CardTitle>
            <CardDescription>Manage academic resources and tutors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <BookOpen className="h-4 w-4 mr-2" />
              Upload New Resource
            </Button>
            <Button variant="outline" className="w-full border-purple-300">
              <Users className="h-4 w-4 mr-2" />
              Manage Tutors
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
