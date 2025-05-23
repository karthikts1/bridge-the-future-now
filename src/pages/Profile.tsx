
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { User, Briefcase, GraduationCap, Building, BookOpen } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectLabel,
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { courses, getDepartments, getCoursesByDepartment } from "@/data/coursesData";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>(user?.courses || []);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    position: user?.position || "",
    company: user?.company || "",
    department: user?.department || "",
    graduationYear: user?.graduationYear || "",
    field: user?.field || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseSelect = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(prev => prev.filter(id => id !== courseId));
    } else {
      setSelectedCourses(prev => [...prev, courseId]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user context
    const updatedUser = {
      ...user!,
      ...formData,
      courses: selectedCourses
    };
    
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const getCourseNameById = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? `${course.code}: ${course.name}` : "";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your profile information
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile summary card */}
          <Card className="w-full lg:w-1/3 border-alumni-100">
            <CardHeader className="pb-2">
              <CardTitle>Profile Summary</CardTitle>
              <CardDescription>Your public profile information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center pt-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" />
                <AvatarFallback className="bg-alumni-400 text-white text-xl">
                  {user?.name?.charAt(0) || <User className="h-6 w-6" />}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize bg-alumni-100 text-alumni-500 mb-4">
                {user?.role}
              </div>

              {!isEditing && (
                <>
                  <div className="w-full space-y-2 mt-4">
                    {user?.role === 'alumni' && (
                      <>
                        <div className="flex items-center text-sm">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{user?.position} at {user?.company}</span>
                        </div>
                      </>
                    )}
                    
                    {user?.role === 'faculty' && (
                      <>
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{user?.department}</span>
                        </div>
                      </>
                    )}
                    
                    {(user?.role === 'student' || user?.role === 'alumni') && (
                      <>
                        <div className="flex items-center text-sm">
                          <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{user?.field} • Class of {user?.graduationYear}</span>
                        </div>
                      </>
                    )}

                    {user?.courses && user.courses.length > 0 && (
                      <div className="flex flex-col items-center text-sm mt-4">
                        <div className="flex items-center mb-2">
                          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Enrolled Courses</span>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {user.courses.slice(0, 3).map(courseId => (
                            <Badge key={courseId} variant="outline" className="text-xs">
                              {courses.find(c => c.id === courseId)?.code || courseId}
                            </Badge>
                          ))}
                          {user.courses.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.courses.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="mt-6 bg-alumni-400 hover:bg-alumni-500"
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Edit profile form */}
          <div className="w-full lg:w-2/3">
            <Card className="border-alumni-100">
              <CardHeader>
                <CardTitle>{isEditing ? "Edit Profile" : "Profile Details"}</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Update your profile information below" 
                    : "Your detailed profile information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio || ""}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        disabled={!isEditing}
                        className="resize-none h-24"
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {/* Role-specific fields */}
                    {user?.role === 'alumni' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="position">Current Position</Label>
                          <Input
                            id="position"
                            name="position"
                            value={formData.position || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    )}
                    
                    {user?.role === 'faculty' && (
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          name="department"
                          value={formData.department || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    )}
                    
                    {(user?.role === 'student' || user?.role === 'alumni') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="field">Field of Study</Label>
                          <Input
                            id="field"
                            name="field"
                            value={formData.field || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="graduationYear">Graduation Year</Label>
                          <Input
                            id="graduationYear"
                            name="graduationYear"
                            value={formData.graduationYear || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    )}

                    {/* Course selection section */}
                    {(user?.role === 'student' || user?.role === 'alumni') && isEditing && (
                      <>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="courseDepartment">Course Department</Label>
                            <Select
                              disabled={!isEditing}
                              value={selectedDepartment}
                              onValueChange={setSelectedDepartment}
                            >
                              <SelectTrigger id="courseDepartment" className="w-full">
                                <SelectValue placeholder="Select a department" />
                              </SelectTrigger>
                              <SelectContent>
                                {getDepartments().map((dept) => (
                                  <SelectItem key={dept} value={dept}>
                                    {dept}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {selectedDepartment && (
                            <div className="space-y-2">
                              <Label>Available Courses</Label>
                              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto border rounded-md p-2">
                                {getCoursesByDepartment(selectedDepartment).map((course) => (
                                  <div 
                                    key={course.id} 
                                    className={`p-2 rounded-md cursor-pointer ${
                                      selectedCourses.includes(course.id)
                                        ? "bg-primary/20 border-primary border"
                                        : "border hover:bg-accent"
                                    }`}
                                    onClick={() => handleCourseSelect(course.id)}
                                  >
                                    <div className="font-medium">{course.code}: {course.name}</div>
                                    {course.description && (
                                      <div className="text-xs text-muted-foreground mt-1">{course.description}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {selectedCourses.length > 0 && (
                            <div className="space-y-2">
                              <Label>Selected Courses</Label>
                              <div className="flex flex-wrap gap-2">
                                {selectedCourses.map(courseId => (
                                  <Badge 
                                    key={courseId} 
                                    variant="secondary"
                                    className="group cursor-pointer"
                                    onClick={() => isEditing && handleCourseSelect(courseId)}
                                  >
                                    {getCourseNameById(courseId)}
                                    {isEditing && <span className="ml-1 group-hover:text-destructive">×</span>}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Show enrolled courses when not editing */}
                    {(user?.role === 'student' || user?.role === 'alumni') && !isEditing && user?.courses && user.courses.length > 0 && (
                      <>
                        <Separator className="my-4" />
                        <div className="space-y-2">
                          <Label>Enrolled Courses</Label>
                          <div className="flex flex-wrap gap-2">
                            {user.courses.map(courseId => (
                              <Badge 
                                key={courseId} 
                                variant="secondary"
                              >
                                {getCourseNameById(courseId)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-alumni-400 hover:bg-alumni-500"
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
