'use client';


import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openWaitlistPopup = () => {
    window.dispatchEvent(new CustomEvent("open-waitlist"));
  };

  const goToApply = () => {
    // This function is no longer needed as we'll use Link components
  };

  return (
    <div className="relative w-full">
      {/* Background blur overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Main Navbar */}
      <nav className="relative z-50">
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* Mobile - Keep glassmorphic card design (NO CHANGES) */}
          <div className="lg:hidden mx-4 mt-4">
            <div className="relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 rounded-2xl" />
              
              <div className="relative px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Link href="/" className="block">
                      <img
                        src="https://res.cloudinary.com/dpohmoogk/image/upload/v1753743706/lq3luz9kviin3rzymouz.png"
                        alt="logo"
                        className="h-10 w-10 object-contain rounded-xl cursor-pointer"
                      />
                    </Link>
                  </div>

                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="relative p-3 text-white rounded-xl transition-all duration-200 hover:bg-white/10"
                  >
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl" />
                    <div className="relative">
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

          {/* Desktop - Smaller and more subtle design */}
          <div className="hidden lg:block">
            <div className="mx-6 mt-4">
              <div className="relative max-w-6xl mx-auto">
                {/* Enhanced glassmorphic background */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 rounded-xl" />
                
                <div className="relative px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Link href="/" className="block">
                        {/* Very subtle drop shadow effect for logo */}
                        <img
                          src="https://res.cloudinary.com/dpohmoogk/image/upload/v1753743706/lq3luz9kviin3rzymouz.png"
                          alt="logo"
                          className="h-9 w-9 object-contain rounded-lg shadow-sm cursor-pointer"
                          style={{
                            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))'
                          }}
                        />
                      </Link>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Link
                        href="/apply"
                        className="group relative px-5 py-2 text-white/90 font-medium rounded-lg transition-all duration-300 hover:text-white hover:scale-[1.02]"
                      >
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20" />
                        <span className="relative">Apply</span>
                      </Link>
                      
                      <button
                        onClick={openWaitlistPopup}
                        className="group relative px-5 py-2 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">Join Waitlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu (NO CHANGES) */}
        <div className={`lg:hidden fixed top-24 left-4 right-4 z-40 transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}>
          <div className="relative">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 rounded-2xl" />
            
            <div className="relative p-6 space-y-4">
              <Link
                href="/apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative w-full px-6 py-4 text-white/90 font-medium rounded-xl transition-all duration-300 hover:text-white block"
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20" />
                <span className="relative">Apply</span>
              </Link>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openWaitlistPopup();
                }}
                className="group relative w-full px-6 py-4 text-black font-semibold rounded-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Join Waitlist</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}