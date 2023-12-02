import React from 'react';
import menu from '../utils/menu.json';
const Menu = () => {

  return (
    <div className="w-[100%]  flex mt-2  justify-center">
      <div className="w-[90%] small:w-[100%] h-[60vh]  grid grid-rows-5">
        <div className=" row-span-1 self-center bg-yellow-300">
          <div className="  grid grid-flow-col text-center">
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              BreakFast
            </h1>
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              Lunch
            </h1>
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              Dinner
            </h1>
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              Chinese
            </h1>
            <h1 className="text-[2vw] small:text-[5vw] medium:text-[3vw]">
              Juices
            </h1>
          </div>
        </div>
        <div className="row-span-4 h-[100%] self-center">
          <div className="grid h-[100vh] small:h-[175vh] small:grid-cols-2  medium:grid-cols-3 large:grid-cols-4 p-2 gap-4 small:gap-2">
            {menu.map((m) => (
             <div key={m.id} className="w-34 small:h-[95%]  small:gap-x-0 rounded-2xl gird grid-flow-row p-2 bg-white shadow-2xl">
             <div className="rounded-2xl w-[100%] h-64 small:h-36 flex justify-center">
               <img
                 className="rounded-2xl h-[100%]  object-contain"
                 src={m.img}
                 alt=""
               />
             </div>
             <div>
                <div>
                    <h1 className="text-center small:text-[6vw] text-[2vw] font-[500] font-lobster">{m.title}</h1>
                </div>
                <div className='flex justify-between'>
                    {m.tags.map((ftag) => (
                        <div key={""} className='w-[30%]  overflow-hidden rounded-lg text-center p-1 bg-green-200 text-gray-300 small:text-[3vw] font-lobster'>{ftag}</div>
                    ))}
                </div>
                <div className="flex justify-between p-2">
                    <h3 className="bg-blue-200 small:w-14 rounded-lg w-[30%] font-lobster text-[2vw] small:text-[5vw] p-1 flex justify-evenly"><span>{m.price}</span><span>₹</span></h3>
                    <h3 className="bg-blue-200 small:w-14 rounded-lg w-[30%] font-lobster text-[2vw] small:text-[5vw] p-1 flex justify-evenly"><span>{m.rating}</span><img src="/icons/star.svg" width={20} height={20} alt="" /></h3>
                </div>
                <div className="p-3 ">
                    {m.quantity == 0?
                    <button className="w-[100%] h-10 bg-purple-300 rounded-xl text-white font-lobster">Add to Cart</button>:
                    <div className="flex justify-between">
                        <button className="w-[30%] h-10 bg-purple-300 rounded-xl text-white font-lobster">+</button>
                        <h1 className='w-12 bg-purple-300 rounded-lg  text-[25px] text-white text-center font-bold'>{m.quantity}</h1>
                        <button className="w-[30%] h-10 bg-purple-300 rounded-xl text-white font-lobster">+</button>
                    </div>
                    }
                </div>
             </div>
           </div>   
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
