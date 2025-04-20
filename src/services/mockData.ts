
import { User } from '@/types/user';

export const mockAlumni: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@alumni.edu',
    role: 'alumni',
    graduationYear: '2015',
    field: 'Computer Science',
    company: 'Google',
    position: 'Senior Software Engineer',
    avatar: '/avatars/sarah.jpg'
  },
  {
    id: '2',
    name: 'Prof. James Wilson',
    email: 'j.wilson@research.edu',
    role: 'alumni',
    graduationYear: '2010',
    field: 'Electrical Engineering',
    company: 'Tesla',
    position: 'Lead Engineer',
    avatar: '/avatars/james.jpg'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'e.rodriguez@tech.com',
    role: 'alumni',
    graduationYear: '2012',
    field: 'Electronics',
    company: 'Apple',
    position: 'Research Scientist',
    avatar: '/avatars/emily.jpg'
  }
];

export const mockStudents: User[] = [
  {
    id: '4',
    name: 'Alex Kumar',
    email: 'alex.k@student.edu',
    role: 'student',
    graduationYear: '2024',
    field: 'Computer Science',
  },
  {
    id: '5',
    name: 'Maria Santos',
    email: 'm.santos@student.edu',
    role: 'student',
    graduationYear: '2025',
    field: 'Electronics',
  },
  {
    id: '6',
    name: 'John Smith',
    email: 'j.smith@student.edu',
    role: 'student',
    graduationYear: '2024',
    field: 'Electrical Engineering',
  }
];

export const getRecommendedAlumni = (studentField: string) => {
  return mockAlumni.filter(alumni => alumni.field === studentField);
};
