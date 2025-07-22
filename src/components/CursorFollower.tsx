"use client";

import { useEffect, useState } from 'react';

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-4 h-4 bg-red-500 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out ${
        isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-0'
      }`}
      style={{
        transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
      }}
    >
      {/* Inner glow */}
      <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse opacity-50" />
      
      {/* Outer ring */}
      <div className="absolute -inset-2 border border-red-500/30 rounded-full animate-ping" />
    </div>
  );
}