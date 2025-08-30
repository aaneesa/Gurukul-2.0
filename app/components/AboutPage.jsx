"use client";

export default function AboutPage() {
  return (
    <div className="text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Gurukul 2.0
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Where tradition meets innovation. A modern learning platform that
          empowers students, fosters collaboration, and makes knowledge
          accessible to everyone.
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Our Mission
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Our mission is simple: to create a digital Gurukul that embraces
          technology while staying true to the roots of learning. Gurukul 2.0 is
          more than a platform – it’s a community that grows together.
        </p>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Innovation",
              desc: "Blending modern tools with timeless learning methods.",
            },
            {
              title: "Collaboration",
              desc: "Learning together, growing together.",
            },
            {
              title: "Growth",
              desc: "Focusing on personal, academic, and professional development.",
            },
            {
              title: "Simplicity",
              desc: "Designing an intuitive platform accessible to all.",
            },
          ].map((value, index) => (
            <div
              key={value.title}
              className={`bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-semibold text-black mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 ">
          Join us in shaping the future of education with Gurukul 2.0 – where
          knowledge meets innovation.
        </p>
        <div className="animate-fadeInUp delay-400">
          <button className="px-6 py-3 rounded-2xl shadow-lg bg-white text-black font-semibold transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
