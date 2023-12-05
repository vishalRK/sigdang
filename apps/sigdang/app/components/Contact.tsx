'use client';
import React, { useState } from 'react';
import { useAuth } from '../utils/User';
const Contact = () => {
  const { users } = useAuth();
  const [contactForm, setcontactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    ph_no: '',
    message: '',
  });
  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    // Your logic here, for example:
    setcontactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle changes in form fields
    setcontactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_ELASTIC_EMAIL_APIKEY);
    if(contactForm.email !== '' && contactForm.message !== '')
    {
        fetch(`https://api.elasticemail.com/email/Verify?version=2&apikey=${process.env.NEXT_PUBLIC_ELASTIC_EMAIL_APIKEY}&email=${contactForm.email}`).then(data => {

        const config = {
            // Username:`${process.env.ELASTIC_EMAIL_USERNAME}`,
            // Password:`${process.env.ELASTIC_EMAIL_PASSWORD}`,
            // Host:"smtp.elasticemail.com",
            // Port:2525,
            // Domain:data?.data?.domain,
            SecureToken: '7d13fa6a-8bc7-407b-aa94-7962f9bc7c3b',
            To: "vishalkerlekar5@gmail.com",
            From: 'vishalkerlekar5@hotmail.com',
            Subject: 'Enquiry Form',
            Body: `<h1>my name is ${contactForm.firstName} ${contactForm.lastName}, This is new Email</h1>`,
          };
          if (window.Email) {
            window.Email.send(config)
              .then((data) => alert(data))
              .catch((error) => alert('email not sent some error has occurs'));
          }
        })

    
    
    
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] small:h-[100vh] small:w-[100%] pt-5 medium:w-[100%] bg-[#fbfbfb] flex medium:flex-wrap large:flex-wrap small:flex-wrap justify-center">
      <div className="w-[80vw]   small:min-w-[400px] shadow-2xl flex medium:flex-wrap medium:mb-20 large:flex-nowrap small:flex-wrap vmin-[80vw] rounded-[10px] ">
        {/* section 1 */}
        <div className="w-[50%]  text-white small:w-[95%] medium:w-[100%]  medium:pb-5 small:ml-[10px] bg-[#000000] large:rounded-tr-none large:rounded-tl-[10px] large:rounded-bl-[10px] small:rounded-t-[10px]">
          <div className="mt-2">
            <h1 className="small:text-center medium:text-center small:text-[7vw] text-[4vw]">
              Contact Information
            </h1>
            <h3 className="small:text-center medium:text-center  text-[2vw] small:text-[3vw] text-[#C9C9C9]">
              Say something to start a live chat!
            </h3>
          </div>
          <div className="w-[100%] flex flex-col large:mt-36">
            <div className="flex justify-between large:self-start large:w-[180px] large:ml-5 small:flex-col medium:flex-col  large:flex-row small:w-[100%]">
              <img
                src="/images/phonecall.png"
                className="medium:self-center small:self-center medium:mb-2 medium:mt-6 small:mt-6 small:mb-2 w-8 h-8"
                alt="phonecall"
              />
              <p className="text-center mt-6">+1012 3456 789</p>
            </div>
            <div className="flex justify-between large:pr-3 large:self-start large:w-[235px] large:ml-5 large:w-[50%] small:flex-col large:flex-row medium:flex-col small:w-[100%]">
              <img
                src="/images/email.png"
                className="medium:self-center small:self-center medium:mb-2 medium:mt-6 small:mt-6 small:mb-2 w-8 h-8"
                alt="phonecall"
              />
              <p className="text-center mt-6">restaurant@gmail.com</p>
            </div>
            <div className="flex justify-between  large:w-[65%] large:pr-2 large:w-[335px] large:ml-5 large:self-start large:flex-row small:flex small:flex-col medium:flex-col  small:w-[100%]">
              <img
                src="/images/location.png"
                className="medium:self-center small:self-center medium:mb-2 medium:mt-6 small:mt-6 small:mb-2 w-8 h-8"
                alt="phonecall"
              />
              <p className="large:text-start medium:text-center small:text-center mt-6 ">
                132 Dartmouth Street Boston,
                <br /> Massachusetts 02156 United States
              </p>
            </div>
          </div>
          <div className="w-[100%] medium:mt-10 large:mt-52 small:mt-10 medium:flex small:flex flex justify-evenly">
            <img
              src="/icons/twitter.svg"
              width={30}
              height={30}
              className="large:ml-[-10%]"
              alt=""
            />
            <img src="/icons/facebook.svg" width={50} height={50} alt="" />
            <img src="/icons/insta.svg" width={40} height={40} alt="" />
            <img src="/icons/github.svg" width={50} height={50} alt="" />
          </div>
        </div>

        {/* section 2 */}
        <div className="w-[50%] text-white small:w-[95%] small:ml-[10px] small:h-[40%] h-[100%]  medium:w-[100%] bg--[#ffff] small:rounded-b-[10px] medium:rounded-br-[10px]  medium:rounded-tr-[10px]">
          <div className="grid grid-cols-1">
            <form action="" onSubmit={(e) => submitHandler(e)}>
              <div className="w-100 h-55 grid grid-cols-2">
                <div className="w-100 h-20 bg-white flex flex-col p-5">
                  <label htmlFor="FirstName" className="text-black">
                    First Name
                  </label>
                  <input
                    type="text"
                    name='firstName'
                    value={contactForm.firstName}
                    onChange={handleChange}
                    required
                    className="border-b-[1px] border-black outline-none text-black"
                  />
                </div>
                <div className="w-100 h-20 bg-white flex flex-col p-5">
                  <label htmlFor="FirstName" className="text-black">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name='lastName'
                    value={contactForm.lastName}
                    onChange={handleChange}
                    className="border-b-[1px] border-black outline-none text-black"
                  />
                </div>
                <div className="w-100 h-20 bg-white flex flex-col p-5">
                  <label htmlFor="FirstName" className="text-black">
                    Email
                  </label>
                  <input
                  id='email'
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleChange}
                    required
                    className="border-b-[1px] border-black outline-none text-black"
                  />
                </div>
                <div className="w-100 h-20 bg-white flex flex-col p-5">
                  <label htmlFor="FirstName" className="text-black">
                    Phone No
                  </label>
                  <input
                    type="text"
                    name="ph_no"
                    value={contactForm.ph_no}
                    onChange={handleChange}
                    required
                    className="border-b-[1px] border-black outline-none text-black"
                  />
                </div>
              </div>
              <div className="w-100 h-48 ">
                <div className="w-100 h-48 bg-white flex flex-col p-5">
                  <label htmlFor="FirstName" className="text-black">
                    Message
                  </label>
                  <textarea
                    rows={30}
                    cols={30}
                    name='message'
                    value={contactForm.message}
                    onChange={handleTextAreaChange}
                    required
                    className="border-b-[1px] border-black outline-none text-black"
                  />
                </div>
              </div>
              <div
                className="w-100 h-20 bg-white flex medium:justify-end"
              >
                <button type='submit' className="large:w-[30%] medium:w-[40%] medium:h-[70%] medium:mt-3 medium:mr-3 small:w-[100%] rounded-md large:h-[60%] large:mr-5 large:mt-4 bg-black">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
