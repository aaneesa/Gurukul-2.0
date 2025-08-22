import Link from "next/link";
import React from "react";
import { FaComment } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="relative mt-10">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-12 w-full max-w-screen-xl mx-auto gap-6 lg:gap-8">
          
          {/* Text Section */}
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start flex-1">
            <h4 className="font-semibold text-xs sm:text-sm text-gray-400 mb-2">
              CALL TO ACTION
            </h4>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white/80 leading-tight">
              Connect with Gurukul 2.0
            </h1>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white/80 leading-tight mb-6">
              to Redefine Learning.
            </h1>
          </div>

          {/* Button */}
          <div className="flex-shrink-0">
            <Link href="/contact">
              <button className="flex items-center justify-center gap-3 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded cursor-pointer shadow-md 
                                 hover:bg-gray-500 hover:text-white transition-colors text-sm sm:text-base md:text-lg">
                <FaComment className="text-base sm:text-lg md:text-xl" />
                <span className="font-medium">Contact Us</span>
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
