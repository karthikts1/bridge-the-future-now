
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, School, Award, MessageSquare, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-alumni-800 to-alumni-900 text-white py-16">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">About AlumniConnect</h1>
            <p className="text-lg text-alumni-100 max-w-3xl mx-auto">
              Bridging the gap between students and alumni for mentorship, networking and career growth
            </p>
          </div>
        </section>
        
        {/* Mission & Vision Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
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
                    AlumniConnect is dedicated to creating meaningful connections between students and alumni, 
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
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-alumni-50">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
              <div className="bg-white p-8 rounded-lg shadow-sm border border-alumni-100">
                <p className="mb-4">
                  AlumniConnect began in 2020 when a group of recent graduates recognized the challenge of maintaining connections 
                  with their alma mater and providing guidance to current students. They envisioned a platform that would bridge 
                  this gap and create lasting relationships between alumni and students.
                </p>
                <p className="mb-4">
                  What started as a simple forum quickly evolved into a comprehensive platform offering mentorship programs, 
                  career guidance, and academic support. Today, AlumniConnect serves thousands of users across multiple 
                  institutions, facilitating connections that help shape the future of education and professional development.
                </p>
                <p>
                  Our team consists of educators, technology experts, and career development specialists who are passionate about 
                  creating opportunities for students and alumni to connect, learn, and grow together.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-alumni-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-alumni-500" />
                    Knowledge Sharing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We believe in the power of shared experiences and knowledge transfer between generations of students and professionals.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-alumni-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-alumni-500" />
                    Inclusivity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We strive to create an environment where everyone feels welcome, respected, and valued regardless of background.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-alumni-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-alumni-500" />
                    Professional Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We are committed to providing resources and connections that foster continuous professional development.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-alumni-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5 text-alumni-500" />
                    Community Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We foster a supportive community where members can find guidance, encouragement, and collaboration opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-alumni-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-alumni-100 text-center">
                <div className="h-24 w-24 bg-alumni-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg">Dr. Emily Chen</h3>
                <p className="text-muted-foreground mb-2">Co-Founder & CEO</p>
                <p className="text-sm">Former Associate Dean with 15+ years experience in higher education administration.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-alumni-100 text-center">
                <div className="h-24 w-24 bg-alumni-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg">Marcus Johnson</h3>
                <p className="text-muted-foreground mb-2">Co-Founder & CTO</p>
                <p className="text-sm">Tech entrepreneur with multiple successful education platforms in his portfolio.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-alumni-100 text-center">
                <div className="h-24 w-24 bg-alumni-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg">Sophia Rodriguez</h3>
                <p className="text-muted-foreground mb-2">Director of Mentorship</p>
                <p className="text-sm">Career counselor specializing in connecting students with industry professionals.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Get Involved Section */}
        <section className="py-16 bg-alumni-800 text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              There are many ways to participate in our community, whether you're a current student 
              looking for guidance or an alumnus wanting to give back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-alumni-400 hover:bg-alumni-500 text-alumni-900 w-full sm:w-auto">
                  Join Today
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="bright" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
