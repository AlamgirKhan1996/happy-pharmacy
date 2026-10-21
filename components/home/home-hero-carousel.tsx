"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@/components/icons/icons";
import type { HeroSlide } from "@/lib/storefront";

type HomeHeroCarouselProps = {
  slides: readonly HeroSlide[];
};

const SLIDE_SURFACES: Record<string, string> = {
  "baby-and-child": "bg-[#f4cfd6]",
  "skin-care": "bg-[#e3d2f3]",
  "health-supplements": "bg-[#e5f3e8]",
};

const HERO_IMAGE_SIZES = "(min-width: 1280px) 1200px, 100vw";

export function HomeHeroCarousel({ slides }: HomeHeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, slides.length]);

  const current = slides[index];

  if (!current) {
    return null;
  }

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
    setPaused(true);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured categories"
      className="relative isolate w-full max-w-full overflow-hidden bg-surface-warm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative isolate mx-auto h-[clamp(18rem,10rem+28vw,31.25rem)] w-full max-w-7xl overflow-hidden">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${
              SLIDE_SURFACES[slide.id] ?? "bg-surface-warm"
            } ${
              slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={slideIndex !== index}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes={HERO_IMAGE_SIZES}
              aria-hidden="true"
              className="pointer-events-none scale-110 object-cover select-none opacity-30 blur-[24px]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-white/25"
              aria-hidden="true"
            />
            <div className="absolute inset-x-2 top-2 bottom-16 z-10 sm:inset-x-4 sm:top-3 sm:bottom-5">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={HERO_IMAGE_SIZES}
                priority={slideIndex === 0}
                className="object-contain object-center"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6">
              <Link
                href={slide.href}
                tabIndex={slideIndex === index ? 0 : -1}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-brand shadow-sm hover:bg-surface-warm"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}

        <div className="absolute inset-y-0 left-2 z-20 flex items-center sm:left-4">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
            onClick={() => goTo(index - 1)}
          >
            <ChevronLeftIcon />
            <span className="sr-only">Previous slide</span>
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 z-20 flex items-center sm:right-4">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
            onClick={() => goTo(index + 1)}
          >
            <ChevronRightIcon />
            <span className="sr-only">Next slide</span>
          </button>
        </div>

        <div className="absolute bottom-4 right-2 z-20 flex items-center gap-2 sm:right-4">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
            onClick={() => setPaused((currentPaused) => !currentPaused)}
            aria-pressed={paused || reduceMotion}
          >
            {paused || reduceMotion ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
            <span className="sr-only">
              {paused || reduceMotion ? "Play slides" : "Pause slides"}
            </span>
          </button>
          <div className="flex gap-1.5 rounded-full bg-white/90 px-2 py-1.5">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                className={`size-2.5 rounded-full ${
                  slideIndex === index ? "bg-brand" : "bg-line"
                }`}
                aria-current={slideIndex === index}
                onClick={() => goTo(slideIndex)}
              >
                <span className="sr-only">Show {slide.cta}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
