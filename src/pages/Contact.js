import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
        },
        (error) => {
          console.log("Failed to send email.", error.text);
        }
      );

    setFormData({
      name: "",
      phone: "",
      message: "",
    });
  };


  return (
    <div className="relative w-full">
      <div className="font-manrope bg-[#fbf284] text-black text-center py-5 text-3xl font-bold">
        LIÊN HỆ VỚI CHÚNG TÔI
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:max-w mx-auto">
        <p className="text-gray-800 my-4 md:w-1/3">
          Hãy điền thông tin của bạn và liên lạc với chúng tôi ngay để được nhận
          trợ giúp về dịch vụ và sản phẩm của Inox An Thuận Phát.{" "}
        </p>
        <form className="w-full md:w-2/3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Họ và tên"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Yêu cầu của bạn"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            ></textarea>
          </div >
          <div className="w-full flex justify-center">
             <button className="w-[200px] bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 transition-colors duration-300">
            Gửi
          </button>
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default ContactForm;