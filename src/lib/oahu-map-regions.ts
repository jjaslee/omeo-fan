/** Percentage positions for interactive hotspots on the Oʻahu map image */
export interface MapRegion {
  slug: string;
  /** Horizontal position (% of map width) */
  left: number;
  /** Vertical position (% of map height) */
  top: number;
}

/**
 * Hotspot positions aligned to public/images/oahu-neighborhood-map.png
 * CLIENT: Adjust percentages if the map image is replaced.
 */
export const OAHU_MAP_REGIONS: MapRegion[] = [
  { slug: "kaneohe", left: 66, top: 51 },
  { slug: "kailua", left: 80, top: 65 },
  { slug: "kapolei", left: 30, top: 73 },
  { slug: "honolulu", left: 58, top: 78 },
  { slug: "ewa-beach", left: 33, top: 81 },
  { slug: "waikiki", left: 59, top: 85 },
];

export const OAHU_MAP_IMAGE = "/images/oahu-neighborhood-map.png";

export function getMapRegion(slug: string): MapRegion | undefined {
  return OAHU_MAP_REGIONS.find((r) => r.slug === slug);
}
