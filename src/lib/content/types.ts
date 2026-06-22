export interface SiteAgent {
  name: string;
  title: string;
  credentials: string[];
  tagline: string;
  headline: string;
}

export interface SiteContact {
  phone: string;
  phone_display: string;
  email: string;
  wechat: string;
  wechat_qr?: string;
}

export interface SiteBrokerage {
  name: string;
  short_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface SiteAbout {
  short: string;
  full: string;
  photo: string;
}

export interface SiteBrand {
  callout_title: string;
  callout_text: string;
}

export interface SiteConfig {
  agent: SiteAgent;
  contact: SiteContact;
  brokerage: SiteBrokerage;
  languages: string[];
  about: SiteAbout;
  brand: SiteBrand;
  languages_config: {
    chinese_enabled: boolean;
  };
}

export interface Listing {
  id: string;
  visible: boolean;
  status: "active" | "pending" | "sold";
  address: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  property_type?: string;
  description?: string;
  features?: string[];
  image: string;
  images?: string[];
  featured?: boolean;
  sold_date?: string;
}

export interface ListingsConfig {
  active: Listing[];
  sold: Listing[];
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  visible: boolean;
}

export interface TestimonialsConfig {
  testimonials: Testimonial[];
}

export interface Neighborhood {
  slug: string;
  name: string;
  image: string;
  description: string;
  visible: boolean;
}

export interface NeighborhoodsConfig {
  neighborhoods: Neighborhood[];
}
