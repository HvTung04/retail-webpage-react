import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css"

function Header() {
  return (
    <header className="bg-gray-100 border-b border-gray-300">
      <div className="font-manrope container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center mb-4 md:mb-0">
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-20" />
            <h1 className="md:text-xl font-bold text-[#574b4b] font-montserrat">INOX AN THUẬN PHÁT</h1>
          </div>
        </Link>

        {/* Middle Text Section */}
        <div className="flex-col items-center xl:pr-[200px] mb-4 md:mb-0 hidden 2xl:flex text-center"> {/* Centered text */}
          <h2 className="text-l text-gray-700">NHẬP KHẨU & CUNG ỨNG</h2>
          <div className="gradient-line my-2 w-full" />
          <h3 className="text-xl text-gray-600">VẬT TƯ INOX VÀ PHỤ KIỆN</h3>
        </div>

        {/* Navigation Section */}
        <nav className="font-montserrat font-bold md:ml-5 text-sm flex md:text-xl lg:mr-20 md:flex-row lg:space-x-20 space-x-4"> {/* Added space between links */}
          <Link className="hover:text-red-600" to="/about">
            GIỚI THIỆU
          </Link>
          <Link className="hover:text-red-600" to="/products">
            SẢN PHẨM
          </Link>
          <Link className="hover:text-red-600" to="/services">
            DỊCH VỤ
          </Link>
          <Link className="hover:text-red-600" to="/contact">
            TƯ VẤN
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
