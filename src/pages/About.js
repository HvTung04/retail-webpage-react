import React from 'react';
import image from '../assets/display-imgs/company.jpg'

const About = () => {
  return (
    <div>
       <div className="relative w-full font-manrope bg-[#fbf284] text-black text-center py-5 text-3xl font-bold">
        VỀ CHÚNG TÔI
      </div>
    <div className="flex flex-wrap md:flex-nowrap justify-center items-center p-4 gap-4">
      
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4 font-manrope">Inox An Thuận Phát</h1>
        <p className="mb-2">Welcome to our website. We are a team dedicated to providing the best services in our industry. Our mission is to deliver outstanding results and ensure our customers are satisfied with our work. With years of experience, we pride ourselves on our expertise and professionalism.</p>
        <p>Our team is composed of skilled professionals who are passionate about what they do. We believe in continuous learning and improvement to serve our clients better. Thank you for choosing us!</p>
      </div>
      <div className="flex-1">
        <img src={image} alt="About Us" className="max-w-full h-auto rounded-lg shadow-lg"/>
      </div>
    </div>
    </div>
   
  );
};

export default About;