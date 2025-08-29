"use client";

import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    setSubmitted(true);

    // reset message after a few seconds (optional)
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-gray-400">
          We’d love to hear from you! Whether you have questions, feedback, or
          ideas — Gurukul 2.0 is always open for conversations.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Form */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Send Us a Message
          </h2>

          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200"
              >
                Send Message
              </button>
            </form>
          ) : (
            <p className="text-center text-white font-semibold text-lg">
              We will reach back to you soon!
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-neutral-900 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <a
              href="mailto:hello@gurukul2_0.in"
              className="flex items-center gap-2 hover:text-white"
            >
              <FaEnvelope className="text-base" /> hello@gurukul2_0.in
            </a>
          </div>
          <div className="bg-neutral-900 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
            <p className="text-gray-400">+91 99999 99999</p>
          </div>
          <div className="bg-neutral-900 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
            <p className="text-gray-400">
              Gurukul 2.0 HQ, Sonipat, Haryana, India 
            </p>
          </div>
          <div className="bg-neutral-900 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-200 hover:text-blue-500">
                Facebook
              </a>
              <a href="#" className="text-gray-200 hover:text-sky-500">
                Twitter
              </a>
              <a href="#" className="text-gray-200 hover:text-pink-500">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
