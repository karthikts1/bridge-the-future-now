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
import { MultiSelect } from "@/components/ui/multi-select";
import {
  skillsOptions,
  interestsOptions,
  industryOptions,
  locationOptions,
  mentorshipInterestsOptions,
  certificationsOptions,
  languagesOptions,
  networkingGoalsOptions,
  salaryRangeOptions
} from "@/data/profileOptions";
import { User as UserType } from "@/types/user";

// Add more predefined options for better data consistency
const fieldOfStudyOptions = [
  "Computer Science", "Engineering", "Business Administration", "Mathematics", 
  "Data Science", "Information Technology", "Electrical Engineering", 
  "Mechanical Engineering", "Civil Engineering", "Chemical Engineering",
  "Economics", "Finance", "Marketing", "Management", "Accounting",
  "Biology", "Chemistry", "Physics", "Psychology", "Sociology"
];

const specializationOptions = [
  "Software Engineering", "Data Science", "Machine Learning", "Artificial Intelligence",
  "Cybersecurity", "Web Development", "Mobile Development", "Cloud Computing",
  "DevOps", "UI/UX Design", "Product Management", "Digital Marketing",
  "Business Analytics", "Financial Analysis", "Project Management",
  "Research and Development", "Quality Assurance", "Systems Administration"
];

const departmentOptions = [
  "Computer Science", "Engineering", "Business", "Mathematics", "Science",
  "Liberal Arts", "Medicine", "Law", "Education", "Architecture",
  "Design", "Communications", "Economics", "Psychology", "Sociology"
];

const companyOptions = [
  "Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix", "Tesla",
  "IBM", "Oracle", "Salesforce", "Adobe", "Intel", "NVIDIA", "Uber",
  "Airbnb", "Spotify", "Twitter", "LinkedIn", "Snapchat", "TikTok",
  "Startup", "Consulting Firm", "Government", "Non-profit", "Other"
];

const positionOptions = [
  "Software Engineer", "Senior Software Engineer", "Lead Engineer", "Engineering Manager",
  "Data Scientist", "Data Analyst", "Machine Learning Engineer", "DevOps Engineer",
  "Product Manager", "Project Manager", "UI/UX Designer", "Full Stack Developer",
  "Frontend Developer", "Backend Developer", "Mobile Developer", "QA Engineer",
  "Business Analyst", "Marketing Manager", "Sales Representative", "Consultant",
  "Research Scientist", "Technical Lead", "CTO", "CEO", "Founder", "Other"
];

export default function Profile() {
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>(user?.courses || []);

  // Form state - keep existing form data structure and add new fields
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    position: user?.position || "",
    company: user?.company || "",
    department: user?.department || "",
    graduationYear: user?.graduationYear || "",
    field: user?.field || "",
    industry: user?.industry || "",
    location: user?.location || "",
    specialization: user?.specialization || "",
    careerGoals: user?.careerGoals || "",
    linkedinProfile: user?.linkedinProfile || "",
    githubProfile: user?.githubProfile || "",
    portfolioUrl: user?.portfolioUrl || "",
    preferredWorkType: user?.preferredWorkType || "",
    salaryRange: user?.salaryRange || "",
    workingHours: user?.workingHours || "",
    careerStage: user?.careerStage || "",
    availability: user?.availability || "",
    experienceYears: user?.experienceYears || 0
  });

  // Multi-select state
  const [selectedSkills, setSelectedSkills] = useState<string[]>(user?.skills || []);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user?.interests || []);
  const [selectedMentorshipInterests, setSelectedMentorshipInterests] = useState<string[]>(user?.mentorshipInterests || []);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>(user?.certifications || []);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(user?.languages || []);
  const [selectedNetworkingGoals, setSelectedNetworkingGoals] = useState<string[]>(user?.networkingGoals || []);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(user?.projectsWorkedOn || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
    
    // Update user context with all data including multi-select values
    const updatedUser: UserType = {
      ...user!,
      ...formData,
      // Properly type the union type fields
      preferredWorkType: formData.preferredWorkType as UserType['preferredWorkType'],
      workingHours: formData.workingHours as UserType['workingHours'],
      careerStage: formData.careerStage as UserType['careerStage'],
      courses: selectedCourses,
      skills: selectedSkills,
      interests: selectedInterests,
      mentorshipInterests: selectedMentorshipInterests,
      certifications: selectedCertifications,
      languages: selectedLanguages,
      networkingGoals: selectedNetworkingGoals,
      projectsWorkedOn: selectedProjects
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
          {/* Profile summary card - keep existing code */}
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
                    {/* Basic Information */}
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

                    {/* Location and Industry */}
                    {(user?.role === 'student' || user?.role === 'alumni') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Select
                            disabled={!isEditing}
                            value={formData.location}
                            onValueChange={(value) => handleSelectChange('location', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              {locationOptions.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Preferred Industry</Label>
                          <Select
                            disabled={!isEditing}
                            value={formData.industry}
                            onValueChange={(value) => handleSelectChange('industry', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {industryOptions.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    <Separator className="my-4" />
                    
                    {/* Role-specific fields with dropdown menus */}
                    {user?.role === 'alumni' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="position">Current Position</Label>
                            <Select
                              disabled={!isEditing}
                              value={formData.position}
                              onValueChange={(value) => handleSelectChange('position', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent>
                                {positionOptions.map((position) => (
                                  <SelectItem key={position} value={position}>
                                    {position}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Select
                              disabled={!isEditing}
                              value={formData.company}
                              onValueChange={(value) => handleSelectChange('company', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select company" />
                              </SelectTrigger>
                              <SelectContent>
                                {companyOptions.map((company) => (
                                  <SelectItem key={company} value={company}>
                                    {company}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="experienceYears">Years of Experience</Label>
                            <Select
                              disabled={!isEditing}
                              value={formData.experienceYears?.toString() || ""}
                              onValueChange={(value) => handleSelectChange('experienceYears', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 31 }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {i} {i === 1 ? 'year' : 'years'}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="careerStage">Career Stage</Label>
                            <Select
                              disabled={!isEditing}
                              value={formData.careerStage}
                              onValueChange={(value) => handleSelectChange('careerStage', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select career stage" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="entry-level">Entry Level</SelectItem>
                                <SelectItem value="mid-level">Mid Level</SelectItem>
                                <SelectItem value="senior-level">Senior Level</SelectItem>
                                <SelectItem value="executive">Executive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="salaryRange">Salary Range</Label>
                          <Select
                            disabled={!isEditing}
                            value={formData.salaryRange}
                            onValueChange={(value) => handleSelectChange('salaryRange', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select salary range" />
                            </SelectTrigger>
                            <SelectContent>
                              {salaryRangeOptions.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    
                    {user?.role === 'faculty' && (
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          disabled={!isEditing}
                          value={formData.department}
                          onValueChange={(value) => handleSelectChange('department', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentOptions.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {(user?.role === 'student' || user?.role === 'alumni') && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="field">Field of Study</Label>
                            <Select
                              disabled={!isEditing}
                              value={formData.field}
                              onValueChange={(value) => handleSelectChange('field', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select field of study" />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldOfStudyOptions.map((field) => (
                                  <SelectItem key={field} value={field}>
                                    {field}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="graduationYear">Graduation Year</Label>
                            <Select
                              disabled={!isEditing}
                              value={formData.graduationYear}
                              onValueChange={(value) => handleSelectChange('graduationYear', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select graduation year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 20 }, (_, i) => {
                                  const year = new Date().getFullYear() - 10 + i;
                                  return (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Select
                            disabled={!isEditing}
                            value={formData.specialization}
                            onValueChange={(value) => handleSelectChange('specialization', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                            <SelectContent>
                              {specializationOptions.map((spec) => (
                                <SelectItem key={spec} value={spec}>
                                  {spec}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="careerGoals">Career Goals</Label>
                          <Textarea
                            id="careerGoals"
                            name="careerGoals"
                            value={formData.careerGoals || ""}
                            onChange={handleChange}
                            placeholder="Describe your career aspirations..."
                            disabled={!isEditing}
                            className="resize-none h-20"
                          />
                        </div>

                        {user?.role === 'student' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="preferredWorkType">Preferred Work Type</Label>
                              <Select
                                disabled={!isEditing}
                                value={formData.preferredWorkType}
                                onValueChange={(value) => handleSelectChange('preferredWorkType', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select work type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="remote">Remote</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                  <SelectItem value="onsite">On-site</SelectItem>
                                  <SelectItem value="flexible">Flexible</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="workingHours">Working Hours Preference</Label>
                              <Select
                                disabled={!isEditing}
                                value={formData.workingHours}
                                onValueChange={(value) => handleSelectChange('workingHours', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select working hours" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="full-time">Full-time</SelectItem>
                                  <SelectItem value="part-time">Part-time</SelectItem>
                                  <SelectItem value="contract">Contract</SelectItem>
                                  <SelectItem value="internship">Internship</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Skills and Interests for Students and Alumni */}
                    {(user?.role === 'student' || user?.role === 'alumni') && (
                      <>
                        <Separator className="my-4" />
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Skills</Label>
                            <MultiSelect
                              options={skillsOptions}
                              selected={selectedSkills}
                              onChange={setSelectedSkills}
                              placeholder="Select your skills..."
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Interests</Label>
                            <MultiSelect
                              options={interestsOptions}
                              selected={selectedInterests}
                              onChange={setSelectedInterests}
                              placeholder="Select your interests..."
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Mentorship Interests</Label>
                            <MultiSelect
                              options={mentorshipInterestsOptions}
                              selected={selectedMentorshipInterests}
                              onChange={setSelectedMentorshipInterests}
                              placeholder={user?.role === 'student' ? "What you'd like to learn..." : "What you'd like to mentor..."}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Certifications</Label>
                            <MultiSelect
                              options={certificationsOptions}
                              selected={selectedCertifications}
                              onChange={setSelectedCertifications}
                              placeholder="Select your certifications..."
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Languages</Label>
                            <MultiSelect
                              options={languagesOptions}
                              selected={selectedLanguages}
                              onChange={setSelectedLanguages}
                              placeholder="Select languages you speak..."
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Networking Goals</Label>
                            <MultiSelect
                              options={networkingGoalsOptions}
                              selected={selectedNetworkingGoals}
                              onChange={setSelectedNetworkingGoals}
                              placeholder="What are you looking to achieve through networking..."
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        {/* Professional Links */}
                        <Separator className="my-4" />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Professional Links</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                              <Input
                                id="linkedinProfile"
                                name="linkedinProfile"
                                value={formData.linkedinProfile || ""}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/yourprofile"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="githubProfile">GitHub Profile</Label>
                              <Input
                                id="githubProfile"
                                name="githubProfile"
                                value={formData.githubProfile || ""}
                                onChange={handleChange}
                                placeholder="https://github.com/yourusername"
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                            <Input
                              id="portfolioUrl"
                              name="portfolioUrl"
                              value={formData.portfolioUrl || ""}
                              onChange={handleChange}
                              placeholder="https://yourportfolio.com"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        {user?.role === 'alumni' && (
                          <div className="space-y-2">
                            <Label htmlFor="availability">Mentorship Availability</Label>
                            <Textarea
                              id="availability"
                              name="availability"
                              value={formData.availability || ""}
                              onChange={handleChange}
                              placeholder="e.g., Available weekends, 2 hours/week, etc."
                              disabled={!isEditing}
                              className="resize-none h-16"
                            />
                          </div>
                        )}
                      </>
                    )}

                    {/* Course selection section - keep existing course selection logic */}
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

                    {/* Show enrolled courses when not editing - keep existing logic */}
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
