'use client';
import React, {  useState } from 'react';
import ErrorPupup from './ErrorPupup';
// import { useNavigate } from 'react-router';
const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [isValidPassword, setIsPasswordValid] = useState(false);
  const [isValidEmail, setIsEmailValid] = useState(false);
  const [isOpen, setClosePopup] = useState(false);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    // handle changes in form fields
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = validatePassword(user.password);

    if (user.email == '') {
      setIsEmailValid(true);
    }
    if (!password || user.password == '') {
      setIsPasswordValid(true);
    }
    if(user.email && user.password)
    {

    
    fetch('http://localhost:3000/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    }).then((response) => {
        console.log(response.status);
        
        if(!response.ok)
        {
          setClosePopup(true);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    }
  };

  const validatePassword = (password: string) => {
    // Check if the username has at least 5 characters
    const hasMinLength = password.length >= 8;

    // Combine all validation criteria
    return hasMinLength;
  };

  return (
    <div className="bg-white w-[100%] large:h-[100vh] small:h-[50vh] medium:h-[50vh] grid grid-cols-1">
       <div className={`absolute small:top-7 small:left-28 translate-y-[15px] ${isOpen?"":"hidden"} w-40 h-10 animate-wiggle flex justify-center border-b-4 border-b-orange-300 rounded-md bg-white`} onClick={() => setClosePopup(false)}><ErrorPupup  errorss="this is error"/></div>
      <h1 className="h-[20%] large:mt-60 text-[5vw] text-center font-[600]">
        Login
      </h1>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="col-span-3 justify-between h-[50%] medium:h-[80%] small:h-[80%] mt-2 large:mb-64 medium:mb-40 small:mb-40 p-4"
      >
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

export default Login;
