import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full fixed top-2 z-10">
      <ul className="flex items-center justify-between w-[300px] mx-auto h-[4.5rem] bg-gray-100/70 border border-gray-200 backdrop-blur-[2px] sm:top-6 sm:h-[3.25rem] px-6 rounded-md">
        <Link to="/" className="hover:font-semibold transition-all ease-in-out">
          Home
        </Link>
        <Link
          to="/analysis"
          className="hover:font-semibold transition-all ease-in-out"
        >
          Analysis
        </Link>
        <Link
          to="/faq"
          className="hover:font-semibold transition-all ease-in-out"
        >
          FAQ
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
