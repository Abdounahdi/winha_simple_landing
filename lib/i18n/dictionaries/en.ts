// English copy. fr.ts and ar.ts must follow exactly the same shape.
// [brackets] = placeholder waiting for real info.

const en = {
  meta: {
    title: "Winha (وينها!) — The Quick-Eye Card Game with a Tunisian Soul",
    ogTitle: "Winha — Look. Focus. Find it!",
    description:
      "Winha (وينها!) is the fast, quick-eye card game with a Tunisian soul. Every two cards share exactly one symbol — spot it first and win the round. 57 hand-drawn symbols from Tunisian everyday life, for 2–6 players.",
    keywords: ["Winha", "وينها", "card game", "Tunisian board game", "family game", "party game", "symbol matching game"],
  },
  nav: {
    links: ["How to Play", "Why Winha", "FAQ", "Contact"],
    buy: "Buy Now",
    home: "Winha home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    title: [
      { text: "The ", hl: false },
      { text: "quick-eye", hl: true },
      { text: " card game with a ", hl: false },
      { text: "Tunisian", hl: true },
      { text: " soul", hl: false },
    ],
    lead: "Every two cards share exactly one symbol. Spot it first, shout it out, and win the card — with 57 hand-drawn symbols straight from Tunisian everyday life.",
    how: "How ?",
    imageAlt: "Winha card game box, open tin of cards and three round symbol cards",
  },
  stats: {
    label: "Game at a glance",
    items: [
      { value: "57", label: "Symbols" },
      { value: "2–6", label: "Players" },
      { value: "10–15", label: "Minutes" }, // [placeholder] confirm game length
      { value: "6+", label: "Ages" }, // [placeholder] confirm age rating
    ],
  },
  how: {
    title: "How it works",
    steps: [
      {
        title: "Flip the cards",
        text: "Deal one card to every player and place one face-up in the middle. Everyone flips at the same time.",
        alt: "Players' hands flipping round Winha cards face-up around a table",
      },
      {
        title: "Spot the match",
        text: "Any two cards share exactly one symbol — a chili, a hamsa, a Nokia 3310. Find yours before anyone else.",
        alt: "A magnifying glass revealing the red chili shared by two Winha cards",
      },
      {
        title: "Shout it & win",
        text: "Call out the symbol, grab the card, and keep going. Most cards when the deck runs out wins!",
        alt: "A young woman laughing and holding up a winning Winha card with friends",
      },
    ],
  },
  trust: {
    title: "Loved by families, cafés & game nights across Tunisia",
    items: [
      "Designed & Made in Tunisia",
      "57 Hand-Drawn Symbols",
      "[X,XXX] Copies Sold", // [placeholder]
      "[Playtested by 100+ Families]", // [placeholder]
    ],
  },
  reasons: {
    title: ["Four reasons it hits the table", "every game night"],
    items: [
      {
        title: "Learn it in 30 seconds",
        text: "One rule: find the matching symbol. No reading, no setup, straight into the action.",
        alt: "A grandparent guiding a child's hand to the matching symbol on two Winha cards",
      },
      {
        title: "Every round is different",
        text: "55 cards, millions of match-ups. No two games ever play out the same way.",
        alt: "Dozens of Winha cards laid out in a spiral showing all the different symbols",
      },
      {
        title: "Pure Tunisian nostalgia",
        text: "Brik, bambalouni, the old TV, Sidi Bou Said doors — symbols that spark stories around the table.",
        alt: "Winha box beside brik, watermelon and a Nokia 3310 in front of a Sidi Bou Said door",
      },
      {
        title: "Built for game night",
        text: "Perfect for families, friends, cafés and Ramadan soirées — anyone who loves a bit of chaos.",
        alt: "Family and friends laughing around a Winha game with mint tea and bambalouni",
      },
    ],
  },
  feature: {
    title: "Sharp eyes. Fast hands. Loud laughs.",
    text: "Winha turns any table into an arena. Grandparents vs. grandkids, cousins vs. cousins — everyone has the same chance when the cards hit the table.",
    alt: "Several hands racing to grab the same Winha card in the middle of the table",
  },
  faq: {
    title: "Questions? We've got answers.",
    items: [
      {
        q: "How do you play Winha?",
        a: "Each card has 8 symbols, and any two cards share exactly one. Flip a card, spot the symbol it shares with another card, call it out first, and win the card. The rulebook includes 5 mini-games to keep things fresh. [placeholder — confirm number of mini-games]",
      },
      { q: "How many players can play?", a: "Winha is designed for 2 to 6 players, and works great with larger groups in team mode." },
      { q: "How long does a game last?", a: "A round takes about 10–15 minutes — short enough for 'just one more'. [placeholder]" },
      {
        q: "What's included in the box?",
        a: "55 round symbol cards, a sturdy storage box, and a rulebook in Arabic, French and English. [placeholder — confirm contents]",
      },
      { q: "Do I need to read Arabic to play?", a: "Not at all. Winha is fully visual — if you can see a watermelon, you can play." },
      {
        q: "What age is Winha recommended for?",
        a: "Ages 6 and up. Younger kids can play with a little help, and they often beat the adults. [placeholder]",
      },
      {
        q: "Do you deliver across Tunisia?",
        a: "[Placeholder] Yes — we deliver to all 24 governorates. Shipping details will be added here.",
      },
    ],
  },
  cta: {
    title: "Ready to find it ",
    titleHl: "first?",
    text: "Grab your copy of Winha, gather the family, and find out who really has the sharpest eyes at the table.",
    imageAlt: "The Winha game box on blue zellige tiles with cards",
  },
  footer: {
    about:
      "A fast, quick-eye card game inspired by Tunisian everyday life. Easy to learn, endlessly replayable, and made for unforgettable game nights.",
    backToTop: "Winha, back to top",
    explore: "Explore",
    home: "Home",
    shop: "Shop",
    newsTitle: "Join the game-night list",
    newsText: "New editions, tournaments and exclusive drops — no spam, wallah.",
    emailLabel: "Email address",
    subscribe: "Subscribe",
    thanks: "Shukran! You're on the list.",
    rights: "All rights reserved.",
  },
  product: {
    category: "Card Game",
  },
  intro: {
    tagline: "Look. Focus. Find it!",
  },
};

export default en;
export type Dictionary = typeof en;
