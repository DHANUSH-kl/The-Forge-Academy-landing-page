import styles from './WhoIsFor.module.css';

export default function WhoIsFor() {
  const bullets = [
    "Students tired of theory, craving hands-on experience.",
    "Aspiring entrepreneurs who want to build—not just learn.",
    "Creators, marketers, designers, hustlers seeking real startup roles.",
    "People who learn by doing, not watching.",
    "This is not a course. It's your first business, first failure, first win."
  ];

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {bullets.map((bullet, i) => (
          <p key={i} className={styles.bullet}>{bullet}</p>
        ))}
      </div>
    </section>
  );
}