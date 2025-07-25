'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollVelocity from './ScrollVelocity';
import styles from './Timeline.module.css';
import  {Timeline}  from './ui/timeline'
import { FlipWords } from "./ui/flip-words";
import '../styles/globals.css'

gsap.registerPlugin(ScrollTrigger);

export default function TimelineCmp() {


  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const titleLinesRef = useRef([]);
  const progressLineRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title line animations (sequential)
      titleLinesRef.current.forEach((line, i) => {
        gsap.from(line, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
          }
        });
      });

      // Step animations
      stepRefs.current.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: 0.9 + i * 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
          }
        });
      });

      // Progress line animation
      if (progressLineRef.current) {
        gsap.to(progressLineRef.current, {
          scaleY: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        });
      }

      // Number animations
      numberRefs.current.forEach((num, i) => {
        gsap.from(num, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          delay: 0.9 + i * 0.15,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);



const data = [
  {
    title: "Step 1",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl dark:text-white">
          Choose Your Business Niche
        </h3>
        <p className="text-base font-normal text-neutral-600 md:text-lg dark:text-neutral-300">
          Browse live startup models inside the academy and join the one that aligns with your interests.
        </p>
      </div>
    )
  },
  {
    title: "Step 2",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl dark:text-white">
          Knowledge Grill
        </h3>
        <p className="text-base font-normal text-neutral-600 md:text-lg dark:text-neutral-300">
          Before you take action, you&apos;ll go through a 3-day crash course—just enough to start confidently, not endlessly.
        </p>
      </div>
    )
  },
  {
    title: "Step 3",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl dark:text-white">
          Execute in Real-Time
        </h3>
        <p className="text-base font-normal text-neutral-600 md:text-lg dark:text-neutral-300">
          Start managing the business: handle real tasks, join client meetings, and work like a startup team member. Imagine talking to a real client and getting instant feedback from your admin on what went wrong, what to improve, and how to win next time. That&apos;s not failure—it&apos;s refinement.
        </p>
      </div>
    )
  },
  {
    title: "Step 4",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl dark:text-white">
          Weekly Role Rotations
        </h3>
        <p className="text-base font-normal text-neutral-600 md:text-lg dark:text-neutral-300">
          Every 7 days, you&apos;ll switch your role. Marketing this week, sales the next, and operations after that. You&apos;ll get full-stack business exposure.
        </p>
      </div>
    )
  },
  {
    title: "Step 5",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl dark:text-white">
          You Become an Experienced Business Owner
        </h3>
        <p className="text-base font-normal text-neutral-600 md:text-lg dark:text-neutral-300">
          By the end of your journey, you don&apos;t just walk away with lessons—you walk away with equity ownership in a real company and practical experience across departments. You&apos;re no longer just a learner; you&apos;re a co-owner with battle-tested knowledge of how a business runs.
        </p>
      </div>
    )
  },
];



  const words = ["Business.", "Roles.", "Results."];

  return (
    <section ref={containerRef} className={styles.timeline}>
      <ScrollVelocity
        texts={[' How It Works ✦']}
        velocity={40}
        className="custom-scroll-text"
      />

      <div className="text-5xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 flex justify-center items-center ">
       Real  
        <FlipWords words={words} /> <br/>
      </div>



        <Timeline data={data} />

    </section>
  );
}