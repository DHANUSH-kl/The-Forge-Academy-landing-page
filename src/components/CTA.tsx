import styles from './CTA.module.css';
import Silk from './Silk';

export default function CTA() {
  return (
    <section className={styles.ctaContainer}>
      {/* Rectangular background (60% height) */}
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
       <Silk
  speed={5}
  scale={1}
  color="#7B7481"
  noiseIntensity={1.5}
  rotation={0}
/>
      </div>

      {/* Content directly on glass */}
      <div className={styles.content}>
        <h2 className={styles.title}>You&apos;ve Been <span>Chosen</span>.</h2>
        <p className={styles.subtitle}>The academy picks hustlers ready to join, fall, and build for real.</p>
        <button className={styles.applyButton}>Apply to Enter</button>
      </div>
    </section>
  );
}