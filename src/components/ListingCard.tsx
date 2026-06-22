"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/content/types";
import {
  formatAddress,
  formatPrice,
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
  const statusLabel = formatStatus(listing.status);
  const soldDate = formatSoldDate(listing.sold_date);

  const cardContent = (
    <article className="group overflow-hidden rounded-sm bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.image}
          alt={formatAddress(listing)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 text-[10px] font-medium tracking-widest uppercase ${
              listing.status === "sold"
                ? "bg-navy text-gold"
                : listing.status === "pending"
                  ? "bg-ocean text-white"
                  : "bg-gold text-navy"
            }`}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="border border-t-0 border-sand p-6">
        <p className="font-serif text-2xl text-navy">
          {formatPrice(listing.price)}
        </p>
        {soldDate && (
          <p className="mt-1 text-xs tracking-wider text-foreground/50 uppercase">
            Closed {soldDate}
          </p>
        )}
        <h3 className="mt-3 text-sm font-medium text-navy">
          {listing.address}
          {listing.unit && ` ${listing.unit}`}
        </h3>
        <p className="mt-1 text-sm text-foreground/60">
          {listing.city}, {listing.state} {listing.zip}
        </p>
        <div className="mt-4 flex gap-4 text-xs tracking-wider text-foreground/50 uppercase">
          <span>{listing.beds} Beds</span>
          <span>·</span>
          <span>{listing.baths} Baths</span>
          <span>·</span>
          <span>{listing.sqft.toLocaleString()} SF</span>
        </div>
        {showDescription && listing.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/60">
            {listing.description.trim()}
          </p>
        )}
      </div>
    </article>
  );

  if (prefersReducedMotion) {
    return cardContent;
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
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
      <div className="rounded-sm border border-dashed border-navy/20 bg-sky/30 px-8 py-16 text-center">
        <p className="font-serif text-xl text-navy">No listings to display</p>
        <p className="mt-2 text-sm text-foreground/60">
          Check back soon or{" "}
          <Link href="/contact" className="text-ocean-light underline">
            contact Omeo
          </Link>{" "}
          for current availability.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
