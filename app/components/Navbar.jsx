"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center text-white mt-5 relative">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-4xl qwitcher-grypen-regular ml-8 mt-4 cursor-pointer">
          Gurukul 2.0
        </h1>
      </Link>

      {/* Tablet + Laptop Menu (always visible from md and up) */}
      <div className="hidden md:flex items-center gap-5 mt-4 mr-8 text-xl">
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

      {/* Mobile Hamburger (only < md) */}
      <div className="md:hidden mr-6 mt-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 right-6 bg-black/90 rounded-lg shadow-lg flex flex-col items-start p-6 gap-4 text-lg md:hidden z-50 w-[70%]">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/practice" onClick={() => setIsOpen(false)}>
            Practice
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link href="/auth" onClick={() => setIsOpen(false)}>
            <button
              className="bg-white/80 px-3 py-1 text-black rounded-md cursor-pointer shadow-md 
                     transition-colors duration-300 ease-in-out 
                     hover:bg-black hover:text-white"
            >
              Sign up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
