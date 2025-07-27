import styles from './CTA.module.css';
import Dither from './Dither';

export default function CTA() {
  return (
    <section className={styles.ctaContainer}>
      {/* Rectangular background (60% height) */}
      <div className={styles.ditherBackground}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
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