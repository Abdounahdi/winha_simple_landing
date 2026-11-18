import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { Icon } from "./Icon";
import styles from "./Cta.module.scss";

type Props = { t: Dictionary["cta"]; buy: string; how: string };

export function Cta({ t, buy, how }: Props) {
  return (
    <section className="shell" id="buy" aria-labelledby="cta-title">
      <div className={styles.cta}>
        <div className={styles.copy}>
          <h2 id="cta-title">
            {t.title}
            <span>{t.titleHl}</span>
          </h2>
          <p>
            {t.text} <strong>{site.price}</strong>
          </p>
          <div className={styles.ctas}>
            <a href={site.buyUrl} className="btn btn--primary">
              <Icon name="cart" />
              {buy}
            </a>
            <a href={site.howUrl} className="btn btn--ghost">
              <Icon name="play" />
              {how}
            </a>
          </div>
        </div>
        <div className={styles.media}>
          <Image src={images.ctaProduct} alt={t.imageAlt} fill placeholder="blur" sizes="(max-width: 900px) 100vw, 560px" />
        </div>
      </div>
    </section>
  );
}
