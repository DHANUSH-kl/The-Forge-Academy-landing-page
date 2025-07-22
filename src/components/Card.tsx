"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  badge?: string | number;
  title: string;
  description: string;
  glass?: boolean;
  className?: string;
}

export default function Card({
  badge,
  title,
  description,
  glass = false,
  className
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border transition-all duration-700 ease-out",
        glass 
          ? "backdrop-blur-2xl bg-black/60 border-white/5 shadow-2xl hover:shadow-red-500/25" 
          : "bg-black border-white/10 shadow-xl hover:shadow-2xl hover:shadow-red-500/15 hover:border-white/20",
        "p-10 cursor-pointer transform hover:scale-[1.01] hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-red-500/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out" />
      
      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out" />

      {/* Top badge with advanced animation */}
      {badge && (
        <div className="mb-12 relative">
          <div className="relative inline-flex items-center justify-center">
            <span className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/15 to-red-600/10 text-red-400 font-bold text-xl border border-red-500/20 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-red-500/25 group-hover:to-red-600/15 group-hover:scale-110 group-hover:text-red-300 group-hover:border-red-500/30">
              {badge}
            </span>
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-2xl border border-red-500/20 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 rounded-2xl border border-red-500/10 scale-110 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
          </div>
        </div>
      )}

      {/* Title with letter spacing animation */}
      <h3 className="text-3xl font-bold text-white mb-8 leading-tight transition-all duration-500 group-hover:text-gray-50 group-hover:tracking-wide">
        {title}
      </h3>

      {/* Description with subtle fade effect */}
      <p className="text-gray-400 text-lg leading-relaxed mb-12 transition-all duration-500 group-hover:text-gray-300">
        {description}
      </p>

      {/* Advanced animated underline */}
      <div className="relative mb-4">
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-full transition-all duration-1000 ease-out transform",
              isHovered ? "w-full scale-y-150" : "w-0"
            )}
          />
        </div>
        {/* Secondary underline for depth */}
        <div className="absolute top-0 h-1 bg-white/3 rounded-full overflow-hidden w-full">
          <div 
            className={cn(
              "h-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent rounded-full transition-all duration-1200 ease-out delay-200",
              isHovered ? "w-full" : "w-0"
            )}
          />
        </div>
      </div>

      {/* Floating corner elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-red-500/8 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-100" />
      
      {/* Subtle inner glow */}
      <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-red-500/2 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out pointer-events-none" />
      
      {/* Edge highlight */}
      <div className="absolute inset-0 rounded-3xl shadow-inner shadow-red-500/0 group-hover:shadow-red-500/10 transition-all duration-700 ease-out" />
    </div>
  );
}