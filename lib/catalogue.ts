import type { Prisma } from "@prisma/client";

import {
  PRODUCT_VISIBILITY,
  catalogueSearchWhere,
  publicCatalogueWhere,
} from "@/lib/catalogue-query";
import { resolveDemoCategorySlug } from "@/lib/catalogue-nav";
import { DRAFT_CLIENT_IMPORT_SKU_PREFIX } from "@/lib/draft-import/johnsons-baby-care";
import { getPrisma, isCatalogueDatabaseConfigured } from "@/lib/db";

const catalogueProductInclude = {
  brand: true,
  category: true,
  images: { orderBy: { sortOrder: "asc" as const } },
  attributes: { orderBy: { name: "asc" as const } },
} satisfies Prisma.ProductInclude;

export type CatalogueProduct = Prisma.ProductGetPayload<{
  include: typeof catalogueProductInclude;
}>;

export type CatalogueCategory = Prisma.CategoryGetPayload<{
  include: { parent: true };
}>;

export { isCatalogueDatabaseConfigured };

export type CatalogueRead<T> = { ok: true; data: T } | { ok: false };

async function withPrisma<T>(
  read: (prisma: ReturnType<typeof getPrisma>) => Promise<T>,
): Promise<T> {
  return read(getPrisma());
}

export async function tryCatalogueRead<T>(
  read: () => Promise<T>,
): Promise<CatalogueRead<T>> {
  if (!isCatalogueDatabaseConfigured()) {
    return { ok: false };
  }

  try {
    return { ok: true, data: await read() };
  } catch (error) {
    console.error("Catalogue read failed", error);
    return { ok: false };
  }
}

export function listPublicProductsForNavSlug(navSlug: string) {
  const demoSlug = resolveDemoCategorySlug(navSlug);

  if (!demoSlug) {
    return Promise.resolve([] as CatalogueProduct[]);
  }

  return listPublicProductsByCategorySlug(demoSlug);
}

export function listPublicCategories() {
  return withPrisma((prisma) =>
    prisma.category.findMany({
      include: { parent: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
  );
}

export function getPublicCategoryBySlug(slug: string) {
  return withPrisma((prisma) =>
    prisma.category.findUnique({
      where: { slug },
      include: { parent: true, children: { orderBy: { sortOrder: "asc" } } },
    }),
  );
}

export function getPublicProductBySlug(slug: string) {
  return withPrisma((prisma) =>
    prisma.product.findFirst({
      where: { slug, ...publicCatalogueWhere },
      include: catalogueProductInclude,
    }),
  );
}

export function listPublicProductsByCategorySlug(categorySlug: string) {
  return withPrisma((prisma) =>
    prisma.product.findMany({
      where: {
        ...publicCatalogueWhere,
        category: { slug: categorySlug },
      },
      include: catalogueProductInclude,
      orderBy: { name: "asc" },
    }),
  );
}

export function searchPublicProducts(rawQuery: string) {
  const where = catalogueSearchWhere(rawQuery);

  if (!where) {
    return Promise.resolve([] as CatalogueProduct[]);
  }

  return withPrisma((prisma) =>
    prisma.product.findMany({
      where,
      include: catalogueProductInclude,
      orderBy: { name: "asc" },
      take: 24,
    }),
  );
}

/**
 * Internal and homepage-preview reads only. Public catalogue helpers above
 * stay CATALOGUE-only and must not be changed to return DRAFT rows.
 */
export function listDraftClientImportProducts() {
  return withPrisma((prisma) =>
    prisma.product.findMany({
      where: {
        visibility: PRODUCT_VISIBILITY.DRAFT,
        sku: { startsWith: DRAFT_CLIENT_IMPORT_SKU_PREFIX },
      },
      include: catalogueProductInclude,
      orderBy: { name: "asc" },
    }),
  );
}
