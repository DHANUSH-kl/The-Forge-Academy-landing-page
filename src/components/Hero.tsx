'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeDMarquee } from '../components/ui/3d-marquee';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const failureTextRef = useRef<HTMLSpanElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);

  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://res.cloudinary.com/dpohmoogk/image/upload/v1753745886/u6apnlolefiyfjm3i54k.png",  //main 
    "https://assets.aceternity.com/layout-grid.png",  // main
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://res.cloudinary.com/dpohmoogk/image/upload/v1753745331/ps9bfdwwhbv4sqv283j6.png",  // main img
    "https://res.cloudinary.com/dpohmoogk/image/upload/v1753746263/tow9iacne3kb3zkjwbix.png",  // mainn   
    "https://res.cloudinary.com/dpohmoogk/image/upload/v1753746917/s9xndbvttxm9p4xpijvq.png", // main  
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://res.cloudinary.com/dpohmoogk/image/upload/v1753745331/ps9bfdwwhbv4sqv283j6.png",
    "https://assets.aceternity.com/glowing-effect.webp",  //main 
    "https://res.cloudinary.com/dpohmoogk/image/upload/v1753745886/u6apnlolefiyfjm3i54k.png",  // 2nd  
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    
    const handleResize = () => {
      setVH();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const ctx = gsap.context(() => {
      gsap.from([headlineRef.current, subheadlineRef.current], {
        opacity: 0,
        y: 40,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power3.out',
      });

      if (failureTextRef.current) {
        gsap.from(failureTextRef.current, {
          opacity: 0,
          y: 20,
          duration: 1.4,
          ease: 'power3.out',
          delay: 0.2,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.marqueeContainer}>
        <ThreeDMarquee images={images} />
      </div>

      <div className={styles.content}>
        <h1 ref={headlineRef} className={styles.headline}>
          The Only Academy Where{' '}
          <span ref={failureTextRef} className={styles.failureWord}>
            Failure
          </span>{' '}
          is Mandatory
        </h1>

        <p ref={subheadlineRef} className={styles.subheadline}>
          Real teams. Real clients. Real equity. This is how founders are forged.
        </p>
      </div>
    </section>
  );
}