import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  DRAFT_CLIENT_IMPORT_SKU_PREFIX,
  DRAFT_CLIENT_IMPORT_VISIBILITY,
  JOHNSONS_BABY_CARE_DRAFT_PRODUCTS,
  UNSET_DRAFT_PRICE_PKR_MINOR,
  resolveDraftClientImageUrl,
} from "./draft-import/johnsons-baby-care";

describe("Johnson's draft client import", () => {
  it("keeps every imported product as a draft with no invented commercial data", () => {
    expect(JOHNSONS_BABY_CARE_DRAFT_PRODUCTS).toHaveLength(9);
    expect(DRAFT_CLIENT_IMPORT_VISIBILITY).toBe("DRAFT");
    expect(UNSET_DRAFT_PRICE_PKR_MINOR).toBe(0);

    const serialized = JSON.stringify(JOHNSONS_BABY_CARE_DRAFT_PRODUCTS);

    expect(serialized).not.toMatch(/"(price|barcode|ingredient|benefit|countryOfOrigin|stock)"/i);
    expect(serialized).not.toMatch(
      /delivery-banner|facebook-home-delivery|happy-pharmacy-app-promotion|category-banner/i,
    );

    for (const product of JOHNSONS_BABY_CARE_DRAFT_PRODUCTS) {
      expect(product.importKey.startsWith(DRAFT_CLIENT_IMPORT_SKU_PREFIX)).toBe(
        true,
      );
      expect(product.importKey).not.toMatch(/^\d{8,14}$/);
      expect(product.slug.startsWith("draft-")).toBe(true);
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.images[0]?.alt.length).toBeGreaterThan(0);
      expect(product.images[0]?.cloudinaryPublicId.length).toBeGreaterThan(0);
      expect(product.images[0]?.sortOrder).toBe(0);
      expect(product.images[0]?.width).toBeGreaterThan(0);
      expect(product.images[0]?.height).toBeGreaterThan(0);
    }
  });

  it("uses a local preview path until an exact Cloudinary cloud name is configured", () => {
    const image = JOHNSONS_BABY_CARE_DRAFT_PRODUCTS[0]?.images[0];

    expect(image).toBeDefined();
    if (!image) {
      return;
    }

    expect(resolveDraftClientImageUrl(image, {})).toBe(image.localPreviewPath);
    expect(
      resolveDraftClientImageUrl(image, {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "happy_pharmacy_demo",
      }),
    ).toBe(
      `https://res.cloudinary.com/happy_pharmacy_demo/image/upload/${image.cloudinaryPublicId}`,
    );
    expect(
      resolveDraftClientImageUrl(
        { ...image, url: "https://res.cloudinary.com/happy_pharmacy_demo/image/upload/custom" },
        {},
      ),
    ).toBe(
      "https://res.cloudinary.com/happy_pharmacy_demo/image/upload/custom",
    );
  });

  it("does not commit Cloudinary API secrets", () => {
    const envExample = readFileSync(".env.example", "utf8");

    expect(envExample).toMatch(/NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=/);
    expect(envExample).not.toMatch(/CLOUDINARY_API_SECRET|CLOUDINARY_URL=/);
    expect(readFileSync("lib/cloudinary.ts", "utf8")).not.toMatch(/api_secret|API_SECRET/);
    expect(readFileSync("lib/draft-import/johnsons-baby-care.ts", "utf8")).not.toMatch(
      /api_secret|API_SECRET/,
    );
  });
});
