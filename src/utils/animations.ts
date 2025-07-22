import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  gsap.utils.toArray<HTMLElement>('[data-animate]').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      }
    });
  });
};