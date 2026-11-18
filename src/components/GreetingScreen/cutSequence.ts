import { INTRO_SIZE } from "./introDeck";

/**
 * The greeting is a hard-cut sequence, not a shuffle: one symbol replaces the
 * one before it in the same spot, with no crossfade. What sells it is the
 * *rhythm* — it winds up, blurs through a flat-out stretch, then drags to a
 * halt like a slowing reel before the wordmark lands.
 *
 * The schedule is generated here rather than in CSS because it is data: 57
 * cuts with individually shaped gaps, which keyframes cannot express without
 * being written out by hand.
 */

/** Cuts before the flat-out stretch. Gaps shorten across these. */
const WIND_UP_CUTS = 4;
/** Cuts held at full speed. This is the stretch that reads as a blur. */
const FLAT_OUT_CUTS = 16;
/** Cuts after the flat-out stretch. Gaps lengthen — the reel dragging down. */
const SLOW_DOWN_CUTS = 7;

// The three phases sum to 27, drawn from the twelve-card intro deck — so the
// run cycles it just over twice. See `drawCards` for how the seam between
// passes is kept from repeating a symbol.

/** Gap between the first two cuts, before the wind-up takes hold. */
const SLOWEST_START_MS = 104;
/** Gap held through the flat-out stretch. Four frames at 60fps, ~15 cards a
 *  second. Two frames is the technical floor — below that cuts share a display
 *  refresh and drop outright — but the useful floor is higher: the faster the
 *  run, the more it blurs into one texture instead of reading as a stack of
 *  distinct cards, which is the opposite of what a game about spotting them
 *  wants. Four frames is about where each card still registers. Past roughly
 *  six the run stops reading as a shuffle and becomes a slideshow. Length is
 *  bought by cutting fewer symbols, not by cutting them faster. */
const FASTEST_MS = 66;
/** Gap before the final cut, once the reel has all but stopped. */
const SLOWEST_END_MS = 320;

/** How long the last symbol sits alone before the wordmark takes the stage. */
export const FINAL_HOLD_MS = 260;

const TOTAL_CUTS = WIND_UP_CUTS + FLAT_OUT_CUTS + SLOW_DOWN_CUTS;

export type Cut = {
  /** Index into INTRO_SYMBOLS of the symbol shown by this cut. */
  symbolIndex: number;
  /** Milliseconds from sequence start at which this cut lands. */
  at: number;
};

export type CutSequence = {
  cuts: Cut[];
};

const easeIn = (t: number) => t * t;
const easeOut = (t: number) => Math.pow(t, 2.6);

/** Gap that *precedes* cut `i`. */
function gapBefore(i: number): number {
  if (i < WIND_UP_CUTS) {
    const t = i / (WIND_UP_CUTS - 1);
    return SLOWEST_START_MS + (FASTEST_MS - SLOWEST_START_MS) * easeIn(t);
  }
  if (i < WIND_UP_CUTS + FLAT_OUT_CUTS) {
    return FASTEST_MS;
  }
  const t = (i - WIND_UP_CUTS - FLAT_OUT_CUTS) / (SLOW_DOWN_CUTS - 1);
  return FASTEST_MS + (SLOWEST_END_MS - FASTEST_MS) * easeOut(t);
}

/** Fisher-Yates over a copy. */
function shuffle(cards: number[], random: () => number): number[] {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/**
 * Enough cards for `count` cuts, as whole shuffled passes over the intro deck.
 *
 * Shuffling per pass rather than once: the run needs more cuts than the deck
 * has cards, and repeating one fixed order would read as a visible loop. Going
 * a pass at a time also spaces each symbol's reappearances evenly, where
 * drawing at random would clump them.
 */
function drawCards(count: number, random: () => number): number[] {
  const all = Array.from({ length: INTRO_SIZE }, (_, i) => i);
  const cards: number[] = [];

  while (cards.length < count) {
    const pass = shuffle(all, random);
    // A pass opening on the card the last one closed with would show the same
    // symbol twice running, which reads as a dropped cut rather than as two.
    // Swapping the first two is enough, and unlike reshuffling it terminates.
    if (cards.length > 0 && pass[0] === cards[cards.length - 1]) {
      [pass[0], pass[1]] = [pass[1], pass[0]];
    }
    cards.push(...pass);
  }

  return cards.slice(0, count);
}

export function buildCutSequence(random: () => number = Math.random): CutSequence {
  const cards = drawCards(TOTAL_CUTS, random);
  const cuts: Cut[] = [];
  let at = 0;

  for (let i = 0; i < TOTAL_CUTS; i++) {
    at += gapBefore(i);
    cuts.push({ symbolIndex: cards[i], at: Math.round(at) });
  }

  return { cuts };
}

/** Total cuts in a sequence. */
export const CUT_COUNT = TOTAL_CUTS;
