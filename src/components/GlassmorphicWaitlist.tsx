'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MailCheck, MoveRight, CheckCircle2 } from 'lucide-react';

import { db } from '../lib/firebase';
import { sendWaitlistEmail } from '../app/actions/send-waitlist-email';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const openPopup = () => setIsOpen(true);
    window.addEventListener("open-waitlist", openPopup);
    return () => window.removeEventListener("open-waitlist", openPopup);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    setIsValid(isValidEmail);
    if (!isValidEmail) return;

    setIsLoading(true);

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

      await sendWaitlistEmail(email);
      setAlreadyJoined(false);
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden border border-white/15"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(32px)',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.08), 0 24px 48px -12px rgba(0,0,0,0.4)',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <X className="w-4 h-4 text-white/80 hover:text-white" />
            </button>

            {submitted ? (
              alreadyJoined ? (
                <div className="p-8 sm:p-10 text-center text-white space-y-6">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full mb-4 border border-amber-400/30"
                  >
                    <CheckCircle2 className="w-8 h-8 text-amber-400" />
                  </motion.div>
                  <h2 className="text-2xl font-semibold">Already on the waitlist</h2>
                  <p className="text-white/60">This email is already registered.</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      transition={{ duration: 1 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                    />
                  </div>

                  <div className="p-8 sm:p-10 text-white relative z-10">
                    <div className="text-center mb-8">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.1 }}
                        className="relative inline-flex items-center justify-center w-16 h-16 mb-6"
                      >
                        <div className="absolute inset-0 bg-green-500/10 rounded-full border border-green-500/25" />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        >
                          <MailCheck className="w-7 h-7 text-green-400" />
                        </motion.div>
                      </motion.div>

                      <motion.h2 
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-semibold mb-3 text-white tracking-tight"
                      >
                        You&apos;re In!
                      </motion.h2>
                      
                      <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-2"
                      >
                        <p className="text-white/75 leading-relaxed">
                          An exclusive 12% promo code is waiting in your inbox
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-6 backdrop-blur-sm"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/70">
                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white text-sm mb-2">Heads up</h3>
                          <p className="text-sm text-white/65 leading-relaxed mb-3">
                            The email might land in Promotions or Spam.
                          </p>
                          
                          <div className="space-y-2">
                            {[
                              "Mark it as 'Not Spam'",
                              "Reply 'I'm in' to unlock full access"
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + index * 0.1 }}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-1.5 flex-shrink-0" />
                                <span className="text-sm text-white/70 leading-relaxed">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        window.open('https://mail.google.com/', '_blank');
                      }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full relative group"
                    >
                      <div className="px-5 py-3 bg-white/8 hover:bg-white/12 text-white font-medium rounded-lg border border-white/15 hover:border-white/25 transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2">
                        <span className="text-sm">Got it, I&apos;ll check my email</span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          <MoveRight className="w-4 h-4 text-white/80" />
                        </motion.div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              )
            ) : (
              <div className="p-6 sm:p-8 space-y-5">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-semibold text-white">
                    Exclusive Access
                  </h2>
                  <p className="text-white/60 text-base">
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
                    className={`w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none text-white placeholder-white/40 text-base ${
                      !isValid ? 'border-red-400/50' : 'border-white/20'
                    } border focus:border-blue-400/50 transition-all`}
                    required
                    disabled={isLoading}
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
                  className="pt-1"
                >
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    whileHover={!isLoading ? { y: -1, scale: 1.01 } : {}}
                    whileTap={!isLoading ? { y: 1, scale: 0.99 } : {}}
                    className={`w-full relative overflow-hidden group ${
                      isLoading ? 'cursor-not-allowed opacity-80' : ''
                    }`}
                  >
                    <div className="px-5 py-3 bg-white text-black font-medium rounded-lg relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <span>Joining waitlist...</span>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                          />
                        </>
                      ) : (
                        <>
                          <span>Join Waitlist</span>
                          <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            initial={{ x: 0 }}
                            animate={{ x: email ? 3 : 0 }}
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
                        </>
                      )}
                    </div>
                    {!isLoading && (
                      <>
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
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
                          className="absolute inset-0 bg-black rounded-lg"
                        />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
