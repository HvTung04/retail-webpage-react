import React, { useEffect } from "react";
import ImageSlider from "../components/ImageSlider";
import { useLocation } from "react-router-dom";
import ProductSlider from "../components/ProductSlider";
import ServiceSlider from "../components/ServiceSlider";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/products") {
      const section = document.getElementById("products-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="container mx-auto p-4">
      <ImageSlider />
      <div id="products-section"><ProductSlider /></div>
      <div id="services-section"><ServiceSlider /></div>
      <img src="https://inox-anthuanphat.web.app/assets/display-imgs/display2.jpeg" alt="About Us" className="max-w-full h-auto rounded-lg shadow-lg"/>
    </div>
  );
}

export default Home;
