'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const GlassmorphicWaitlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  const isValidEmail = validateEmail(email);
  setIsValid(isValidEmail);
  if (isValidEmail) {
    // Submit logic here
    console.log('Submitted:', email);
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          {/* Premium Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: 'rgba(18, 18, 18, 0.5)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 z-10 p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5 text-white/80 hover:text-white" />
            </button>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <h2 className="text-3xl font-light text-white text-center">
                  Exclusive Access
                </h2>
                <p className="text-white/60 text-center text-lg">
                  Join our priority waitlist
                </p>
              </div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value === '') setIsValid(true);
                  }}
                  placeholder="Enter email"
                  className={`w-full px-5 py-3.5 bg-white/5 rounded-xl focus:outline-none text-white placeholder-white/30 text-base ${
                    !isValid ? 'border-red-400/50' : 'border-white/15'
                  } border`}
                />
                {!isValid && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute pt-1 text-xs text-red-400/80"
                  >
                    Please enter a valid email
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ 
                    y: 1,
                    transition: { duration: 0.1 }
                  }}
                  className="w-full relative overflow-hidden group"
                >
                  {/* Button Base */}
                  <div className="px-6 py-3.5 bg-white text-black font-medium rounded-xl relative z-10 flex items-center justify-center gap-2">
                    <span>Join Waitlist</span>
                    <motion.svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      initial={{ x: 0 }}
                      animate={{ x: email ? 4 : 0 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </div>
                  
                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.83, 0, 0.17, 1] 
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </div>
                  
                  {/* Active Press Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileTap={{ opacity: 0.1 }}
                    className="absolute inset-0 bg-black rounded-xl"
                  />
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};