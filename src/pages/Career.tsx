
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock upcoming sessions data
const upcomingSessions = [
  {
    id: "1",
    title: "Breaking into Tech: A Guide for New Graduates",
    host: "Alex Johnson",
    hostTitle: "Engineering Manager at Google",
    date: "June 15, 2025",
    time: "3:00 PM - 4:30 PM",
    format: "Virtual",
    description: "Learn how to position yourself for success in the tech industry right after graduation.",
    topics: ["Resume Building", "Technical Interviews", "Networking"]
  },
  {
    id: "2",
    title: "From College to Corporate: Navigating Your First Year",
    host: "Sarah Williams",
    hostTitle: "HR Director at Microsoft",
    date: "June 18, 2025",
    time: "5:00 PM - 6:00 PM",
    format: "Virtual",
    description: "Essential tips for making a smooth transition from academic to corporate environments.",
    topics: ["Corporate Culture", "Professional Development", "Workplace Communication"]
  },
  {
    id: "3",
    title: "Career Paths in Finance and Investment Banking",
    host: "Michael Chen",
    hostTitle: "Senior Investment Banker at Goldman Sachs",
    date: "June 25, 2025",
    time: "4:00 PM - 5:30 PM",
    format: "In-person",
    description: "Explore various career tracks within the financial sector and learn about day-to-day responsibilities.",
    topics: ["Finance Careers", "Industry Trends", "Skills Development"]
  }
];

// Mock past recordings
const pastRecordings = [
  {
    id: "1",
    title: "How to Build a Personal Brand in Tech",
    host: "Emma Thompson",
    duration: "1h 15m",
    views: 342,
    date: "May 20, 2025"
  },
  {
    id: "2",
    title: "Navigating Career Changes: When and How to Pivot",
    host: "James Wilson",
    duration: "55m",
    views: 218,
    date: "May 12, 2025"
  },
  {
    id: "3",
    title: "Mastering Technical Interviews: Strategies and Practice",
    host: "Lisa Rodriguez",
    duration: "1h 30m",
    views: 511,
    date: "May 5, 2025"
  },
  {
    id: "4",
    title: "Negotiating Your First Job Offer",
    host: "David Park",
    duration: "45m",
    views: 289,
    date: "April 28, 2025"
  }
];

export default function Career() {
  const { toast } = useToast();
  
  const handleRegisterSession = (sessionId: string) => {
    const session = upcomingSessions.find(s => s.id === sessionId);
    toast({
      title: "Registration Successful!",
      description: `You're registered for "${session?.title}" on ${session?.date}.`
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Career Guidance Sessions</h1>
          <p className="text-muted-foreground mt-1">
            Join sessions with industry experts to get advice on your career path
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Recordings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="overflow-hidden border-alumni-100">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Session Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">{session.title}</h3>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-alumni-300 text-white">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <span className="font-medium">{session.host}</span>
                          <span className="text-muted-foreground"> • {session.hostTitle}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-alumni-500" />
                          <span>{session.date} • {session.time}</span>
                        </div>
                        <Badge variant="outline" className="bg-alumni-50">
                          {session.format}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {session.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {session.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="bg-alumni-100">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center space-y-3">
                      <Button 
                        className="bg-alumni-400 hover:bg-alumni-500"
                        onClick={() => handleRegisterSession(session.id)}
                      >
                        Register for Session
                      </Button>
                      <Button variant="outline">Add to Calendar</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pastRecordings.map((recording) => (
                <Card key={recording.id} className="overflow-hidden border-alumni-100">
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-12 w-12 text-alumni-300 opacity-50" />
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge className="bg-black/70 text-white">
                          {recording.duration}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{recording.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {recording.host} • {recording.date}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
                    {recording.views} views
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Career resources section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-alumni-100">
              <CardHeader>
                <CardTitle className="text-lg">Resume Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access successful resume examples from alumni across various industries.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Browse Examples</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-alumni-100">
              <CardHeader>
                <CardTitle className="text-lg">Mock Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Practice your interview skills with alumni volunteers from your target companies.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Schedule a Session</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-alumni-100">
              <CardHeader>
                <CardTitle className="text-lg">Industry Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Detailed guides on breaking into specific industries and roles.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Guides</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
