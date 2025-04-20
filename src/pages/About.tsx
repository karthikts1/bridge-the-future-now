
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, School, Award } from "lucide-react";

export default function About() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">About Alumni Connect</h1>
          <p className="text-muted-foreground mt-1">
            Bridging the gap between students and alumni for mentorship, networking and career growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-alumni-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-alumni-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Alumni Connect is dedicated to creating meaningful connections between students and alumni, 
                fostering a supportive community that enhances academic and professional growth for all members.
              </p>
            </CardContent>
          </Card>

          <Card className="border-alumni-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-alumni-500" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We aim to build the most comprehensive alumni networking platform that transforms how educational 
                institutions maintain connections with their graduates and how students access valuable mentorship.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-alumni-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-alumni-500" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Knowledge sharing and continuous learning</li>
                <li>Inclusivity and diversity</li>
                <li>Professional development and growth</li>
                <li>Community building and support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-alumni-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-alumni-500" />
                Get Involved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                There are many ways to participate in our community, whether you're a current student 
                looking for guidance or an alumnus wanting to give back.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="bg-alumni-400 hover:bg-alumni-500" asChild>
                <Link to="/register">Join Today</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to connect?</h2>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button className="bg-alumni-400 hover:bg-alumni-500" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
