import Image from "next/image";

import type { HomepageShowcaseProduct } from "@/lib/homepage-showcase";
import { Container } from "@/components/ui/container";

type HomepageProductSectionProps = {
  products: readonly HomepageShowcaseProduct[];
};

export function HomepageProductSection({
  products,
}: HomepageProductSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Baby Care Essentials
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
          Explore the latest client-supplied baby-care range.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.importKey} className="min-w-0">
              <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_8px_24px_rgb(6_77_46_/_0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(6_77_46_/_0.1)]">
                <div className="relative aspect-square bg-surface-warm">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-3 py-3">
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <p className="min-w-0 truncate text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand">
                      {product.brandName}
                    </p>
                    <span className="shrink-0 rounded-full bg-surface-warm px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-brand">
                      Preview
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-ink">
                    {product.name}
                  </h3>
                  {product.sizeLabel ? (
                    <p className="text-xs text-muted">{product.sizeLabel}</p>
                  ) : null}
                  <p className="mt-auto pt-2 text-sm font-semibold text-ink">
                    Price coming soon
                  </p>
                  <span className="text-sm font-semibold text-brand">
                    View details
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
