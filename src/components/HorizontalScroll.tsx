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
    title: "Run Real Companies",
    description: "Not case studies — you’ll lead real projects with real stakes like you’re the CEO",
    glass: true
  },
  {
    badge: "02",
    title: "Earn Equity as You Learn",
    description: "Get rewarded with startup equity based on how you think, act and execute",
    glass: true
  },
  {
    badge: "03",
    title: "Switch Roles Weekly",
    description: "From product to marketing to ops — rotate across departments and find your zone of genius",
    glass: true
  },
  {
    badge: "04",
    title: "Get Mentored by Founders",
    description: "Work under real entrepreneurs who tell you what actually works, not textbook theory",
    glass: true
  },
  {
    badge: "05",
    title: "Track Progress Like a Game",
    description: "Level up, earn rewards and rise through the ranks with our gamified platform (Coming Soon)",
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