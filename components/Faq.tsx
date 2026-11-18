import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { Icon } from "./Icon";
import { images } from "@/lib/images";
import styles from "./Faq.module.scss";

// Native <details> keeps every answer in the HTML (crawlable) and works without JS.
export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section className="shell" id="faq" aria-labelledby="faq-title">
      <div className={styles.panel}>
        <Image className={`${styles.mascot} ${styles.left}`} src={images.mascot} alt="" width={200} height={200} />
        <Image className={`${styles.mascot} ${styles.right}`} src={images.mascot} alt="" width={200} height={200} />

        <h2 id="faq-title" className={styles.title}>
          {t.title}
        </h2>

        <div className={styles.list}>
          {t.items.map((f, i) => (
            <details key={f.q} className={styles.item} open={i === 0} name="faq">
              <summary>
                {f.q}
                <Icon name="chevron" className={styles.chev} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
