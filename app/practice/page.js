"use client"
import React, { useEffect, useState } from 'react'
import DashboardSection from '../components/DashboardSection';
import SubjectsSection from '../components/SubjectSection';
import { FaBrain, FaCube } from 'react-icons/fa';
import { LayoutDashboard, Mic } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const features = [

  {
    id: 1,
    icon: <FaBrain className='text-white/80' />,
    title: "AI-Powered MCQs",
    des: "Generate unlimited practice questions"
  },
  {
    id: 2,
    icon: <FaCube className='text-white/80' />,
    title: "Smart Flashcards",
    des: "Auto-generated from key concepts"
  },
  {
    id: 3,
    icon: <Mic className='text-white/80' />,
    title: "Voice Assistant",
    des: "Ask doubts with speech-to-text"
  },
  {
    id: 4,
    icon: <LayoutDashboard className='text-white/80' />,
    title: "Dashboard",
    des: "Your Personalised Dashboard to see your progress"
  }
]
const page = () => {
  const [quote, setQuote] = useState("Stay positive, work hard, make it happen!")
  const [streak, setStreak] = useState(0);
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);
  return (
    <>
      <Navbar/>
        <div className="min-h-screen mt-10 px-8">
      <DashboardSection userName="Aniket" />
      <SubjectsSection />
      <h1 className='text-white font-semibold text-2xl mt-6 mb-6'>Key Features</h1>
      <div className="flex gap-6 mt-4 justify-center items-stretch">
        {features.map((el, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center text-center gap-3 p-6 rounded-2xl shadow-md border border-white/20 bg-black/30 hover:scale-105 transition-transform"
          >
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
              {el.icon}
            </div>

            {/* Title */}
            <h1 className="text-lg font-semibold text-white">{el.title}</h1>

            {/* Description */}
            <p className="text-sm text-gray-300">{el.des}</p>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default page