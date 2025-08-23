// app/Page.jsx

import HeroCarousel from "./components/HeroCarousel";

export default function HomePage() {
  const slides = [
    {
      src: "/hero/mens.jpg",
      alt: "Mens sale",
      badge: "35% Off",
      headline: "Fashion sale for Men’s",
      subhead: "Wear the change. Fashion that feels good.",
      ctaHref: "/products?category=mens",
      overlay: "bg-[#2a4ba7]/25",
    },
    {
      src: "/hero/womens.jpg",
      alt: "Womens sale",
      headline: "Style steals for Women",
      subhead: "New arrivals with up to 40% off.",
      ctaHref: "/products?category=womens",
      overlay: "bg-[#ff7ab6]/25",
    },
    {
      src: "/hero/kids.jpg",
      alt: "Kids sale",
      headline: "Playful picks for Kids",
      subhead: "Everyday comfort. Everyday deals.",
      ctaHref: "/products?category=kids",
      overlay: "bg-[#22c55e]/25",
    },
  ];

  return (
    <main className="max-w-11/12 mx-auto rounded-2xl px-4">
      <HeroCarousel slides={slides}  fit="cover" className="mt-6" />
    </main>
  );
}