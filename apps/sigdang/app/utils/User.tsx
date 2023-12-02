"use client";
// user.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
interface User {
  username: string | null;
  email:string | null;
  avtar:string | null;
  // Add other user details as needed
}

interface AuthContextProps {
  users: User;
  login: (username: string,email:string,avtar:string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUser] = useState<User>({ username: null ,email: null, avtar: null});
  const router = useRouter();
  useEffect(() => {
    // Check localStorage for user details on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username:string,email:string,avtar: string) => {
    // Update state and localStorage on login
    setUser({ username,email,avtar });
    localStorage.setItem('user', JSON.stringify({ username,email,avtar }));
    router.push("/");
  };

  const logout = () => {
    // Update state and remove user from localStorage on logout
    setUser({ username: null,email:null,avtar:null });
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ users, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
