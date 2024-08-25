import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductCard.css";

const ProductCard = ({ product, width = 'w-full', height = 'h-64' }) => {
  const [currentImage, setCurrentImage] = useState(product.images_path[0]);
  const navigate = useNavigate();

  const handleMouseEnter = (image) => {
    setCurrentImage(image);
  };

  const navigateToProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  const convertImagePath = (imagePath) => {
    const fullPath = `${process.env.PUBLIC_URL}${imagePath}`;
    return fullPath;
  };

  const handleImageError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/fallback-image.png`; // Specify your fallback image path
  };

  return (
    <div 
      className={`border border-black p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105 hover:bg-blue-200 ${width}`} 
      onClick={navigateToProductPage}
      style={{ maxWidth: width, maxHeight: height, height: height }} // Use inline styles for max dimensions
    >
      <img 
        src={convertImagePath(currentImage)} 
        alt={product.name} 
        className={`object-cover rounded-md w-full ${height}`} 
        onError={handleImageError} // Fallback mechanism
      />
      <h3 className="mt-2 text-xl font-bold line-clamp">{product.name}</h3>
      <p className="mt-1 text-gray-600 line-clamp">{product.description}</p>
      <div className="flex mt-4 space-x-2">
        {product.images_path.map((image_path, index) => (
          <img
            key={index}
            src={convertImagePath(image_path)}
            alt={`${product.name} ${index + 1}`}
            className="w-8 h-8 object-cover rounded-full cursor-pointer hover:border hover:border-gray-500"
            onMouseEnter={() => handleMouseEnter(image_path)}
            onError={handleImageError} // Fallback mechanism for thumbnails as well
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
