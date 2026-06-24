"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Neighborhood } from "@/lib/content/types";
import { OAHU_MAP_IMAGE, getMapRegion, type MapRegion } from "@/lib/oahu-map-regions";
import { NeighborhoodMapModal } from "@/components/NeighborhoodMapModal";

interface OahuNeighborhoodMapProps {
  neighborhoods: Neighborhood[];
  compact?: boolean;
}

export function OahuNeighborhoodMap({
  neighborhoods,
  compact = false,
}: OahuNeighborhoodMapProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selected, setSelected] = useState<Neighborhood | null>(null);

  const mapped = neighborhoods
    .map((n) => ({ neighborhood: n, region: getMapRegion(n.slug) }))
    .filter(
      (
        item,
      ): item is {
        neighborhood: Neighborhood;
        region: MapRegion;
      } => Boolean(item.region),
    );

  const hoveredItem = mapped.find((m) => m.neighborhood.slug === hoveredSlug);

  return (
    <>
      <div
        className={`rounded-sm border border-sand bg-sky/20 p-5 sm:p-8 ${
          compact ? "" : ""
        }`}
      >
        {!compact && (
          <div className="mb-6 text-center">
            <p className="text-xs tracking-[0.25em] text-ocean-light uppercase">
              Island Map
            </p>
            <h2 className="mt-2 font-serif text-2xl text-navy md:text-3xl">
              Explore by Location
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-foreground/55">
              Hover over a dot to preview the area. Click for full details.
            </p>
          </div>
        )}

        {compact && (
          <p className="mb-4 text-center text-xs tracking-wider text-foreground/50 uppercase">
            Hover or tap a neighborhood on the map
          </p>
        )}

        <div
          className={`relative mx-auto w-full overflow-visible rounded-sm ${
            compact ? "max-w-sm" : "max-w-2xl"
          }`}
        >
          <div className="relative aspect-[4/3] w-full overflow-visible">
            <Image
              src={OAHU_MAP_IMAGE}
              alt="Map of Oʻahu showing Kapolei, Ewa Beach, Honolulu, Waikīkī, Kaneohe, and Kailua"
              fill
              className="rounded-sm object-contain"
              sizes={compact ? "(max-width: 640px) 384px" : "(max-width: 1024px) 672px"}
              priority={!compact}
            />

            {/* Hover image preview */}
            <AnimatePresence>
              {hoveredItem && (
                <HoverPreview
                  neighborhood={hoveredItem.neighborhood}
                  region={hoveredItem.region}
                />
              )}
            </AnimatePresence>

            {/* Interactive hotspots */}
            {mapped.map(({ neighborhood, region }) => {
              const isHovered = hoveredSlug === neighborhood.slug;
              const isActive = selected?.slug === neighborhood.slug;

              return (
                <button
                  key={neighborhood.slug}
                  type="button"
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  style={{
                    left: `${region.left}%`,
                    top: `${region.top}%`,
                    width: "3rem",
                    height: "3rem",
                  }}
                  onMouseEnter={() => setHoveredSlug(neighborhood.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onFocus={() => setHoveredSlug(neighborhood.slug)}
                  onBlur={() => setHoveredSlug(null)}
                  onClick={() => setSelected(neighborhood)}
                  aria-label={`${neighborhood.name} — view neighborhood details`}
                >
                  <AnimatePresence>
                    {(isHovered || isActive) && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 rounded-full border-2 border-gold bg-gold/20 shadow-[0_0_0_4px_rgba(196,165,116,0.25)]"
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                  <span className="sr-only">{neighborhood.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend chips — mobile tap targets */}
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {mapped.map(({ neighborhood }) => (
            <li key={neighborhood.slug}>
              <button
                type="button"
                onMouseEnter={() => setHoveredSlug(neighborhood.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onClick={() => setSelected(neighborhood)}
                className={`rounded-sm border px-3 py-1.5 text-xs tracking-wide transition-colors ${
                  hoveredSlug === neighborhood.slug ||
                  selected?.slug === neighborhood.slug
                    ? "border-gold bg-gold/15 text-navy"
                    : "border-sand bg-white text-foreground/60 hover:border-ocean/30 hover:text-navy"
                }`}
              >
                {neighborhood.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <NeighborhoodMapModal
        neighborhood={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

function HoverPreview({
  neighborhood,
  region,
}: {
  neighborhood: Neighborhood;
  region: MapRegion;
}) {
  const shiftX =
    region.left > 72 ? "-85%" : region.left < 28 ? "-15%" : "-50%";
  const shiftY = region.top > 75 ? "calc(-100% - 1rem)" : "calc(-100% - 0.75rem)";

  return (
    <motion.div
      key={neighborhood.slug}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute z-30 w-44 sm:w-52"
      style={{
        left: `${region.left}%`,
        top: `${region.top}%`,
        transform: `translate(${shiftX}, ${shiftY})`,
      }}
    >
      <div className="overflow-hidden rounded-sm border border-white/80 bg-white shadow-xl shadow-navy/15">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={neighborhood.image}
            alt={neighborhood.name}
            fill
            className="object-cover"
            sizes="208px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
          <p className="absolute right-3 bottom-3 left-3 font-serif text-lg text-white">
            {neighborhood.name}
          </p>
        </div>
        <p className="px-3 py-2 text-center text-[10px] tracking-wider text-foreground/45 uppercase">
          Click for details
        </p>
      </div>
    </motion.div>
  );
}
