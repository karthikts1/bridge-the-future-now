
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, TrendingUp, Calendar } from "lucide-react";

export function FacultyCareerTools() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Manage Sessions
            </CardTitle>
            <CardDescription>
              Create and manage career guidance sessions for students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Create New Session
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Resource Library
            </CardTitle>
            <CardDescription>
              Manage career resources and materials for students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-purple-300">
              Manage Resources
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Analytics
            </CardTitle>
            <CardDescription>
              View engagement and participation analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-purple-300">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle>Recent Faculty Activities</CardTitle>
          <CardDescription>Your recent career guidance activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div>
              <p className="font-medium">Career Planning Workshop</p>
              <p className="text-sm text-muted-foreground">Scheduled for tomorrow at 2:00 PM</p>
            </div>
            <Badge className="bg-purple-100 text-purple-800">Upcoming</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Interview Skills Session</p>
              <p className="text-sm text-muted-foreground">Completed yesterday - 45 attendees</p>
            </div>
            <Badge variant="secondary">Completed</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Industry Networking Event</p>
              <p className="text-sm text-muted-foreground">Scheduled for next week</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Planning</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
