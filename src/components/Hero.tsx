'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeDMarquee } from '../components/ui/3d-marquee';
import  ShinyText  from '../components/ui/ShinyText';
import TextGenerateEffect from '../components/ui/typewriter'
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
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
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

    // Fix mobile viewport height issues
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(setVH, 100);
    });

    const ctx = gsap.context(() => {
      if (!failureTextRef.current) return;

      // Force set the initial state to white
      gsap.set(failureTextRef.current, {
        color: '#ffffff',
        display: 'inline',
        opacity: 1,
      });

      gsap.from([headlineRef.current, subheadlineRef.current], {
        opacity: 0,
        y: 40,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from(failureTextRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Add a longer delay and force refresh for mobile
      gsap.delayedCall(0.5, () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => {
            // Calculate based on actual window height, not vh units
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.07; // 93% from bottom = 7% from top
            return `bottom ${windowHeight - triggerPoint}px`;
          },
          end: 'bottom center',
          markers: false,
          onEnter: () => {
            console.log('ScrollTrigger: onEnter');
            gsap.to(failureTextRef.current, {
              color: '#ff0000',
              duration: 0.2,
              ease: 'power1.out',
            });
          },
          onLeaveBack: () => {
            console.log('ScrollTrigger: onLeaveBack');
            gsap.to(failureTextRef.current, {
              color: '#ffffff',
              duration: 0.2,
              ease: 'power1.out',
            });
          },
          onRefresh: () => {
            gsap.set(failureTextRef.current, {
              color: '#ffffff',
            });
          },
          refreshPriority: -1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        });

        ScrollTrigger.refresh();
      });

      const handleResize = () => {
        setTimeout(() => {
          ScrollTrigger.refresh();
          gsap.set(failureTextRef.current, {
            color: '#ffffff',
          });
        }, 100);
      };

      const handleOrientationChange = () => {
        setTimeout(() => {
          setVH();
          ScrollTrigger.refresh();
          gsap.set(failureTextRef.current, {
            color: '#ffffff',
          });
        }, 200);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientationChange);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
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
          <span
            ref={failureTextRef}
            className={styles.failureWord}
            style={{ color: '#ffffff' }}
          >
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