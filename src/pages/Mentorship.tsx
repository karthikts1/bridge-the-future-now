
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Badge 
} from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Briefcase, Filter, Search, User, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock mentors data
const mockMentors = [
  {
    id: "1",
    name: "David Miller",
    position: "Senior Software Engineer",
    company: "Microsoft",
    experience: "10+ years",
    expertise: ["Career Development", "Technical Interviews", "Leadership"],
    availability: "2-3 hours/week",
    bio: "Experienced software engineer with a passion for mentoring junior developers and helping students transition into tech careers."
  },
  {
    id: "2",
    name: "Jennifer Lopez",
    position: "Marketing Director",
    company: "Netflix",
    experience: "8 years",
    expertise: ["Digital Marketing", "Brand Strategy", "Content Creation"],
    availability: "1-2 hours/week",
    bio: "Marketing professional who loves sharing insights about building a career in creative industries and developing personal brands."
  },
  {
    id: "3",
    name: "Robert Chen",
    position: "Investment Banker",
    company: "Goldman Sachs",
    experience: "12 years",
    expertise: ["Finance", "Investment Strategy", "Career Switching"],
    availability: "Bi-weekly",
    bio: "Finance expert with experience across multiple sectors, passionate about helping students understand the financial industry."
  }
];

export default function Mentorship() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const { toast } = useToast();

  const handleJoinProgram = (mentorId: string) => {
    const mentor = mockMentors.find(m => m.id === mentorId);
    toast({
      title: "Mentorship request sent!",
      description: `Your request to connect with ${mentor?.name} has been sent. They will respond shortly.`
    });
  };

  // Filter mentors based on search and industry filter
  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = 
      searchQuery === "" || 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesIndustry = industryFilter === "" || mentor.company.toLowerCase().includes(industryFilter.toLowerCase());
    
    return matchesSearch && matchesIndustry;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mentorship Programs</h1>
          <p className="text-muted-foreground mt-1">
            Connect with alumni mentors for personalized guidance and support
          </p>
        </div>

        {/* How it works section */}
        <Card className="border-alumni-100">
          <CardHeader>
            <CardTitle>How Mentorship Works</CardTitle>
            <CardDescription>
              Our mentorship program connects current students with experienced alumni
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 text-center">
              <div className="h-12 w-12 rounded-full bg-alumni-100 flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-alumni-500" />
              </div>
              <h3 className="font-medium">1. Find a Mentor</h3>
              <p className="text-sm text-muted-foreground">
                Browse profiles and find mentors that match your career interests.
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="h-12 w-12 rounded-full bg-alumni-100 flex items-center justify-center mx-auto">
                <Briefcase className="h-6 w-6 text-alumni-500" />
              </div>
              <h3 className="font-medium">2. Connect</h3>
              <p className="text-sm text-muted-foreground">
                Send a request explaining your goals and what you hope to learn.
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="h-12 w-12 rounded-full bg-alumni-100 flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-alumni-500" />
              </div>
              <h3 className="font-medium">3. Meet Regularly</h3>
              <p className="text-sm text-muted-foreground">
                Schedule sessions with your mentor to discuss your career path.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mentors by name, company or expertise..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[180px]">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>{industryFilter || "Filter Industry"}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Available mentors */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Mentors</h2>
          <div className="grid grid-cols-1 gap-4">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden border-alumni-100">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Mentor Info */}
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-alumni-300 text-white">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {mentor.position} at {mentor.company}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {mentor.experience} of experience • {mentor.availability}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {mentor.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-alumni-100">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                    </div>
                    
                    <Button 
                      className="bg-alumni-400 hover:bg-alumni-500 mt-4 md:mt-0 md:self-start whitespace-nowrap"
                      onClick={() => handleJoinProgram(mentor.id)}
                    >
                      Request Mentorship
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
