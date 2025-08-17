import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between text-white">
      <Link href="/">
        <h1 className="text-4xl qwitcher-grypen-regular ml-8 mt-4 cursor-pointer">
          Gurukul 2.0
        </h1>
      </Link>

      <div className="flex items-center gap-5 mt-4 mr-8 text-xl ">
        <Link
          href="/"
          className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
        >
          Home
        </Link>

        <Link
          href="/practice"
          className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
        >
          Practice
        </Link>

        <Link
          href="/about"
          className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
        >
          About
        </Link>

        <Link
          href="/contact"
          className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
        >
          Contact
        </Link>

        <Link href="/auth">
          <button
            className="bg-white/80 px-3 py-1 text-black rounded-md cursor-pointer shadow-md 
                   transition-colors duration-300 ease-in-out 
                   hover:bg-black hover:text-white"
          >
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
