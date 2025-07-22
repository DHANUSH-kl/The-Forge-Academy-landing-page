'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';
import ScrollVelocity from './ScrollVelocity';
import styles from './Timeline.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Business Niche",
      description: "Browse live startup models inside the academy and join the one that aligns with your interests."
    },
    {
      number: "02",
      title: "Knowledge Grill (Days 1–3)",
      description: "Before you take action, you'll go through a 3-day crash course—just enough to start confidently, not endlessly."
    },
    {
      number: "03",
      title: "Execute in Real-Time (Day 4 Onwards)",
      description: "Start managing the business: handle real tasks, join client meetings, and work like a startup team member. Imagine talking to a real client and getting instant feedback from your admin on what went wrong, what to improve, and how to win next time. That's not failure—it's refinement."
    },
    {
      number: "04",
      title: "Weekly Role Rotations",
      description: "Every 7 days, you'll switch your role. Marketing this week, sales the next, and operations after that. You'll get full-stack business exposure."
    },
    {
      number: "05",
      title: "Become an Experienced Business Owner",
      description: "By the end of your journey, you don't just walk away with lessons—you walk away with equity ownership in a real company and practical experience across departments. You're no longer just a learner; you're a co-owner with battle-tested knowledge of how a business runs."
    }
  ];

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

      // Number animations (always visible)
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

  return (
    <section ref={containerRef} className={styles.timeline}>
      
     
      <ScrollVelocity
        texts={[' How It Works ✦']}
        velocity={40}
        className="custom-scroll-text"
      />
      <div className={styles.container}>
        <div className={styles.header}>
         
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
          >
            Real Business.
          </ScrollFloat>
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
          >
            Real Roles.
          </ScrollFloat>
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
          >
            Real Results.
          </ScrollFloat>

        </div>

         <div className={styles.stepsContainer}>
         
          <div ref={progressLineRef} className={styles.progressLine}>
            <div className={styles.progressFill}></div>
          </div>

          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={el => stepRefs.current[i] = el}
                className={styles.step}
              >
                <div className={styles.stepIndicator}>
                  <span
                    ref={el => numberRefs.current[i] = el}
                    className={styles.stepNumber}
                  >
                    {step.number}
                  </span>
                  <div className={styles.stepDot}></div>
                </div>

                <div className={`${styles.stepContent} cursor-target`}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}