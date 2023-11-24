"use client";
import React, { use, useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email:""
  });
  const [isValidUserName, setIsUserNameValid] = useState(false);
  const [isValidPassword, setIsPasswordValid] = useState(false);
  const [isValidEmail, setIsEmailValid] = useState(false);
  const handleChange = (e: any) => {
    // handle changes in form fields
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const username = validateUsername(user.username);
    const password = validatePassword(user.password);
    
    if (username && password ) {
      setUser(user);
      console.log(user);
    }
    if(!username || user.username == ""){
        setIsUserNameValid(true);
    }
    if(user.email == "")
    {
        setIsEmailValid(true);
    }
    if(!password || user.password == ""){
        setIsPasswordValid(true);
    }
  };
  const validateUsername = (username: any) => {
    // Check if the username has at least 5 characters
    const hasMinLength = username.length >= 5;

    // Check if the username contains at least one special character
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(username);

    // Check if the username contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(username);

    // Combine all validation criteria
    return hasMinLength && !hasSpecialCharacter && hasUppercase;
  };
  const validatePassword = (password: any) => {
    // Check if the username has at least 5 characters
    const hasMinLength = password.length  >=  8;

   
    

    // Combine all validation criteria
    return hasMinLength;
  };

  return (
    <div className="flex justify-center">
      <div className="large:w-[60vw] shadow-2xl small:w-[100vw] medium:w-[80vw] grid large:grid-cols-2 small:grid-cols-1 medium:grid-cols-1 h-[100%] di">
        <div className="bg-red-500 w-[100%] large:h-[100vh] small:h-[50vh] medium:h-[50vh] ">
          Login
        </div>
        <div className="bg-white w-[100%] large:h-[100vh] small:h-[50vh] medium:h-[50vh] grid grid-cols-1">
          <h1 className="h-[20%] large:mt-60 text-[5vw] text-center font-[600]">
            Login
          </h1>
          <form
            onSubmit={onSubmit}
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
                <p style={{ color: "red" }}>
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
                <p style={{ color: "red" }}>
                 Email Field not should be empty.
                </p>
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
                <p style={{ color: "red" }}>
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
      </div>
    </div>
  );
};

export default Login;
