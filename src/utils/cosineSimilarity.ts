
import { User } from '@/types/user';

// Convert user profile to a feature vector for similarity calculation
export const userToFeatureVector = (user: User, allUsers: User[]): number[] => {
  const features: number[] = [];
  
  // Field similarity (one-hot encoding for different fields)
  const allFields = [...new Set(allUsers.map(u => u.field).filter(Boolean))];
  allFields.forEach(field => {
    features.push(user.field === field ? 1 : 0);
  });
  
  // Industry similarity (one-hot encoding for different industries)
  const allIndustries = [...new Set(allUsers.map(u => u.industry).filter(Boolean))];
  allIndustries.forEach(industry => {
    features.push(user.industry === industry ? 1 : 0);
  });
  
  // Skills similarity (Jaccard similarity for skill overlap)
  const allSkills = [...new Set(allUsers.flatMap(u => u.skills || []))];
  allSkills.forEach(skill => {
    features.push(user.skills?.includes(skill) ? 1 : 0);
  });
  
  // Interests similarity (Jaccard similarity for interest overlap)
  const allInterests = [...new Set(allUsers.flatMap(u => u.interests || []))];
  allInterests.forEach(interest => {
    features.push(user.interests?.includes(interest) ? 1 : 0);
  });
  
  // Specialization similarity (one-hot encoding)
  const allSpecializations = [...new Set(allUsers.map(u => u.specialization).filter(Boolean))];
  allSpecializations.forEach(specialization => {
    features.push(user.specialization === specialization ? 1 : 0);
  });
  
  // Location similarity (one-hot encoding)
  const allLocations = [...new Set(allUsers.map(u => u.location).filter(Boolean))];
  allLocations.forEach(location => {
    features.push(user.location === location ? 1 : 0);
  });
  
  // Course overlap (for students and faculty)
  if (user.courses && user.courses.length > 0) {
    const allCourses = [...new Set(allUsers.flatMap(u => u.courses || []))];
    allCourses.forEach(course => {
      features.push(user.courses?.includes(course) ? 1 : 0);
    });
  }
  
  // Career goals similarity (simple text matching for common keywords)
  if (user.careerGoals) {
    const goalKeywords = ['engineer', 'researcher', 'manager', 'developer', 'scientist', 'analyst', 'consultant'];
    goalKeywords.forEach(keyword => {
      features.push(user.careerGoals?.toLowerCase().includes(keyword) ? 1 : 0);
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

// Calculate why two users are similar (for display purposes)
export const getSimilarityReasons = (user1: User, user2: User): string[] => {
  const reasons: string[] = [];
  
  if (user1.field === user2.field) {
    reasons.push(`Same field: ${user1.field}`);
  }
  
  if (user1.industry === user2.industry) {
    reasons.push(`Same industry: ${user1.industry}`);
  }
  
  if (user1.location === user2.location) {
    reasons.push(`Same location: ${user1.location}`);
  }
  
  if (user1.specialization === user2.specialization) {
    reasons.push(`Same specialization: ${user1.specialization}`);
  }
  
  // Check skill overlap
  const commonSkills = user1.skills?.filter(skill => user2.skills?.includes(skill)) || [];
  if (commonSkills.length > 0) {
    reasons.push(`Shared skills: ${commonSkills.slice(0, 3).join(', ')}`);
  }
  
  // Check interest overlap
  const commonInterests = user1.interests?.filter(interest => user2.interests?.includes(interest)) || [];
  if (commonInterests.length > 0) {
    reasons.push(`Shared interests: ${commonInterests.slice(0, 3).join(', ')}`);
  }
  
  // Check course overlap
  const commonCourses = user1.courses?.filter(course => user2.courses?.includes(course)) || [];
  if (commonCourses.length > 0) {
    reasons.push(`Common courses: ${commonCourses.slice(0, 2).join(', ')}`);
  }
  
  return reasons;
};

// Get similar alumni recommendations based on enhanced cosine similarity
export const getSimilarAlumni = (currentUser: User, allUsers: User[]): (User & { similarityScore: number; reasons: string[] })[] => {
  if (currentUser.role !== 'student') return [];
  
  const alumni = allUsers.filter(user => user.role === 'alumni');
  const currentUserVector = userToFeatureVector(currentUser, allUsers);
  
  const similarities = alumni.map(alumni => {
    const alumniVector = userToFeatureVector(alumni, allUsers);
    const similarity = cosineSimilarity(currentUserVector, alumniVector);
    const reasons = getSimilarityReasons(currentUser, alumni);
    
    return {
      ...alumni,
      similarityScore: similarity,
      reasons
    };
  });
  
  // Sort by similarity score (descending) and return top 6
  return similarities
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 6);
};
