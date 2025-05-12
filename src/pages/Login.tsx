
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/user";
import { getAllUsers } from "@/services/mockData";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setUser } = useUser();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Get the return URL from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    
    // Try to find the user in our mock data
    const users = getAllUsers();
    const foundUser = users.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.role === selectedRole
    );
    
    setTimeout(() => {
      if (foundUser) {
        // User found in CSV data, use their data
        setUser({
          ...foundUser,
          // Convert courses from string[] to string if it exists
          courses: foundUser.courses ? foundUser.courses : undefined
        });
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userData", JSON.stringify(foundUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        
        // Redirect to the page they were trying to access or dashboard
        navigate(from, { replace: true });
      } else {
        // Create mock user if not found
        const mockUser = {
          id: "user-" + Math.random().toString(36).substring(2, 9),
          name: email.split('@')[0],
          email: email,
          role: selectedRole,
          graduationYear: selectedRole === 'student' ? '2025' : selectedRole === 'alumni' ? '2020' : undefined,
          field: selectedRole !== 'faculty' ? 'Computer Science' : undefined,
          company: selectedRole === 'alumni' ? 'Tech Corp' : undefined,
          position: selectedRole === 'alumni' ? 'Software Engineer' : undefined,
          department: selectedRole === 'faculty' ? 'Computer Science Department' : undefined,
          bio: `This is a demo ${selectedRole} account.`
        };
        
        setUser(mockUser);
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userData", JSON.stringify(mockUser));
        
        toast({
          title: "Login successful",
          description: `Welcome, ${mockUser.name}! (Demo account)`,
        });
        
        navigate(from, { replace: true });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container max-w-md mx-auto">
          <Card className="border-accent/50 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-primary">Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="alumni">Alumni</TabsTrigger>
                  <TabsTrigger value="faculty">Faculty</TabsTrigger>
                </TabsList>
                
                <TabsContent value="student">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email-student">Email</Label>
                      <Input
                        id="email-student"
                        type="email"
                        placeholder="student@example.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Try using any student email from the data, e.g. "alex.k@student.edu"
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-student">Password</Label>
                        <Link
                          to="/forgot-password"
                          className="text-xs font-medium text-academic-600 hover:text-academic-800"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password-student"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Any password will work for demo purposes
                      </p>
                    </div>
                    <Button
                      type="submit"
                      variant="bright"
                      className="w-full py-2 text-base shadow-md bg-blue-500 hover:bg-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In as Student"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="alumni">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email-alumni">Email</Label>
                      <Input
                        id="email-alumni"
                        type="email"
                        placeholder="alumni@example.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Try using any alumni email from the data, e.g. "sarah.chen@alumni.edu"
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-alumni">Password</Label>
                        <Link
                          to="/forgot-password"
                          className="text-xs font-medium text-academic-600 hover:text-academic-800"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password-alumni"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Any password will work for demo purposes
                      </p>
                    </div>
                    <Button
                      type="submit"
                      variant="bright"
                      className="w-full py-2 text-base shadow-md bg-green-500 hover:bg-green-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In as Alumni"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="faculty">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email-faculty">Email</Label>
                      <Input
                        id="email-faculty"
                        type="email"
                        placeholder="faculty@example.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Try using any faculty email from the data, e.g. "r.johnson@faculty.edu"
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-faculty">Password</Label>
                        <Link
                          to="/forgot-password"
                          className="text-xs font-medium text-academic-600 hover:text-academic-800"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password-faculty"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Any password will work for demo purposes
                      </p>
                    </div>
                    <Button
                      type="submit"
                      variant="bright"
                      className="w-full py-2 text-base shadow-md bg-purple-500 hover:bg-purple-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In as Faculty"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-academic-600 hover:text-academic-800 font-medium">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
