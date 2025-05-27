import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Book, GraduationCap, Search, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { FacultyAcademicTools } from "@/components/academic/FacultyAcademicTools";
import { AlumniAcademicTools } from "@/components/academic/AlumniAcademicTools";

// Mock academic support resources
const academicResources = [
  {
    id: "1",
    subject: "Computer Science",
    title: "Data Structures and Algorithms",
    type: "Study Guide",
    author: "Alex Johnson",
    rating: 4.8,
    downloads: 342,
    description: "Comprehensive guide covering fundamental data structures and algorithms with practice problems."
  },
  {
    id: "2",
    subject: "Business",
    title: "Marketing Strategy Framework",
    type: "Template",
    author: "Sarah Williams",
    rating: 4.6,
    downloads: 218,
    description: "Step-by-step framework for developing effective marketing strategies with examples."
  },
  {
    id: "3",
    subject: "Engineering",
    title: "Circuit Analysis Cheat Sheet",
    type: "Quick Reference",
    author: "Michael Chen",
    rating: 4.9,
    downloads: 456,
    description: "Essential formulas and concepts for circuit analysis all in one page."
  }
];

// Mock tutors
const tutors = [
  {
    id: "1",
    name: "David Miller",
    subject: "Mathematics",
    experience: "3 years tutoring experience",
    rating: 4.9,
    availability: "Mon, Wed, Fri evenings",
    bio: "Math PhD student specializing in calculus, linear algebra, and statistics."
  },
  {
    id: "2",
    name: "Jennifer Lopez",
    subject: "Biology",
    experience: "5 years tutoring experience",
    rating: 4.8,
    availability: "Tue, Thu afternoons, weekends",
    bio: "Medical student with strong background in biology, anatomy, and biochemistry."
  },
  {
    id: "3",
    name: "Robert Chen",
    subject: "Computer Science",
    experience: "4 years tutoring experience",
    rating: 4.7,
    availability: "Weekday evenings",
    bio: "Software engineer specializing in programming fundamentals, data structures, and algorithms."
  }
];

export default function Academic() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [helpRequest, setHelpRequest] = useState("");
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const { toast } = useToast();

  const handleRequestHelp = () => {
    if (helpRequest.trim() === "") {
      toast({
        title: "Cannot submit request",
        description: "Please describe what help you need.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Help request submitted!",
      description: "An alumni tutor will respond to your request soon."
    });
    
    setHelpRequest("");
    setShowRequestDialog(false);
  };

  const handleDownloadResource = (resourceId: string) => {
    const resource = academicResources.find(r => r.id === resourceId);
    toast({
      title: "Resource downloaded",
      description: `You've downloaded "${resource?.title}". Happy studying!`
    });
  };

  const handleScheduleTutor = (tutorId: string) => {
    const tutor = tutors.find(t => t.id === tutorId);
    toast({
      title: "Tutor session requested",
      description: `Your request to schedule a session with ${tutor?.name} has been sent.`
    });
  };

  const renderRoleSpecificContent = () => {
    switch (user?.role) {
      case 'faculty':
        return <FacultyAcademicTools />;
      case 'alumni':
        return <AlumniAcademicTools />;
      case 'student':
      default:
        return (
          <div className="space-y-6">
            {/* Help request section */}
            <Card className="border-alumni-100 bg-alumni-50/30">
              <CardHeader>
                <CardTitle className="text-xl">Need Help with Your Studies?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Our network of alumni are ready to help you with your academic questions, 
                  assignments, or exam preparation.
                </p>
                <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-alumni-400 hover:bg-alumni-500">
                      Request Academic Help
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Academic Help</DialogTitle>
                      <DialogDescription>
                        Describe what you need help with and we'll match you with an alumni who can assist.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          What do you need help with?
                        </label>
                        <Textarea
                          id="helpRequest"
                          placeholder="Describe your question or the area you need help with..."
                          rows={5}
                          value={helpRequest}
                          onChange={(e) => setHelpRequest(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowRequestDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-alumni-400 hover:bg-alumni-500"
                        onClick={handleRequestHelp}
                      >
                        Submit Request
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Study resources */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Academic Resources</h2>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {academicResources.map((resource) => (
                  <Card key={resource.id} className="border-alumni-100">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-alumni-100 text-alumni-600 mb-2">
                          {resource.subject}
                        </Badge>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="text-muted-foreground mb-2">
                        {resource.description}
                      </p>
                      <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Book className="h-3 w-3 mr-1" />
                          {resource.downloads} downloads
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-amber-500 mr-1">★</span>
                          {resource.rating} rating
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleDownloadResource(resource.id)}
                      >
                        Download Resource
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Alumni tutors */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold">Available Alumni Tutors</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tutors.map((tutor) => (
                  <Card key={tutor.id} className="border-alumni-100">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center mb-4">
                        <Avatar className="h-16 w-16 mb-3">
                          <AvatarImage src="" alt={tutor.name} />
                          <AvatarFallback className="bg-alumni-300 text-white">
                            <User className="h-8 w-8" />
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg">{tutor.name}</h3>
                        <p className="text-sm text-muted-foreground">{tutor.subject}</p>
                        <div className="flex items-center mt-1 text-sm">
                          <span className="font-medium text-amber-500 mr-1">★</span>
                          <span>{tutor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <p className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-alumni-500" />
                          <span>{tutor.experience}</span>
                        </p>
                        <p className="flex items-center">
                          <Book className="h-4 w-4 mr-2 text-alumni-500" />
                          <span>{tutor.availability}</span>
                        </p>
                        <p className="text-muted-foreground mt-2">
                          {tutor.bio}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-alumni-400 hover:bg-alumni-500"
                        onClick={() => handleScheduleTutor(tutor.id)}
                      >
                        Schedule Session
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Academic Support</h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === 'student' 
              ? "Get help with your studies from alumni and access academic resources"
              : user?.role === 'alumni'
                ? "Share your expertise and help current students succeed academically"
                : "Manage academic resources and support student learning"}
          </p>
        </div>

        {renderRoleSpecificContent()}
      </div>
    </DashboardLayout>
  );
}
