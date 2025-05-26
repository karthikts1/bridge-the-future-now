
import { User } from '@/types/user';
import { courses } from '@/data/coursesData';
import alumniCSV from '@/data/alumni.csv?raw';
import studentsCSV from '@/data/students.csv?raw';
import facultyCSV from '@/data/faculty.csv?raw';

// Enhanced CSV parsing function
const parseCSV = (csv: string): any[] => {
  const lines = csv.trim().split('\n');
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',');
  
  return lines.slice(1).filter(line => line.trim()).map(line => {
    // Handle comma-separated values while preserving commas within quoted fields
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Add the last value
    
    const entry: any = {};
    
    headers.forEach((header, index) => {
      let value = values[index] || '';
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Handle special cases
      if (header === 'courses' || header === 'skills' || header === 'interests') {
        entry[header] = value ? value.split('|').map(item => item.trim()) : [];
      } else if (header === 'experienceYears') {
        entry[header] = value ? parseInt(value) : undefined;
      } else if (value === '') {
        entry[header] = undefined;
      } else {
        entry[header] = value;
      }
    });
    
    return entry;
  });
};

export const mockAlumni: User[] = parseCSV(alumniCSV);
export const mockStudents: User[] = parseCSV(studentsCSV);
export const mockFaculty: User[] = parseCSV(facultyCSV);

// Store all users in localStorage for access in other components
const allUsers = [...mockAlumni, ...mockStudents, ...mockFaculty];
localStorage.setItem('allUsers', JSON.stringify(allUsers));

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

// New helper functions for enhanced data access
export const getAllUsers = (): User[] => {
  return [...mockAlumni, ...mockStudents, ...mockFaculty];
};

export const getUserById = (id: string): User | undefined => {
  return getAllUsers().find(user => user.id === id);
};

export const getUsersByField = (field: string): User[] => {
  return getAllUsers().filter(user => user.field === field);
};

export const getAlumniByCompany = (company: string): User[] => {
  return mockAlumni.filter(alumni => alumni.company?.toLowerCase().includes(company.toLowerCase()));
};

export const getFacultyByDepartment = (department: string): User[] => {
  return mockFaculty.filter(faculty => faculty.department?.toLowerCase() === department.toLowerCase());
};

// Initialize empty messages array in localStorage if it doesn't exist
if (!localStorage.getItem('messages')) {
  localStorage.setItem('messages', JSON.stringify([]));
}
