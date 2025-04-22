
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
}

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
