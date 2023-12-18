"use client";
// user.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
interface User {
  username: string | null;
  email:string | null;
  avtar:string | null;
  userId:string | null;
  // Add other user details as needed
}
interface CartItem {
  product_id:string,
product_image:string,
product_name:string,
product_price:number,
quantity:number,
user_id:string,
_id:string
  // Add other product details as needed
}

interface AuthContextProps {
  users: User;
  cart: CartItem[];
  login: (username: string,email:string,avtar:string,userId:string) => void;
  logout: () => void;
  addToCart: (cart:CartItem[]) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUser] = useState<User>({ username: null ,email: null, avtar: null,userId:null});
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    // Check localStorage for user details on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  

  const login = (username:string,email:string,avtar: string,userId:string) => {
    // Update state and localStorage on login
    setUser({ username,email,avtar,userId });
    localStorage.setItem('user', JSON.stringify({ username,email,avtar,userId }));
    router.push("/");
  };

  const logout = () => {
    // Update state and remove user from localStorage on logout
    setUser({ username: null,email:null,avtar:null,userId:null });
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  const addToCart = (cart:CartItem[]) => {
    // Update state and localStorage when adding to the cart
    const updatedCart = [...cart];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  return <AuthContext.Provider value={{ users, cart, login, logout, addToCart }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
