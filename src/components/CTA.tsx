'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <div
        className="relative bg-black border border-gray-800 rounded-xl overflow-hidden shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm20 0h1v1h-1V0zm0 20h1v1h-1v-1zM0 20h1v1H0v-1z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 py-12 md:px-14 md:py-16">
          {/* Tagline */}
          <div className="mb-6 flex items-center">
            <div className="w-8 h-px bg-white mr-4" />
            <span className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase">Exclusive Invitation</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-light text-white leading-tight tracking-tight mb-6">
            <span className="font-extralight text-white/80">You&apos;ve Been</span> <br />
            <span className="font-semibold relative inline-block text-white">
              Selected
              <span
                className={`absolute bottom-0 left-0 h-[1px] w-full bg-white transition-transform duration-700 origin-left ${
                  isHovered ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-300 font-light mb-10 max-w-xl">
            The academy identifies and cultivates exceptional talent. Those prepared to commit, persist through adversity, and build lasting value.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            {/* Button */}
            <div className="relative group w-fit">
              <Link href="/apply">
                <button className="relative px-8 py-3 border border-white text-white font-medium tracking-wide overflow-hidden transition-all duration-300 group hover:text-black rounded-sm">
                  <span className="relative z-10">APPLY NOW</span>
                  <div className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0" />
                </button>
              </Link>
            </div>

            {/* Application Status */}
            <div className="w-full md:w-auto">
              <div className="text-sm text-gray-400 mb-1 md:text-left text-center">Application Status</div>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_6px_1px_rgba(255,255,255,0.5)]" />
                  <span className="text-xs font-medium text-white tracking-wide">OPEN</span>
                </div>
                <div className="w-px h-4 bg-gray-600" />
                <div className="text-xs text-gray-400 font-medium tracking-wide">LIMITED CAPACITY</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-left space-y-3">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-white">Contact:</span>{' '}
                  <a href="mailto:support@theforgeacademy.in" className="hover:text-white underline transition">
                    support@theforgeacademy.in
                  </a>
                </div>
                <div className="text-xs text-gray-500 tracking-wide">
                  Commitment required &bull; Results guaranteed &bull; Elite network access
                </div>
                {/* Social Icons - Mobile only */}
                <div className="flex items-center mt-4 space-x-4 md:hidden">
                  <a 
                    href="https://www.instagram.com/theforge_academy?igsh=Y3BpMTVuMWgycmgy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://x.com/TheForgeAcadmy?t=xRQEpEEKtUNcEjPaED2t5w&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Social Icons - Desktop only */}
              <div className="hidden md:flex items-center space-x-4">
                <a 
                  href="https://www.instagram.com/theforge_academy?igsh=Y3BpMTVuMWgycmgy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://x.com/TheForgeAcadmy?t=xRQEpEEKtUNcEjPaED2t5w&s=09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-gray-700" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-gray-700" />

        {/* Edge line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>
    </section>
  );
}