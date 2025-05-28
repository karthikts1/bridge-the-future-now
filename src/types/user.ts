
import { Dispatch, SetStateAction } from "react";

export type UserRole = 'student' | 'alumni' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  graduationYear?: string;
  field?: string;
  company?: string;
  position?: string;
  department?: string;
  bio?: string;
  courses?: string[]; // Array of course IDs
  skills?: string[]; // Array of skills
  interests?: string[]; // Array of interests
  careerGoals?: string; // Career aspirations
  industry?: string; // Preferred industry
  location?: string; // Geographic location
  experienceYears?: number; // Years of experience (for alumni)
  specialization?: string; // Area of specialization
  // New fields for enhanced recommendations
  linkedinProfile?: string;
  githubProfile?: string;
  portfolioUrl?: string;
  preferredWorkType?: 'remote' | 'hybrid' | 'onsite' | 'flexible';
  salaryRange?: string;
  workingHours?: 'full-time' | 'part-time' | 'contract' | 'internship';
  mentorshipInterests?: string[]; // What they want to learn/teach
  projectsWorkedOn?: string[];
  certifications?: string[];
  languages?: string[]; // Programming/spoken languages
  careerStage?: 'entry-level' | 'mid-level' | 'senior-level' | 'executive';
  networkingGoals?: string[];
  availability?: string; // For mentorship
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  encrypted?: boolean; // Flag to indicate if message is encrypted
}

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
