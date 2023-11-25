"use client";
import React from 'react';
interface ErrorPupupProps {
    errorss: string;
  }
const ErrorPupup :React.FC<ErrorPupupProps>  = ({errorss}) => {
  return (
    <div className="pt-2">
      <h1>{errorss}</h1>
    </div>
  );
};

export default ErrorPupup;
