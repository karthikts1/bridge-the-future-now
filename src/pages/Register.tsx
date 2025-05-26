
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useUser } from "@/contexts/UserContext";
import { UserRole, User } from "@/types/user";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<UserRole | "">("");
  const [graduationYear, setGraduationYear] = useState("");
  const [field, setField] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [careerGoals, setCareerGoals] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!userType) {
      setError("Please select a user type");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Create new user based on registration
    const newUser: User = {
      id: "user-" + Math.random().toString(36).substring(2, 9),
      name: fullName,
      email: email,
      role: userType as UserRole,
      graduationYear: userType !== 'faculty' ? graduationYear : undefined,
      field: field || undefined,
      company: userType === 'alumni' ? company : undefined,
      position: userType === 'alumni' ? position : undefined,
      department: userType === 'faculty' ? `Department of ${field}` : undefined,
      skills: skills ? skills.split(',').map(s => s.trim()) : undefined,
      interests: interests ? interests.split(',').map(i => i.trim()) : undefined,
      careerGoals: careerGoals || undefined,
      industry: industry || undefined,
      location: location || undefined,
      specialization: specialization || undefined,
      experienceYears: userType === 'alumni' && experienceYears ? parseInt(experienceYears) : undefined,
    };
    
    // Set user in context
    setUser(newUser);
    
    // Save registered user in localStorage
    const registeredUsersString = localStorage.getItem("registeredUsers");
    let registeredUsers: User[] = [];
    
    if (registeredUsersString) {
      try {
        registeredUsers = JSON.parse(registeredUsersString);
      } catch (error) {
        console.error("Failed to parse registered users:", error);
      }
    }
    
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    toast({
      title: "Registration successful",
      description: `Welcome to AlumniConnect, ${fullName}!`,
    });
    
    setIsLoading(false);
    navigate("/dashboard");
  };

  // Generate year options: current year to 30 years ago
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const fieldOptions = [
    "Computer Science", "Electrical Engineering", "Electronics", "Mathematics", 
    "Biology", "Chemistry", "Physics", "English", "History", "Business", 
    "Psychology", "Economics", "Mechanical Engineering", "Civil Engineering"
  ];

  const industryOptions = [
    "Technology", "Healthcare", "Finance", "Education", "Automotive", 
    "Aerospace", "Biotechnology", "Energy", "Entertainment", "Consulting",
    "Government", "Non-profit", "Manufacturing", "Retail"
  ];

  const locationOptions = [
    "California", "New York", "Texas", "Florida", "Washington", "Illinois",
    "Massachusetts", "Colorado", "Oregon", "North Carolina", "Virginia",
    "Georgia", "Pennsylvania", "Ohio", "Michigan", "Other"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container max-w-2xl mx-auto">
          <Card className="border-accent/50 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-primary">Register</CardTitle>
              <CardDescription className="text-center">
                Create an account to connect with alumni and students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                    {error}
                  </div>
                )}
                
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userType">I am a</Label>
                    <Select 
                      value={userType} 
                      onValueChange={(value: string) => setUserType(value as UserRole)} 
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Current Student</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                        <SelectItem value="faculty">Faculty Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(userType === 'student' || userType === 'alumni') && (
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Graduation Year</Label>
                      <Select 
                        value={graduationYear} 
                        onValueChange={setGraduationYear} 
                        required={userType === 'student' || userType === 'alumni'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {yearOptions.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                          <SelectItem value="future">Still Studying</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Academic/Professional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="field">Field of Study</Label>
                    <Select value={field} onValueChange={setField} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      type="text"
                      placeholder="e.g., Machine Learning, Robotics"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                    />
                  </div>
                </div>

                {/* Skills and Interests */}
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    type="text"
                    placeholder="e.g., Python, JavaScript, Machine Learning, Research"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Input
                    id="interests"
                    type="text"
                    placeholder="e.g., AI, Sustainability, Innovation, Teaching"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="careerGoals">Career Goals</Label>
                  <Textarea
                    id="careerGoals"
                    placeholder="Describe your career aspirations and goals..."
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Location and Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Preferred Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Alumni-specific fields */}
                {userType === 'alumni' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Current Company</Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder="e.g., Google, Microsoft"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          type="text"
                          placeholder="e.g., Software Engineer, Manager"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experienceYears">Years of Experience</Label>
                      <Input
                        id="experienceYears"
                        type="number"
                        placeholder="e.g., 5"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        min="0"
                        max="50"
                      />
                    </div>
                  </>
                )}

                {/* Password fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="bright"
                  className="w-full shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-academic-500 hover:text-academic-600 font-medium">
                  Sign in
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
