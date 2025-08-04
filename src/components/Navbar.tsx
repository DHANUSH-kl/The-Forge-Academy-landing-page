'use client';

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

// CSS for border tracing animation
const borderTracingStyles = `
  @keyframes borderTrace {
    0% {
      background-position: 0% 0%;
    }
    25% {
      background-position: 100% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  .border-trace::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.6) 0%, 
      rgba(255, 255, 255, 0.6) 20%, 
      transparent 40%, 
      transparent 60%,
      transparent 80%,
      transparent 100%
    );
    background-size: 200% 200%;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    animation: borderTrace 4s linear infinite;
    z-index: -1;
  }

  .border-trace-mobile::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.5) 0%, 
      rgba(255, 255, 255, 0.5) 20%, 
      transparent 40%, 
      transparent 60%,
      transparent 80%,
      transparent 100%
    );
    background-size: 200% 200%;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    animation: borderTrace 5s linear infinite;
    z-index: -1;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = borderTracingStyles;
  document.head.appendChild(styleSheet);
}

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openWaitlistPopup = () => {
    window.dispatchEvent(new CustomEvent("open-waitlist"));
  };

  return (
    <div className="relative w-full">
      {/* Background blur overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Main Navbar */}
      <nav className="relative z-50">
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* Mobile - Enhanced glassmorphic design */}
          <div className="lg:hidden mx-4 mt-4">
            <div className="relative group">
              {/* Subtle shine animation border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
              
              {/* Main glassmorphic background */}
              <div className="relative bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Subtle shine line across top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 rounded-2xl" />
                
                <div className="relative px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Link href="/" className="block group/logo">
                        <div className="relative">
                          <img
                            src="https://res.cloudinary.com/dpohmoogk/image/upload/v1753743706/lq3luz9kviin3rzymouz.png"
                            alt="logo"
                            className="h-10 w-10 object-contain rounded-xl cursor-pointer transition-all duration-300 group-hover/logo:scale-105"
                            style={{
                              filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.1))'
                            }}
                          />
                          {/* Subtle glow on hover */}
                          <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Link>
                    </div>

                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="group/menu relative p-3 text-white rounded-xl transition-all duration-300 hover:bg-white/10 overflow-hidden"
                    >
                      {/* Button background with shine effect */}
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 group-hover/menu:bg-white/15 group-hover/menu:border-white/20" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0 group-hover/menu:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative transition-transform duration-300 group-hover/menu:scale-110">
                        {isMobileMenuOpen ? (
                          <X className="w-5 h-5" />
                        ) : (
                          <Menu className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop - Enhanced glassmorphic design */}
          <div className="hidden lg:block">
            <div className="mx-6 mt-4">
              <div className="relative max-w-6xl mx-auto group">
                {/* Subtle shine animation border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Enhanced glassmorphic background */}
                <div className="relative bg-black/15 backdrop-blur-2xl border border-white/10 rounded-xl shadow-xl overflow-hidden">
                  {/* Shine line across top */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  
                  {/* Inner subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-white/3 rounded-xl" />
                  
                  <div className="relative px-6 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Link href="/" className="block group/logo">
                          <div className="relative">
                            <img
                              src="https://res.cloudinary.com/dpohmoogk/image/upload/v1753743706/lq3luz9kviin3rzymouz.png"
                              alt="logo"
                              className="h-9 w-9 object-contain rounded-lg cursor-pointer transition-all duration-300 group-hover/logo:scale-110"
                              style={{
                                filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.15)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                              }}
                            />
                            {/* Subtle glow on hover */}
                            <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 blur-sm" />
                          </div>
                        </Link>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Link
                          href="/apply"
                          className="group/apply relative px-5 py-2 text-white/90 font-medium rounded-lg transition-all duration-300 hover:text-white hover:scale-[1.02] overflow-hidden"
                        >
                          {/* Button background with enhanced effects */}
                          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 group-hover/apply:bg-white/15 group-hover/apply:border-white/25" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg opacity-0 group-hover/apply:opacity-100 transition-opacity duration-300" />
                          {/* Top shine line */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/apply:opacity-100 transition-opacity duration-300" />
                          
                          <span className="relative">Apply</span>
                        </Link>
                        
                        <button
                          onClick={openWaitlistPopup}
                          className="group/waitlist relative px-5 py-2 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                        >
                          {/* Enhanced button with subtle animation */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white rounded-lg shadow-lg transition-all duration-300 group-hover/waitlist:shadow-xl group-hover/waitlist:from-white group-hover/waitlist:to-white" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-lg opacity-0 group-hover/waitlist:opacity-100 transition-all duration-500" />
                          {/* Top shine effect */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                          {/* Subtle inner glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-lg opacity-0 group-hover/waitlist:opacity-100 transition-opacity duration-300" />
                          
                          <span className="relative">Join Waitlist</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Enhanced */}
        <div className={`lg:hidden fixed top-24 left-4 right-4 z-40 transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}>
          <div className="relative group">
            {/* Enhanced glassmorphic background with border tracing */}
            <div className="relative bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden border-trace-mobile">
              {/* Top shine line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl" />
              
              <div className="relative p-6 space-y-4">
                <Link
                  href="/apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group/apply-mobile relative w-full px-6 py-4 text-white/90 font-medium rounded-xl transition-all duration-300 hover:text-white block overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 group-hover/apply-mobile:bg-white/15 group-hover/apply-mobile:border-white/25" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0 group-hover/apply-mobile:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/apply-mobile:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative">Apply</span>
                </Link>
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openWaitlistPopup();
                  }}
                  className="group/waitlist-mobile relative w-full px-6 py-4 text-black font-semibold rounded-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl shadow-lg transition-all duration-300 group-hover/waitlist-mobile:shadow-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl opacity-0 group-hover/waitlist-mobile:opacity-100 transition-all duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-xl opacity-0 group-hover/waitlist-mobile:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative">Join Waitlist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}