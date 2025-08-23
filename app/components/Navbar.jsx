"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Handle redirect after authentication
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Redirect to practice page after successful authentication
      router.push("/practice");
    }
  }, [isSignedIn, isLoaded, router]);

  // Shared Clerk appearance configuration
  const clerkAppearance = {
    elements: {
      rootBox: "font-sans",
      card: "bg-gradient-to-br from-black via-gray-900 to-black border border-white/20 shadow-2xl backdrop-blur-sm",
      headerTitle: "text-white text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
      headerSubtitle: "text-gray-300",
  
      // 🔵 Primary buttons (covers Continue, Submit, etc.)
      formButtonPrimary:
        "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg",
      formButtonPrimaryText: "text-white font-semibold",
  
      // Secondary buttons
      formButtonSecondary:
        "bg-gradient-to-r from-transparent via-white/10 to-transparent text-white border border-white/30 hover:from-white/20 hover:to-white/10 font-semibold py-3 px-6 rounded-lg transition-all duration-300",
  
      // Fields
      formFieldInput:
        "bg-gradient-to-r from-white/5 to-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-gradient-to-r focus:from-white/10 focus:to-white/20",
      formFieldLabel: "text-white font-medium",
      formFieldLabelRow: "mb-2",
      formFieldInputShowPasswordButton: "text-white hover:text-gray-300",
      formFieldInputShowPasswordButtonIcon: "w-5 h-5",
  
      // Divider
      dividerLine: "bg-gradient-to-r from-transparent via-white/20 to-transparent",
      dividerText: "text-gray-300",
  
      // Footer links
      footerActionLink: "text-white hover:text-gray-300 underline",
  
      // Social buttons
      socialButtonsBlockButton:
        "bg-gradient-to-r from-white/20 to-white/10 border border-white/30 text-white hover:from-white/30 hover:to-white/20 rounded-lg px-4 py-3 transition-all duration-300 flex items-center justify-center gap-3 font-medium",
      socialButtonsBlockButtonText: "font-medium text-white",
      socialButtonsBlockButtonArrow: "text-white",
      socialButtonsBlockButtonIcon: "w-5 h-5",
  
      // Alerts
      alert: "bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-300 rounded-lg p-4",
      alertText: "text-red-300",
      alertIcon: "text-red-400",
  
      // Form structure
      formFieldRow: "mb-4",
      formFieldActionRow: "mt-2",
      footer: "mt-6 pt-4 border-t border-white/10",
      footerAction: "text-center",
      formHeader: "mb-6",
      formHeaderTitle: "text-center mb-2",
      formHeaderSubtitle: "text-center text-gray-400",
      formContent: "space-y-4",
      formActions: "mt-6 space-y-3",
      formButtonRow: "space-y-3",
      formButton: "w-full",
      formButtonText: "font-semibold",
      formButtonLoading: "opacity-70",
      formButtonDisabled: "opacity-50 cursor-not-allowed",
    },
    variables: {
      colorPrimary: "#3b82f6", // Tailwind blue-500
      colorBackground: "#000000",
      colorText: "#ffffff",
      colorTextSecondary: "#9ca3af",
      colorInputBackground: "rgba(255, 255, 255, 0.05)",
      colorInputText: "#ffffff",
      colorInputBorder: "rgba(255, 255, 255, 0.2)",
      colorSuccess: "#10b981",
      colorDanger: "#ef4444",
      borderRadius: "0.5rem",
      fontFamily: "inherit",
      fontSize: "1rem",
    },
  };
  

  return (
    <nav className="flex justify-between items-center text-white mt-5 relative">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-4xl qwitcher-grypen-regular ml-8 mt-4 cursor-pointer">
          Gurukul 2.0
        </h1>
      </Link>

      {/* Tablet + Laptop Menu */}
      <div className="hidden md:flex items-center gap-5 mt-4 mr-8 text-xl">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/practice" className="nav-link">Practice</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
        
        {/* Clerk Authentication */}
        {isSignedIn ? (
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        ) : (
          <SignUpButton 
            mode="modal"
            appearance={clerkAppearance}
          >
            <button className="btn-signup">Sign Up</button>
          </SignUpButton>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden mr-6 mt-4">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Menu with slide-in animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="fixed top-0 right-0 h-full w-[70%] bg-black/95 shadow-lg flex flex-col p-6 gap-6 text-lg md:hidden z-50"
          >
            {/* Cross Button inside drawer */}
            <button
              className="self-end mb-4"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            {/* Nav Links */}
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/practice" onClick={() => setIsOpen(false)}>Practice</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            
            {/* Clerk Authentication for Mobile */}
            {isSignedIn ? (
              <div className="flex justify-center">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </div>
            ) : (
              <SignUpButton 
                mode="modal"
                appearance={clerkAppearance}
              >
                <button className="btn-signup w-full">Sign Up</button>
              </SignUpButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: "";
          display: block;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s ease-in-out;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .btn-signup {
          background: rgba(255, 255, 255, 0.8);
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          color: black;
          font-weight: 500;
          transition: all 0.3s ease-in-out;
        }
        .btn-signup:hover {
          background: black;
          color: white;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
