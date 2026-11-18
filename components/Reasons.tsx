import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { reasonTones } from "@/lib/site";
import { images } from "@/lib/images";
import styles from "./Reasons.module.scss";

export function Reasons({ t }: { t: Dictionary["reasons"] }) {
  return (
    <section className={`shell ${styles.section}`} id="why" aria-labelledby="why-title">
      <h2 id="why-title" className="section-title">
        {t.title[0]}
        <br /> {t.title[1]}
      </h2>
      <div className={styles.grid}>
        {t.items.map((r, i) => (
          <article key={r.title} className={`${styles.card} ${styles[reasonTones[i]]}`}>
            <h3>{r.title}</h3>
            <div className={styles.media}>
              <Image src={images.reasons[i]} alt={r.alt} fill placeholder="blur" sizes="(max-width: 900px) 80vw, 480px" />
            </div>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
