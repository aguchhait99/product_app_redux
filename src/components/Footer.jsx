import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1
          className="lg:text-3xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
         md:w-2/5"
        >
          <span className="text-purple-500">Product</span> App
        </h1>
        <div>
          <input
            type="text"
            placeholder="Write your issue."
            className="text-gray-800
           sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            className="bg-purple-600 hover:bg-purple-500 duration-300 px-5 py-2.5 font-[Poppins]
            rounded-md text-white md:w-auto w-full"
          >
            Submit
          </button>
        </div>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2020 All rights reserved.</span>
        <span>Terms and Privacy Policy</span>
        <span>Design by AKG</span>
      </div>
    </footer>
  );
};

export default Footer;