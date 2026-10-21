export const PRODUCT_CLASSIFICATION = {
  GENERAL_RETAIL: "GENERAL_RETAIL",
  OTC: "OTC",
  PRESCRIPTION_REVIEW: "PRESCRIPTION_REVIEW",
} as const;

export type ProductClassification =
  (typeof PRODUCT_CLASSIFICATION)[keyof typeof PRODUCT_CLASSIFICATION];

export const STOCK_STATUS = {
  IN_STOCK: "IN_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  NOT_TRACKED: "NOT_TRACKED",
} as const;

export type StockStatus = (typeof STOCK_STATUS)[keyof typeof STOCK_STATUS];

export const PRODUCT_VISIBILITY = {
  DRAFT: "DRAFT",
  CATALOGUE: "CATALOGUE",
  HIDDEN: "HIDDEN",
} as const;

export type ProductVisibility =
  (typeof PRODUCT_VISIBILITY)[keyof typeof PRODUCT_VISIBILITY];

export const PKR_MINOR_UNITS_PER_RUPEE = 100;

export function assertPkrMinorUnits(value: number): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("PKR minor units must be a non-negative integer");
  }

  return value;
}

export function pkrMinorToMajor(minorUnits: number): number {
  return assertPkrMinorUnits(minorUnits) / PKR_MINOR_UNITS_PER_RUPEE;
}

export function isPublicCatalogueVisibility(
  visibility: ProductVisibility,
): boolean {
  return visibility === PRODUCT_VISIBILITY.CATALOGUE;
}

export const publicCatalogueWhere = {
  visibility: PRODUCT_VISIBILITY.CATALOGUE,
} as const;

export function normalizeCatalogueQuery(raw: string): string | null {
  const query = raw.trim().replace(/\s+/g, " ");
  return query.length > 0 ? query : null;
}

export function buildProductSearchText(input: {
  name: string;
  description: string;
  attributes: readonly { name: string; value: string }[];
}): string {
  return [
    input.name,
    input.description,
    ...input.attributes.flatMap((attribute) => [
      attribute.name,
      attribute.value,
    ]),
  ]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ");
}

export function catalogueSearchWhere(query: string) {
  const normalized = normalizeCatalogueQuery(query);

  if (!normalized) {
    return null;
  }

  const contains = { contains: normalized, mode: "insensitive" as const };

  return {
    AND: [
      publicCatalogueWhere,
      {
        OR: [
          { name: contains },
          { description: contains },
          { searchText: contains },
          {
            attributes: {
              some: {
                OR: [{ name: contains }, { value: contains }],
              },
            },
          },
        ],
      },
    ],
  };
}
