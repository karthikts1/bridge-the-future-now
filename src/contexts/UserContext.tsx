
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserContextType } from '@/types/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (isAuthenticated && savedUserData) {
      try {
        const parsedUser = JSON.parse(savedUserData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("userData");
        localStorage.removeItem("isAuthenticated");
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      
      // Add this user to registeredUsers in localStorage if not present
      const registeredUsersString = localStorage.getItem("registeredUsers");
      let registeredUsers: User[] = [];
      
      if (registeredUsersString) {
        try {
          registeredUsers = JSON.parse(registeredUsersString);
        } catch (error) {
          console.error("Failed to parse registered users:", error);
        }
      }
      
      // Check if user already exists in the array
      const userExists = registeredUsers.some(u => u.id === user.id);
      
      if (!userExists) {
        registeredUsers.push(user);
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      }
    } else {
      localStorage.removeItem("userData");
      localStorage.removeItem("isAuthenticated");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
