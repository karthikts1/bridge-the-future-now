
export interface Course {
  id: string;
  name: string;
  department: string;
  code: string;
  description?: string;
}

export const courses: Course[] = [
  {
    id: "cs101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    code: "CS101",
    description: "Fundamental concepts of programming and computer science"
  },
  {
    id: "cs201",
    name: "Data Structures and Algorithms",
    department: "Computer Science",
    code: "CS201",
    description: "Study of common data structures and algorithms"
  },
  {
    id: "math101",
    name: "Calculus I",
    department: "Mathematics",
    code: "MATH101",
    description: "Introduction to differential and integral calculus"
  },
  {
    id: "math201",
    name: "Linear Algebra",
    department: "Mathematics",
    code: "MATH201",
    description: "Study of vector spaces and linear transformations"
  },
  {
    id: "phys101",
    name: "Physics I",
    department: "Physics",
    code: "PHYS101",
    description: "Introduction to mechanics and thermodynamics"
  },
  {
    id: "phys201",
    name: "Electricity and Magnetism",
    department: "Physics",
    code: "PHYS201",
    description: "Study of electromagnetic phenomena"
  },
  {
    id: "bio101",
    name: "Introduction to Biology",
    department: "Biology",
    code: "BIO101",
    description: "Fundamentals of biological systems"
  },
  {
    id: "chem101",
    name: "General Chemistry",
    department: "Chemistry",
    code: "CHEM101",
    description: "Basic principles of chemistry"
  },
  {
    id: "eng101",
    name: "English Composition",
    department: "English",
    code: "ENG101",
    description: "Fundamentals of writing and rhetoric"
  },
  {
    id: "hist101",
    name: "World History",
    department: "History",
    code: "HIST101",
    description: "Survey of global historical developments"
  }
];

export const getDepartments = (): string[] => {
  const departments = new Set(courses.map(course => course.department));
  return Array.from(departments);
};

export const getCoursesByDepartment = (department: string): Course[] => {
  return courses.filter(course => course.department === department);
};
