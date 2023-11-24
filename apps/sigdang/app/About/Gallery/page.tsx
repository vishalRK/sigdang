import React from "react";

const page = () => {
  const a = [1,2,3,4,5,6,7,1,2,3,4,5,6,7,3,4,2,4,1];
  return (
    <div className="w-[100vw] flex justify-center">
      <div className=" w-[98%]  gap-x-px-[20px]  columns-2 md:columns-4">
        {a.map((a, index) => (
          <div key={index} className="rounded-md mb-4 overflow-hidden">
            <img src={`/images/gallery/pic${a}.jpg`} className="rounded-md hover:scale-150 transition duration-700" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
