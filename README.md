# Omeo Fan — Real Estate Website

Custom luxury real estate website for **Omeo Fan**, Principal Broker at **4You Hawaii International Realty**, Oʻahu.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Updating Content

All editable content lives in the **`content/`** folder. See **[HOW-TO-UPDATE.md](./HOW-TO-UPDATE.md)** for a plain-English guide.

| File | Purpose |
|------|---------|
| `content/site.yaml` | Agent info, contact, bio |
| `content/listings.yaml` | Active & sold properties |
| `content/testimonials.yaml` | Client reviews |
| `content/neighborhoods.yaml` | Oahu neighborhood pages |

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **Framer Motion** (subtle animations)
- **YAML** content files (easy to edit)

## Project Structure

```
content/           ← Edit these files to update site content
public/images/     ← Add photos here
src/
  app/             ← Pages
  components/      ← UI components (rarely need editing)
  lib/content/     ← Content loaders (rarely need editing)
```

## Deploy

Deploy to [Vercel](https://vercel.com) by connecting this repository. No environment variables required for the basic site.

## Placeholders Still Needed from Omeo

- [ ] Professional headshot
- [x] License number confirmed (RB-22037)
- [ ] Real listing data and photos
- [ ] Client testimonials
- [ ] WeChat QR code image
- [ ] Final bio approval
