"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { navHrefs, site } from "@/lib/site";
import { Icon } from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LanguageDropdown } from "./LanguageDropdown";
import { images } from "@/lib/images";
import styles from "./Header.module.scss";

type Props = { t: Dictionary["nav"]; lang: Locale };

export function Header({ t, lang }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Full section width at the top of the page, compact pill once scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand} aria-label={t.home}>
          <Image src={images.logo} alt="" width={44} height={44} className={styles.logo} priority />
          <span className={styles.wordmark}>
            Winha<span lang="ar" dir="rtl">{site.arabicName}</span>
          </span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Main">
          <ul>
            {navHrefs.map((href, i) => (
              <li key={href}>
                <a href={href} onClick={close}>
                  {t.links[i]}
                </a>
              </li>
            ))}
            <li className={styles.menuCta}>
              <a href={site.buyUrl} className="btn btn--primary" onClick={close}>
                <Icon name="cart" />
                {t.buy}
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher current={lang} label={t.language} className={styles.barLang} />
          <LanguageDropdown current={lang} label={t.language} className={styles.mobileLang} />
          <a href={site.buyUrl} className={`btn btn--primary btn--sm ${styles.barCta}`}>
            <Icon name="cart" />
            {t.buy}
          </a>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
