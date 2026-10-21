import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { HomepageShowcaseProduct } from "@/lib/homepage-showcase";

type FeaturedBrandProps = {
  products: readonly HomepageShowcaseProduct[];
};

export function FeaturedBrand({ products }: FeaturedBrandProps) {
  const collage = products.slice(0, 4);

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-surface-warm px-5 py-8 sm:px-8">
          <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Featured Brand
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">
                Johnson&apos;s
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                A baby-care range currently available for storefront preview.
              </p>
              <Link
                href="/c/mother-baby"
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-deep"
              >
                Explore Baby Care
              </Link>
            </div>
            {collage.length > 0 ? (
              <ul className="grid min-w-0 grid-cols-4 gap-3">
                {collage.map((product) => (
                  <li
                    key={product.importKey}
                    className="relative aspect-square min-w-0 overflow-hidden rounded-2xl bg-surface"
                  >
                    <Image
                      src={product.imageSrc}
                      alt=""
                      fill
                      sizes="15vw"
                      className="object-contain p-2"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
