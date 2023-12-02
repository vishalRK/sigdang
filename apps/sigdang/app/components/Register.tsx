'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Login from './Login';

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [isValidUserName, setIsUserNameValid] = useState(false);
  const [isValidPassword, setIsPasswordValid] = useState(false);
  const [isValidEmail, setIsEmailValid] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle changes in form fields
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = validateUsername(user.username);
    const password = validatePassword(user.password);

    if (username && password) {
      setUser(user);
    }
    if (!username || user.username == '') {
      setIsUserNameValid(true);
    }
    if (user.email == '') {
      setIsEmailValid(true);
    }
    if (!password || user.password == '') {
      setIsPasswordValid(true);
    }
    console.log(!isValidUserName && !isValidEmail && !isValidPassword)
    if(!isValidUserName && !isValidEmail && !isValidPassword)
    {

    
    fetch('http://localhost:3000/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: user.username,
        email: user.email,
        password: user.password,
      })})
      .then(response => {
          if (!response.ok) {
            // setClosePopup(true);
            return response.json();
          }
          // setClosePopup(true);
          return response.json();
        })
        .then(data => {
          console.log(data);
          if (data.message) {
            
            router.push('/');
          }
        })
      }
  };
  
  const validateUsername = (username: string) => {
    // Check if the username has at least 5 characters
    const hasMinLength = username.length >= 5;

    // Check if the username contains at least one special character
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(username);

    // Check if the username contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(username);

    // Combine all validation criteria
    return hasMinLength && !hasSpecialCharacter && hasUppercase;
  };
  const validatePassword = (password: string) => {
    // Check if the username has at least 5 characters
    const hasMinLength = password.length >= 8;

    // Combine all validation criteria
    return hasMinLength;
  };

  return (
    <div className="bg-white w-[100%] large:h-[100vh] small:h-[50vh] medium:h-[50vh] grid grid-cols-1">
      <h1 className="h-[20%] large:mt-60 text-[5vw] text-center font-[600]">
        Register
      </h1>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="col-span-3 justify-between h-[50%] medium:h-[80%] small:h-[80%] mt-2 large:mb-64 medium:mb-40 small:mb-40 p-4"
      >
        <div className="flex flex-col h-[30%]">
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            className="h-10 outline-none border-b-2 border-b-black"
            onChange={handleChange}
            onClick={() => setIsUserNameValid(false)}
          />
          {isValidUserName && (
            <p style={{ color: 'red' }}>
              Username must have at least 5 characters, include a special
              character, and have an uppercase letter.
            </p>
          )}
        </div>
        <div className="flex flex-col h-[30%]">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            className="h-10 outline-none border-b-2 border-b-black"
            onChange={handleChange}
            onClick={() => setIsEmailValid(false)}
          />
          {isValidEmail && (
            <p style={{ color: 'red' }}>Email Field not should be empty.</p>
          )}
        </div>
        <div className="flex flex-col h-[35%]">
          <label htmlFor="">Password</label>
          <input
            type="text"
            name="password"
            value={user.password}
            className="h-10 outline-none border-b-2 border-b-black"
            onChange={handleChange}
            onClick={() => setIsPasswordValid(false)}
          />
          {isValidPassword && (
            <p style={{ color: 'red' }}>
              password length should be greater than or equal to 8.
            </p>
          )}
        </div>
        <div className="flex flex-col h-[20%]">
          <button
            type="submit"
            className="bg-blue-800 rounded-md p-2 text-yellow-100"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
