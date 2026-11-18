import { SYMBOLS, type Symbol } from "@/data/symbols";

/**
 * The greeting cuts through a fixed twelve of the 57 cards rather than the
 * whole deck, so the intro waits on twelve images instead of fifty-seven.
 *
 * Chosen for spread rather than favouritism: at 34ms a symbol registers as a
 * silhouette and a colour and nothing more, so consecutive cuts have to differ
 * in both. Twelve that share a palette would read as one smear. The hamsa
 * leads because it is the brand's primary mark.
 */
const INTRO_SLUGS = [
  "khomsa", // hamsa — the primary mark. White and blue.
  "chachia", // fez. Red, tall.
  "tanit", // Tanit sign. Gold, linear.
  "eye", // evil eye. Blue, circular.
  "dele3", // watermelon. Red and green, wedge.
  "nakhla", // palm. Green, tall and thin.
  "sidibousaid", // blue door. Blue and white, rectangular.
  "felfel", // chilli. Red, thin diagonal.
  "darboukaa", // drum. Brown, squat.
  "louage", // shared taxi. Yellow, wide.
  "brek", // pastry. Gold, triangular.
  "zitoun", // olives. Dark green, clustered.
] as const;

export const INTRO_SYMBOLS: Symbol[] = INTRO_SLUGS.map((slug) => {
  const symbol = SYMBOLS.find((s) => s.slug === slug);
  if (!symbol) {
    // A renamed or removed artwork file would otherwise show as a silent hole
    // in the sequence, which is hard to trace back to its cause.
    throw new Error(
      `Intro deck references "${slug}", which is not in public/symbols/.`,
    );
  }
  return symbol;
});

export const INTRO_SIZE = INTRO_SYMBOLS.length;
