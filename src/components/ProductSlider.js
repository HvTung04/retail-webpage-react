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

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [numberOfDots, setNumberOfDots] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Start loading
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateVisibleProducts = () => {
    let newVisibleProducts = 0;
    if (window.innerWidth < 768) {
      newVisibleProducts = 1;
    } else if (window.innerWidth < 1024) {
      newVisibleProducts = 2;
    } else if (window.innerWidth < 1280) {
      newVisibleProducts = 3;
    } else {
      newVisibleProducts = 4;
    }
    setVisibleProducts(newVisibleProducts);
    setNumberOfDots(Math.ceil(products.length - newVisibleProducts + 1));
  };

  useEffect(() => {
    updateVisibleProducts();
    const debouncedHandleResize = debounce(() => {
      updateVisibleProducts();
    }, 100);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [products.length]);

  const handleNext = () => {
    if (currentIndex + visibleProducts === products.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }
    setDotIndex((prevIndex) => (prevIndex + 1) % numberOfDots);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(products.length - visibleProducts);
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + products.length) % products.length
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
    [currentIndex, products.length]
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

  if (isLoading) {
    return (
      <div className="text-center text-3xl font-bold mt-5">Loading...</div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="bg-[#a6a6a6] text-black text-center py-2 text-xl font-bold">
          SẢN PHẨM
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
              currentIndex * (100 / visibleProducts)
            }%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full flex-shrink-0 px-2"
              style={{ flex: `0 0 ${100 / visibleProducts}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-0 p-2 text-white bg-gray-400 rounded-full"
          onClick={handlePrev}
        >
          <FaArrowLeft />
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-0 p-2 text-white bg-gray-400 rounded-full"
          onClick={handleNext}
        >
          <FaArrowRight />
        </button>
      </div>
      <div className="text-center pb-10">
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

export default ProductSlider;
