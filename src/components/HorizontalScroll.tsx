'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from './Card';
import styles from './HorizontalScroll.module.css';
import BlurText from "./BlurText";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      
      // Animate heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate cards
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=150",
            toggleActions: "play none none none"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      badge: "01",
      title: "Business Impact",
      description: "Real equity and revenue impact in live startups",
      glass: true
    },
    {
      badge: "02",
      title: "Founder Role Rotation",
      description: "Weekly cycles through CEO, CMO, and CTO roles",
      glass: true
    },
    {
      badge: "03",
      title: "Equity-Based Participation",
      description: "Earn ownership in ventures you help build",
      glass: true
    },
    {
      badge: "04",
      title: "Operational Execution",
      description: "Hands-on implementation from day one",
      glass: true
    }
  ];

  return (
    <section ref={containerRef} className={styles.container}>
      <div ref={headingRef} className={styles.heading}>
        <BlurText
          text="WHAT WE DO?"
          delay={150}
          animateBy="words"
          direction="top"
          className={styles.blurText}
        />
      </div>
      
      <div className={styles.grid}>
        {cards.map((card, i) => (
          <div
            key={i}
            ref={setCardRef(i)}
            className={styles.cardWrapper}
          >
            <Card {...card} className={styles.card} />
          </div>
        ))}
      </div>
    </section>
  );
}