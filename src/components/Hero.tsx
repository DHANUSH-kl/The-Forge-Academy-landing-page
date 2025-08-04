'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Beams from "./Beams"; // Ensure this path is correct
import ShinyText from './ShinyText';

export function Hero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen overflow-hidden bg-black text-white">
      {/* Beams Background */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={3}
          beamHeight={13}
          beamNumber={10}
          lightColor="#ffffff"
          speed={5}
          noiseIntensity={2}
          scale={0.25}
          rotation={25}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-4 sm:px-6 lg:px-12">
        <div className="max-w-full text-left">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 sm:mb-6"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 sm:px-5 sm:py-1.5">
              <span className="text-[10px] sm:text-xs lg:text-sm font-medium tracking-wider uppercase text-white/90">
                Founder&apos;s Journey
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] sm:leading-[1.15] tracking-tight mb-4 sm:mb-6"
            style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            The Only Academy Where <br className="hidden sm:block" />

            <button
              className=" sm:w-auto px-5 py-2  sm:px-3 sm:py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-black text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] sm:leading-[1.15] tracking-tight mb-3 sm:mb-4 md:mb-6 rounded-full hover:border-white/30 transition-all duration-300 mr-2 sm:mr-3 mt-2 sm:mt-3"
            >
              <ShinyText text="Failure" disabled={false} speed={2} className="custom-class" />
            </button>


            <span className="inline-block text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              is Mandatory
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 sm:mb-8 lg:mb-10 space-y-1 sm:space-y-2"
          >
            <p className="text-sm sm:text-lg lg:text-xl font-semibold text-white leading-relaxed">
              Real teams. Real clients. Real equity.
            </p>
            <p className="text-xs sm:text-base lg:text-lg text-white/80 font-normal leading-relaxed">
              We Make You Know
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link href="/apply">
              <button className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-black font-semibold text-sm sm:text-base rounded-full hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl">
                Apply
              </button>
            </Link>
            <button
              onClick={() => window.dispatchEvent(new Event("open-waitlist"))}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-base rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] transition-all duration-300"
            >
              Join Waitlist
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}