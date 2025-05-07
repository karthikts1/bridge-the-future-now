
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageSquare, Users, Briefcase, GraduationCap, Book, School } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-14 bg-accent/30">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-primary">
              Our Services for Students and Alumni
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Discover how AlumniConnect helps bridge the gap between education and career success.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Core Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive support for the educational and professional journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Mentorship Programs"
              description="Connect with experienced mentors who can guide you through academic and career challenges."
              linkTo={"/dashboard/mentorship"}
              buttonText="Learn More"
            />
            
            <FeatureCard
              icon={<MessageSquare className="h-5 w-5" />}
              title="Discussion Forums"
              description="Engage in topic-specific conversations with peers, alumni, and faculty members."
              linkTo={"/dashboard/forums"}
              buttonText="Join Discussions"
            />
            
            <FeatureCard
              icon={<Briefcase className="h-5 w-5" />}
              title="Career Development"
              description="Access resources, workshops, and networking opportunities to advance your career."
              linkTo={"/dashboard/career"}
              buttonText="Explore Career Services"
            />
            
            <FeatureCard
              icon={<School className="h-5 w-5" />}
              title="Alumni Networking"
              description="Build relationships with graduates who are now industry professionals."
              linkTo={"/dashboard"}
              buttonText="Connect with Alumni"
            />
            
            <FeatureCard
              icon={<GraduationCap className="h-5 w-5" />}
              title="Academic Support"
              description="Get help with coursework, research, and academic planning from experienced peers."
              linkTo={"/dashboard/academic"}
              buttonText="Get Support"
            />
            
            <FeatureCard
              icon={<Briefcase className="h-5 w-5" />}
              title="Job Placement"
              description="Find internships and job opportunities shared by our alumni network."
              linkTo={"/dashboard/placement"}
              buttonText="View Opportunities"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-accent/20">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from students and alumni who have benefited from our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-accent/40">
              <p className="italic mb-4">"The mentorship program connected me with an alumnus in my dream company who helped me prepare for my interviews and ultimately land my first job."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-accent mr-3"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Computer Science, Class of 2022</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-accent/40">
              <p className="italic mb-4">"The academic support forums helped me navigate challenging courses and connect with peers who shared valuable study resources."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-accent mr-3"></div>
                <div>
                  <p className="font-semibold">David Chen</p>
                  <p className="text-sm text-muted-foreground">Engineering, Class of 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-white/90">
              Join AlumniConnect today to access all our services and start building your professional network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="bright" className="px-8 py-6 h-auto shadow-lg">
                  Create an Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="contrast" className="px-8 py-6 h-auto border-white shadow-lg hover:bg-white/90">
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
