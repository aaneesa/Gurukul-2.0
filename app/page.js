"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Contact from "./components/Contact";
import Features from "./components/Features";
import useMediaQuery from "./components/Detect";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  const isTabletOrMobile = useMediaQuery(1024);
  return (
    <>
      <Navbar />
      <section className="min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between overflow-hidden">
          <motion.img
            src="/saraswati.png"
            alt="Saraswati"
            initial={{
              opacity: 0,
              scale: isTabletOrMobile ? 1 : 1.2,
              y: isTabletOrMobile ? 20 : 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              y: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: isTabletOrMobile ? 4 : 3,
                ease: "easeInOut",
              },
            }}
            className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[600px] mt-6 sm:mt-10 md:mt-14 lg:mt-20 px-2 sm:px-4 md:px-6 lg:pl-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeIn" }}
            className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-center lg:items-start text-center lg:text-left mt-6 md:mt-10 lg:mt-0"
          >
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl whitespace-nowrap poppins-medium lg:mr-100">
              Gurukul 2.0
            </h1>
            <p className="text-white poppins-medium text-base sm:text-lg md:text-2xl lg:text-3xl px-3 md:px-0">
              Empowering students to master their exams,
              by <br className="hidden sm:block" />
              illuminating every step of their preparation journey.
            </p>
            <Link href="/practice">
              <button className="flex items-center gap-2 sm:gap-3 justify-center text-black font-medium bg-white/80 px-3 py-2 w-48 sm:w-56 md:w-64 lg:w-64 rounded-md text-base sm:text-lg md:text-xl lg:text-xl poppins-medium cursor-pointer">
                Start Your Journey <FaArrowRight className="text-md" />
              </button>
            </Link>
          </motion.div>
        </div>

        <Features />
        <Contact />
        <Footer />
      </section>
    </>
  );
}
