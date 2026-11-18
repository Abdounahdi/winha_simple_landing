/**
 * The 57 Winha card symbols, in the order they are numbered on the physical
 * deck. Generated from `public/symbols/` — each file is the source artwork
 * alpha-trimmed, padded to a square so every symbol reads at the same optical
 * size, and re-encoded to 512px WebP.
 */
export type Symbol = {
  /** Card number on the printed deck, 1-57. */
  id: number;
  slug: string;
  src: string;
};

export const SYMBOLS: Symbol[] = [
  { id: 1, slug: "tanit", src: "/symbols/01-tanit.webp" },
  { id: 2, slug: "eye", src: "/symbols/02-eye.webp" },
  { id: 3, slug: "5millime", src: "/symbols/03-5millime.webp" },
  { id: 4, slug: "rami", src: "/symbols/04-rami.webp" },
  { id: 5, slug: "labib", src: "/symbols/05-labib.webp" },
  { id: 6, slug: "boga", src: "/symbols/06-boga.webp" },
  { id: 7, slug: "rougemagic", src: "/symbols/07-rougemagic.webp" },
  { id: 8, slug: "brek", src: "/symbols/08-brek.webp" },
  { id: 9, slug: "chachia", src: "/symbols/09-chachia.webp" },
  { id: 10, slug: "khorraz", src: "/symbols/10-khorraz.webp" },
  { id: 11, slug: "chheda", src: "/symbols/11-chheda.webp" },
  { id: 12, slug: "bis", src: "/symbols/12-bis.webp" },
  { id: 13, slug: "chouflihal", src: "/symbols/13-chouflihal.webp" },
  { id: 14, slug: "darboukaa", src: "/symbols/14-darboukaa.webp" },
  { id: 15, slug: "dele3", src: "/symbols/15-dele3.webp" },
  { id: 16, slug: "felfel", src: "/symbols/16-felfel.webp" },
  { id: 17, slug: "chi3ar", src: "/symbols/17-chi3ar.webp" },
  { id: 18, slug: "fricasse", src: "/symbols/18-fricasse.webp" },
  { id: 19, slug: "ghzela", src: "/symbols/19-ghzela.webp" },
  { id: 20, slug: "hannibal", src: "/symbols/20-hannibal.webp" },
  { id: 21, slug: "hrissa", src: "/symbols/21-hrissa.webp" },
  { id: 22, slug: "mille-feuille", src: "/symbols/22-mille-feuille.webp" },
  { id: 23, slug: "jem", src: "/symbols/23-jem.webp" },
  { id: 24, slug: "beja", src: "/symbols/24-beja.webp" },
  { id: 25, slug: "jmel", src: "/symbols/25-jmel.webp" },
  { id: 26, slug: "coffee", src: "/symbols/26-coffee.webp" },
  { id: 27, slug: "khlel", src: "/symbols/27-khlel.webp" },
  { id: 28, slug: "kholkhal", src: "/symbols/28-kholkhal.webp" },
  { id: 29, slug: "khomsa", src: "/symbols/29-khomsa.webp" },
  { id: 30, slug: "koffa", src: "/symbols/30-koffa.webp" },
  { id: 31, slug: "lablebi", src: "/symbols/31-lablebi.webp" },
  { id: 32, slug: "louage", src: "/symbols/32-louage.webp" },
  { id: 33, slug: "kanoun", src: "/symbols/33-kanoun.webp" },
  { id: 34, slug: "makroudh", src: "/symbols/34-makroudh.webp" },
  { id: 35, slug: "margoum", src: "/symbols/35-margoum.webp" },
  { id: 36, slug: "khyata", src: "/symbols/36-khyata.webp" },
  { id: 37, slug: "mehres", src: "/symbols/37-mehres.webp" },
  { id: 38, slug: "chleka", src: "/symbols/38-chleka.webp" },
  { id: 39, slug: "mongela", src: "/symbols/39-mongela.webp" },
  { id: 40, slug: "nabel", src: "/symbols/40-nabel.webp" },
  { id: 41, slug: "nakhla", src: "/symbols/41-nakhla.webp" },
  { id: 42, slug: "nesr", src: "/symbols/42-nesr.webp" },
  { id: 43, slug: "nokia", src: "/symbols/43-nokia.webp" },
  { id: 44, slug: "passport", src: "/symbols/44-passport.webp" },
  { id: 45, slug: "sefseri", src: "/symbols/45-sefseri.webp" },
  { id: 46, slug: "romen", src: "/symbols/46-romen.webp" },
  { id: 47, slug: "zarbout", src: "/symbols/47-zarbout.webp" },
  { id: 48, slug: "sidibousaid", src: "/symbols/48-sidibousaid.webp" },
  { id: 49, slug: "sonbola", src: "/symbols/49-sonbola.webp" },
  { id: 50, slug: "gherbel", src: "/symbols/50-gherbel.webp" },
  { id: 51, slug: "stamp", src: "/symbols/51-stamp.webp" },
  { id: 52, slug: "jarida", src: "/symbols/52-jarida.webp" },
  { id: 53, slug: "rouznama", src: "/symbols/53-rouznama.webp" },
  { id: 54, slug: "machmoum", src: "/symbols/54-machmoum.webp" },
  { id: 55, slug: "yoyo", src: "/symbols/55-yoyo.webp" },
  { id: 56, slug: "zitoun", src: "/symbols/56-zitoun.webp" },
  { id: 57, slug: "kobkab", src: "/symbols/57-kobkab.webp" },
];

export const SYMBOL_COUNT = SYMBOLS.length;
