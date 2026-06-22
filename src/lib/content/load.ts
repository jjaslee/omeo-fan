import fs from "fs";
import path from "path";
import { load as loadYamlString } from "js-yaml";
import type {
  ListingsConfig,
  NeighborhoodsConfig,
  SiteConfig,
  TestimonialsConfig,
  Listing,
  Neighborhood,
  Testimonial,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

function loadYaml<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  return loadYamlString(fileContents) as T;
}

export function getSiteConfig(): SiteConfig {
  return loadYaml<SiteConfig>("site.yaml");
}

export function getListingsConfig(): ListingsConfig {
  return loadYaml<ListingsConfig>("listings.yaml");
}

export function getTestimonialsConfig(): TestimonialsConfig {
  return loadYaml<TestimonialsConfig>("testimonials.yaml");
}

export function getNeighborhoodsConfig(): NeighborhoodsConfig {
  return loadYaml<NeighborhoodsConfig>("neighborhoods.yaml");
}

export function getActiveListings(): Listing[] {
  const { active } = getListingsConfig();
  return active.filter((l) => l.visible && l.status === "active");
}

export function getAllActiveAndPending(): Listing[] {
  const { active } = getListingsConfig();
  return active.filter(
    (l) => l.visible && (l.status === "active" || l.status === "pending"),
  );
}

export function getSoldListings(): Listing[] {
  const { sold } = getListingsConfig();
  return sold.filter((l) => l.visible && l.status === "sold");
}

export function getFeaturedListings(): Listing[] {
  const { active, sold } = getListingsConfig();
  const all = [...active, ...sold];
  return all.filter((l) => l.visible && l.featured);
}

export function getVisibleTestimonials(): Testimonial[] {
  const { testimonials } = getTestimonialsConfig();
  return testimonials.filter((t) => t.visible);
}

export function getVisibleNeighborhoods(): Neighborhood[] {
  const { neighborhoods } = getNeighborhoodsConfig();
  return neighborhoods.filter((n) => n.visible);
}

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return getVisibleNeighborhoods().find((n) => n.slug === slug);
}
