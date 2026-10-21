import type { ProcessEnvLike } from "@/lib/cloudinary";
import { listDraftClientImportProducts, tryCatalogueRead } from "@/lib/catalogue";
import { resolveProductImage } from "@/lib/catalogue-view";

export type HomepageShowcaseProduct = {
  importKey: string;
  name: string;
  brandName: string;
  sizeLabel: string | null;
  imageSrc: string;
  imageAlt: string;
};

export function isDraftHomepageShowcaseEnabled(
  env: ProcessEnvLike = process.env,
): boolean {
  if (env.NODE_ENV === "production") {
    return false;
  }

  return env.SHOW_DRAFT_HOMEPAGE_SHOWCASE === "true";
}

export function sizeLabelFromRecordedName(name: string): string | null {
  const match = name.match(/(\d+\s?(?:ml|g))$/i);
  return match?.[1]?.replace(/\s+/g, " ") ?? null;
}

export async function getHomepageDraftShowcase(): Promise<
  HomepageShowcaseProduct[]
> {
  if (!isDraftHomepageShowcaseEnabled()) {
    return [];
  }

  const read = await tryCatalogueRead(() => listDraftClientImportProducts());

  if (!read.ok) {
    return [];
  }

  return read.data.map((product) => {
    const image = resolveProductImage(product.name, product.images);

    return {
      importKey: product.sku,
      name: product.name,
      brandName: product.brand.name,
      sizeLabel: sizeLabelFromRecordedName(product.name),
      imageSrc: image.src,
      imageAlt: image.alt,
    };
  });
}
