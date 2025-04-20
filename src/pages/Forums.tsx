
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { MessageSquare, Plus, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock forum data
const mockForums = [
  {
    id: "1",
    title: "Networking tips for new graduates",
    author: "Alex Johnson",
    date: "2 days ago",
    replies: 12,
    views: 234,
    lastReply: "1 hour ago"
  },
  {
    id: "2",
    title: "Transitioning from academia to industry",
    author: "Sarah Williams",
    date: "3 days ago",
    replies: 8,
    views: 156,
    lastReply: "5 hours ago"
  },
  {
    id: "3",
    title: "Job opportunities in tech startups",
    author: "Michael Chen",
    date: "1 week ago",
    replies: 21,
    views: 345,
    lastReply: "2 days ago"
  },
  {
    id: "4",
    title: "Graduate school application advice",
    author: "Emma Thompson",
    date: "2 weeks ago",
    replies: 15,
    views: 210,
    lastReply: "3 days ago"
  }
];

export default function Forums() {
  const [forumTitle, setForumTitle] = useState("");
  const [forumContent, setForumContent] = useState("");
  const [showNewForumDialog, setShowNewForumDialog] = useState(false);
  const { toast } = useToast();

  const handleCreateForum = () => {
    if (forumTitle.trim() === "" || forumContent.trim() === "") {
      toast({
        title: "Cannot create forum",
        description: "Please provide both a title and content for your forum post.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send data to a backend
    toast({
      title: "Forum post created!",
      description: "Your discussion has been posted successfully."
    });
    
    // Reset form and close dialog
    setForumTitle("");
    setForumContent("");
    setShowNewForumDialog(false);
  };

  const initiateDM = (forumId: string) => {
    const forum = mockForums.find(f => f.id === forumId);
    toast({
      title: "Private message initiated",
      description: `You can now chat privately with ${forum?.author}.`
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Discussion Forums</h1>
            <p className="text-muted-foreground mt-1">
              Engage in conversations with alumni and students
            </p>
          </div>
          <Dialog open={showNewForumDialog} onOpenChange={setShowNewForumDialog}>
            <DialogTrigger asChild>
              <Button className="bg-alumni-400 hover:bg-alumni-500">
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Discussion</DialogTitle>
                <DialogDescription>
                  Start a new discussion thread for the alumni community.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter discussion title"
                    value={forumTitle}
                    onChange={(e) => setForumTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Write your discussion content here..."
                    rows={5}
                    value={forumContent}
                    onChange={(e) => setForumContent(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewForumDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-alumni-400 hover:bg-alumni-500"
                  onClick={handleCreateForum}
                >
                  Create Discussion
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Forum Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-alumni-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Academic Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discussions about academic experiences, courses, and research opportunities.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Browse Topics
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-alumni-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Career Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conversations about career paths, job opportunities, and industry insights.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Browse Topics
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-alumni-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Campus Life</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discussions about campus events, activities, and student life experiences.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Browse Topics
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Discussions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Discussions</h2>
          <div className="space-y-4">
            {mockForums.map((forum) => (
              <Card key={forum.id} className="hover:border-alumni-200 transition-colors">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-alumni-300 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium hover:text-alumni-500 transition-colors">
                          {forum.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Posted by {forum.author} • {forum.date}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => initiateDM(forum.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Send private message</span>
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {forum.replies} replies
                    </div>
                    <div>
                      {forum.views} views
                    </div>
                    <div>
                      Last reply {forum.lastReply}
                    </div>
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
