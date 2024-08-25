import React from "react";
import image from "../assets/display-imgs/company.jpg";
import "./About.css";

const About = () => {
  return (
    <div>
      <div className="relative w-full font-manrope bg-[#a6a6a6] text-black text-center py-5 text-3xl font-bold">
        VỀ CHÚNG TÔI
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center p-4">
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 font-manrope">
            Inox An Thuận Phát
          </h1>
          <p className="mb-2">
            Welcome to our website. We are a team dedicated to providing the
            best services in our industry. Our mission is to deliver outstanding
            results and ensure our customers are satisfied with our work. With
            years of experience, we pride ourselves on our expertise and
            professionalism.
          </p>
          <p>
            Our team is composed of skilled professionals who are passionate
            about what they do. We believe in continuous learning and
            improvement to serve our clients better. Thank you for choosing us!
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <img
            src={image}
            alt="About Us"
            className="w-2/3 h-auto shadow-lg  border-4 border-gray-200"
            style={{ maxWidth: "80%", margin: "100px 50px 20px auto" }}
          />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center p-4 mt-8">
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <img
            src={image}
            alt="Our Team"
            className="md:w-[300px] md:h-[300px] w-auto h-auto shadow-lg border-4 border-gray-200 rounded-full"
            style={{ maxWidth: "80%", margin: "100px auto 20px 50px" }}
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 font-manrope">
            Meet Our Team
          </h1>
          <p className="mb-2">
            Our team is our most valuable asset. Each member brings a unique set
            of skills and expertise to the table, allowing us to offer a wide
            range of services and solutions. We are committed to excellence and
            strive to exceed our clients' expectations on every project.
          </p>
          <p>
            We encourage a culture of innovation, collaboration, and respect,
            fostering an environment where ideas can flourish. Our team's
            dedication and hard work are the foundation of our success. Get to
            know the people who make it all happen.
          </p>
        </div>
        
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center p-4">
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 font-manrope">
            Inox An Thuận Phát
          </h1>
          <p className="mb-2">
            Welcome to our website. We are a team dedicated to providing the
            best services in our industry. Our mission is to deliver outstanding
            results and ensure our customers are satisfied with our work. With
            years of experience, we pride ourselves on our expertise and
            professionalism.
          </p>
          <p>
            Our team is composed of skilled professionals who are passionate
            about what they do. We believe in continuous learning and
            improvement to serve our clients better. Thank you for choosing us!
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <img
            src={image}
            alt="About Us"
            className="w-2/3 h-auto shadow-lg  border-4 border-gray-200"
            style={{ maxWidth: "80%", margin: "100px 50px 20px auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
