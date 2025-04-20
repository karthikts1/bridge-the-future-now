
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { MessageSquare, Users, Briefcase, GraduationCap, Book, Settings } from "lucide-react";

export default function Features() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-alumni-800 to-alumni-900 text-white py-16">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Platform Features</h1>
            <p className="text-lg text-alumni-100 max-w-2xl mx-auto mb-8">
              AlumniConnect offers a comprehensive set of tools designed to foster meaningful connections between students and alumni.
            </p>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users size={24} />}
                title="Alumni Network"
                description="Connect with graduates who share your academic interests and professional goals. Build relationships that can guide your career path."
                linkTo="/dashboard"
                buttonText="Explore Network"
              />
              
              <FeatureCard
                icon={<MessageSquare size={24} />}
                title="Discussion Forums"
                description="Engage in meaningful conversations about academic and professional topics with peers and alumni who understand your journey."
                linkTo="/dashboard/forums"
                buttonText="Join Discussions"
              />
              
              <FeatureCard
                icon={<Briefcase size={24} />}
                title="Career Guidance"
                description="Receive personalized career advice from professionals who have successfully navigated similar paths in your field of interest."
                linkTo="/dashboard/career"
                buttonText="Get Guidance"
              />
              
              <FeatureCard
                icon={<Briefcase size={24} />}
                title="Placement Assistance"
                description="Access exclusive job opportunities, internship openings, and placement resources shared by our alumni network."
                linkTo="/dashboard/placement"
                buttonText="Find Opportunities"
              />
              
              <FeatureCard
                icon={<GraduationCap size={24} />}
                title="Mentorship Programs"
                description="Form lasting mentorship relationships through our structured programs that match students with compatible alumni mentors."
                linkTo="/dashboard/mentorship"
                buttonText="Find a Mentor"
              />
              
              <FeatureCard
                icon={<Book size={24} />}
                title="Academic Support"
                description="Get assistance with coursework, research projects, and academic challenges from alumni who excelled in your area of study."
                linkTo="/dashboard/academic"
                buttonText="Get Support"
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-alumni-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">What Our Users Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-alumni-100">
                <p className="italic mb-4">"The mentorship program completely changed my career trajectory. I found guidance when I needed it most."</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-alumni-200"></div>
                  <div className="ml-3">
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Class of 2022</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-alumni-100">
                <p className="italic mb-4">"As an alumnus, giving back through the platform has been rewarding. I've hired three talented graduates from my alma mater."</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-alumni-200"></div>
                  <div className="ml-3">
                    <h4 className="font-medium">Michael Chen</h4>
                    <p className="text-sm text-muted-foreground">Class of 2015</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-alumni-100">
                <p className="italic mb-4">"The discussion forums helped me find like-minded peers and alumni who shared valuable insights about my field."</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-alumni-200"></div>
                  <div className="ml-3">
                    <h4 className="font-medium">Priya Patel</h4>
                    <p className="text-sm text-muted-foreground">Class of 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-alumni-800 text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Connect?</h2>
            <p className="max-w-2xl mx-auto mb-8">Join thousands of students and alumni already benefiting from AlumniConnect's powerful networking features.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-alumni-400 hover:bg-alumni-500 text-alumni-900">
                  Create an Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
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
