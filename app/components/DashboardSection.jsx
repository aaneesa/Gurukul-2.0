"use client";
import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";

const hindiQuotes = [
  "कड़ी मेहनत का कोई विकल्प नहीं होता।",
  "सपने वो नहीं जो सोते वक्त आते हैं, सपने वो हैं जो आपको सोने नहीं देते।",
  "जहां चाह, वहां राह।",
  "हार मत मानो, बड़ी जीत में समय लगता है।",
  "सफलता एक दिन में नहीं मिलती, लेकिन एक दिन जरूर मिलती है।",
  "जो बदल सकता है वही आगे बढ़ सकता है।",
  "वक्त से पहले और किस्मत से ज्यादा कभी किसी को नहीं मिलता।",
  "यदि आप खुद पर विश्वास रखते हैं तो आप आधी लड़ाई जीत चुके हैं।",
  "असफलता से डरना नहीं, उससे सीखना है।",
  "जितना कठिन संघर्ष, उतनी शानदार जीत।"
];

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

  // Daily Hindi Quote (persists per-device using localStorage)
  useEffect(() => {
    try {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const todayKey = `${yyyy}-${mm}-${dd}`;

      const storedDate = localStorage.getItem("dailyQuoteDate");
      const storedIndex = localStorage.getItem("dailyQuoteIndex");

      let quoteIndex = 0;

      if (storedDate === todayKey && storedIndex !== null) {
        quoteIndex = parseInt(storedIndex, 10) % hindiQuotes.length;
      } else {
        // Simple deterministic rotation by date so all users see same quote per day
        // Hash: yyyy*10000 + mm*100 + dd, then mod quotes length
        const hash = yyyy * 10000 + parseInt(mm, 10) * 100 + parseInt(dd, 10);
        quoteIndex = hash % hindiQuotes.length;
        localStorage.setItem("dailyQuoteDate", todayKey);
        localStorage.setItem("dailyQuoteIndex", String(quoteIndex));
      }

      setQuote(hindiQuotes[quoteIndex]);
    } catch (err) {
      // Fallback in case localStorage is unavailable
      setQuote(hindiQuotes[0]);
    }
  }, []);

  // Daily Streak using localStorage
  useEffect(() => {
    try {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const storedStreak = parseInt(localStorage.getItem("streakCount") || "0", 10);
      const storedLastDateStr = localStorage.getItem("lastStreakDate");

      // First time ever
      if (!storedLastDateStr) {
        localStorage.setItem("streakCount", "1");
        localStorage.setItem("lastStreakDate", startOfToday.toISOString());
        setStreak(1);
        return;
      }

      const storedLastDate = new Date(storedLastDateStr);
      const startOfLast = new Date(storedLastDate.getFullYear(), storedLastDate.getMonth(), storedLastDate.getDate());

      const msInDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.floor((startOfToday - startOfLast) / msInDay);

      if (diffDays === 0) {
        // already checked in today
        setStreak(storedStreak);
        return;
      }

      if (diffDays === 1) {
        const newStreak = storedStreak + 1;
        localStorage.setItem("streakCount", String(newStreak));
        localStorage.setItem("lastStreakDate", startOfToday.toISOString());
        setStreak(newStreak);
        return;
      }

      // Missed one or more days -> reset to 1
      localStorage.setItem("streakCount", "1");
      localStorage.setItem("lastStreakDate", startOfToday.toISOString());
      setStreak(1);
    } catch (e) {
      // If localStorage blocked, keep in-memory value
      setStreak((s) => s || 0);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Enhanced Greeting */}
      <div className="text-center mb-8 p-8 rounded-2xl shadow-lg border border-white/20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-white mb-2">
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
