'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollVelocity from './ScrollVelocity';
import styles from './Timeline.module.css';
import { Timeline } from './ui/timeline';
import { FlipWords } from "./ui/flip-words";
import '../styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineCmp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title line animations
      titleLinesRef.current.forEach((line, i) => {
        if (line) {
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
        }
      });

      // Step animations
      stepRefs.current.forEach((step, i) => {
        if (step) {
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
        }
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
        if (num) {
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
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const data = [
    {
      title: "Step 1",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white md:text-2xl">
            Choose Your Business Niche
          </h3>
          <p className="text-neutral-300 md:text-lg">
            Browse live startup models inside the academy and join the one that aligns with your interests.
          </p>
        </div>
      )
    },
    {
      title: "Step 2",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white md:text-2xl">
            Knowledge Grill
          </h3>
          <p className="text-neutral-300 md:text-lg">
            Before you take action, you&apos;ll go through a 3-day crash course—just enough to start confidently, not endlessly.
          </p>
        </div>
      )
    },
    {
      title: "Step 3",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white md:text-2xl">
            Execute in Real-Time
          </h3>
          <p className="text-neutral-300 md:text-lg">
            Start managing the business: handle real tasks, join client meetings, and work like a startup team member.
          </p>
        </div>
      )
    },
    {
      title: "Step 4",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white md:text-2xl">
            Weekly Role Rotations
          </h3>
          <p className="text-neutral-300 md:text-lg">
            Every 7 days, you&apos;ll switch your role. Marketing this week, sales the next, and operations after that.
          </p>
        </div>
      )
    },
    {
      title: "Step 5",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white md:text-2xl">
            You Become an Experienced Business Owner
          </h3>
          <p className="text-neutral-300 md:text-lg">
            You walk away with equity ownership in a real company and practical experience across departments.
          </p>
        </div>
      )
    }
  ];

  const words = ["Business.", "Roles.", "Results."];

  return (
    <section ref={containerRef} className={styles.timeline}>
      <ScrollVelocity
        texts={[' How It Works ✦']}
        velocity={40}
        className="custom-scroll-text"
      />

      <div className="text-5xl mx-auto font-normal text-neutral-400 flex justify-center items-center mb-12 md:mb-20">
        Real  
        <FlipWords words={words} />
      </div>

      <Timeline data={data} />
    </section>
  );
}