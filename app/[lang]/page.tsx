import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { Trust } from "@/components/Trust";
import { Reasons } from "@/components/Reasons";
import { Feature } from "@/components/Feature";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { getDictionary, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  // Structured data so search engines can show rich results (product + FAQ), per language.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Winha (وينها!)",
      description: t.meta.description,
      inLanguage: lang,
      url: `${site.url}/${lang}`,
      image: [`${site.url}/images/hero-product.jpg`, `${site.url}/images/cta-product.jpg`],
      brand: { "@type": "Brand", name: "Winha" },
      category: t.product.category,
      audience: { "@type": "PeopleAudience", suggestedMinAge: 6 },
      // [placeholder] add "offers": { "@type": "Offer", price, priceCurrency: "TND", availability } once pricing is final
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: t.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Intro tagline={t.intro.tagline} />
      <Header t={t.nav} lang={lang} />
      <main className="page">
        <Hero t={t.hero} buy={t.nav.buy} />
        <Stats t={t.stats} />
        <HowItWorks t={t.how} />
        <Trust t={t.trust} />
        <Reasons t={t.reasons} />
        <Feature t={t.feature} />
        <Faq t={t.faq} />
        <Cta t={t.cta} buy={t.nav.buy} how={t.hero.how} />
      </main>
      <Footer t={t.footer} navLinks={t.nav.links} />
    </>
  );
}
