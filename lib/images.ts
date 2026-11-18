// Static imports let Next.js read each image's size at build time and
// generate a tiny blurred preview (blurDataURL) that is inlined in the HTML.
// That preview shows instantly — even on slow 3G — while the real image loads.

import heroProduct from "@/public/images/hero-product.jpg";
import ctaProduct from "@/public/images/cta-product.jpg";
import featureAction from "@/public/images/feature-action.jpg";
import stepFlip from "@/public/images/step-flip.jpg";
import stepSpot from "@/public/images/step-spot.jpg";
import stepWin from "@/public/images/step-win.jpg";
import reasonEasy from "@/public/images/reason-easy.jpg";
import reasonVariety from "@/public/images/reason-variety.jpg";
import reasonNostalgia from "@/public/images/reason-nostalgia.jpg";
import reasonGamenight from "@/public/images/reason-gamenight.jpg";
import logo from "@/public/images/logo-512.jpg";
import mascot from "@/public/images/mascot.png";
import mascotTight from "@/public/images/mascot-tight.png"; // trimmed, for centering in the intro

export const images = {
  heroProduct,
  ctaProduct,
  featureAction,
  steps: [stepFlip, stepSpot, stepWin],
  reasons: [reasonEasy, reasonVariety, reasonNostalgia, reasonGamenight],
  logo,
  mascot,
  mascotTight,
};
