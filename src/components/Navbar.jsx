import React, { useState } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {cart} = useSelector(state=>state?.carts)
  let Links = [
    { name: "HOME", link: "/" },
    { name: "CONTACT", link: "/contact" },
  ];
  const [open, setOpen] = useState(false);

  // Search
  const [query, setQuery] = useState("");
  const nav = useNavigate()
  const handleSearch = () => {
      if (query.trim() !== '') {
        nav(`/search/${query}`); 
    }
  };

  return (
    <div className="shadow-md w-full fixed-top top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-2xl text-purple-700 mr-1 pt-2">Product</span>
          <span className="text-2xl  mr-1 pt-2">App</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e)=>{
              if (e.key==='Enter') {
                handleSearch()
              }
            }}
          />
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="md:ml-8 text-xl md:my-0 my-7">
          <Link
                to='/cart'
                className="text-gray-800 hover:text-gray-400 duration-500
                relative inline-flex"
              >
                CART <span class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cart?.length}</span>
              </Link>
          </li>
          <Button>Login</Button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
