import Image from "next/image";

import { cn } from "@/lib/cn";
import { formatPkrMinor } from "@/lib/format";
import type { ProductCardModel } from "@/lib/catalogue-view";

type ProductCardProps = {
  product: ProductCardModel;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const svg = product.imageSrc.endsWith(".svg");

  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-line bg-surface",
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
      <div className="flex min-w-0 flex-1 flex-col gap-2 px-4 py-4">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <p className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {product.categoryName}
          </p>
          {product.demo ? (
            <span className="shrink-0 rounded-sm bg-surface-warm px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-brand">
              Demo
            </span>
          ) : null}
        </div>
        <h2 className="font-display text-xl tracking-tight text-ink">
          {product.name}
        </h2>
        <p className="mt-auto pt-2 text-sm font-semibold text-ink">
          {formatPkrMinor(product.pricePkrMinor)}{" "}
          <span className="text-xs font-medium text-muted">
            fictional demo price
          </span>
        </p>
      </div>
    </article>
  );
}
