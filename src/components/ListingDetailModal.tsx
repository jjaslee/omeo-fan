"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Listing } from "@/lib/content/types";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import {
  formatAddress,
  formatPrice,
  formatSampleSubLabel,
  formatSoldDate,
  formatStatus,
} from "@/lib/format";

interface ListingDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
}

export function ListingDetailModal({
  listing,
  onClose,
}: ListingDetailModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useBodyScrollLock(Boolean(listing));

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!listing) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [listing, handleKeyDown]);

  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const panelVariants = prefersReducedMotion
    ? overlayVariants
    : {
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };

  return (
    <AnimatePresence>
      {listing && (
        <ModalContent
          key={listing.id}
          listing={listing}
          onClose={onClose}
          overlayVariants={overlayVariants}
          panelVariants={panelVariants}
        />
      )}
    </AnimatePresence>
  );
}

function ModalContent({
  listing,
  onClose,
  overlayVariants,
  panelVariants,
}: {
  listing: Listing;
  onClose: () => void;
  overlayVariants: { hidden: { opacity: number }; visible: { opacity: number } };
  panelVariants: {
    hidden: { opacity: number; y?: number; scale?: number };
    visible: { opacity: number; y?: number; scale?: number };
  };
}) {
  const isSample = listing.is_sample ?? false;
  const statusLabel = formatStatus(listing.status, isSample);
  const subLabel = formatSampleSubLabel(isSample, listing.status);
  const soldDate = formatSoldDate(listing.sold_date);
  const addressLine = formatAddress(listing);
  const title = isSample
    ? listing.address || addressLine
    : `${listing.address}${listing.unit ? ` ${listing.unit}` : ""}`;

  const contactHref =
    listing.status === "sold"
      ? "/contact?interest=selling"
      : "/contact?interest=buying";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center px-4 pt-20 pb-4 sm:items-center sm:px-6 sm:pt-24 sm:pb-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="listing-modal-title"
    >
      <motion.button
        type="button"
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        aria-label="Close property details"
        onClick={onClose}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        className="relative z-10 flex max-h-[calc(100vh-5.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-t-sm bg-white shadow-2xl sm:max-h-[calc(100vh-7rem)] sm:rounded-sm"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={panelVariants}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden sm:aspect-[2/1]">
          <Image
            src={listing.image}
            alt={
              isSample
                ? `${title} — property detail preview`
                : `${title}, ${listing.city}`
            }
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-sm bg-white/95 text-navy transition-colors hover:bg-white"
            aria-label="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 text-[10px] font-medium tracking-widest uppercase ${
                isSample
                  ? "bg-white/95 text-ocean"
                  : listing.status === "sold"
                    ? "bg-navy text-gold"
                    : listing.status === "pending"
                      ? "bg-ocean text-white"
                      : "bg-gold text-navy"
              }`}
            >
              {statusLabel}
            </span>
            {subLabel && (
              <span className="max-w-xs bg-navy/85 px-3 py-1 text-[10px] leading-snug tracking-wide text-white/90">
                {subLabel}
              </span>
            )}
          </div>
        </div>

        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6"
        >
          <p className="font-serif text-2xl text-navy sm:text-3xl">
            {formatPrice(listing.price, isSample)}
          </p>
          {soldDate && !isSample && (
            <p className="mt-1 text-xs tracking-wider text-foreground/50 uppercase">
              Closed {soldDate}
            </p>
          )}

          <h2
            id="listing-modal-title"
            className="mt-4 font-serif text-xl text-navy sm:text-2xl"
          >
            {title}
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            {isSample
              ? `${listing.city}, Oʻahu`
              : `${listing.city}, ${listing.state} ${listing.zip}`}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {listing.property_type && (
              <Stat label="Type" value={listing.property_type} />
            )}
            <Stat label="Bedrooms" value={String(listing.beds)} />
            <Stat label="Bathrooms" value={String(listing.baths)} />
            <Stat label="Square Feet" value={listing.sqft.toLocaleString()} />
          </dl>

          {listing.description && (
            <div className="mt-8 border-t border-sand pt-6">
              <h3 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                About This Property
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {listing.description.trim()}
              </p>
            </div>
          )}

          {listing.features && listing.features.length > 0 && (
            <div className="mt-8 border-t border-sand pt-6">
              <h3 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                Features
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {listing.features.map((feature) => (
                  <li
                    key={feature}
                    className="border border-sand bg-sky/20 px-3 py-1.5 text-xs text-navy"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-sand pt-6 sm:flex-row">
            <Link
              href={contactHref}
              className="btn-primary flex-1 text-center"
              onClick={onClose}
            >
              {listing.status === "sold"
                ? "Ask About Selling"
                : "Schedule a Showing"}
            </Link>
            <Link
              href="/contact"
              className="btn-outline-dark flex-1 text-center"
              onClick={onClose}
            >
              Contact Omeo
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-sand bg-sky/15 px-4 py-3">
      <dt className="text-[10px] tracking-wider text-foreground/45 uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-navy">{value}</dd>
    </div>
  );
}
