import type { PrismaClient } from "@prisma/client";

import {
  DEMO_BRAND,
  DEMO_CATEGORIES,
  DEMO_CLASSIFICATION,
  DEMO_PARENT_CATEGORY,
  DEMO_PRODUCTS,
  DEMO_STOCK_STATUS,
  demoProductSearchText,
} from "./demo-seed-data";

export async function seedDemoCatalogue(prisma: PrismaClient) {
  const brand = await prisma.brand.upsert({
    where: { slug: DEMO_BRAND.slug },
    update: { name: DEMO_BRAND.name },
    create: DEMO_BRAND,
  });

  const parent = await prisma.category.upsert({
    where: { slug: DEMO_PARENT_CATEGORY.slug },
    update: {
      name: DEMO_PARENT_CATEGORY.name,
      description: DEMO_PARENT_CATEGORY.description,
      sortOrder: DEMO_PARENT_CATEGORY.sortOrder,
      parentId: null,
    },
    create: DEMO_PARENT_CATEGORY,
  });

  const categories = new Map<string, string>([[parent.slug, parent.id]]);

  for (const category of DEMO_CATEGORIES) {
    const row = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        sortOrder: category.sortOrder,
        parentId: parent.id,
      },
      create: {
        ...category,
        parentId: parent.id,
      },
    });
    categories.set(row.slug, row.id);
  }

  for (const product of DEMO_PRODUCTS) {
    const categoryId = categories.get(product.categorySlug);

    if (!categoryId) {
      throw new Error(`Missing demo category ${product.categorySlug}`);
    }

    const row = await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        searchText: demoProductSearchText(product),
        classification: DEMO_CLASSIFICATION,
        pricePkrMinor: product.pricePkrMinor,
        stockStatus: DEMO_STOCK_STATUS,
        visibility: product.visibility,
        categoryId,
        brandId: brand.id,
      },
      create: {
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        description: product.description,
        searchText: demoProductSearchText(product),
        classification: DEMO_CLASSIFICATION,
        pricePkrMinor: product.pricePkrMinor,
        stockStatus: DEMO_STOCK_STATUS,
        visibility: product.visibility,
        categoryId,
        brandId: brand.id,
      },
    });

    for (const attribute of product.attributes) {
      await prisma.productAttribute.upsert({
        where: {
          productId_name: {
            productId: row.id,
            name: attribute.name,
          },
        },
        update: { value: attribute.value },
        create: {
          productId: row.id,
          name: attribute.name,
          value: attribute.value,
        },
      });
    }

    await prisma.productImage.deleteMany({ where: { productId: row.id } });
    await prisma.productImage.create({
      data: {
        productId: row.id,
        url: "/demo/product-placeholder.svg",
        alt: "[DEMO] Abstract placeholder, not a product photograph",
        sortOrder: 0,
      },
    });
  }

  return {
    brand: brand.slug,
    categories: [...categories.keys()],
    products: DEMO_PRODUCTS.map((product) => product.sku),
  };
}
