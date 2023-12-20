'use client';
import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useAuth } from '../../utils/User';
import Image from 'next/image';
interface Profile{
  username: string,
  email: string,
  street: string,
  pinCode: string,
  city: string,
  state: string,
  country: string,
  contact: string,
}
interface Profiles{
  username: string,
  email: string,
  street: string,
  pinCode: string,
  city: string,
  state: string,
  country: string,
  contact: string,
}
const Profile = () => {
  const users = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    street: '',
    pinCode: '',
    city: ' ',
    state: '',
    country: '',
    contact:''
  });
 
  const { register, handleSubmit,getValues,setValue, formState: { errors } } = useForm({
    defaultValues:{
      username:users.users.username || "",
      email:users.users.email || "",
      contact:users?.users?.address?.contact || '' ,
      street: users?.users?.address?.street || '',
      pinCode:users?.users?.address?.pinCode || '',
      city:users?.users?.address?.city || '',
      state:users?.users?.address?.state || '',
      country:users?.users?.address?.country || ''

    }
  });

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name === 'pincode' && profile.pinCode !== '');
    // e.preventDefault();
    console.log(e.target.value.length);
    if (e.target.value.length == 6) {
      setProfile({ ...profile, pinCode: e.target.value });
      fetch(`https://api.postalpincode.in/pincode/${ e.target.value }`)
        .then((response) => {
          if (!response.ok) {
            return response.json();
          }
          return response.json();
        })
        .then((data) => {
         
            setValue('city',data[0].PostOffice[0].District)
            setValue('state',data[0].PostOffice[0].State)
            setValue('country',data[0].PostOffice[0].Country)
            // setProfile({
            //   ...profile,
            //   pincode: e.target.value,
            //   city: data[0].PostOffice[0].District,
            //   state: data[0].PostOffice[0].State,
            //   country: data[0].PostOffice[0].Country,
            // });

            // alert(data[0].PostOffice[0].District);
          
        });
    }

    // e.preventDefault();
  };
  const onsubmit = (data:Profiles) => {
    
    // You can perform form submission logic here
 
    setProfile({...profile,email:data.email,username:data.username,contact:data.contact,street:data.street})

   fetch(`http://localhost:3000/api/v1/user/updateProfile/${users?.users?.userId}`,{
   method:"POST", 
   headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
   }).then(response => {
    if(!response.ok)
    {
      throw new Error("there is error in response");
    }
    return response.json();
   }).then(datas => {
  
    const userData = localStorage.getItem("user");
    console.log(datas);
    if(userData)
    {
      const userObject = JSON.parse(userData);
      userObject.email = datas.email;
      userObject.userId = datas.userId;
      userObject.avtar = datas.avtar;
      userObject.username = datas.username;
      userObject.address.city = datas.data.city; 
      userObject.address.state = datas.data.state;
      userObject.address.street = datas.data.street;
      userObject.address.country = datas.data.country;
      userObject.address.contact = datas.data.contact;
      userObject.address.pinCode = datas.data.pinCode;
      localStorage.setItem("user",JSON.stringify(userObject));
    }
   }).catch(error => {
    console.log(error);
   })
     
    
  };
  return (
    <div className="flex justify-center small:z-0">
      <div className="large:w-[80%] small:w-[100%] medium:w-[100%] h-[100vh] mb-32 bg-red-300">
        <div className="h-[30%] w-[100%] bg-yellow-200"></div>
        <div className="h-[70%] w-[100%] bg-green-200 pt-32 flex justify-center">
          <form
            action=""
            className="large:w-[80%] small:w-[100%] medium:w-[100%] mb-10 gap-3 rounded-xl pb-5 grid grid-cols-2 bg-white small:grid-cols-1"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div className="w-[80%] small:ml-5 ml-12 col-span-1 flex flex-col ">
              <label htmlFor="" className="mt-10">
                username
              </label>
              <input
                // type="text"
                // name="username"
                className="border-b-2 outline-none border-b-black"
                // onChange={handleChange}
                {...register('username', { required: 'Username is required' })}
                />
                {errors.username && <p>{`${errors?.username?.message}`}</p>}
            </div>
            <div className="w-[80%]  small:ml-5 ml-12 col-span-1 flex flex-col ">
              <label htmlFor="" className="mt-10">
                Email
              </label>
              <input
                type="text"
                {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                className="border-b-2 outline-none border-b-black"
                // onChange={handleChange}
              />
              {errors.email && <p>{`${errors.email.message}`}</p>}
            </div>
            <div className="w-[90%]  ml-12 small:ml-5 col-span-2 flex flex-col ">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 col-span-2">
                  <label htmlFor="">Street</label>
                  <input
                    type="text"
                    {...register('street')}
                    className="border-b-2 border-b-black outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Pincode</label>
                  <input
                    type="text"
                    // name="pincode"
                    // value={profile.pincode}
                    {...register('pinCode')}
                    onChange={handlePincodeChange}
                    className="border-b-2 border-b-black outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2 border-b-2 border-b-black">
                  <label htmlFor="">City</label>
                  <h1 className="text-start text-[15px]">{getValues('city')}</h1>
                </div>
                <div className="flex flex-col gap-2 border-b-2 border-b-black">
                  <label htmlFor="">State</label>
                  <h1 className="text-start text-[15px]">{getValues('state')}</h1>
                </div>
                <div className="flex flex-col gap-2 border-b-2 border-b-black">
                  <label htmlFor="">Country</label>
                  <h1 className="text-start text-[15px]">{getValues('country')}</h1>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Contact</label>
                  <input
                    {...register('contact', { minLength:{value:10,message:"phone number not should be less than 10 digit"}, maxLength:{value:10,message:"phone number should be eaual to 10 not more than 10 digit"} })}
                    className="border-b-2 border-b-black outline-none"
                    // onChange={handleChange}
                  />
                  {errors.contact?.message && <p>{`${errors.contact?.message}`}</p>}
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
          <Image
            src={`${users.users.avtar}`}
            className="rounded-full w-40 h-40 object-cover"
            alt="profile_url"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
