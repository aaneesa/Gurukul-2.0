"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Features = () => {
  const lessons = [
    {
      id: 1,
      icon: "/chatspace (2).png",
      title: "Your Own chatspace",
      points: [
        "Tailored responses designed just for you.",
        "Get quick and accurate answers anytime.",
        "An intelligent assistant that learns and improves with you.",
      ],
    },
    {
      id: 2,
      icon: "/Personalized learning (2).png",
      title: "Personalized Learning",
      points: [
        "Content that adjusts to your pace and goals.",
        "Track strengths and improve on weaker areas.",
        "Learn with materials curated just for your journey.",
      ],
    },
    {
      id: 3,
      icon: "/Dynamic flashcards.png",
      title: "Dynamic Flahcards",
      points: [
        "Key takeaways from conversations turned into flashcards.",
        "Revise important concepts anytime with bite-sized cards.",
        "Engage with flashcards that adapt to your progress.",
      ],
    },
  ];

  return (
    <div className="text-white flex flex-col lg:flex-row mt-20 lg:mt-41">
      {/* Heading */}
      <div className="flex items-center justify-center w-full lg:w-1/4 mb-10 lg:mb-0">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide 
                     lg:[writing-mode:vertical-rl] lg:rotate-180 lg:ml-50 text-center lg:text-left"
        >
          WHAT YOU WILL GET ?
        </motion.h1>
      </div>

      {/* Features Section */}
      <div className="relative w-full lg:w-3/4 py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8">
        {/* Timeline line only on laptops */}
        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-[2px] bg-white ml-15"></div>

        <div className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16 lg:ml-50">
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              className="flex flex-col sm:flex-row items-center sm:items-start relative text-center sm:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: lesson.id * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Number Circle */}
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white font-bold rounded-full z-10 text-lg sm:text-xl mt-2">
                {lesson.id}.
              </div>

              {/* Content */}
              <div className="sm:ml-6 flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mt-4 sm:mt-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    delay: lesson.id * 0.2,
                  }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={lesson.icon}
                    alt={lesson.title}
                    width={80}
                    height={80}
                    className="object-contain mt-3 sm:mt-5"
                  />
                </motion.div>

                <div className="mt-4 sm:mt-5 sm:ml-4">
                  <h3 className="text-xs sm:text-sm text-gray-300">
                    Feature {lesson.id}
                  </h3>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                    {lesson.title}
                  </h2>
                  <ul className="mt-2 sm:mt-3 space-y-1 text-gray-200 list-disc list-inside text-sm sm:text-base md:text-lg lg:text-xl">
                    {lesson.points.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
