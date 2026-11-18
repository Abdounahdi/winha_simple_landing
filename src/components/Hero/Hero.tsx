import { SYMBOLS } from "@/data/symbols";
import styles from "./Hero.module.scss";

/* eslint-disable @next/next/no-img-element */

// A scatter of symbols behind the copy, echoing the card faces — objects at
// varied rotations on a light ground. Positions are fixed rather than random so
// the server and client render the same page, and they keep clear of the centre
// column the copy occupies. `depth` fades and shrinks the far ones so the
// scatter reads as layers rather than one flat sheet.
//
// Ordered most-iconic first: narrow viewports show only the opening few.
const SCATTER = [
  { slug: "khomsa", top: "16%", left: "9%", size: 92, rotate: -14, depth: 1 },
  { slug: "chachia", top: "24%", left: "86%", size: 104, rotate: 11, depth: 1 },
  { slug: "dele3", top: "60%", left: "8%", size: 118, rotate: 8, depth: 1 },
  { slug: "brek", top: "76%", left: "82%", size: 96, rotate: -9, depth: 1 },
  { slug: "eye", top: "12%", left: "66%", size: 74, rotate: 15, depth: 0.8 },
  { slug: "nakhla", top: "82%", left: "24%", size: 88, rotate: -5, depth: 0.9 },

  { slug: "sidibousaid", top: "45%", left: "93%", size: 80, rotate: 6, depth: 0.8 },
  { slug: "makroudh", top: "91%", left: "11%", size: 82, rotate: 13, depth: 0.9 },
  { slug: "mille-feuille", top: "90%", left: "78%", size: 78, rotate: 16, depth: 0.6 },
  { slug: "kholkhal", top: "38%", left: "4%", size: 74, rotate: 18, depth: 0.6 },
  { slug: "felfel", top: "88%", left: "62%", size: 70, rotate: -18, depth: 0.8 },
  { slug: "boga", top: "8%", left: "36%", size: 66, rotate: 9, depth: 0.6 },

  { slug: "hrissa", top: "63%", left: "95%", size: 72, rotate: -7, depth: 0.7 },
  { slug: "lablebi", top: "93%", left: "45%", size: 76, rotate: 5, depth: 0.6 },
  { slug: "zitoun", top: "28%", left: "16%", size: 62, rotate: -20, depth: 0.5 },
  { slug: "darboukaa", top: "30%", left: "80%", size: 68, rotate: -12, depth: 0.5 },
  { slug: "yoyo", top: "6%", left: "52%", size: 58, rotate: -11, depth: 0.5 },
  { slug: "kobkab", top: "70%", left: "16%", size: 64, rotate: 21, depth: 0.5 },
];


export default function Hero() {
  const bySlug = new Map(SYMBOLS.map((s) => [s.slug, s]));

  return (
    <main className={styles.hero}>
      <div className={styles.scatter} aria-hidden="true">
        {SCATTER.map((item) => {
          const symbol = bySlug.get(item.slug);
          if (!symbol) return null;
          return (
            <img
              key={item.slug}
              className={styles.scatterItem}
              src={symbol.src}
              alt=""
              width={item.size}
              height={item.size}
              loading="lazy"
              style={
                {
                  top: item.top,
                  left: item.left,
                  width: item.size,
                  "--rotate": `${item.rotate}deg`,
                  "--depth": item.depth,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>

      <div className={styles.copy}>
        <img
          className={styles.wordmark}
          src="/brand/wordmark.webp"
          alt="وينها — Winha"
          width={1600}
          height={666}
          fetchPriority="low"
        />

        <p className={styles.subtitle} lang="ar" dir="rtl">
          لعبة ملاحظة وسرعة
        </p>
        <p className={styles.subtitleLatin} lang="fr">
          Jeu d&apos;observation et de rapidité
        </p>

        <p className={styles.lede}>
          Two cards, {SYMBOLS.length} symbols, exactly one match between any
          pair. Find it first and the card is yours.
        </p>

        <div className={styles.actions}>
          <a className={styles.primary} href="#rules">
            How to play
          </a>
          <a className={styles.secondary} href="#deck">
            See the deck
          </a>
        </div>
      </div>
    </main>
  );
}
