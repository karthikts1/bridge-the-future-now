import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, Filter, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { FacultyPlacementTools } from "@/components/placement/FacultyPlacementTools";
import { AlumniPlacementTools } from "@/components/placement/AlumniPlacementTools";

// Mock job opportunities data
const mockJobs = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    posted: "2 days ago",
    type: "Full-time",
    description: "Join our team to build cutting-edge web applications using modern technologies.",
    postedBy: "Alumni: David Chen (Class of 2019)",
    requirements: ["Bachelor's in Computer Science or related field", "Experience with React", "Strong problem-solving skills"],
    salary: "$120,000 - $150,000"
  },
  {
    id: "2",
    title: "Marketing Associate",
    company: "Airbnb",
    location: "New York, NY",
    posted: "1 week ago",
    type: "Full-time",
    description: "Help drive marketing initiatives and campaigns for our platform.",
    postedBy: "Alumni: Sarah Miller (Class of 2020)",
    requirements: ["Bachelor's in Marketing or Business", "Strong communication skills", "Social media experience"],
    salary: "$75,000 - $90,000"
  },
  {
    id: "3",
    title: "Data Analyst Intern",
    company: "Netflix",
    location: "Remote",
    posted: "3 days ago",
    type: "Internship",
    description: "Work with our data science team to derive insights from user data.",
    postedBy: "Alumni: Michael Wu (Class of 2021)",
    requirements: ["Currently pursuing degree in Statistics, Mathematics, or related field", "Proficiency in SQL", "Basic Python knowledge"],
    salary: "$35/hour"
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: "Amazon",
    location: "Seattle, WA",
    posted: "5 days ago",
    type: "Full-time",
    description: "Design intuitive user experiences for our web and mobile applications.",
    postedBy: "Alumni: Jessica Park (Class of 2018)",
    requirements: ["Portfolio showcasing design projects", "Experience with Figma or similar tools", "User-centered design mindset"],
    salary: "$100,000 - $130,000"
  }
];

export default function Placement() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const { toast } = useToast();

  const handleApply = (jobId: string) => {
    const job = mockJobs.find(j => j.id === jobId);
    toast({
      title: "Application submitted!",
      description: `Your application for ${job?.title} at ${job?.company} has been submitted.`
    });
  };

  // Filter jobs based on search and filters
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesLocation = locationFilter === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesJobType = jobTypeFilter === "" || job.type === jobTypeFilter;
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

  const renderRoleSpecificContent = () => {
    switch (user?.role) {
      case 'faculty':
        return <FacultyPlacementTools />;
      case 'alumni':
        return <AlumniPlacementTools />;
      case 'student':
      default:
        return (
          <div className="space-y-6">
            {/* Search and filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title, company, or keyword..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <Label htmlFor="location" className="text-sm mb-2 block">Location</Label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger id="location">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{locationFilter || "All Locations"}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">All Locations</SelectItem>
                      <SelectItem value="san francisco">San Francisco</SelectItem>
                      <SelectItem value="new york">New York</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="seattle">Seattle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-1/2">
                  <Label htmlFor="jobType" className="text-sm mb-2 block">Job Type</Label>
                  <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger id="jobType">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{jobTypeFilter || "All Types"}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Job listings */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Available Opportunities</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
              
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="border-alumni-100 hover:border-alumni-200 transition-all">
                      <CardHeader>
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                            <p className="text-base font-medium">{job.company} • {job.location}</p>
                          </div>
                          <Badge className="bg-alumni-100 text-alumni-600 mt-1 whitespace-nowrap">
                            {job.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 text-muted-foreground">
                        <p>{job.description}</p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">Requirements:</p>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between text-sm pt-2">
                          <p><span className="font-medium text-foreground">Salary:</span> {job.salary}</p>
                          <p><span className="font-medium text-foreground">Posted:</span> {job.posted}</p>
                        </div>
                        
                        <p className="text-sm italic border-t pt-4">
                          {job.postedBy}
                        </p>
                      </CardContent>
                      <CardFooter className="flex gap-4">
                        <Button 
                          className="w-full bg-alumni-400 hover:bg-alumni-500"
                          onClick={() => handleApply(job.id)}
                        >
                          Apply Now
                        </Button>
                        <Button variant="outline" className="w-full">Save for Later</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="py-12">
                  <CardContent className="flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Briefcase className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search filters or check back later.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setLocationFilter("");
                        setJobTypeFilter("");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Resume review section */}
            <div className="pt-4">
              <Card className="border-alumni-100 bg-alumni-50/30">
                <CardHeader>
                  <CardTitle className="text-lg">Resume Review Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get personalized feedback on your resume from alumni working in your field of interest. 
                    Our alumni volunteers will review your resume and provide actionable suggestions to help 
                    you stand out to employers.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="font-medium mb-2">48-hour turnaround</p>
                      <p className="text-muted-foreground">Quick feedback so you can apply with confidence</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="font-medium mb-2">Industry-specific advice</p>
                      <p className="text-muted-foreground">Tips tailored to your target industry</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="font-medium mb-2">ATS optimization</p>
                      <p className="text-muted-foreground">Help getting past resume screening software</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-alumni-400 hover:bg-alumni-500">
                    Submit Your Resume for Review
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Placement Assistance</h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === 'student' 
              ? "Access job opportunities shared by alumni and get placement support"
              : user?.role === 'alumni'
                ? "Share job opportunities and help students with their career journey"
                : "Manage placement programs and support student job placement efforts"}
          </p>
        </div>

        {renderRoleSpecificContent()}
      </div>
    </DashboardLayout>
  );
}
