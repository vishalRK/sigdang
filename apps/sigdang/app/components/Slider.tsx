'use client';
import React, { useState } from 'react';
const Slider = () => {
  const [increase, setIncrement] = useState(1);
  const [flow ,setFlow] = useState(false);
    const incrementFunction = () => {
        if(increase >= 1 && increase < 7)
        {
            setIncrement(increase + 1); 
            setFlow(true);
        } 
       
        }
      
        const decrementFunction = () => {
            if(increase > 1 && increase <= 7)
            {
                setIncrement(increase - 1); 
                setFlow(false);
            }
        }
  return (
    <div className="w-[100%] flex mt-2  justify-center cursor-pointer">
      <div
        className="w-[5%] flex fle-col justify-center"
        onClick={() => decrementFunction() }
      >
        <img src="/icons/left.svg" width={50} height={50} alt="" />
      </div>
      <div className="w-[72%] smd:w-[90%] small:w-[90%] medium::w-[90%] self-center small:h-[260px] h-[500px]">
        {/* <h1 className='text-[28px]'>{increase}</h1> */}
        <div key={increase} className="w-[100%] overflow-hidden  h-[100%]">
          {flow?<img
            src={`/images/gallery/pic${increase}.jpg`}
            className={`w-[100%] large:object-cover h-[100%]  ${increase == 1 || increase < 7?"animate-right":""} `}
          />:<img
          src={`/images/gallery/pic${increase}.jpg`}
          className={`w-[100%] large:object-cover h-[100%]  ${increase >= 1 && increase <= 7 ?"animate-left":""}`}
        />}
        </div>
      </div>
      <div
        className="w-[5%] flex fle-col justify-center"
        onClick={ () => incrementFunction()}
      >
        <img src="/icons/right.svg" width={50} height={50} alt="" />
      </div>
    </div>
  );
};

export default Slider;
