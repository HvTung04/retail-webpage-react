import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import About from './pages/About';
import ServicePage from './pages/ServicePage';
import { FaFacebookMessenger } from 'react-icons/fa';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      {/* Messenger Bubble */}
      <a href="https://chat.zalo.me/?phone=0912331599" target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
        <FaFacebookMessenger className="text-white text-2xl" />
      </a>
    </div>
  );
}

export default App;
