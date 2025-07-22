import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>You've Been Chosen.</h2>
        <p className={styles.subtitle}>The academy picks hustlers ready to join, fail, and build for real.</p>
        <button className={styles.button}>Apply to Enter</button>
      </div>
    </section>
  );
}