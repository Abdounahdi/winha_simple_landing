import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { Icon } from "./Icon";
import styles from "./Hero.module.scss";

type Props = { t: Dictionary["hero"]; buy: string };

export function Hero({ t, buy }: Props) {
  return (
    <section className="shell" id="top" aria-labelledby="hero-title">
      <div className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.kicker} lang="ar" dir="rtl">
            {site.arabicMotto}
          </p>
          <h1 id="hero-title" className={styles.title}>
            {t.title.map((part, i) => (part.hl ? <span key={i}>{part.text}</span> : part.text))}
          </h1>
          <p className={styles.lead}>{t.lead}</p>
          <div className={styles.ctas}>
            <a href={site.buyUrl} className="btn btn--primary">
              <Icon name="cart" />
              {buy}
            </a>
            <a href={site.howUrl} className="btn btn--ghost">
              <Icon name="play" />
              {t.how}
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.photo}>
            <Image
              id="hero-image"
              src={images.heroProduct}
              alt={t.imageAlt}
              placeholder="blur"
              sizes="(max-width: 900px) 90vw, 520px"
              priority
            />
          </div>
          <Image className={styles.badge} src={images.logo} alt="" width={160} height={160} placeholder="blur" priority />
        </div>
      </div>
    </section>
  );
}
