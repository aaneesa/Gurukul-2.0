import { useState } from "react";
import {
  Calculator,
  Atom,
  FlaskConical,
  BookOpen,
  Mic,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const SubjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    {
      name: "History",
      description: "आधुनिक भारत का इतिहास",
      chapters: 14,
      progress: 40,
      chaptersList: [
        "अध्याय 1: यूरोप में राष्ट्रवाद का उदय"
      ],
      icon: <BookOpen size={28} className="text-white/80" />,
    },
  ];

  const visibleSubjects = showAll ? subjects : subjects.slice(0, 3);

  return (
    <div className="w-full mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Your Subjects</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="cursor-pointer text-sm text-white/80 hover:underline"
        >
          {showAll ? "Show Less ↑" : "Show More →"}
        </button>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleSubjects.map((subject, index) => (
          <div
            key={index}
            onClick={() => setSelectedSubject(subject)}
            className="cursor-pointer p-6 rounded-2xl shadow-md border border-white/20 bg-black/30 hover:scale-105 transition-transform"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
                {subject.icon}
              </div>
              <span className="text-sm text-gray-300">
                {subject.chapters} Chapters
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white">{subject.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{subject.description}</p>

            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gray-300 rounded-full"
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="w-full max-w-3xl bg-black/90 border border-white/20 rounded-2xl shadow-lg p-6 flex gap-6">
            {/* Left side - icons */}
            <div className="flex flex-col items-center gap-6 border-r border-white/10 pr-6">
              <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition">
                <Mic className="text-white" size={28} />
              </button>
              <Link href="/chatbot">
                <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer">
                  <MessageSquare className="text-white" size={28} />
                </button>
              </Link>
            </div>

            {/* Right side - chapters */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  {selectedSubject.name}
                </h2>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="text-gray-400 hover:text-white text-lg"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-3">
                {selectedSubject.chaptersList.map((ch, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-lg bg-white/10 text-gray-200 hover:bg-white/20 transition"
                  >
                    {ch}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsSection;
