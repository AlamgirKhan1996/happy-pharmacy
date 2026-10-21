import type { PrismaClient } from "@prisma/client";

import { PRODUCT_CLASSIFICATION, STOCK_STATUS } from "../lib/catalogue-query";
import {
  BABY_CARE_CATEGORY,
  DRAFT_CLIENT_IMPORT_VISIBILITY,
  JOHNSONS_BABY_CARE_DRAFT_PRODUCTS,
  JOHNSONS_BRAND,
  MOTHER_BABY_PARENT_CATEGORY,
  UNSET_DRAFT_PRICE_PKR_MINOR,
  resolveDraftClientImageUrl,
} from "../lib/draft-import/johnsons-baby-care";

export async function seedDraftClientCatalogue(prisma: PrismaClient) {
  const brand = await prisma.brand.upsert({
    where: { slug: JOHNSONS_BRAND.slug },
    update: { name: JOHNSONS_BRAND.name },
    create: JOHNSONS_BRAND,
  });

  const parent = await prisma.category.upsert({
    where: { slug: MOTHER_BABY_PARENT_CATEGORY.slug },
    update: {
      name: MOTHER_BABY_PARENT_CATEGORY.name,
      description: MOTHER_BABY_PARENT_CATEGORY.description,
      sortOrder: MOTHER_BABY_PARENT_CATEGORY.sortOrder,
      parentId: null,
    },
    create: MOTHER_BABY_PARENT_CATEGORY,
  });

  const babyCare = await prisma.category.upsert({
    where: { slug: BABY_CARE_CATEGORY.slug },
    update: {
      name: BABY_CARE_CATEGORY.name,
      description: BABY_CARE_CATEGORY.description,
      sortOrder: BABY_CARE_CATEGORY.sortOrder,
      parentId: parent.id,
    },
    create: {
      ...BABY_CARE_CATEGORY,
      parentId: parent.id,
    },
  });

  for (const product of JOHNSONS_BABY_CARE_DRAFT_PRODUCTS) {
    const row = await prisma.product.upsert({
      where: { sku: product.importKey },
      update: {
        slug: product.slug,
        name: product.name,
        description: "",
        searchText: product.name,
        classification: PRODUCT_CLASSIFICATION.GENERAL_RETAIL,
        pricePkrMinor: UNSET_DRAFT_PRICE_PKR_MINOR,
        stockStatus: STOCK_STATUS.NOT_TRACKED,
        visibility: DRAFT_CLIENT_IMPORT_VISIBILITY,
        categoryId: babyCare.id,
        brandId: brand.id,
      },
      create: {
        sku: product.importKey,
        slug: product.slug,
        name: product.name,
        description: "",
        searchText: product.name,
        classification: PRODUCT_CLASSIFICATION.GENERAL_RETAIL,
        pricePkrMinor: UNSET_DRAFT_PRICE_PKR_MINOR,
        stockStatus: STOCK_STATUS.NOT_TRACKED,
        visibility: DRAFT_CLIENT_IMPORT_VISIBILITY,
        categoryId: babyCare.id,
        brandId: brand.id,
      },
    });

    await prisma.productImage.deleteMany({ where: { productId: row.id } });

    for (const image of product.images) {
      await prisma.productImage.create({
        data: {
          productId: row.id,
          url: resolveDraftClientImageUrl(image),
          alt: image.alt,
          sortOrder: image.sortOrder,
          width: image.width,
          height: image.height,
          publicId: image.cloudinaryPublicId,
        },
      });
    }
  }

  return {
    brand: brand.slug,
    parentCategory: parent.slug,
    category: babyCare.slug,
    products: JOHNSONS_BABY_CARE_DRAFT_PRODUCTS.map(
      (product) => product.importKey,
    ),
    visibility: DRAFT_CLIENT_IMPORT_VISIBILITY,
  };
}
