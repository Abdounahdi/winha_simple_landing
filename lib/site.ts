// Language-independent settings. Translated copy lives in lib/i18n/dictionaries.
// Anything wrapped in [brackets] is a placeholder waiting for real info.

export const site = {
  name: "Winha",
  arabicName: "وينها!",
  arabicMotto: "شوف، ركّز، ألقاها!",
  url: "https://winha.example.com", // [placeholder] replace with the real domain
  price: "[XX] TND", // [placeholder]
  buyUrl: "#buy", // [placeholder] link to shop / checkout
  howUrl: "#how-to-play",
  email: "hello@winha.example.com", // [placeholder]
};

export const navHrefs = ["#how-to-play", "#why", "#faq", "#contact"] as const;

export const trustIcons = ["flag", "eye", "box", "heart"] as const;

export const reasonTones = ["yellow", "red", "sky", "cream"] as const;

export const socials = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "TikTok", href: "#", icon: "tiktok" },
] as const;
