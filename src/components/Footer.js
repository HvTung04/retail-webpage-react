import React from "react";
import { Link } from "react-router-dom";
import { FaAddressCard } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#fff463] text-black py-2">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Contact Section */}
        <div className="w-full md:pt-0 space-y-1">
          <h3 className="relative font-bold mb-2">
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaAddressCard className="mr-2 text-blue-400" />
              <span>LIÊN HỆ</span>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-black to-transparent absolute left-0 right-0 bottom-0"></div>
          </h3>
          <p className="font-bold">
            CÔNG TY TNHH THƯƠNG MẠI SẢN XUẤT THỦY LINH
          </p>
          <p>
            <span className="font-semibold font-montserrat">Điện thoại:</span>{" "}
            02253 518 359{" "}
          </p>
          <p>
            <span className="font-semibold font-montserrat">Di động:</span> 0912
            331 599
          </p>
          <p>
            <span className="font-semibold font-montserrat">Email: </span>
            <a href="mailto:inoxthuylinh@gmail.com" className="underline">
              inoxthuylinh@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold font-montserrat">Cửa hàng:</span> 285
            Nguyễn Văn Linh, Kênh Dương, Lê Chân, Hải Phòng
          </p>
          <p>
            <span className="font-semibold font-montserrat">Văn phòng:</span> Số
            nhà 2 ngõ 311 Phủ Thượng Đoạn, TDP Thượng Đoạn Xá 1, Phường Đông Hải
            1, Quận Hải An, TP Hải Phòng, Việt Nam
          </p>
        </div>

        {/* Products Section */}
        <div className="pt-6 md:pt-0">
          <h3 className="font-bold mb-3 relative">
            SẢN PHẨM
            <div className="h-0.5 bg-gradient-to-r from-black to-transparent absolute left-0 right-0 bottom-0"></div>
          </h3>
          <ul>
            <li>
              <Link to="/products">VẬT TƯ INOX</Link>
            </li>
            <li>
              <Link to="/services">DỊCH VỤ GIA CÔNG INOX</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center border-black text-sm mt-2 pt-2 border-t border-spacing-0">
        <p className="font-semibold">
          © 2024 INOXTHUYLINH.VN. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
