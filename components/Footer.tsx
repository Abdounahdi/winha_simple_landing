import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { navHrefs, site, socials } from "@/lib/site";
import { Icon } from "./Icon";
import { Newsletter } from "./Newsletter";
import { images } from "@/lib/images";
import styles from "./Footer.module.scss";

type Props = { t: Dictionary["footer"]; navLinks: string[] };

export function Footer({ t, navLinks }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className={`shell ${styles.footer}`} id="contact">
      <div className={styles.panel}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#top" className={styles.brandLink} aria-label={t.backToTop}>
              <Image src={images.logo} alt="" width={72} height={72} className={styles.logo} />
              <span className={styles.wordmark}>
                Winha
                <span lang="ar" dir="rtl">{site.arabicName}</span>
              </span>
            </a>
            <p>{t.about}</p>
            <ul className={styles.socials}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label}>
                    <Icon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <h3 className={styles.heading}>{t.explore}</h3>
            <ul className={styles.links}>
              <li>
                <a href="#top">{t.home}</a>
              </li>
              {navHrefs.map((href, i) => (
                <li key={href}>
                  <a href={href}>{navLinks[i]}</a>
                </li>
              ))}
              <li>
                <a href={site.buyUrl}>{t.shop}</a>
              </li>
            </ul>
          </nav>

          <div className={styles.news}>
            <Image src={images.mascot} alt="" width={120} height={120} className={styles.peek} />
            <h3 className={styles.newsTitle}>{t.newsTitle}</h3>
            <p className={styles.newsText}>{t.newsText}</p>
            <Newsletter label={t.emailLabel} button={t.subscribe} thanks={t.thanks} />
            <a className={styles.mail} href={`mailto:${site.email}`} dir="ltr">
              {site.email}
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {year} Winha. {t.rights}
          </span>
          <span lang="ar" dir="rtl" className={styles.motto}>
            {site.arabicMotto}
          </span>
        </div>
      </div>
    </footer>
  );
}
