"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Neighborhood } from "@/lib/content/types";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface NeighborhoodMapModalProps {
  neighborhood: Neighborhood | null;
  onClose: () => void;
}

export function NeighborhoodMapModal({
  neighborhood,
  onClose,
}: NeighborhoodMapModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useBodyScrollLock(Boolean(neighborhood));

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!neighborhood) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [neighborhood, handleKeyDown]);

  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const panelVariants = prefersReducedMotion
    ? overlayVariants
    : {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };

  return (
    <AnimatePresence>
      {neighborhood && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="neighborhood-modal-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
            aria-label="Close neighborhood details"
            onClick={onClose}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.25 }}
          />

          <motion.div
            key={neighborhood.slug}
            className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-sm bg-white shadow-2xl sm:rounded-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[16/9] shrink-0 overflow-hidden">
              <Image
                src={neighborhood.image}
                alt={`${neighborhood.name}, Oʻahu`}
                fill
                className="object-cover"
                sizes="512px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-sm bg-white/95 text-navy hover:bg-white"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <p className="absolute bottom-4 left-5 font-serif text-2xl text-white">
                {neighborhood.name}
              </p>
            </div>

            <div
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8"
            >
              <h2 id="neighborhood-modal-title" className="sr-only">
                {neighborhood.name}
              </h2>
              <p className="text-sm leading-relaxed text-foreground/70">
                {neighborhood.description.trim()}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="btn-primary flex-1 text-center"
                  onClick={onClose}
                >
                  Explore {neighborhood.name}
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline-dark flex-1 text-center"
                  onClick={onClose}
                >
                  Ask Omeo
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
