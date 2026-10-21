import { resolveDemoCategorySlug, navSlugsWithDemoFixtures } from "@/lib/catalogue-nav";
import { PRODUCT_VISIBILITY } from "@/lib/catalogue-query";

export const PRODUCT_IMAGE_FALLBACK = "/demo/product-placeholder.svg";

export type ProductCardModel = {
  sku: string;
  name: string;
  categoryName: string;
  pricePkrMinor: number;
  imageSrc: string;
  imageAlt: string;
  demo: boolean;
};

export type ProductImageSource = {
  url: string;
  alt: string;
};

export type CatalogueProductLike = {
  sku: string;
  name: string;
  pricePkrMinor: number;
  visibility: string;
  category: { name: string };
  images: readonly ProductImageSource[];
};

export function stripDemoPrefix(label: string): string {
  return label.replace(/^\[DEMO\]\s*/i, "").trim();
}

export function isDemoLabelled(label: string): boolean {
  return /\[DEMO\]/i.test(label);
}

export function publicCatalogueProductsOnly<T extends { visibility: string }>(
  products: readonly T[],
): T[] {
  return products.filter(
    (product) => product.visibility === PRODUCT_VISIBILITY.CATALOGUE,
  );
}

export function resolveProductImage(
  name: string,
  images: readonly ProductImageSource[],
): { src: string; alt: string } {
  const image = images.find((item) => item.url.trim().length > 0);

  if (!image) {
    return {
      src: PRODUCT_IMAGE_FALLBACK,
      alt: `Abstract placeholder for ${stripDemoPrefix(name)}`,
    };
  }

  return {
    src: image.url,
    alt: image.alt.trim() || `Preview image for ${stripDemoPrefix(name)}`,
  };
}

export function toProductCardModel(product: {
  sku: string;
  name: string;
  pricePkrMinor: number;
  visibility: string;
  category: { name: string };
  images: readonly ProductImageSource[];
}): ProductCardModel | null {
  if (product.visibility !== PRODUCT_VISIBILITY.CATALOGUE) {
    return null;
  }

  const image = resolveProductImage(product.name, product.images);

  return {
    sku: product.sku,
    name: stripDemoPrefix(product.name),
    categoryName: stripDemoPrefix(product.category.name),
    pricePkrMinor: product.pricePkrMinor,
    imageSrc: image.src,
    imageAlt: image.alt,
    demo: isDemoLabelled(product.name),
  };
}

export function toProductCardModels(
  products: readonly CatalogueProductLike[],
): ProductCardModel[] {
  return publicCatalogueProductsOnly(products)
    .map((product) => toProductCardModel(product))
    .filter((card): card is ProductCardModel => card !== null);
}

export type CategoryShelfView =
  | { kind: "unavailable" }
  | { kind: "unmapped"; navSlug: string }
  | { kind: "empty"; navSlug: string; demoSlug: string }
  | { kind: "products"; navSlug: string; demoSlug: string; products: ProductCardModel[] };

export type SearchResultsView =
  | { kind: "idle" }
  | { kind: "unavailable"; query: string }
  | { kind: "empty"; query: string }
  | { kind: "results"; query: string; products: ProductCardModel[] };

export function buildCategoryShelfView(
  navSlug: string,
  read:
    | { ok: true; products: readonly CatalogueProductLike[] }
    | { ok: false },
): CategoryShelfView {
  const demoSlug = resolveDemoCategorySlug(navSlug);

  if (!read.ok) {
    return { kind: "unavailable" };
  }

  if (!demoSlug) {
    return { kind: "unmapped", navSlug };
  }

  const products = toProductCardModels(read.products);

  if (products.length === 0) {
    return { kind: "empty", navSlug, demoSlug };
  }

  return { kind: "products", navSlug, demoSlug, products };
}

export function buildSearchResultsView(
  query: string,
  read:
    | { ok: true; products: readonly CatalogueProductLike[] }
    | { ok: false }
    | null,
): SearchResultsView {
  if (!query) {
    return { kind: "idle" };
  }

  if (!read || !read.ok) {
    return { kind: "unavailable", query };
  }

  const products = toProductCardModels(read.products);

  if (products.length === 0) {
    return { kind: "empty", query };
  }

  return { kind: "results", query, products };
}

export function unmappedShelfMessage(navSlug: string): string {
  const shelves = navSlugsWithDemoFixtures()
    .map((slug) => slug.replaceAll("-", " "))
    .join(", ");

  return `This planned ${navSlug.replaceAll("-", " ")} shelf has no demo fixtures yet. Labelled [DEMO] products are currently on ${shelves}.`;
}
