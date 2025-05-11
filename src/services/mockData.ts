
import { User } from '@/types/user';
import { courses } from '@/data/coursesData';

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
    avatar: '/avatars/sarah.jpg',
    bio: 'Specializing in machine learning and AI applications. Passionate about mentoring new graduates.',
    courses: ['cs101', 'cs201']
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
    avatar: '/avatars/james.jpg',
    bio: 'Working on electric vehicle innovations. Previously taught circuit design at University.',
    courses: ['phys101', 'phys201']
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
    avatar: '/avatars/emily.jpg',
    bio: 'Developing next-generation display technologies. PhD in Optoelectronics.',
    courses: ['phys201', 'math201']
  },
  {
    id: '4',
    name: 'Michael Chang',
    email: 'michael.c@fintech.com',
    role: 'alumni',
    graduationYear: '2018',
    field: 'Mathematics',
    company: 'Bloomberg',
    position: 'Quantitative Analyst',
    bio: 'Applying mathematical models to financial markets. Passionate about data science.',
    courses: ['math101', 'math201']
  },
  {
    id: '5',
    name: 'Dr. Priya Sharma',
    email: 'p.sharma@biotech.org',
    role: 'alumni',
    graduationYear: '2014',
    field: 'Biology',
    company: 'Genentech',
    position: 'Senior Researcher',
    bio: 'Leading research in gene therapy applications. Published in Nature Biotechnology.',
    courses: ['bio101', 'chem101']
  },
  {
    id: '6',
    name: 'Thomas Wright',
    email: 't.wright@education.org',
    role: 'alumni',
    graduationYear: '2016',
    field: 'English',
    company: 'Oxford University Press',
    position: 'Senior Editor',
    bio: 'Specializing in academic publishing and digital learning materials.',
    courses: ['eng101', 'hist101']
  }
];

export const mockStudents: User[] = [
  {
    id: '7',
    name: 'Alex Kumar',
    email: 'alex.k@student.edu',
    role: 'student',
    graduationYear: '2024',
    field: 'Computer Science',
    bio: 'Passionate about app development and AI. Looking for internship opportunities.',
    courses: ['cs101']
  },
  {
    id: '8',
    name: 'Maria Santos',
    email: 'm.santos@student.edu',
    role: 'student',
    graduationYear: '2025',
    field: 'Electronics',
    bio: 'Working on IoT projects. Interested in embedded systems.',
    courses: ['phys101']
  },
  {
    id: '9',
    name: 'John Smith',
    email: 'j.smith@student.edu',
    role: 'student',
    graduationYear: '2024',
    field: 'Electrical Engineering',
    bio: 'Focus on renewable energy systems. Member of the Solar Car team.',
    courses: ['phys201']
  },
  {
    id: '10',
    name: 'Wei Zhang',
    email: 'wei.z@student.edu',
    role: 'student',
    graduationYear: '2026',
    field: 'Mathematics',
    bio: 'Interested in cryptography and data security. Math competition winner.',
    courses: ['math101', 'math201']
  },
  {
    id: '11',
    name: 'Isabella Rodriguez',
    email: 'i.rodriguez@student.edu',
    role: 'student',
    graduationYear: '2025',
    field: 'Biology',
    bio: 'Pre-med student researching neurodegenerative diseases.',
    courses: ['bio101']
  },
  {
    id: '12',
    name: 'Jamal Washington',
    email: 'j.washington@student.edu',
    role: 'student',
    graduationYear: '2024',
    field: 'Chemistry',
    bio: 'Researching sustainable materials. Aspires to work in green chemistry.',
    courses: ['chem101']
  },
  {
    id: '13',
    name: 'Emma Chen',
    email: 'e.chen@student.edu',
    role: 'student',
    graduationYear: '2026',
    field: 'English',
    bio: 'Editor of student literary magazine. Aspiring technical writer.',
    courses: ['eng101']
  },
  {
    id: '14',
    name: 'Omar Patel',
    email: 'o.patel@student.edu',
    role: 'student',
    graduationYear: '2025',
    field: 'History',
    bio: 'Researching digital archives and historical data visualization.',
    courses: ['hist101']
  }
];

export const mockFaculty: User[] = [
  {
    id: '15',
    name: 'Prof. Robert Johnson',
    email: 'r.johnson@faculty.edu',
    role: 'faculty',
    department: 'Computer Science',
    position: 'Department Chair',
    bio: 'Leading research in distributed systems. 20+ years teaching experience.',
    courses: ['cs101', 'cs201']
  },
  {
    id: '16',
    name: 'Dr. Lisa Wong',
    email: 'l.wong@faculty.edu',
    role: 'faculty',
    department: 'Physics',
    position: 'Associate Professor',
    bio: 'Specializing in quantum physics. Lab director for advanced materials.',
    courses: ['phys101', 'phys201']
  },
  {
    id: '17',
    name: 'Prof. David Martinez',
    email: 'd.martinez@faculty.edu',
    role: 'faculty',
    department: 'Mathematics',
    position: 'Professor',
    bio: 'Research focus on applied mathematics and computational modeling.',
    courses: ['math101', 'math201']
  },
  {
    id: '18',
    name: 'Dr. Amara Okafor',
    email: 'a.okafor@faculty.edu',
    role: 'faculty',
    department: 'Biology',
    position: 'Assistant Professor',
    bio: 'Leading research in genomics and molecular biology.',
    courses: ['bio101']
  },
  {
    id: '19',
    name: 'Prof. Henry Wilson',
    email: 'h.wilson@faculty.edu',
    role: 'faculty',
    department: 'Chemistry',
    position: 'Professor Emeritus',
    bio: 'Award-winning educator with focus on organic chemistry.',
    courses: ['chem101']
  },
  {
    id: '20',
    name: 'Dr. Eleanor Brooks',
    email: 'e.brooks@faculty.edu',
    role: 'faculty',
    department: 'English',
    position: 'Associate Professor',
    bio: 'Specializing in technical communication and digital rhetoric.',
    courses: ['eng101']
  },
  {
    id: '21',
    name: 'Prof. Carlos Rivera',
    email: 'c.rivera@faculty.edu',
    role: 'faculty',
    department: 'History',
    position: 'Professor',
    bio: 'Expert in digital humanities and computational history methods.',
    courses: ['hist101']
  }
];

export const getRecommendedAlumni = (studentField: string) => {
  return mockAlumni.filter(alumni => alumni.field === studentField);
};

export const getRecommendedCourses = (field: string) => {
  const fieldCourses = courses.filter(course => course.department === field);
  return fieldCourses.slice(0, 3); // Return top 3 recommended courses
};

export const getRelatedFaculty = (courseIds: string[]) => {
  if (!courseIds || courseIds.length === 0) return [];
  return mockFaculty.filter(faculty => 
    faculty.courses?.some(course => courseIds.includes(course))
  );
};

