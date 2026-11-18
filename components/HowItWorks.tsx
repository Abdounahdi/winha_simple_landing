import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { images } from "@/lib/images";
import styles from "./HowItWorks.module.scss";

export function HowItWorks({ t }: { t: Dictionary["how"] }) {
  return (
    <section className={`shell ${styles.section}`} id="how-to-play" aria-labelledby="how-title">
      <h2 id="how-title" className="section-title">
        {t.title}
      </h2>
      <ol className={styles.grid}>
        {t.steps.map((step, i) => (
          <li key={step.title} className={styles.card}>
            <span className={styles.num} aria-hidden="true">
              {i + 1}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <div className={styles.media}>
              <Image src={images.steps[i]} alt={step.alt} fill placeholder="blur" sizes="(max-width: 900px) 90vw, 360px" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
