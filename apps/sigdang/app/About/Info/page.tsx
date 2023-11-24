import React from "react";

const page = () => {
  return (
    <div className="large:flex large:justify-center mb-1">
      <div className="large:w-[60vw] h-[100%] bg-red-200">
        <h1 className="text-center medium:text-[3vw] small:text-[8vw] pt-4">
          Our Story
        </h1>
        <div className=" small:text-[5vw] flex flex-col justify-center mt-12">
          <h2 className="text-center text-[2vw] small:text-[5vw] mb-4">TRADITIONAL & CONTEMPORARY</h2>
          {/* <iframe  src="https://www.youtube.com/embed/cQKOQSJI2QA/sddefault.jpg&quot"></iframe> */}
          <p className="text-justify text-[2vw] small:text-[5vw] p-4">We wish to thank our customers, employees, vendors and our community for their work and support as we celebrate 20+ years at Hope Street. It has been an interesting and rewarding journey</p>
          <iframe className="small:w-[100%] small:h-64 medium:w-[80%] lg:w-[50%] h-96 self-center" src="https://www.youtube.com/embed/cQKOQSJI2QA?si=wpAsAnLtcZeD9HU3&rel=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

          <p className="text-justify text-[2vw] small:text-[5vw] p-4">After 20 years we present you India with a fresh new look, a creative menu offering a blend of contemporary and traditional favorites, a new kitchen & team elevating our food and service, and elegant lighting transforming the entire restaurant. Enjoy our Garden Bar and Patio in the summer and cozy fireplace seating in the winter</p>
          <img src="http://indiarestaurant.com/wp-content/uploads/2019/05/AU_180224_India-Staff__1838__SM.jpg" alt=""/>
       
          <h2 className="text-center text-[2vw] small:text-[5vw] mb-4">WHAT IS 21ST CENTURY CUISINE?</h2>
          <p className="text-justify text-[2vw] small:text-[5vw] p-4">India represents one of the oldest continuous civilization in human history, dating back 3300 BCE. It is ever-evolving and continues to do so today.</p>
          <p className="text-justify text-[2vw] small:text-[5vw] p-4">It is the largest democracy with over a billion people, numerous religions, languages and subcultures. Indian cuisine is anything but homogenous! Regions and religions make up a large portion of the cultural fabric of the food. The 21st century globalization has made all sorts of ingredients and techniques available to the Chefs in India. Today India produces more culinary graduates than any other country. They are full of creative energy and looking to the rest of the world to spice-up new ingredients to ‘Indianize’ them</p>
          <p className="text-justify text-[2vw] small:text-[5vw] p-4">America is a melting pot like India was over a 1000 years ago. Being in the US offers a chef a lot of exciting possibilities to play with the ingredients that are not commonly found in India. We are availing these opportunities to create an exciting menu that has a blend of traditional favorites like Chicken Tikka Masala and creative dishes like Bengal Fish Curry (made with Salmon that is not usually found in India). The goal is to present a creative, fresh, nutritious, tasty, flavorful and a balanced meal. Like the 21st century India, we are progressive with our cuisine and not bound by the ‘same-old’ mentality.</p>
          <h2 className="text-right mr-4 text-[2vw] small:text-[5vw] mb-4">~V.R.Kerlekar</h2>
        </div>
      </div>
    </div>
  );
};

export default page;
