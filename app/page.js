"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex items-center justify-between space-x-6 overflow-hidden">
      <motion.img
        src="/saraswati.png"
        alt="Saraswati"
        initial={{ x: 0, y: 0, scale: 1.2, opacity: 0, translateX: "50%" }} 
        animate={{
          x: 0,
          y: [0, -15, 0],
          scale: 1,
          opacity: 1,
          translateX: "0%",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          y: {
            repeat: Infinity, 
            repeatType: "mirror",
            duration: 3, 
            ease: "easeInOut",
          },
        }}
        className="w-[600px] mt-20 pl-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeIn" }}
        className="flex flex-col gap-7"
      >
        <h1 className="text-white qwitcher-grypen-regular text-7xl whitespace-nowrap mr-100">
          Gurukul 2.0
        </h1>
        <p className="text-white qwitcher-grypen-regular text-3xl">
          Empowering students to master their exams,
          by <br />
          illuminating every step of their preparation journey.
        </p>
        <Link href="/practice">
          <button className="flex items-center gap-4 justify-center text-black font-medium bg-white/80 px-2 py-2 w-64 rounded-md text-xl qwitcher-grypen-regular cursor-pointer">
            Start Your Journey <FaArrowRight className="text-md" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
