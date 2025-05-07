
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
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Bridge Your <span className="text-accent">Future</span> with Alumni Connections
            </h1>
            <p className="text-lg text-white/90 mb-8">
              AlumniConnect brings together students and alumni for mentorship, career guidance, and academic support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register">
                <Button variant="bright" className="text-lg px-6 py-6 h-auto shadow-lg">
                  Join the Network
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="contrast" className="text-lg px-6 py-6 h-auto shadow-lg hover:bg-white/90">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center text-sm text-white/90">
              <div className="flex -space-x-2 mr-3">
                <div className="h-7 w-7 rounded-full bg-secondary"></div>
                <div className="h-7 w-7 rounded-full bg-secondary/80"></div>
                <div className="h-7 w-7 rounded-full bg-secondary/60"></div>
              </div>
              <span>Join 5,000+ alumni and students already connected</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">How AlumniConnect Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides multiple ways for students and alumni to connect, learn, and grow together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-accent/50 hover:border-accent hover:shadow-md transition-all">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Alumni Network</h3>
              <p className="text-muted-foreground">
                Connect with graduates from your school who are working in your field of interest.
              </p>
              <div className="mt-4">
                <Link to="/services">
                  <Button variant="outline" className="mt-2">Learn More</Button>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-accent/50 hover:border-accent hover:shadow-md transition-all">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Discussion Forums</h3>
              <p className="text-muted-foreground">
                Participate in conversations about academic interests, career paths, and campus life.
              </p>
              <div className="mt-4">
                <Link to="/services">
                  <Button variant="outline" className="mt-2">Learn More</Button>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-accent/50 hover:border-accent hover:shadow-md transition-all">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Career Guidance</h3>
              <p className="text-muted-foreground">
                Get advice from professionals who have walked your path before.
              </p>
              <div className="mt-4">
                <Link to="/services">
                  <Button variant="outline" className="mt-2">Learn More</Button>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-accent/50 hover:border-accent hover:shadow-md transition-all">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Job Opportunities</h3>
              <p className="text-muted-foreground">
                Access job postings and internships shared exclusively by alumni.
              </p>
              <div className="mt-4">
                <Link to="/services">
                  <Button variant="outline" className="mt-2">Learn More</Button>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-accent/50 hover:border-accent hover:shadow-md transition-all">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Mentorship Programs</h3>
              <p className="text-muted-foreground">
                Develop lasting professional relationships through structured mentorship.
              </p>
              <div className="mt-4">
                <Link to="/services">
                  <Button variant="outline" className="mt-2">Learn More</Button>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-accent/50 hover:border-accent hover:shadow-md transition-all">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <Book className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Academic Support</h3>
              <p className="text-muted-foreground">
                Get help with studies from alumni who excelled in your field.
              </p>
              <div className="mt-4">
                <Link to="/services">
                  <Button variant="outline" className="mt-2">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-accent/30">
        <div className="container px-4 mx-auto max-w-6xl text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-primary">Start Building Your Network Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students and alumni already using AlumniConnect to advance their careers and give back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="bright" className="px-8 py-6 h-auto text-white shadow-lg">
                  Create an Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="contrast" className="px-8 py-6 h-auto border-primary shadow-lg hover:bg-white/90">
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
