'use client';

import React from "react";
import { motion } from "framer-motion";
import Dither from "./Dither";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-12">
        <div className="max-w-full text-left">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-1.5">
              <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-white/90">
                Founder&apos;s Journey
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.15] tracking-tight mb-6"
          >
            The Only Academy Where <br className="hidden md:block" />
            <span className="inline-block text-white">Failure is Mandatory</span>
          </motion.h1>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 space-y-2"
          >
            <p className="text-lg sm:text-xl font-medium text-white">
              Real teams. Real clients. Real equity.
            </p>
            <p className="text-base sm:text-lg text-white/80 font-normal">
              This is how founders are forged.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/apply">
              <button className="px-6 py-3 bg-white text-black font-semibold text-sm sm:text-base rounded-full hover:bg-white/90 transition-all duration-300">
                Apply
              </button>
            </Link>
            <button
              onClick={() => window.dispatchEvent(new Event("open-waitlist"))}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-base rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            >
              Join Waitlist
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
