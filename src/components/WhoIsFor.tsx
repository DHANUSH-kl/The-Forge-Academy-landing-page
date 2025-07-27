'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import styles from './WhoIsFor.module.css';
import BlurText from "./BlurText";

const items = [
  {
    category: "Students tired of theory",
    highlights: [
      "Hands-on experience",
      "Real startup environments"
    ]
  },
  {
    category: "Aspiring entrepreneurs",
    highlights: [
      "Build without risking money",
      "Learn by doing"
    ]
  },
  {
    category: "Creators & hustlers",
    highlights: [
      "Explore startup roles",
      "Expand your expertise"
    ]
  },
  {
    category: "Action-based learners",
    highlights: [
      "Learn by doing",
      "Immersive approach"
    ]
  }
];

export default function WhoIsFor() {
  return (
    <section className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BlurText
          text="WHO IT'S FOR"
          delay={150}
          animateBy="words"
          direction="top"
          className={styles.blurText}
        />
        <div className={styles.divider} />
      </motion.div>

      <div className={styles.grid}>
        {/* First row - 2 cards */}
        <Card item={items[0]} index={0} />
        <Card item={items[1]} index={1} />
        
        {/* Second row - 1 centered card */}
        <div className={styles.centeredCard}>
          <Card item={items[2]} index={2} />
        </div>
        
        {/* Third row - 1 centered card */}
        <div className={styles.centeredCard}>
          <Card item={items[3]} index={3} />
        </div>
      </div>
    </section>
  );
}

function Card({ item, index }: { item: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent)`;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        borderColor: 'rgba(255,255,255,0.15)'
      }}
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      style={{ background }}
    >
      <h3 className={styles.category}>{item.category}</h3>
      <ul className={styles.highlights}>
        {item.highlights.map((highlight: string, i: number) => (
          <motion.li 
            key={i}
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={styles.highlightItem}
          >
            <div className={styles.bullet} />
            {highlight}
          </motion.li>
        ))}
      </ul>
      <div className={styles.cardHoverEffect} />
    </motion.div>
  );
}