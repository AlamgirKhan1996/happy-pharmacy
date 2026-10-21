import { describe, expect, it } from "vitest";

import {
  PRODUCT_CLASSIFICATION,
  PRODUCT_VISIBILITY,
  assertPkrMinorUnits,
  buildProductSearchText,
  catalogueSearchWhere,
  isPublicCatalogueVisibility,
  normalizeCatalogueQuery,
  pkrMinorToMajor,
  publicCatalogueWhere,
} from "./catalogue-query";

describe("assertPkrMinorUnits", () => {
  it("accepts zero and positive integers", () => {
    expect(assertPkrMinorUnits(0)).toBe(0);
    expect(assertPkrMinorUnits(189000)).toBe(189000);
  });

  it("rejects fractions and negative amounts", () => {
    expect(() => assertPkrMinorUnits(10.5)).toThrow(/non-negative integer/);
    expect(() => assertPkrMinorUnits(-1)).toThrow(/non-negative integer/);
  });
});

describe("pkrMinorToMajor", () => {
  it("converts paisa to rupees", () => {
    expect(pkrMinorToMajor(100)).toBe(1);
    expect(pkrMinorToMajor(189000)).toBe(1890);
  });
});

describe("catalogue visibility", () => {
  it("treats only CATALOGUE rows as public", () => {
    expect(isPublicCatalogueVisibility(PRODUCT_VISIBILITY.CATALOGUE)).toBe(true);
    expect(isPublicCatalogueVisibility(PRODUCT_VISIBILITY.DRAFT)).toBe(false);
    expect(isPublicCatalogueVisibility(PRODUCT_VISIBILITY.HIDDEN)).toBe(false);
  });

  it("keeps public list filters on visibility only", () => {
    expect(publicCatalogueWhere).toEqual({ visibility: "CATALOGUE" });
  });
});

describe("search helpers", () => {
  it("normalizes and rejects empty queries", () => {
    expect(normalizeCatalogueQuery("  cotton   gauze  ")).toBe("cotton gauze");
    expect(normalizeCatalogueQuery("   ")).toBeNull();
  });

  it("builds searchable text from name, description and attributes", () => {
    expect(
      buildProductSearchText({
        name: "[DEMO] Sample pouch",
        description: "Non-saleable catalogue fixture.",
        attributes: [
          { name: "pack_size", value: "1 unit" },
          { name: "origin_note", value: "demo only" },
        ],
      }),
    ).toBe(
      "[DEMO] Sample pouch Non-saleable catalogue fixture. pack_size 1 unit origin_note demo only",
    );
  });

  it("scopes search to public catalogue fields", () => {
    const where = catalogueSearchWhere("gauze");

    expect(where).not.toBeNull();
    if (!where) {
      return;
    }

    const [visibilityFilter, fieldFilter] = where.AND;
    expect(visibilityFilter).toEqual(publicCatalogueWhere);
    expect("OR" in fieldFilter).toBe(true);
    if (!("OR" in fieldFilter)) {
      return;
    }

    expect(fieldFilter.OR).toEqual(
      expect.arrayContaining([
        { name: { contains: "gauze", mode: "insensitive" } },
        { description: { contains: "gauze", mode: "insensitive" } },
        { searchText: { contains: "gauze", mode: "insensitive" } },
      ]),
    );
  });

  it("returns null instead of querying on blank input", () => {
    expect(catalogueSearchWhere(" \n ")).toBeNull();
  });
});

describe("classification tokens", () => {
  it("matches the Prisma enum values", () => {
    expect(Object.values(PRODUCT_CLASSIFICATION)).toEqual([
      "GENERAL_RETAIL",
      "OTC",
      "PRESCRIPTION_REVIEW",
    ]);
  });
});
