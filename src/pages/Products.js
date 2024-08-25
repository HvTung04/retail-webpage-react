import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ProductPages = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(3);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsArray);
        setTotalPages(Math.ceil(productsArray.length / productsPerPage));
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productsPerPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  if (isLoading) {
    return (
      <div className="text-center text-3xl font-bold mt-5">Loading...</div>
    );
  }

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    return (
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mb-5 h-12 w-12 mx-1 flex justify-center items-center rounded-full text-sm font-medium ${
              currentPage === index ? "bg-yellow-400" : "bg-gray-200"
            } text-black`}
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <div className="font-manrope bg-[#a6a6a6] text-black text-center py-5 text-3xl font-bold">
        SẢN PHẨM
      </div>
      <div className="w-full mx-auto overflow-hidden pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="w-full px-2">
              <ProductCard product={product} width="w-full" height="h-96"/>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            className="p-2 text-white bg-gray-800 rounded-full"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>
          {/* Integrate Pagination Component */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <button
            className="p-2 text-white bg-gray-800 rounded-full"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPages;