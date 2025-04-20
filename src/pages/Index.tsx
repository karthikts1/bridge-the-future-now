import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageSquare, Users, Briefcase, GraduationCap, Book } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1a365d] via-[#2a4365] to-[#1a365d] text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Bridge Your <span className="text-[#90cdf4]">Future</span> with Alumni Connections
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              AlumniConnect brings together students and alumni for mentorship, career guidance, and academic support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register">
                <Button className="bg-[#90cdf4] hover:bg-[#63b3ed] text-[#1a365d] text-lg px-6 py-6 h-auto font-semibold">
                  Join the Network
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-6 py-6 h-auto border-white text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-300">
              <div className="flex -space-x-2 mr-3">
                <div className="h-7 w-7 rounded-full bg-[#90cdf4]"></div>
                <div className="h-7 w-7 rounded-full bg-[#63b3ed]"></div>
                <div className="h-7 w-7 rounded-full bg-[#4299e1]"></div>
              </div>
              <span>Join 5,000+ alumni and students already connected</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-alumni-200 to-transparent"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How AlumniConnect Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides multiple ways for students and alumni to connect, learn, and grow together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-alumni-100 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-alumni-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Alumni Network</h3>
              <p className="text-muted-foreground">
                Connect with graduates from your school who are working in your field of interest.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-alumni-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-alumni-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discussion Forums</h3>
              <p className="text-muted-foreground">
                Participate in conversations about academic interests, career paths, and campus life.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-alumni-100 flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-alumni-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Guidance</h3>
              <p className="text-muted-foreground">
                Get advice from professionals who have walked your path before.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-alumni-100 flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-alumni-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Job Opportunities</h3>
              <p className="text-muted-foreground">
                Access job postings and internships shared exclusively by alumni.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-alumni-100 flex items-center justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-alumni-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mentorship Programs</h3>
              <p className="text-muted-foreground">
                Develop lasting professional relationships through structured mentorship.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-alumni-100 flex items-center justify-center mb-4">
                <Book className="h-8 w-8 text-alumni-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Academic Support</h3>
              <p className="text-muted-foreground">
                Get help with studies from alumni who excelled in your field.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-alumni-100/30">
        <div className="container px-4 mx-auto max-w-6xl text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Start Building Your Network Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students and alumni already using AlumniConnect to advance their careers and give back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-alumni-400 hover:bg-alumni-500 px-8 py-6 h-auto">
                  Create an Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-8 py-6 h-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
