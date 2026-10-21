import {
  PRODUCT_CLASSIFICATION,
  PRODUCT_VISIBILITY,
  STOCK_STATUS,
  buildProductSearchText,
} from "../lib/catalogue-query";

export const DEMO_BRAND = {
  slug: "demo-northwind-healthwares",
  name: "[DEMO] Northwind Healthwares",
} as const;

export const DEMO_PARENT_CATEGORY = {
  slug: "demo-preview",
  name: "[DEMO] Preview catalogue",
  description: "Development-only parent shelf. Not a live store category.",
  sortOrder: 0,
} as const;

export const DEMO_CATEGORIES = [
  {
    slug: "demo-wellness",
    name: "[DEMO] Wellness",
    description: "Development-only wellness shelf. Catalogue coming soon.",
    sortOrder: 1,
  },
  {
    slug: "demo-devices",
    name: "[DEMO] Devices",
    description: "Development-only devices shelf. Catalogue coming soon.",
    sortOrder: 2,
  },
  {
    slug: "demo-first-aid",
    name: "[DEMO] First aid",
    description: "Development-only first-aid shelf. Catalogue coming soon.",
    sortOrder: 3,
  },
  {
    slug: "demo-personal-care",
    name: "[DEMO] Personal care",
    description: "Development-only personal-care shelf. Catalogue coming soon.",
    sortOrder: 4,
  },
] as const;

type DemoProductSeed = {
  sku: string;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  visibility: (typeof PRODUCT_VISIBILITY)[keyof typeof PRODUCT_VISIBILITY];
  pricePkrMinor: number;
  attributes: readonly { name: string; value: string }[];
};

export const DEMO_PRODUCTS: readonly DemoProductSeed[] = [
  {
    sku: "DEMO-WL-0001",
    slug: "demo-soft-grip-water-bottle",
    name: "[DEMO] Soft-grip water bottle",
    description:
      "Fictional preview bottle for local catalogue tests. Not for sale.",
    categorySlug: "demo-wellness",
    visibility: PRODUCT_VISIBILITY.CATALOGUE,
    pricePkrMinor: 11100,
    attributes: [
      { name: "colour", value: "teal-demo" },
      { name: "pack_size", value: "1 bottle" },
    ],
  },
  {
    sku: "DEMO-FA-0001",
    slug: "demo-cotton-travel-pouch",
    name: "[DEMO] Cotton travel pouch",
    description:
      "Fictional empty pouch for local catalogue tests. Not a medical device.",
    categorySlug: "demo-first-aid",
    visibility: PRODUCT_VISIBILITY.CATALOGUE,
    pricePkrMinor: 22200,
    attributes: [{ name: "pack_size", value: "1 pouch" }],
  },
  {
    sku: "DEMO-PC-0001",
    slug: "demo-folding-pocket-comb",
    name: "[DEMO] Folding pocket comb",
    description: "Fictional comb for local catalogue tests. Not for sale.",
    categorySlug: "demo-personal-care",
    visibility: PRODUCT_VISIBILITY.CATALOGUE,
    pricePkrMinor: 33300,
    attributes: [{ name: "material_note", value: "demo-plastic" }],
  },
  {
    sku: "DEMO-DV-0001",
    slug: "demo-cable-tidy-strap",
    name: "[DEMO] Cable tidy strap",
    description: "Fictional cable strap for local catalogue tests. Not for sale.",
    categorySlug: "demo-devices",
    visibility: PRODUCT_VISIBILITY.CATALOGUE,
    pricePkrMinor: 12300,
    attributes: [{ name: "pack_size", value: "2 straps" }],
  },
  {
    sku: "DEMO-HD-0001",
    slug: "demo-hidden-fixture-pouch",
    name: "[DEMO] Hidden fixture pouch",
    description:
      "Hidden development fixture. Must never appear in public catalogue reads.",
    categorySlug: "demo-first-aid",
    visibility: PRODUCT_VISIBILITY.HIDDEN,
    pricePkrMinor: 44400,
    attributes: [{ name: "secret_token", value: "HIDDEN-FIXTURE-TOKEN" }],
  },
  {
    sku: "DEMO-DR-0001",
    slug: "demo-draft-fixture-band",
    name: "[DEMO] Draft fixture band",
    description: "Draft development fixture. Must never appear in public reads.",
    categorySlug: "demo-devices",
    visibility: PRODUCT_VISIBILITY.DRAFT,
    pricePkrMinor: 55500,
    attributes: [{ name: "secret_token", value: "DRAFT-FIXTURE-TOKEN" }],
  },
];

export const VISIBLE_DEMO_SKUS = DEMO_PRODUCTS.filter(
  (product) => product.visibility === PRODUCT_VISIBILITY.CATALOGUE,
).map((product) => product.sku);

export function demoProductSearchText(product: DemoProductSeed): string {
  return buildProductSearchText({
    name: product.name,
    description: product.description,
    attributes: product.attributes,
  });
}

export const DEMO_CLASSIFICATION = PRODUCT_CLASSIFICATION.GENERAL_RETAIL;
export const DEMO_STOCK_STATUS = STOCK_STATUS.NOT_TRACKED;
