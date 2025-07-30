'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export const GlassmorphicWaitlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    const openPopup = () => setIsOpen(true);
    window.addEventListener("open-waitlist", openPopup);
    return () => window.removeEventListener("open-waitlist", openPopup);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    setIsValid(isValidEmail);
    if (!isValidEmail) return;

    try {
      const q = query(collection(db, 'waitlist'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setAlreadyJoined(true);
        setSubmitted(true);
        return;
      }

      await addDoc(collection(db, 'waitlist'), {
        email,
        createdAt: serverTimestamp(),
      });

      // await fetch('/api/send-waitlist-email', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      //   headers: { 'Content-Type': 'application/json' },
      // });

      setAlreadyJoined(false);
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
              backdropFilter: 'blur(36px)',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.08), 0 25px 40px -10px rgba(0,0,0,0.4)',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 z-10 p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5 text-white/80 hover:text-white" />
            </button>

            {submitted ? (
              <div className="p-10 text-center text-white space-y-4">
                <h2 className="text-2xl font-semibold">
                  {alreadyJoined
                    ? 'Already on the waitlist'
                    : 'Thanks for joining'}
                </h2>
                <p className="text-white/60">
                  {alreadyJoined
                    ? 'This email is already registered.'
                    : 'We’ll notify you with early access.'}
                </p>

                {!alreadyJoined && (
                  <button
                    onClick={() => {
                      window.location.href = '/apply';
                    }}
                    className="mt-4 inline-block px-6 py-3 text-sm font-medium text-black bg-white rounded-xl hover:bg-white/90 transition-all"
                  >
                   Take 60 seconds to boost your priority access
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-light text-white text-center">
                    Exclusive Access
                  </h2>
                  <p className="text-white/60 text-center text-lg">
                    Claim your exclusive launch promo code
                  </p>
                </div>

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
                    required
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

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1, transition: { duration: 0.1 } }}
                    className="w-full relative overflow-hidden group"
                  >
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
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <motion.div
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileTap={{ opacity: 0.1 }}
                      className="absolute inset-0 bg-black rounded-xl"
                    />
                  </motion.button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
