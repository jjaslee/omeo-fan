"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/content/types";
import {
  formatAddress,
  formatPrice,
  formatSampleSubLabel,
  formatSoldDate,
  formatStatus,
} from "@/lib/format";

interface ListingCardProps {
  listing: Listing;
  showDescription?: boolean;
}

export function ListingCard({
  listing,
  showDescription = false,
}: ListingCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isSample = listing.is_sample ?? false;
  const statusLabel = formatStatus(listing.status, isSample);
  const subLabel = formatSampleSubLabel(isSample, listing.status);
  const soldDate = formatSoldDate(listing.sold_date);
  const addressLine = formatAddress(listing);

  const cardContent = (
    <article
      className={`group overflow-hidden rounded-sm bg-white shadow-sm transition-shadow duration-300 hover:shadow-md ${
        isSample ? "ring-1 ring-ocean/10" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.image}
          alt={
            isSample
              ? `${addressLine} — sample property card layout`
              : addressLine
          }
          fill
          className={`object-cover transition-transform duration-500 ${
            isSample ? "opacity-90 saturate-[0.85]" : "group-hover:scale-105"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 flex max-w-[85%] flex-col gap-2">
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
            <span className="bg-navy/85 px-3 py-1 text-[10px] leading-snug tracking-wide text-white/85">
              {subLabel}
            </span>
          )}
        </div>
      </div>

      <div className="border border-t-0 border-sand p-5 sm:p-6">
        <p className="font-serif text-xl text-navy sm:text-2xl">
          {formatPrice(listing.price, isSample)}
        </p>
        {soldDate && !isSample && (
          <p className="mt-1 text-xs tracking-wider text-foreground/50 uppercase">
            Closed {soldDate}
          </p>
        )}
        <h3 className="mt-3 text-sm font-medium leading-snug text-navy">
          {isSample
            ? listing.address || addressLine
            : `${listing.address}${listing.unit ? ` ${listing.unit}` : ""}`}
        </h3>
        {!isSample && (
          <p className="mt-1 text-sm text-foreground/60">
            {listing.city}, {listing.state} {listing.zip}
          </p>
        )}
        {isSample && (
          <p className="mt-1 text-xs text-foreground/45">{listing.city}, Oʻahu</p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs tracking-wider text-foreground/45 uppercase">
          <span>{listing.beds} Beds</span>
          <span aria-hidden="true">·</span>
          <span>{listing.baths} Baths</span>
          <span aria-hidden="true">·</span>
          <span>{listing.sqft.toLocaleString()} SF</span>
        </div>
        {showDescription && listing.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/55">
            {listing.description.trim()}
          </p>
        )}
      </div>
    </article>
  );

  if (prefersReducedMotion) return cardContent;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {cardContent}
    </motion.div>
  );
}

export function ListingGrid({
  listings,
  showDescription = false,
}: {
  listings: Listing[];
  showDescription?: boolean;
}) {
  if (listings.length === 0) {
    return (
      <div className="rounded-sm border border-sand bg-sky/20 px-8 py-16 text-center">
        <p className="font-serif text-xl text-navy">Active listings</p>
        <p className="mt-2 text-sm text-foreground/60">
          Properties will be displayed here once available.{" "}
          <Link
            href="/contact"
            className="text-ocean-light underline-offset-2 hover:underline"
          >
            Contact Omeo
          </Link>{" "}
          for current availability.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
}
