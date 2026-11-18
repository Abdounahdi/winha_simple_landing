import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { images } from "@/lib/images";
import styles from "./Feature.module.scss";

export function Feature({ t }: { t: Dictionary["feature"] }) {
  return (
    <section className="shell" aria-labelledby="feature-title">
      <div className={styles.split}>
        <div className={styles.media}>
          <Image src={images.featureAction} alt={t.alt} fill placeholder="blur" sizes="(max-width: 900px) 100vw, 600px" />
        </div>
        <div className={styles.copy}>
          <h2 id="feature-title">{t.title}</h2>
          <p>{t.text}</p>
        </div>
      </div>
    </section>
  );
}
