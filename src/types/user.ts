export type UserRole = 'student' | 'alumni' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  graduationYear: string;
  field: string;
  company?: string;
  position?: string;
  avatar?: string;
  department?: string; // For faculty
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
