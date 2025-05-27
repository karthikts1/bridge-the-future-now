
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, GraduationCap, Clock } from "lucide-react";

export function AlumniAcademicTools() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-lg text-blue-800 mb-2">Alumni Academic Support</h3>
        <p className="text-blue-600">Share your expertise and help current students succeed academically.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Become a Tutor
            </CardTitle>
            <CardDescription>
              Offer tutoring sessions in your area of expertise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Register as Tutor
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Share Resources
            </CardTitle>
            <CardDescription>
              Upload study materials and guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-blue-300">
              Upload Resource
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Answer Questions
            </CardTitle>
            <CardDescription>
              Help students with their academic queries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-blue-300">
              View Questions
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle>Your Tutoring Activities</CardTitle>
          <CardDescription>Track your academic support contributions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium">Mathematics Tutoring Session</p>
              <p className="text-sm text-muted-foreground">Scheduled for tomorrow at 3:00 PM</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Upcoming</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Computer Science Q&A</p>
              <p className="text-sm text-muted-foreground">Answered 5 questions this week</p>
            </div>
            <Badge variant="secondary">Completed</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Study Guide: Data Structures</p>
              <p className="text-sm text-muted-foreground">Downloaded 45 times</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
