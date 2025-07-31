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
