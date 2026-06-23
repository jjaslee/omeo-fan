"use client";

import { useState } from "react";
import { ListingGrid } from "@/components/ListingCard";
import { MockupNotice } from "@/components/ui/PlaceholderCard";
import type { Listing } from "@/lib/content/types";
import { hasSampleListings } from "@/lib/format";

type Filter = "all" | "active" | "pending";

interface ListingFiltersProps {
  listings: Listing[];
}

export function ListingFilters({ listings }: ListingFiltersProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const showSampleNotice = hasSampleListings(listings);

  const filtered =
    filter === "all"
      ? listings
      : listings.filter((l) => l.status === filter);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "active", label: "For Sale" },
    { id: "pending", label: "Pending" },
  ];

  return (
    <div className="space-y-8">
      {showSampleNotice && (
        <MockupNotice message="The listings below are sample layout previews. Real property details, photos, and pricing will replace these cards once provided by the agent." />
      )}

      <div
        className="flex flex-wrap gap-2 border-b border-sand pb-1"
        role="tablist"
        aria-label="Filter listings by status"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={filter === tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2.5 text-xs tracking-widest uppercase transition-colors ${
              filter === tab.id
                ? "border-b-2 border-gold text-navy"
                : "text-foreground/45 hover:text-navy"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ListingGrid listings={filtered} showDescription />
    </div>
  );
}
