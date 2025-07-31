"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface FeatureItem {
  badge: string;
  title: string;
  description: string;
}

type BlurTextProps = {
  text: string;
  delay?: number;
  className?: string;
};

const BlurText = ({ text, delay = 0, className = "" }: BlurTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1.2, delay: delay / 1000, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {text}
    </motion.div>
  );
};

const features: FeatureItem[] = [
  {
    badge: "01",
    title: "Run Real Companies",
    description: "Not case studies — you'll lead real projects with real stakes like you're the CEO"
  },
  {
    badge: "02", 
    title: "Earn Equity as You Learn",
    description: "Get rewarded with startup equity based on how you think, act and execute"
  },
  {
    badge: "03",
    title: "Switch Roles Weekly", 
    description: "From product to marketing to ops — rotate across departments and find your zone of genius"
  },
  {
    badge: "04",
    title: "Get Mentored by Founders",
    description: "Work under real entrepreneurs who tell you what actually works, not textbook theory"
  },
  {
    badge: "05",
    title: "Track Progress Like a Game",
    description: "Level up, earn rewards and rise through the ranks with our gamified platform (Coming Soon)"
  }
];

export default function WhatWeDo() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.04),
      transparent 70%
    )
  `;

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotation effect (only for desktop)
  useEffect(() => {
    if (isAutoPlaying && !isMobile) {
      intervalRef.current = setInterval(() => {
        setSelectedFeature(prev => (prev + 1) % features.length);
      }, 3500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleFeatureSelect = (index: number) => {
    setSelectedFeature(index);
    if (!isMobile) {
      setIsAutoPlaying(false);
      // Resume auto-play after 5 seconds of inactivity
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 min-h-[600px]">
      {/* Left: Feature Navigation */}
      <div className="space-y-8">
        <motion.p
          className="text-white/40 text-xl font-light leading-relaxed tracking-wide mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Revolutionary approach where theory meets practice in the most demanding environments.
        </motion.p>

        {/* Feature Selector */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1] 
              }}
              onClick={() => handleFeatureSelect(index)}
            >
              <div className="flex items-center gap-6 py-4 px-6 transition-all duration-500">
                {/* Badge */}
                <motion.div
                  className="text-2xl font-thin text-white/30 w-12 flex-shrink-0"
                  animate={{
                    color: selectedFeature === index 
                      ? "rgba(255,255,255,0.8)" 
                      : "rgba(255,255,255,0.3)",
                    scale: selectedFeature === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.badge}
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-xl font-light flex-1"
                  animate={{
                    color: selectedFeature === index 
                      ? "rgba(255,255,255,1)" 
                      : "rgba(255,255,255,0.6)",
                    x: selectedFeature === index ? 8 : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {feature.title}
                </motion.h3>

                {/* Progress Indicator */}
                <motion.div
                  className="w-16 h-px bg-white/20 relative overflow-hidden flex-shrink-0"
                  animate={{
                    backgroundColor: selectedFeature === index 
                      ? "rgba(255,255,255,0.4)" 
                      : "rgba(255,255,255,0.2)"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/60"
                    initial={{ x: "-100%" }}
                    animate={{
                      x: selectedFeature === index ? "0%" : "-100%"
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                  {selectedFeature === index && isAutoPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/20"
                      initial={{ x: "0%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 3.5, ease: "linear" }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Active Indicator */}
              <motion.div
                className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-white/40 via-white/60 to-white/40"
                initial={{ scaleY: 0 }}
                animate={{ 
                  scaleY: selectedFeature === index ? 1 : 0,
                  opacity: selectedFeature === index ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Feature Display */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
          {/* Background Elements */}
          <motion.div
            className="absolute inset-0 rounded-sm border border-white/5"
            animate={{
              borderColor: `rgba(255,255,255,${selectedFeature * 0.02 + 0.05})`
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Rotating Corner Elements */}
          <motion.div
            className="absolute top-0 left-0 w-16 h-16"
            animate={{ rotate: selectedFeature * 18 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/40 to-transparent" />
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-0 w-16 h-16"
            animate={{ rotate: -selectedFeature * 18 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/40 to-transparent" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-white/40 to-transparent" />
          </motion.div>

          {/* Center Content - Fixed alignment */}
          <div className="relative z-10 p-12 text-center w-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotateX: 20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-8 flex flex-col items-center"
              >
                {/* Large Badge - Fixed positioning */}
                <motion.div
                  className="text-8xl font-thin text-white/10 select-none leading-none"
                  animate={{ rotateY: selectedFeature * 15 }}
                  transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                  style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {features[selectedFeature].badge}
                </motion.div>

                {/* Feature Title - Better alignment */}
                <motion.h2
                  className="text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {features[selectedFeature].title}
                </motion.h2>

                {/* Feature Description - Better alignment */}
                <motion.p
                  className="text-white/60 text-lg font-light leading-relaxed text-center max-w-md mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {features[selectedFeature].description}
                </motion.p>

                {/* Animated Dots */}
                <motion.div
                  className="flex justify-center gap-2 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {features.map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 rounded-full bg-white/20"
                      animate={{
                        backgroundColor: index === selectedFeature 
                          ? "rgba(255,255,255,0.6)" 
                          : "rgba(255,255,255,0.2)",
                        scale: index === selectedFeature ? 1.5 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Orbiting Elements */}
          <motion.div
            className="absolute w-full h-full pointer-events-none"
            animate={{ rotate: selectedFeature * 72 }}
            transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  top: `${20 + i * 25}%`,
                  right: `${10 + i * 15}%`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );

  // Mobile Layout
  const MobileLayout = () => (
    <div className="space-y-8">
      <motion.p
        className="text-white/40 text-lg font-light leading-relaxed tracking-wide mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Revolutionary approach where theory meets practice in the most demanding environments.
      </motion.p>

      {/* Feature List with Inline Cards */}
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index}>
            {/* Feature Item */}
            <motion.div
            ref={(el: HTMLDivElement | null) => {
              if (el) featureRefs.current[index] = el;
                                }}

              className="relative group cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1] 
              }}
              onClick={() => handleFeatureSelect(index)}
            >
              <div className="flex items-center gap-4 py-4 px-4 transition-all duration-500">
                {/* Badge */}
                <motion.div
                  className="text-xl font-thin text-white/30 w-10 flex-shrink-0"
                  animate={{
                    color: selectedFeature === index 
                      ? "rgba(255,255,255,0.8)" 
                      : "rgba(255,255,255,0.3)",
                    scale: selectedFeature === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.badge}
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-lg font-light flex-1"
                  animate={{
                    color: selectedFeature === index 
                      ? "rgba(255,255,255,1)" 
                      : "rgba(255,255,255,0.6)",
                    x: selectedFeature === index ? 4 : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {feature.title}
                </motion.h3>

                {/* Mobile Indicator */}
                <motion.div
                  className="w-8 h-px bg-white/20 relative overflow-hidden flex-shrink-0"
                  animate={{
                    backgroundColor: selectedFeature === index 
                      ? "rgba(255,255,255,0.4)" 
                      : "rgba(255,255,255,0.2)"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/60"
                    initial={{ x: "-100%" }}
                    animate={{
                      x: selectedFeature === index ? "0%" : "-100%"
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                </motion.div>
              </div>

              {/* Active Indicator */}
              <motion.div
                className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-white/40 via-white/60 to-white/40"
                initial={{ scaleY: 0 }}
                animate={{ 
                  scaleY: selectedFeature === index ? 1 : 0,
                  opacity: selectedFeature === index ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </motion.div>

            {/* Mobile Card - Slides down from clicked item */}
            <AnimatePresence>
              {selectedFeature === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: -20 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mx-4 my-6 p-8 border border-white/10 rounded-sm relative">
                    {/* Background Elements */}
                    <motion.div
                      className="absolute inset-0 rounded-sm border border-white/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Corner Elements */}
                    <div className="absolute top-0 left-0 w-8 h-8">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/40 to-transparent" />
                      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/40 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 right-0 w-8 h-8">
                      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/40 to-transparent" />
                      <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-white/40 to-transparent" />
                    </div>

                    {/* Card Content */}
                    <div className="text-center space-y-6">
                      {/* Large Badge */}
                      <motion.div
                        className="text-6xl font-thin text-white/10 select-none leading-none"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {feature.badge}
                      </motion.div>

                      {/* Feature Title */}
                      <motion.h2
                        className="text-2xl font-light text-white leading-tight tracking-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {feature.title}
                      </motion.h2>

                      {/* Feature Description */}
                      <motion.p
                        className="text-white/60 text-base font-light leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {feature.description}
                      </motion.p>

                      {/* Dots Indicator */}
                      <motion.div
                        className="flex justify-center gap-2 pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {features.map((_, dotIndex) => (
                          <motion.div
                            key={dotIndex}
                            className="w-2 h-2 rounded-full bg-white/20"
                            animate={{
                              backgroundColor: dotIndex === index 
                                ? "rgba(255,255,255,0.6)" 
                                : "rgba(255,255,255,0.2)",
                              scale: dotIndex === index ? 1.5 : 1
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-black py-32 px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ background: spotlight.get() }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <BlurText
            text="WHAT WE DO"
            delay={0}
            className="text-6xl md:text-7xl lg:text-9xl font-light text-white mb-16 tracking-[-0.02em] leading-none"
          />

          <motion.div
            className="flex items-center gap-8 mb-12"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="h-px bg-gradient-to-r from-white/30 to-transparent flex-1" />
            <div className="w-2 h-2 bg-white/50 rotate-45" />
            <div className="h-px bg-gradient-to-l from-white/30 to-transparent flex-1" />
          </motion.div>
        </div>

        {/* Conditional Layout */}
        {isMobile ? <MobileLayout /> : <DesktopLayout />}

        {/* Bottom CTA */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >

            <Link href="/apply">
          <div className="inline-flex items-center gap-4 px-8 py-4 border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer group">
            <span className="text-white/80 font-light tracking-wider text-sm uppercase">
              Experience the Future
            </span>
            <motion.div
              className="w-6 h-px bg-white/60"
              animate={{ width: selectedFeature !== null ? 10 : 6 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}