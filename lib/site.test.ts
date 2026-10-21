import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { siteConfig } from "./site";

const publicSources = [
  "app/page.tsx",
  "app/layout.tsx",
  "app/opengraph-image.tsx",
  "app/search/page.tsx",
  "app/c/[slug]/page.tsx",
  "app/not-found.tsx",
  "components/layout/announcement-bar.tsx",
  "components/layout/header.tsx",
  "components/layout/footer.tsx",
  "components/layout/mobile-menu.tsx",
  "components/home/home-hero-carousel.tsx",
  "components/home/category-grid.tsx",
  "components/home/homepage-product-section.tsx",
  "components/home/promotional-mosaic.tsx",
  "components/home/featured-brand.tsx",
  "components/home/store-benefits.tsx",
  "components/home/newsletter-preview.tsx",
  "lib/storefront.ts",
  "lib/navigation.ts",
  "lib/site.ts",
];

const forbidden = [
  "Store in development",
  "Catalogue coming soon",
  "A health-products storefront for Pakistan, still in development",
  "This is a private development preview",
  "Planned checkout",
  "Planned support",
  "Planned accounts",
  "No demo fixtures yet",
  "Ordering unavailable",
  "flu-vaccine-2026-2027",
  "campaigns/pending-approval",
  "delivery-banner-riyadh",
  "delivery-banner-pakistan",
  "happy-pharmacy-app-promotion",
  "facebook-home-delivery-post",
  "category-banner-medicines",
];

describe("public storefront copy", () => {
  it("keeps a discreet preview label only in site config", () => {
    expect(siteConfig.previewStatus).toBe("Happy Pharmacy online store preview");
    expect(siteConfig.tagline).toBe("Health, wellness and everyday care");
    expect(JSON.stringify(siteConfig)).not.toMatch(/Lahore|0300 1234567|hello@happypharmacy\.pk|wa\.me|923001234567/);
  });

  it("does not use blocked development or unapproved-asset language in public sources", () => {
    const bundle = publicSources.map((path) => readFileSync(path, "utf8")).join("\n");

    for (const phrase of forbidden) {
      expect(bundle).not.toContain(phrase);
    }

    expect(bundle).not.toMatch(/getWhatsAppUrl|wa\.me/);
    expect(bundle).not.toMatch(/PostgreSQL|npm run db:up/);
  });
});
