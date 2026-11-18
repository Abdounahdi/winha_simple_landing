"use client";

// Raw <img> throughout, deliberately — see the note on frameRefs below.
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildCutSequence,
  FINAL_HOLD_MS,
  type CutSequence,
} from "./cutSequence";
import { INTRO_SYMBOLS } from "./introDeck";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import styles from "./GreetingScreen.module.scss";

/** How long the wordmark holds the stage before the greeting lifts away. */
const REVEAL_HOLD_MS = 900;
/** Must match `$leave-duration` in the stylesheet. */
const LEAVE_MS = 600;
/** Start cutting regardless if decoding drags — a stalled image is no reason
 *  to hold a visitor on a blank screen. */
const PRELOAD_TIMEOUT_MS = 2000;

type Phase = "loading" | "cutting" | "revealed" | "leaving";

export default function GreetingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [gone, setGone] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // With motion reduced there is no sequence to run, so the greeting is simply
  // already at its end state. Derived rather than stored: the preference is
  // known at first render, and writing it into state during an effect would
  // paint the pre-animation frame first.
  const activePhase: Phase =
    prefersReducedMotion && phase === "loading" ? "revealed" : phase;

  // The twelve <img> elements are addressed directly rather than through
  // state: at full speed a cut lands every other frame, and a React render per
  // cut would put the schedule at the mercy of reconciliation. Plain <img> for
  // the same reason — next/image's wrapper and lazy behaviour buy nothing for
  // twelve images that are all needed at once, above the fold.
  const frameRefs = useRef<(HTMLImageElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const after = useCallback((ms: number, fn: () => void) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  /** Show one frame and hide whichever was showing. A cut, not a fade. */
  const showFrame = useCallback((index: number | null) => {
    frameRefs.current.forEach((el, i) => {
      if (!el) return;
      el.classList.toggle(styles.frameOn, i === index);
    });
  }, []);

  const finish = useCallback(() => {
    setPhase("leaving");
    after(LEAVE_MS, () => setGone(true));
  }, [after]);

  const reveal = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    showFrame(null);
    setPhase("revealed");
    after(REVEAL_HOLD_MS, finish);
  }, [after, finish, showFrame]);

  /** Abandon the sequence and go straight to the wordmark. */
  const skip = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    reveal();
  }, [reveal]);

  const runSequence = useCallback((sequence: CutSequence) => {
    setPhase("cutting");

    const start = performance.now();
    let next = 0;
    let lastCutAt: number | null = null;

    const tick = (now: number) => {
      const elapsed = now - start;

      // At full speed a cut is due every other frame, so a machine that drops
      // frames will have more than one cut due at once. Advance by exactly one
      // rather than skipping to the last one due: showing all 57 symbols is
      // the point of the sequence, and a slow machine should stretch it rather
      // than quietly drop symbols out of it.
      if (next < sequence.cuts.length && sequence.cuts[next].at <= elapsed) {
        showFrame(sequence.cuts[next].symbolIndex);
        next++;
        if (next === sequence.cuts.length) lastCutAt = elapsed;
      }

      // The hold is measured from the last cut rather than from the clock, so
      // a sequence that stretched still gives its final symbol a full beat
      // before the wordmark takes over.
      if (lastCutAt !== null && elapsed >= lastCutAt + FINAL_HOLD_MS) {
        reveal();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [reveal, showFrame]);

  // A symbol that has not finished decoding shows as a hole in the sequence,
  // so the whole intro deck is decoded before the first cut. Twelve images is
  // few enough to simply wait for; the timeout is only there so a stalled
  // request cannot strand a visitor on an empty disc.
  useEffect(() => {
    if (prefersReducedMotion) {
      after(REVEAL_HOLD_MS, finish);
      return;
    }

    let cancelled = false;
    const decoded = Promise.all(
      frameRefs.current.map(
        (img) => img?.decode().catch(() => undefined) ?? Promise.resolve(),
      ),
    );
    const timeout = new Promise<void>((resolve) =>
      window.setTimeout(resolve, PRELOAD_TIMEOUT_MS),
    );

    // requestAnimationFrame does not run in a background tab, so a greeting
    // begun there would be sitting at its end by the time anyone looked. Wait
    // for the tab to be visible and let the sequence play to whoever is there.
    const whenVisible = () =>
      document.hidden
        ? new Promise<void>((resolve) => {
            const onVisible = () => {
              if (document.hidden) return;
              document.removeEventListener("visibilitychange", onVisible);
              resolve();
            };
            document.addEventListener("visibilitychange", onVisible);
          })
        : Promise.resolve();

    Promise.race([decoded, timeout])
      .then(whenVisible)
      .then(() => {
        if (!cancelled) runSequence(buildCutSequence());
      });

    return () => {
      cancelled = true;
    };
    // Runs once: the greeting plays a single time per mount, so a mid-visit
    // change to the motion preference must not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      timers.forEach(clearTimeout);
    };
  }, []);

  // The page behind must not scroll under the greeting.
  useEffect(() => {
    if (gone) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [gone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  if (gone) return null;

  return (
    <div
      className={`${styles.greeting} ${styles[activePhase] ?? ""}`}
      data-phase={activePhase}
      role="dialog"
      aria-label="Winha intro"
      onClick={skip}
    >
      <div className={styles.stage}>
        <div className={styles.medallion}>
          <div className={styles.rule} aria-hidden="true" />

          <div className={styles.frames}>
            {INTRO_SYMBOLS.map((symbol, i) => (
              <img
                key={symbol.id}
                ref={(el) => {
                  frameRefs.current[i] = el;
                }}
                className={styles.frameImg}
                src={symbol.src}
                alt=""
                width={512}
                height={512}
                decoding="async"
                draggable={false}
              />
            ))}
          </div>

          <img
            className={styles.wordmark}
            src="/brand/wordmark.webp"
            alt="وينها — Winha"
            width={1600}
            height={666}
            draggable={false}
          />
        </div>

        <p className={styles.tagline} lang="ar" dir="rtl">
          شوف، ركّز، والقاها!
        </p>
      </div>

      <button type="button" className={styles.skip} onClick={skip}>
        Skip intro
      </button>

      <span className={styles.srOnly} role="status">
        {activePhase === "revealed" || activePhase === "leaving"
          ? "Winha — observation and speed game"
          : "Loading"}
      </span>
    </div>
  );
}
