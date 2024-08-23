import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ProductPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ id: doc.id, ...doc.data() });
        });
        const product = productsArray.find((p) => p.id === id);
        setProduct(product);
        if (product.images_path && product.images_path.length > 0) {
          setCurrentImage(product.images_path[0]);
        } else {
          setCurrentImage('path/to/default/image.png');
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (image) => {
    setCurrentImage(image); 
  };

  if (isLoading) {
    return <div className="text-center text-3xl font-bold mt-5">Loading...</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className=" text-4xl font-bold text-center mb-4">{product.name}</h1> */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex flex-col items-center md:w-1/2">
          <img 
            src={`https://inox-anthuanphat.web.app/${currentImage}`} 
            alt={product.name} 
            className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg"
          />
          <div className="flex space-x-2">
            {product.images_path.map((image, index) => (
              <img
                key={index}
                src={`https://inox-anthuanphat.web.app/${image}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover cursor-pointer border-2 border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8 mt-[100px]">
          <h2 className="text-4xl font-bold mb-4 text-center">{product.name}</h2>
          <p className="leading-relaxed text-gray-600">{product.detail}</p>
          <h2 className="text-2xl font-bold mb-4">Thông số:</h2>
          <p className="ml-10 leading-relaxed text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;