"use client";
import React, { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface CardItem {
  category: string;
  highlights: string[];
  subtitle: string;
}

type BlurTextProps = {
  text: string;
  delay?: number;
  className?: string;
};

interface CardProps {
  item: CardItem;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

const items: CardItem[] = [
  {
    category: "Students tired of theory",
    subtitle: "Academic Excellence Redefined",
    highlights: ["Hands-on experience", "Real startup environments"]
  },
  {
    category: "Aspiring entrepreneurs",
    subtitle: "Vision Meets Execution",
    highlights: ["Build without risking money", "Learn by doing"]
  },
  {
    category: "Creators & hustlers",
    subtitle: "Innovation Without Limits",
    highlights: ["Explore startup roles", "Expand your expertise"]
  },
  {
    category: "Action-based learners",
    subtitle: "Performance Over Theory",
    highlights: ["Learn by doing", "Immersive approach"]
  }
];

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

export default function WhoIsFor() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen bg-black py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-24">
          <BlurText
            text="WHO IT&apos;S FOR"
            delay={0}
            className="text-7xl md:text-9xl font-light text-white mb-12 tracking-[-0.02em] leading-none"
          />

          <motion.div
            className="flex items-center gap-8 mb-8"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="h-px bg-gradient-to-r from-white/40 to-transparent flex-1" />
            <div className="w-2 h-2 bg-white/60 rotate-45" />
            <div className="h-px bg-gradient-to-l from-white/40 to-transparent flex-1" />
          </motion.div>

          <motion.p
            className="text-white/50 text-xl font-light max-w-3xl leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Elite pathways designed for those who demand excellence and refuse to settle for conventional learning experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {items.map((item, index) => (
            <Card
              key={index}
              item={item}
              index={index}
              isActive={activeCard === index}
              onActivate={() => setActiveCard(index)}
              onDeactivate={() => setActiveCard(null)}
            />
          ))}
        </div>

        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 border border-white/20 rounded-sm hover:border-white/40 transition-colors duration-500 cursor-pointer group">
            <span className="text-white/80 font-light tracking-wider text-sm uppercase">Begin Assessment</span>
            <div className="w-6 h-px bg-white/60 group-hover:w-8 transition-all duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ item, index, isActive, onActivate, onDeactivate }: CardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const spotlight = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.06),
      transparent 70%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
    >
      <motion.div
        className="relative h-96 lg:h-[420px] border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden"
        style={{ background: spotlight }}
        animate={{
          borderColor: isActive ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.10)"
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute top-0 left-0 w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/30 to-transparent" />
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20">
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/30 to-transparent" />
          <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-white/30 to-transparent" />
        </div>

        <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col">
          <motion.div
            className="absolute top-6 right-6 text-6xl font-thin text-white/10"
            animate={{ color: isActive ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.10)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>

          <motion.p
            className="text-white/40 text-sm font-light tracking-[0.2em] uppercase mb-4"
            animate={{ color: isActive ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.40)" }}
          >
            {item.subtitle}
          </motion.p>

          <motion.h3
            className="text-3xl lg:text-4xl font-light text-white mb-12 leading-tight tracking-tight max-w-sm"
            animate={{ x: isActive ? 8 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {item.category}
          </motion.h3>

          <div className="flex-1 space-y-6">
            {item.highlights.map((highlight: string, i: number) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 group/item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
              >
                <motion.div
                  className="w-px h-6 bg-white/20 mt-1 flex-shrink-0"
                  animate={{
                    backgroundColor: isActive ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.20)",
                    height: isActive ? 24 : 20
                  }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                />
                <motion.span
                  className="text-white/70 text-lg font-light leading-relaxed"
                  animate={{
                    x: isActive ? 4 : 0,
                    color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.70)"
                  }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  {highlight}
                </motion.span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-white/20 to-transparent"
            animate={{ width: isActive ? "100%" : "60%" }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}
