'use client';
import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    pincode: '',
    city: ' ',
    state:'',
    country:''
  });
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name === 'pincode' && profile.pincode !== '');
    // e.preventDefault();
    console.log(e.target.value.length);
   if(e.target.value.length == 6)
   {

     setProfile({ ...profile, pincode: e.target.value });
     fetch(`https://api.postalpincode.in/pincode/${e.target.value}`)
       .then((response) => {
         if (!response.ok) {
           return response.json();
         }
         return response.json();
       })
       .then((data) => {
         if (data[0].status === 'error') {
           alert(data.message);
         } else {
           setProfile({ ...profile, city: data[0].PostOffice[0].District ,state: data[0].PostOffice[0].State,country: data[0].PostOffice[0].Country});
       
           // alert(data[0].PostOffice[0].District);
         }
       });
   }
  
   
  
    
      // e.preventDefault();
    };
   
  return (
    <div className="flex justify-center small:z-0">
      <div className="large:w-[80%] small:w-[100%] medium:w-[100%] h-[100vh] mb-32 bg-red-300">
        <div className="h-[30%] w-[100%] bg-yellow-200"></div>
        <div className="h-[70%] w-[100%] bg-green-200 pt-32 flex justify-center">
          <form
            action=""
            className="large:w-[80%] small:w-[100%] medium:w-[100%] mb-10 gap-3 rounded-xl pb-5 grid grid-cols-2 bg-white small:grid-cols-1"
          >
            <div className="w-[80%] small:ml-5 ml-12 col-span-1 flex flex-col ">
              <label htmlFor="" className="mt-10">
                username
              </label>
              <input
                type="text"
                className="border-b-2 outline-none border-b-black"
              />
            </div>
            <div className="w-[80%]  small:ml-5 ml-12 col-span-1 flex flex-col ">
              <label htmlFor="" className="mt-10">
                Email
              </label>
              <input
                type="text"
                className="border-b-2 outline-none border-b-black"
              />
            </div>
            <div className="w-[90%]  ml-12 small:ml-5 col-span-2 flex flex-col ">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 col-span-2">
                  <label htmlFor="">Street</label>
                  <input
                    type="text"
                    className="border-b-2 border-b-black outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    // value={profile.pincode}
                    onChange={handlePincodeChange}
                    className="border-b-2 border-b-black outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2 border-b-2 border-b-black">
                  <label htmlFor="">City</label>
                  <h1 className="text-start text-[15px]">{profile.city}</h1>
                </div>
                <div className="flex flex-col gap-2 border-b-2 border-b-black">
                  <label htmlFor="">State</label>
                  <h1 className="text-start text-[15px]">{profile.state}</h1>
                </div>
                <div className="flex flex-col gap-2 border-b-2 border-b-black">
                  <label htmlFor="">Country</label>
                  <h1 className="text-start text-[15px]">{profile.country}</h1>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Contact</label>
                  <input
                    type="text"
                    className="border-b-2 border-b-black outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="w-[90%] small:ml-5 ml-12 col-span-2 flex justify-evenly  ">
              <button className="w-[40%] self-center mt-5 h-[50%] rounded-md bg-pink-400">
                Reset
              </button>
              <button className="w-[40%] self-center mt-5 h-[50%] rounded-md bg-pink-400">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="absolute top-48 large:left-[44%] small:left-[30%] medium:left-[35%] rounded-full w-40 h-40 bg-red-600 overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmda0YGQzWVUbEKRva0CLjI3ADqGV76tYG5gIYgctZrfB8hWfD_i0tgwVQLgeScyPj08s&usqp=CAU"
            className="rounded-full w-40 h-40 object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
