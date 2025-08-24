"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center text-white mt-5 relative">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-4xl poppins-medium ml-8 mt-4 cursor-pointer">
          Gurukul AI
        </h1>
      </Link>

      {/* Tablet + Laptop Menu */}
      <div className="hidden md:flex items-center gap-5 mt-4 mr-8 text-xl">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/practice" className="nav-link">Practice</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
        <Link href="/auth">
          <button className="btn-signup">Sign up</button>
        </Link>
      </div>

      <div className="md:hidden mr-6 mt-4">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={32} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="fixed top-0 right-0 h-full w-[70%] bg-black/95 shadow-lg flex flex-col p-6 gap-6 text-lg md:hidden z-50"
          >
            <button
              className="self-end mb-4"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/practice" onClick={() => setIsOpen(false)}>Practice</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/auth" onClick={() => setIsOpen(false)}>
              <button className="btn-signup">Sign up</button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: "";
          display: block;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s ease-in-out;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .btn-signup {
          background: rgba(255, 255, 255, 0.8);
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          color: black;
          font-weight: 500;
          transition: all 0.3s ease-in-out;
        }
        .btn-signup:hover {
          background: black;
          color: white;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
