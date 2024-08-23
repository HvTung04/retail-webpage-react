import React, { useState, useCallback, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const ServiceSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleServices, setVisibleServices] = useState(4);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [numberOfDots, setNumberOfDots] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true); // Start loading
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const servicesArray = [];
        querySnapshot.forEach((doc) => {
          servicesArray.push({ id: doc.id, ...doc.data() });
        });
        setServices(servicesArray);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const updateVisibleServices = () => {
    let newVisibleServices = 0;
    if (window.innerWidth < 768) {
      newVisibleServices = 1;
    } else if (window.innerWidth < 1024) {
      newVisibleServices = 2;
    } else if (window.innerWidth < 1280) {
      newVisibleServices = 3;
    } else {
      newVisibleServices = 4;
    }
    setVisibleServices(newVisibleServices);
    setNumberOfDots(Math.ceil(services.length - newVisibleServices + 1));
  };

  useEffect(() => {
    updateVisibleServices();
    const debouncedHandleResize = debounce(() => {
      updateVisibleServices();
    }, 100);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [services.length]);

  const handleNext = () => {
    if (currentIndex + visibleServices === services.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }
    setDotIndex((prevIndex) => (prevIndex + 1) % numberOfDots);
  };
  console.log(currentIndex);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(services.length - visibleServices);
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + services.length) % services.length
      );
    }
    setDotIndex((prevIndex) => (prevIndex - 1 + numberOfDots) % numberOfDots);
  };

  const debouncedHandleScroll = useCallback(
    debounce((direction) => {
      if (direction > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }, 250),
    [currentIndex, services.length]
  );

  const handleWheelEvent = (e) => {
    if (isMouseOver) {
      e.preventDefault();
      e.stopPropagation();
      debouncedHandleScroll(e.deltaY);
    }
  };

  useEffect(() => {
    const sliderElement = document.querySelector("slider");
    if (sliderElement) {
      const handleWheel = (e) => handleWheelEvent(e);
      sliderElement.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        sliderElement.removeEventListener("wheel", handleWheel, {
          passive: false,
        });
      };
    }
  }, [handleWheelEvent]);

  return (
    <div className="relative w-full"><div className="bg-[#fbf284] text-black text-center py-2 text-xl font-bold">
          DỊCH VỤ
        </div>
      <div
        className="slider w-full mx-auto overflow-hidden pt-10"
        onWheel={handleWheelEvent}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        
        <div
          className="flex transition-transform duration-500 ease-in-out pb-10"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / visibleServices)
            }%)`,
          }}
        >
          {services.map((service) => (
            <div
              key={services.id}
              className="w-full flex-shrink-0 px-2"
              style={{ flex: `0 0 ${100 / visibleServices}%` }}
            >
              <ProductCard product={service} />
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-0 p-2 text-white bg-gray-800 rounded-full"
          onClick={handlePrev}
        >
          <FaArrowLeft />
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-0 p-2 text-white bg-gray-800 rounded-full"
          onClick={handleNext}
        >
          <FaArrowRight />
        </button>
      </div>
      <div className="text-center mt-3 pb-10">
        {Array.from({ length: numberOfDots }).map((_, index) => (
          <span
            key={index}
            className={`inline-block h-2 w-2 mx-1 rounded-full ${
              index === dotIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceSlider;
