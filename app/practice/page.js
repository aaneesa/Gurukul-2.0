"use client"
import React, { useEffect, useState } from 'react'
import DashboardSection from '../components/DashboardSection'
import SubjectsSection from '../components/SubjectSection'
import { FaBrain, FaCube } from 'react-icons/fa'
import { LayoutDashboard, Mic } from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'
import { useUser } from '@clerk/nextjs'

const features = [
  { id: 1, icon: <FaBrain className='text-white/80' />, title: "AI-Powered MCQs", des: "Generate unlimited practice questions" },
  { id: 2, icon: <FaCube className='text-white/80' />, title: "Smart Flashcards", des: "Auto-generated from key concepts" },
  { id: 3, icon: <Mic className='text-white/80' />, title: "Voice Assistant", des: "Ask doubts with speech-to-text" },
  { id: 4, icon: <LayoutDashboard className='text-white/80' />, title: "Dashboard", des: "Your Personalised Dashboard to see your progress" }
]

const page = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const [streak, setStreak] = useState(0)
  const [greeting, setGreeting] = useState("Hello")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  const getUserName = () => {
    if (isLoaded && isSignedIn && user) {
      return user.firstName ||
        user.fullName?.split(' ')[0] ||
        user.username ||
        user.emailAddresses?.[0]?.emailAddress?.split('@')[0] ||
        "User"
    }
    return "User"
  }

  if (!isLoaded) {
    return (
      <ProtectedRoute>
        <Navbar/>
        <div className="min-h-screen mt-10 px-8 flex items-center justify-center">
          <div className="text-white text-xl">Loading your personalized experience...</div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!isSignedIn) {
    return (
      <ProtectedRoute>
        <Navbar/>
        <div className="min-h-screen mt-10 px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-xl mb-4">Please sign in to access your personalized practice experience</div>
            <div className="text-gray-300">You'll be redirected to the sign-in page...</div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Navbar/>
      <div className="min-h-screen mt-10 px-8">
        <DashboardSection userName={getUserName()} />
        <SubjectsSection />
        <h1 className='text-white font-semibold text-2xl mt-6 mb-6'>Key Features</h1>
        <div className="flex gap-6 mt-4 justify-center items-stretch">
          {features.map((el, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center text-center gap-3 p-6 rounded-2xl shadow-md border border-white/20 bg-black/30 hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
                {el.icon}
              </div>
              <h1 className="text-lg font-semibold text-white">{el.title}</h1>
              <p className="text-sm text-gray-300">{el.des}</p>
            </div>
          ))}
        </div>
        <Footer/>
      </div>
    </ProtectedRoute>
  )
}

export default page
