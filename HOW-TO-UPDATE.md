# How to Update Your Website

This guide explains how to update content on the Omeo Fan real estate website without touching complex code. Almost everything you need to change lives in the **`content/`** folder.

---

## Quick Start

1. Open the project folder on your computer
2. Edit files in the **`content/`** folder using any text editor (VS Code, TextEdit, etc.)
3. Save the file
4. If the site is running locally, refresh your browser to see changes
5. When ready to publish, deploy the site (ask your developer if unsure)

---

## File Guide

| File | What it controls |
|------|------------------|
| `content/site.yaml` | Your name, contact info, bio, brokerage details |
| `content/listings.yaml` | All property listings (active and sold) |
| `content/testimonials.yaml` | Client reviews |
| `content/neighborhoods.yaml` | Oahu neighborhood pages |

---

## 1. Update Contact Info or Bio

Open **`content/site.yaml`**

```yaml
contact:
  phone: "808-258-6636"
  email: "omeofan@gmail.com"
  wechat: "omeo6636"

about:
  short: |
    Your short bio here (shown on homepage).
  full: |
    Your full bio here (shown on About page).
```

**To add your headshot:**
1. Save your photo to `public/images/omeo/headshot.jpg`
2. Update the photo line:
   ```yaml
   photo: "/images/omeo/headshot.jpg"
   ```

**To add WeChat QR code:**
1. Save QR image to `public/images/omeo/wechat-qr.png`
2. Uncomment and update in `site.yaml`:
   ```yaml
   wechat_qr: "/images/omeo/wechat-qr.png"
   ```

---

## 2. Add a New Listing

Open **`content/listings.yaml`**

Scroll to the bottom — there is a **template** you can copy. Or copy an existing listing and change the values:

```yaml
  - id: "listing-005"          # Unique ID — use listing-005, listing-006, etc.
    visible: true              # Set false to hide without deleting
    status: "active"           # active | pending | sold
    address: "123 Main Street"
    unit: "#1204"              # Leave blank "" for houses
    city: "Honolulu"
    state: "HI"
    zip: "96815"
    price: 1250000             # Numbers only — no $ or commas
    beds: 3
    baths: 2
    sqft: 1450
    property_type: "Condo"
    description: |
      Write the property description here.
      You can use multiple lines.
    features:
      - "Ocean views"
      - "Updated kitchen"
    image: "/images/listings/listing-005/photo.jpg"
    featured: true             # true = shows on homepage
```

**Add listing photo:**
1. Create folder: `public/images/listings/listing-005/`
2. Save photo as `photo.jpg` inside that folder
3. Set `image: "/images/listings/listing-005/photo.jpg"`

---

## 3. Mark a Listing as Sold

Option A — Change status in the `active` section:
```yaml
status: "sold"
sold_date: "2026-03"
```

Option B — Move the entire listing block from `active:` to `sold:` section.

---

## 4. Hide a Listing (without deleting)

Set `visible: false` on that listing. It won't appear on the site but stays in the file for your records.

---

## 5. Add a Testimonial

Open **`content/testimonials.yaml`**

```yaml
  - quote: |
      Omeo was amazing! He helped us find our dream home in Kailua.
    author: "Jane Smith"
    location: "Kailua, HI"
    visible: true              # Must be true to show on site
```

---

## 6. Edit a Neighborhood Description

Open **`content/neighborhoods.yaml`**

Find the neighborhood by name and edit the `description:` field.

---

## 7. Enable Chinese Language (when ready)

Open **`content/site.yaml`**

```yaml
languages_config:
  chinese_enabled: true
```

Note: You'll also need Chinese content files added by your developer.

---

## Preview Locally

If you have Node.js installed, run these commands in the project folder:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tips

- **Don't delete the `#` comment lines** — they help explain each field
- **Keep indentation consistent** — use 2 spaces, not tabs
- **Price is numbers only:** `1250000` not `$1,250,000`
- **PLACEHOLDER** text means it still needs real content from Omeo
- If something breaks after editing, check for missing quotes or wrong indentation

---

## Need Help?

Contact your developer for:
- Deploying the site live
- Adding MLS/home search integration
- Chinese language pages
- Connecting the contact form to email
