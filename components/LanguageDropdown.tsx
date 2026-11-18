"use client";

import { useEffect, useRef, useState } from "react";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import styles from "./LanguageDropdown.module.scss";

type Props = { current: Locale; label: string; className?: string };

// Compact language picker for the mobile navbar: a round button showing the
// current language that opens a small list. Links are always in the HTML.
export function LanguageDropdown({ current, label, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`${styles.root} ${className ?? ""}`}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={`${label}: ${localeMeta[current].name}`}
        aria-expanded={open}
        aria-controls="lang-dropdown"
        onClick={() => setOpen((v) => !v)}
        lang={current}
      >
        {localeMeta[current].label}
      </button>

      <ul id="lang-dropdown" className={`${styles.list} ${open ? styles.open : ""}`} aria-label={label}>
        {locales.map((l) => (
          <li key={l}>
            <a
              href={`/${l}`}
              hrefLang={l}
              lang={l}
              aria-current={l === current ? "page" : undefined}
              className={l === current ? styles.active : undefined}
              onClick={() => setOpen(false)}
            >
              <span className={styles.code}>{localeMeta[l].label}</span>
              {localeMeta[l].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
