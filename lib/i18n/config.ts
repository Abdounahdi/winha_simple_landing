export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { label: string; name: string; dir: "ltr" | "rtl"; og: string }> = {
  en: { label: "EN", name: "English", dir: "ltr", og: "en_US" },
  fr: { label: "FR", name: "Français", dir: "ltr", og: "fr_FR" },
  ar: { label: "ع", name: "العربية", dir: "rtl", og: "ar_TN" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
