"use client";
import { Link, useNavigate } from "react-router-dom";
import '../../app/global.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/User';
import { useEffect } from "react";
import Logins from "./page";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {users} = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!users.username) {
      // Redirect to the login page if the user is not authenticated
      router.push('/Login');
    }
  }, [users.username, router]);
 
  
  return (
       <div>
        
         {users.username?children:<Logins/>}
       </div>
  );
  
  
}
