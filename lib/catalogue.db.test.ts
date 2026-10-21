import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  DEMO_PRODUCTS,
  VISIBLE_DEMO_SKUS,
} from "../prisma/demo-seed-data";
import { seedDraftClientCatalogue } from "../prisma/draft-seed";
import { seedDemoCatalogue } from "../prisma/demo-seed";
import { johnsonsDraftImportKeys } from "./draft-import/johnsons-baby-care";
import {
  getPublicProductBySlug,
  listDraftClientImportProducts,
  listPublicProductsByCategorySlug,
  listPublicProductsForNavSlug,
  searchPublicProducts,
} from "./catalogue";
import { getPrisma, isCatalogueDatabaseConfigured } from "./db";

const describeDb = describe.skipIf(!isCatalogueDatabaseConfigured());

describeDb("public catalogue reads against local PostgreSQL", () => {
  beforeAll(async () => {
    const prisma = getPrisma();
    await seedDemoCatalogue(prisma);
    await seedDraftClientCatalogue(prisma);
  });

  afterAll(async () => {
    await getPrisma().$disconnect();
  });

  it("returns visible products only", async () => {
    const wellness = await listPublicProductsByCategorySlug("demo-wellness");
    const firstAid = await listPublicProductsByCategorySlug("demo-first-aid");
    const devices = await listPublicProductsByCategorySlug("demo-devices");
    const personalCare = await listPublicProductsByCategorySlug(
      "demo-personal-care",
    );

    const skus = [...wellness, ...firstAid, ...devices, ...personalCare].map(
      (product) => product.sku,
    );

    expect(skus.sort()).toEqual([...VISIBLE_DEMO_SKUS].sort());
    expect(skus).not.toContain("DEMO-HD-0001");
    expect(skus).not.toContain("DEMO-DR-0001");
    expect(
      [...wellness, ...firstAid, ...devices, ...personalCare].every(
        (product) => product.visibility === "CATALOGUE",
      ),
    ).toBe(true);
  });

  it("never returns hidden or draft products by slug", async () => {
    await expect(
      getPublicProductBySlug("demo-hidden-fixture-pouch"),
    ).resolves.toBeNull();
    await expect(
      getPublicProductBySlug("demo-draft-fixture-band"),
    ).resolves.toBeNull();
  });

  it("returns a visible product by slug", async () => {
    const product = await getPublicProductBySlug("demo-soft-grip-water-bottle");

    expect(product?.sku).toBe("DEMO-WL-0001");
    expect(product?.visibility).toBe("CATALOGUE");
    expect(product?.name).toContain("[DEMO]");
    expect(product?.category.slug).toBe("demo-wellness");
  });

  it("filters visible products by category", async () => {
    const wellness = await listPublicProductsByCategorySlug("demo-wellness");
    const firstAid = await listPublicProductsByCategorySlug("demo-first-aid");

    expect(wellness.map((product) => product.sku)).toEqual(["DEMO-WL-0001"]);
    expect(firstAid.map((product) => product.sku)).toEqual(["DEMO-FA-0001"]);
    expect(firstAid.some((product) => product.sku === "DEMO-HD-0001")).toBe(
      false,
    );
  });

  it("resolves navigation slugs to demo shelves without hiding the gap", async () => {
    const wellness = await listPublicProductsForNavSlug("wellness");
    const medicines = await listPublicProductsForNavSlug("medicines");

    expect(wellness.map((product) => product.sku)).toEqual(["DEMO-WL-0001"]);
    expect(medicines).toEqual([]);
    expect(wellness.every((product) => product.visibility === "CATALOGUE")).toBe(
      true,
    );
  });

  it("search finds visible products and ignores hidden tokens", async () => {
    const bottles = await searchPublicProducts("water bottle");
    const hidden = await searchPublicProducts("HIDDEN-FIXTURE-TOKEN");
    const draft = await searchPublicProducts("DRAFT-FIXTURE-TOKEN");
    const pouches = await searchPublicProducts("travel pouch");

    expect(bottles.map((product) => product.sku)).toEqual(["DEMO-WL-0001"]);
    expect(hidden).toEqual([]);
    expect(draft).toEqual([]);
    expect(pouches.map((product) => product.sku)).toEqual(["DEMO-FA-0001"]);
  });

  it("can rerun the seed without creating duplicate SKUs", async () => {
    const prisma = getPrisma();
    const before = await prisma.product.count({
      where: { sku: { startsWith: "DEMO-" } },
    });

    await seedDemoCatalogue(prisma);

    const after = await prisma.product.count({
      where: { sku: { startsWith: "DEMO-" } },
    });

    expect(after).toBe(before);
    expect(after).toBe(DEMO_PRODUCTS.length);
  });

  it("keeps seeded Johnson's client products as drafts excluded from public category and search", async () => {
    const importKeys = johnsonsDraftImportKeys();
    const babyCare = await listPublicProductsByCategorySlug("baby-care");
    const motherBaby = await listPublicProductsByCategorySlug("mother-baby");
    const motherBabyNav = await listPublicProductsForNavSlug("mother-baby");
    const searchHits = await searchPublicProducts("Johnson");
    const draftPreview = await listDraftClientImportProducts();

    expect(babyCare).toEqual([]);
    expect(motherBaby).toEqual([]);
    expect(motherBabyNav).toEqual([]);
    expect(searchHits).toEqual([]);
    expect(draftPreview.map((product) => product.sku).sort()).toEqual(
      [...importKeys].sort(),
    );
    expect(
      draftPreview.every((product) => product.visibility === "DRAFT"),
    ).toBe(true);

    await expect(
      getPublicProductBySlug("draft-johnsons-baby-bath-200ml"),
    ).resolves.toBeNull();
  });

  it("can rerun the draft client seed without creating duplicate import keys", async () => {
    const prisma = getPrisma();
    const before = await prisma.product.count({
      where: { sku: { startsWith: "DRAFT-IMPORT:" } },
    });

    await seedDraftClientCatalogue(prisma);

    const after = await prisma.product.count({
      where: { sku: { startsWith: "DRAFT-IMPORT:" } },
    });

    expect(after).toBe(before);
    expect(after).toBe(johnsonsDraftImportKeys().length);
  });
});
