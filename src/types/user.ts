
export type UserRole = 'student' | 'alumni';

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
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
