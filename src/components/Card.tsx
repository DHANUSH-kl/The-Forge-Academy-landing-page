"use client";
import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border transition-all duration-300 ease-out",
        glass 
          ? "backdrop-blur-2xl bg-black/60 border-white/5 shadow-2xl md:hover:shadow-red-500/25" 
          : "bg-black border-white/10 shadow-xl md:hover:shadow-2xl md:hover:shadow-red-500/15 md:hover:border-white/20",
        "p-10 cursor-pointer",
        isMobile ? "scale-[1.01] -translate-y-1" : "hover:scale-[1.01] hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Background gradient - always visible on mobile */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-red-500/2 transition-all duration-500 ease-out",
        isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )} />
      
      {/* Border animation - always visible on mobile */}
      <div className={cn(
        "absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-red-500/10 to-transparent transition-all duration-500 ease-out",
        isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )} />

      {/* Badge with animation */}
      {badge && (
        <div className="mb-12 relative">
          <div className="relative inline-flex items-center justify-center">
            <span className={cn(
              "relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-xl border transition-all duration-300",
              isMobile 
                ? "bg-gradient-to-br from-red-500/25 to-red-600/15 text-red-300 border-red-500/30 scale-110"
                : "bg-gradient-to-br from-red-500/15 to-red-600/10 text-red-400 border-red-500/20 group-hover:bg-gradient-to-br group-hover:from-red-500/25 group-hover:to-red-600/15 group-hover:scale-110 group-hover:text-red-300 group-hover:border-red-500/30"
            )}>
              {badge}
            </span>
            {/* Pulsing ring effect - desktop only */}
            {!isMobile && (
              <>
                <div className="absolute inset-0 rounded-2xl border border-red-500/20 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out" />
                <div className="absolute inset-0 rounded-2xl border border-red-500/10 scale-110 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
              </>
            )}
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className={cn(
        "text-3xl font-bold mb-8 leading-tight transition-all duration-300",
        isMobile ? "text-gray-50 tracking-wide" : "text-white group-hover:text-gray-50 group-hover:tracking-wide"
      )}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn(
        "text-lg leading-relaxed mb-12 transition-all duration-300",
        isMobile ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300"
      )}>
        {description}
      </p>

      {/* Underline */}
      <div className="relative mb-4">
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-full transition-all duration-500 ease-out transform",
              isMobile || isHovered ? "w-full scale-y-150" : "w-0"
            )}
          />
        </div>
        <div className="absolute top-0 h-1 bg-white/3 rounded-full overflow-hidden w-full">
          <div 
            className={cn(
              "h-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent rounded-full transition-all duration-700 ease-out",
              isMobile || isHovered ? "w-full" : "w-0"
            )}
          />
        </div>
      </div>

      {/* Corner elements - always visible on mobile */}
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-3xl transition-all duration-500 ease-out",
        isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )} />
      <div className={cn(
        "absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-red-500/8 to-transparent rounded-tr-3xl transition-all duration-500 ease-out",
        isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100 delay-100"
      )} />
      
      {/* Inner glow - always visible on mobile */}
      <div className={cn(
        "absolute inset-4 rounded-2xl bg-gradient-to-br from-red-500/2 to-transparent transition-all duration-500 ease-out pointer-events-none",
        isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )} />
      
      {/* Edge highlight - always visible on mobile */}
      <div className={cn(
        "absolute inset-0 rounded-3xl shadow-inner transition-all duration-300 ease-out",
        isMobile ? "shadow-red-500/10" : "shadow-red-500/0 group-hover:shadow-red-500/10"
      )} />
    </div>
  );
}