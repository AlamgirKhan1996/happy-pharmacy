import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  FLU_VACCINE_PENDING_APPROVAL_ASSET,
  PENDING_PUBLICATION_CHECKLIST,
  PENDING_REGULATORY_NOTICE,
} from "./campaigns/pending-approval";
import { categories, mobileNavItems } from "./navigation";

const publicStorefrontSources = [
  "app/page.tsx",
  "app/layout.tsx",
  "app/search/page.tsx",
  "app/c/[slug]/page.tsx",
  "app/not-found.tsx",
  "app/opengraph-image.tsx",
  "app/sitemap.ts",
  "components/catalogue/product-card.tsx",
  "components/catalogue/product-grid.tsx",
  "components/home/home-hero-carousel.tsx",
  "components/home/promotional-mosaic.tsx",
  "components/home/homepage-product-section.tsx",
  "components/layout/header.tsx",
  "components/layout/footer.tsx",
  "components/layout/mobile-nav.tsx",
  "components/layout/mobile-menu.tsx",
  "lib/navigation.ts",
  "lib/storefront.ts",
];

describe("pending flu vaccine campaign asset", () => {
  it("keeps the required pending-approval notice and publication checklist", () => {
    expect(FLU_VACCINE_PENDING_APPROVAL_ASSET.src).toBe(
      "/images/campaigns/pending-approval/flu-vaccine-2026-2027-pending-approval.jpg",
    );
    expect(PENDING_REGULATORY_NOTICE).toBe(
      "Pending regulatory, licensing, stock and cold-chain verification.",
    );
    expect(PENDING_PUBLICATION_CHECKLIST).toEqual(
      expect.arrayContaining([
        "DRAP registration/authorization",
        "licensed supplier and purchase invoice",
        "batch number and expiry",
        "2–8°C cold-chain records",
        "current stock",
        "licensed pharmacy/business identity",
        "authorized vaccination location and healthcare professional",
        "client approval for all medical and promotional claims",
      ]),
    );
  });

  it("is not referenced from public storefront sources or navigation", () => {
    const bundle = publicStorefrontSources
      .map((path) => readFileSync(path, "utf8"))
      .join("\n");

    expect(bundle).not.toMatch(/flu-vaccine-2026-2027/);
    expect(bundle).not.toMatch(/campaigns\/pending-approval/);
    expect(bundle).not.toMatch(/PendingApprovalCampaignPreview/);
    expect(JSON.stringify(categories)).not.toMatch(/internal/);
    expect(JSON.stringify(mobileNavItems)).not.toMatch(/internal/);
  });

  it("documents that a visibility toggle is not enough to publish the asset", () => {
    const source = readFileSync("lib/campaigns/pending-approval.ts", "utf8");

    expect(source).toMatch(/must not be made public merely by changing a/i);
    expect(source).toMatch(/visibility field/i);
  });
});
