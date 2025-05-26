
import { User } from '@/types/user';

// Convert user profile to a feature vector for similarity calculation
export const userToFeatureVector = (user: User, allUsers: User[]): number[] => {
  const features: number[] = [];
  
  // Field similarity (one-hot encoding for different fields)
  const allFields = [...new Set(allUsers.map(u => u.field).filter(Boolean))];
  allFields.forEach(field => {
    features.push(user.field === field ? 1 : 0);
  });
  
  // Graduation year similarity (normalized)
  if (user.graduationYear && user.graduationYear !== 'future') {
    const gradYear = parseInt(user.graduationYear);
    const currentYear = new Date().getFullYear();
    const normalizedYear = (gradYear - (currentYear - 20)) / 20; // Normalize to roughly 0-1 range
    features.push(normalizedYear);
  } else {
    features.push(0);
  }
  
  // Company similarity (if alumni)
  if (user.role === 'alumni') {
    const allCompanies = [...new Set(allUsers.filter(u => u.role === 'alumni').map(u => u.company).filter(Boolean))];
    allCompanies.forEach(company => {
      features.push(user.company === company ? 1 : 0);
    });
  }
  
  // Course overlap (for students and faculty)
  if (user.courses && user.courses.length > 0) {
    const allCourses = [...new Set(allUsers.flatMap(u => u.courses || []))];
    allCourses.forEach(course => {
      features.push(user.courses?.includes(course) ? 1 : 0);
    });
  }
  
  return features;
};

// Calculate cosine similarity between two vectors
export const cosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
  if (vectorA.length !== vectorB.length) {
    // Pad shorter vector with zeros
    const maxLength = Math.max(vectorA.length, vectorB.length);
    vectorA = [...vectorA, ...Array(maxLength - vectorA.length).fill(0)];
    vectorB = [...vectorB, ...Array(maxLength - vectorB.length).fill(0)];
  }
  
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  
  return dotProduct / (magnitudeA * magnitudeB);
};

// Get similar alumni recommendations based on cosine similarity
export const getSimilarAlumni = (currentUser: User, allUsers: User[]): User[] => {
  if (currentUser.role !== 'student') return [];
  
  const alumni = allUsers.filter(user => user.role === 'alumni');
  const currentUserVector = userToFeatureVector(currentUser, allUsers);
  
  const similarities = alumni.map(alumni => {
    const alumniVector = userToFeatureVector(alumni, allUsers);
    const similarity = cosineSimilarity(currentUserVector, alumniVector);
    
    return {
      user: alumni,
      similarity
    };
  });
  
  // Sort by similarity score (descending) and return top 6
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 6)
    .map(item => item.user);
};
