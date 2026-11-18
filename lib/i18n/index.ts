import type { Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import fr from "./dictionaries/fr";
import ar from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = { en, fr, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./config";
