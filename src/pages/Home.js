import React, { useEffect } from "react";
import ImageSlider from "../components/ImageSlider";
import { useLocation } from "react-router-dom";
import banner from "../assets/banner.png";
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
    <div>
      <ImageSlider />
      <div className="container mx-auto p-4">
        <div id="products-section">
          <ProductSlider />
        </div>
        <div id="services-section">
          <ServiceSlider />
        </div>
      </div>
      <img
        src={banner}
        alt="About Us"
        className="p-0 w-full h-auto shadow-lg mb-10"
      />
    </div>
  );
}

export default Home;
