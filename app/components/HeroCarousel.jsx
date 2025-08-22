"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroCarousel({ slides = [], autoPlay = true, interval = 5000, className = "" }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    // If no slides passed, render nothing
    if (!slides.length) return null;

    // Auto-advance
    useEffect(() => {
        if (!autoPlay || paused || slides.length <= 1) return;
        const id = setInterval(() => setIndex((p) => (p + 1) % slides.length), interval);
        return () => clearInterval(id);
    }, [autoPlay, paused, interval, slides.length]);

    const goTo = (i) => setIndex((i + slides.length) % slides.length);

    return (
        <section
            className={`relative w-full overflow-hidden rounded-3xl ${className}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
        >
            <div className="relative h-[420px] sm:h-[480px] lg:h-[560px] bg-gray-200 dark:bg-neutral-900">
                {/* Track */}
                <div
                    className="flex h-full w-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((s, i) => (
                        <div key={i} className="relative h-full w-full shrink-0">
                            {/* Background image */}
                            <Image
                                src={s.src}
                                alt={s.alt || s.headline || "Slide"}
                                fill
                                priority={i === 0}
                                className="object-cover"
                                sizes="100vw"
                            />

                            {/* Overlay for readability */}
                            <div className="absolute inset-0 bg-black/30 dark:bg-black/45" aria-hidden="true" />
                            <div className={`absolute inset-0 mix-blend-multiply ${s.overlay ?? "bg-[#2a4ba7]/25"}`} aria-hidden="true" />

                            {/* Centered content */}
                            <div className="absolute inset-0 z-10 grid place-items-center p-6 text-center">
                                <div className="max-w-3xl">
                                    {s.badge ? (
                                        <span className="mb-4 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                                            {s.badge}
                                        </span>
                                    ) : null}

                                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow">
                                        {s.headline}
                                    </h2>

                                    {s.subhead ? (
                                        <p className="mt-3 text-base sm:text-lg text-white/90">{s.subhead}</p>
                                    ) : null}

                                    <div className="mt-6 flex justify-center">
                                        <Link href={s.ctaHref || "/products"} className="cta-btn" aria-label={s.ctaLabel || "Shop Now"}>
                                            <span>{s.ctaLabel || "Shop Now"}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrows */}
                {slides.length > 1 && (
                    <>
                        <button
                            onClick={() => goTo(index - 1)}
                            aria-label="Previous slide"
                            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-white/80 p-2 text-[#2a4ba7] shadow backdrop-blur hover:bg-white dark:bg-white/20 dark:text-[#b8d9ff] dark:hover:bg-black/20"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => goTo(index + 1)}
                            aria-label="Next slide"
                            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-white/80 p-2 text-[#2a4ba7] shadow backdrop-blur hover:bg-white dark:bg-white/20 dark:text-[#b8d9ff] dark:hover:bg-black/20"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Dots */}
                {slides.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "bg-[#2a4ba7] dark:bg-white" : "bg-white/70 hover:bg-white dark:bg-white/30 dark:hover:bg-white/60"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}