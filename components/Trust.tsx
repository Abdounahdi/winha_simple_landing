import type { Dictionary } from "@/lib/i18n";
import { trustIcons } from "@/lib/site";
import { Icon } from "./Icon";
import styles from "./Trust.module.scss";

export function Trust({ t }: { t: Dictionary["trust"] }) {
  return (
    <section className="shell" aria-labelledby="trust-title">
      <div className={styles.panel}>
        <h2 id="trust-title" className={styles.title}>
          {t.title}
        </h2>
        <ul className={styles.grid}>
          {t.items.map((label, i) => (
            <li key={label} className={styles.tile}>
              <span className={styles.icon}>
                <Icon name={trustIcons[i]} />
              </span>
              <span className={styles.label}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
