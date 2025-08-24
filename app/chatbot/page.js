"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Send, ArrowLeft } from "lucide-react";

const Chatbot = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex h-screen text-white bg-neutral-950 overflow-hidden relative">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="flex flex-col items-center justify-center p-6 flex-1">
        <h1 className="text-2xl mb-6">What's on the agenda today?</h1>

        <div className="flex items-center bg-neutral-800 rounded-full px-4 py-4 w-[700px] max-w-[90%] border border-white/70 relative">
          <input
            type="text"
            placeholder="Ask anything"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow bg-transparent outline-none text-gray-100 placeholder-gray-400"
          />

          {inputValue.trim() === "" ? (
            <Mic size={20} className="text-white ml-3 cursor-pointer" />
          ) : (
            <Send size={20} className="text-white ml-3 cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;