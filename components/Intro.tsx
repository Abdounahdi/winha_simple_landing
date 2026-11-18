"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import styles from "./Intro.module.scss";

// Branded first-visit intro.
// - Never waits for the whole page: it leaves as soon as the hero image is ready
//   (min ~1s so the animation reads, max 2.4s even on slow networks).
// - Shown once per browser session; skipped instantly on later page views
//   by an inline script in the layout (no flash).
// - Works without JS: a CSS fail-safe fades it out on its own.
// - Shorter and static for people who prefer reduced motion.

const MIN_MS = 1000;
const MAX_MS = 2400;
const EXIT_MS = 800;
export const INTRO_KEY = "winha-intro";

type Phase = "show" | "leave" | "done";

export function Intro({ tagline }: { tagline: string }) {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-seen")) {
      setPhase("done");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const min = reduce ? 300 : MIN_MS;
    const exit = reduce ? 200 : EXIT_MS;
    const start = performance.now();
    let cancelled = false;
    const timers: number[] = [];

    const heroReady = new Promise<void>((resolve) => {
      const img = document.getElementById("hero-image") as HTMLImageElement | null;
      if (!img || img.complete) return resolve();
      img.addEventListener("load", () => resolve(), { once: true });
      img.addEventListener("error", () => resolve(), { once: true });
    });
    const cap = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, MAX_MS)));

    Promise.race([heroReady, cap]).then(() => {
      const wait = Math.max(0, min - (performance.now() - start));
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          // Start the crossfade: intro fades out while the page fades in.
          setPhase("leave");
          root.classList.remove("intro-active");
          timers.push(
            window.setTimeout(() => {
              setPhase("done");
              try {
                sessionStorage.setItem(INTRO_KEY, "1");
              } catch {}
            }, exit),
          );
        }, wait),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div data-intro className={`${styles.intro} ${phase === "leave" ? styles.leave : ""}`} aria-hidden="true">
      <div className={styles.stage}>
        <div className={styles.card}>
          <span className={`${styles.splash} ${styles.s1}`} />
          <span className={`${styles.splash} ${styles.s2}`} />
          <span className={`${styles.splash} ${styles.s3}`} />
          <span className={`${styles.splash} ${styles.s4}`} />
          <Image className={styles.mascot} src={images.mascotTight} alt="" sizes="160px" priority />
        </div>

        <p className={styles.motto} lang="ar" dir="rtl">
          {site.arabicMotto}
        </p>
        <svg className={styles.swoosh} viewBox="0 0 240 30" fill="none">
          <path d="M8 22 C 70 4, 150 4, 232 14" />
        </svg>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
      </div>
    </div>
  );
}
