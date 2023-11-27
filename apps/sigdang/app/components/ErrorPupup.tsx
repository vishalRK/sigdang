"use client";
import React from 'react';
interface ErrorPupupProps {
    errorss: string;
  }
const ErrorPupup :React.FC<ErrorPupupProps>  = ({errorss}) => {
  return (
    <div className="pt-2 flex  flex-row-reverse justify-evenly w-[100%]">
      <img src="/icons/close.svg" className="w-4 h-5 mt-1 self-center mr-2" alt="" />
      <h1 className="w-96 h-4 mt-1 text-[15px] text-center">{errorss}</h1>
    </div>
  );
};

export default ErrorPupup;
