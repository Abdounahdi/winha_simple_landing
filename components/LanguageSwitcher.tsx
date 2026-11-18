import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import styles from "./LanguageSwitcher.module.scss";

type Props = {
  current: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

// Plain links (not a JS dropdown) so every language version is crawlable.
export function LanguageSwitcher({ current, label, className, onNavigate }: Props) {
  return (
    <div className={`${styles.switcher} ${className ?? ""}`} role="group" aria-label={label}>
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          title={localeMeta[l].name}
          aria-current={l === current ? "page" : undefined}
          className={l === current ? styles.active : undefined}
          onClick={onNavigate}
        >
          {localeMeta[l].label}
        </a>
      ))}
    </div>
  );
}
