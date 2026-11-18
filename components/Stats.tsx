import type { Dictionary } from "@/lib/i18n";
import styles from "./Stats.module.scss";

export function Stats({ t }: { t: Dictionary["stats"] }) {
  return (
    <section className="shell" aria-label={t.label}>
      <ul className={styles.stats}>
        {t.items.map((s) => (
          <li key={s.label} className={styles.pill}>
            <strong dir="ltr">{s.value}</strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
