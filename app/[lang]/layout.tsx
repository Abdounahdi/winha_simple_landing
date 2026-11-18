import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Baloo_Bhaijaan_2, Rubik } from "next/font/google";
import { getDictionary, isLocale, localeMeta, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import "@/styles/globals.scss";

const display = Baloo_Bhaijaan_2({
  subsets: ["latin", "arabic"],
  weight: ["600", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Rubik({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

// Runs before first paint: skip the intro if it was already shown this session,
// otherwise lock scrolling while it plays (with a 3s safety unlock).
const introScript = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem("winha-intro")){d.classList.add("intro-seen")}else{d.classList.add("intro-active");setTimeout(function(){d.classList.remove("intro-active")},3000)}}catch(e){}})();`;

// Pre-render /en, /fr and /ar at build time; any other prefix is a 404.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;

  return {
    metadataBase: new URL(site.url),
    title: { default: t.title, template: "%s | Winha" },
    description: t.description,
    keywords: t.keywords,
    applicationName: "Winha",
    alternates: {
      canonical: `/${lang}`,
      // hreflang links so search engines serve the right language version
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: "Winha",
      title: t.ogTitle,
      description: t.description,
      locale: localeMeta[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeMeta[l].og),
    },
    twitter: { card: "summary_large_image", title: t.ogTitle, description: t.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#1f3fc4",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: Params & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={localeMeta[lang].dir}
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning // the intro script adds a class before React loads
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {children}
      </body>
    </html>
  );
}
