"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";
import type { Testimonial } from "@/lib/content/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  if (testimonials.length === 0) {
    return (
      <PlaceholderCard
        label="Client testimonials"
        description="Client testimonials will be added after client review."
        variant="light"
        className="mx-auto max-w-2xl py-14"
      />
    );
  }

  const current = testimonials[index];

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs tracking-[0.25em] text-gold uppercase">
            Success Stories
          </p>
          <blockquote className="mt-6 font-serif text-xl leading-relaxed text-white md:text-2xl">
            &ldquo;{current.quote.trim()}&rdquo;
          </blockquote>
          <footer className="mt-6">
            <p className="text-sm font-medium text-white">{current.author}</p>
            <p className="mt-1 text-xs text-white/50">{current.location}</p>
          </footer>
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() =>
              setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
            }
            className="text-white/50 transition-colors hover:text-gold"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-white/30"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))
            }
            className="text-white/50 transition-colors hover:text-gold"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
