"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Neighborhood } from "@/lib/content/types";

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

export function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const card = (
    <Link
      href={`/neighborhoods/${neighborhood.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-sm"
    >
      <Image
        src={neighborhood.image}
        alt={`${neighborhood.name}, Oʻahu — explore neighborhoods and real estate`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-6">
        <h3 className="font-serif text-2xl text-white md:text-3xl">
          {neighborhood.name}
        </h3>
        <p className="mt-2 text-xs tracking-widest text-gold uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Learn More →
        </p>
      </div>
    </Link>
  );

  if (prefersReducedMotion) return card;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      {card}
    </motion.div>
  );
}
