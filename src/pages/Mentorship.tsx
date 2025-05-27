
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Card } from "@/components/ui/card";
import { MentorshipInfo } from "@/components/mentorship/MentorshipInfo";
import { MentorCard } from "@/components/mentorship/MentorCard";

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

const industryOptions = [
  { label: "All Industries", value: "all" },
  { label: "Technology", value: "tech" },
  { label: "Finance", value: "finance" },
  { label: "Marketing", value: "marketing" }
];

export default function Mentorship() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const { toast } = useToast();
  const { user } = useUser();

  const handleMentorAction = (mentorId: string) => {
    const mentor = mockMentors.find(m => m.id === mentorId);
    const actionText = user?.role === 'student' ? 'mentorship request' : 'connection request';
    
    toast({
      title: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} sent!`,
      description: `Your ${actionText} to connect with ${mentor?.name} has been sent. They will respond shortly.`
    });
  };

  // Filter mentors based on search and industry filter
  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = 
      searchQuery === "" || 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesIndustry = 
      industryFilter === "all" || 
      (industryFilter === "tech" && mentor.company.toLowerCase().includes("microsoft")) ||
      (industryFilter === "finance" && mentor.company.toLowerCase().includes("goldman")) ||
      (industryFilter === "marketing" && mentor.company.toLowerCase().includes("netflix"));
    
    return matchesSearch && matchesIndustry;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mentorship Programs</h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === 'student' 
              ? "Connect with alumni mentors for personalized guidance and support"
              : user?.role === 'alumni'
                ? "Share your expertise and mentor the next generation"
                : "Facilitate mentorship connections and support student development"}
          </p>
        </div>

        <MentorshipInfo userRole={user?.role || 'student'} />

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
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Available mentors */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {user?.role === 'alumni' ? 'Fellow Mentors' : 'Available Mentors'}
          </h2>
          {filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredMentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  userRole={user?.role || 'student'}
                  onAction={handleMentorAction}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              <p>No mentors found matching your search criteria.</p>
              <p className="mt-2">Try adjusting your filters or search terms.</p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
