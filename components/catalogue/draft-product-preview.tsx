import Image from "next/image";

import { cn } from "@/lib/cn";
import { PRODUCT_IMAGE_FALLBACK, resolveProductImage } from "@/lib/catalogue-view";

export type DraftProductPreviewModel = {
  importKey: string;
  name: string;
  brandName: string;
  categoryName: string;
  imageSrc: string;
  imageAlt: string;
};

type DraftProductPreviewProps = {
  product: DraftProductPreviewModel;
  className?: string;
};

export function DraftProductPreview({
  product,
  className,
}: DraftProductPreviewProps) {
  const svg = product.imageSrc.endsWith(".svg");

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface",
        className,
      )}
    >
      <div className="relative aspect-[4/3] bg-surface-warm sm:aspect-square">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6"
          unoptimized={svg}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {product.brandName} · {product.categoryName}
        </p>
        <h2 className="font-display text-xl tracking-tight text-ink">
          {product.name}
        </h2>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Draft — not in the public catalogue
        </p>
        <p className="mt-auto pt-2 text-sm text-muted">Price not provided</p>
      </div>
    </article>
  );
}

export function toDraftProductPreviewModel(product: {
  sku: string;
  name: string;
  brand: { name: string };
  category: { name: string };
  images: readonly { url: string; alt: string }[];
}): DraftProductPreviewModel {
  const image = resolveProductImage(product.name, product.images);

  return {
    importKey: product.sku,
    name: product.name,
    brandName: product.brand.name,
    categoryName: product.category.name,
    imageSrc: image.src || PRODUCT_IMAGE_FALLBACK,
    imageAlt: image.alt,
  };
}
