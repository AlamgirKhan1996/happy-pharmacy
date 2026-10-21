import { describe, expect, it } from "vitest";

import { resolveDemoCategorySlug } from "./catalogue-nav";
import {
  PRODUCT_IMAGE_FALLBACK,
  buildCategoryShelfView,
  buildSearchResultsView,
  publicCatalogueProductsOnly,
  resolveProductImage,
  toProductCardModel,
  unmappedShelfMessage,
} from "./catalogue-view";

const visibleBottle = {
  sku: "DEMO-WL-0001",
  name: "[DEMO] Soft-grip water bottle",
  pricePkrMinor: 11100,
  visibility: "CATALOGUE",
  category: { name: "[DEMO] Wellness" },
  images: [
    {
      url: "/demo/product-placeholder.svg",
      alt: "[DEMO] Abstract placeholder, not a product photograph",
    },
  ],
};

const hiddenPouch = {
  sku: "DEMO-HD-0001",
  name: "[DEMO] Hidden fixture pouch",
  pricePkrMinor: 44400,
  visibility: "HIDDEN",
  category: { name: "[DEMO] First aid" },
  images: [],
};

const draftBand = {
  sku: "DEMO-DR-0001",
  name: "[DEMO] Draft fixture band",
  pricePkrMinor: 55500,
  visibility: "DRAFT",
  category: { name: "[DEMO] Devices" },
  images: [{ url: "", alt: "" }],
};

const johnsonsDraftBath = {
  sku: "DRAFT-IMPORT:johnsons-baby-bath-200ml",
  name: "Johnson's Baby Bath 200 ml",
  pricePkrMinor: 0,
  visibility: "DRAFT",
  category: { name: "Baby Care" },
  images: [
    {
      url: "/draft-preview/johnsons/johnsons-baby-bath-200ml.jpg",
      alt: "Photograph of a Johnson's Baby Bath 200 ml bottle",
    },
  ],
};

describe("nav to demo slug mapping", () => {
  it("maps storefront shelves that have fixtures", () => {
    expect(resolveDemoCategorySlug("wellness")).toBe("demo-wellness");
    expect(resolveDemoCategorySlug("first-aid")).toBe("demo-first-aid");
  });

  it("does not invent a silent mapping for empty planned shelves", () => {
    expect(resolveDemoCategorySlug("medicines")).toBeNull();
    expect(resolveDemoCategorySlug("nutrition")).toBeNull();
    expect(resolveDemoCategorySlug("mother-baby")).toBeNull();
    expect(unmappedShelfMessage("medicines")).toMatch(/no demo fixtures yet/i);
    expect(unmappedShelfMessage("medicines")).toMatch(/wellness/);
  });
});

describe("customer-facing visibility", () => {
  it("drops hidden and draft products before cards are built", () => {
    expect(
      publicCatalogueProductsOnly([visibleBottle, hiddenPouch, draftBand]).map(
        (product) => product.sku,
      ),
    ).toEqual(["DEMO-WL-0001"]);
    expect(toProductCardModel(hiddenPouch)).toBeNull();
    expect(toProductCardModel(draftBand)).toBeNull();
    expect(toProductCardModel(johnsonsDraftBath)).toBeNull();
  });

  it("keeps draft Johnson's client products out of public category and search views", () => {
    expect(
      buildCategoryShelfView("mother-baby", {
        ok: true,
        products: [johnsonsDraftBath],
      }),
    ).toEqual({ kind: "unmapped", navSlug: "mother-baby" });
    expect(
      buildSearchResultsView("johnson", {
        ok: true,
        products: [johnsonsDraftBath],
      }),
    ).toEqual({ kind: "empty", query: "johnson" });
  });

  it("builds a demo card with PKR minor units intact", () => {
    const card = toProductCardModel(visibleBottle);

    expect(card).toMatchObject({
      sku: "DEMO-WL-0001",
      name: "Soft-grip water bottle",
      categoryName: "Wellness",
      demo: true,
      pricePkrMinor: 11100,
    });
  });
});

describe("product image fallback", () => {
  it("uses the abstract placeholder when no image exists", () => {
    expect(resolveProductImage("[DEMO] Cotton travel pouch", [])).toEqual({
      src: PRODUCT_IMAGE_FALLBACK,
      alt: "Abstract placeholder for Cotton travel pouch",
    });
    expect(
      resolveProductImage("[DEMO] Cotton travel pouch", [{ url: "  ", alt: "" }]),
    ).toMatchObject({ src: PRODUCT_IMAGE_FALLBACK });
  });

  it("keeps a provided non-photograph placeholder url", () => {
    expect(
      resolveProductImage(visibleBottle.name, visibleBottle.images).src,
    ).toBe("/demo/product-placeholder.svg");
  });
});

describe("category empty states", () => {
  it("reports an unavailable local database", () => {
    expect(buildCategoryShelfView("wellness", { ok: false })).toEqual({
      kind: "unavailable",
    });
  });

  it("explains unmapped shelves instead of rendering an empty grid", () => {
    expect(
      buildCategoryShelfView("medicines", { ok: true, products: [] }),
    ).toEqual({ kind: "unmapped", navSlug: "medicines" });
  });

  it("explains a mapped shelf that returned no visible products", () => {
    expect(
      buildCategoryShelfView("first-aid", {
        ok: true,
        products: [hiddenPouch],
      }),
    ).toEqual({
      kind: "empty",
      navSlug: "first-aid",
      demoSlug: "demo-first-aid",
    });
  });

  it("returns visible cards for a mapped shelf", () => {
    const view = buildCategoryShelfView("wellness", {
      ok: true,
      products: [visibleBottle, hiddenPouch],
    });

    expect(view.kind).toBe("products");
    if (view.kind !== "products") return;
    expect(view.demoSlug).toBe("demo-wellness");
    expect(view.products.map((product) => product.sku)).toEqual([
      "DEMO-WL-0001",
    ]);
  });
});

describe("search empty states", () => {
  it("stays idle without a query", () => {
    expect(buildSearchResultsView("", null)).toEqual({ kind: "idle" });
  });

  it("reports unavailable search and empty visible matches", () => {
    expect(buildSearchResultsView("gauze", { ok: false })).toEqual({
      kind: "unavailable",
      query: "gauze",
    });
    expect(
      buildSearchResultsView("HIDDEN-FIXTURE-TOKEN", {
        ok: true,
        products: [hiddenPouch],
      }),
    ).toEqual({ kind: "empty", query: "HIDDEN-FIXTURE-TOKEN" });
  });

  it("returns visible search cards only", () => {
    const view = buildSearchResultsView("water bottle", {
      ok: true,
      products: [visibleBottle, draftBand],
    });

    expect(view.kind).toBe("results");
    if (view.kind !== "results") return;
    expect(view.products).toHaveLength(1);
    expect(view.products[0]?.sku).toBe("DEMO-WL-0001");
  });
});
