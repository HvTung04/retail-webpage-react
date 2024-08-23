import React, { useState, useEffect } from "react";
import image1 from "../assets/display-imgs/display1.jpeg";
import image2 from "../assets/display-imgs/display2.jpg";
import image3 from "../assets/display-imgs/display3.JPG";

const images = [image1, image2, image3];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative w-full mb-12" style={{ height: 'calc(100vw * 9 / 16)' }}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)} // Change image on dot click
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
