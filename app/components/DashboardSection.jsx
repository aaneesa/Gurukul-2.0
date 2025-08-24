import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";

const DashboardSection = ({ userName }) => {
  const [quote, setQuote] = useState("Stay positive, work hard, make it happen!");
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
    <div className="w-full">
      {/* Greeting */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          {greeting}, {userName}! 
        </h1>
      </div>

      {/* Quote + Streak */}
      <div className="flex justify-center items-stretch gap-8 w-full">
        {/* Quote Section */}
        <div className="p-8 rounded-2xl shadow-md text-center w-1/2 border border-white/40 bg-black/30 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-3 text-white">
            Quote of the day
          </h2>
          <p className="text-lg text-white mb-6">"{quote}"</p>
        </div>
        
        <div className="p-8 rounded-2xl shadow-md text-center w-1/2 border border-white/40 bg-black/30 flex flex-col justify-center">
          <h2 className="flex items-center gap-2 justify-center text-2xl font-semibold mb-3 text-white">
            <FaFire/> Streak
          </h2>
          <p className="text-4xl font-bold text-gray-300">{streak} days</p>
          <p className="text-sm text-gray-300 mt-2">Keep going!</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
