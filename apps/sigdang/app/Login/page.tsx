'use client';
import React, { useState } from 'react';

import Login from '../components/Login';
import Register from '../components/Register';

const Logins = () => {
  const [isRegister, setRegister] = useState(false);


  return (
    <div className="flex justify-center">
     <div
        className={`large:w-[60vw] shadow-2xl small:w-[100vw] medium:w-[80vw] grid large:grid-cols-2  small:grid-cols-1 medium:grid-cols-1 h-[100%] `}
      >
        <div
          className={`bg-red-500 w-[100%] large:h-[100vh] small:h-[50vh] medium:h-[50vh] ${
            isRegister ? 'large:order-last' : ''
          }`}
        >
          Login
        </div>

        <div className={`${isRegister ? 'large:order-1' : ''}`}>
          <h2
            className={`absolute bottom-[-20px] small:left-5  ${
              isRegister ? 'left-[21%]' : 'left-[52%]'
            } text-[1vw] small:text-[5vw] underline cursor-pointer`}
            onClick={() => setRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Register'}
          </h2>
           
          {isRegister ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
};

export default Logins;
