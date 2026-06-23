"use client";

import { useState } from "react";
import { ListingGrid } from "@/components/ListingCard";
import type { Listing } from "@/lib/content/types";

type Filter = "all" | "active" | "pending";

interface ListingFiltersProps {
  listings: Listing[];
}

export function ListingFilters({ listings }: ListingFiltersProps) {
  const [filter, setFilter] = useState<Filter>("all");

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
      <p className="text-sm leading-relaxed text-foreground/55">
        The cards below show sample listing layouts. Real property details,
        photography, and pricing will replace these previews once provided by
        the agent.
      </p>

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
