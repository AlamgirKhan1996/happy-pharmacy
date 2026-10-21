import type { Metadata } from "next";

import { CatalogueStatus } from "@/components/catalogue/catalogue-status";
import {
  DraftProductPreview,
  toDraftProductPreviewModel,
} from "@/components/catalogue/draft-product-preview";
import { Container } from "@/components/ui/container";
import {
  listDraftClientImportProducts,
  tryCatalogueRead,
} from "@/lib/catalogue";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Draft product preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DraftProductsPreviewPage() {
  const read = await tryCatalogueRead(() => listDraftClientImportProducts());

  return (
    <Container className="py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        Internal draft review
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        Draft client products
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
        These records stay DRAFT. They are excluded from public categories and
        search. Prices, stock, SKUs, barcodes and medical claims have not been
        supplied for publication.
      </p>

      {!read.ok ? (
        <CatalogueStatus title="Draft catalogue unavailable">
          The local database is not reachable, so draft products cannot be
          reviewed here.
        </CatalogueStatus>
      ) : read.data.length === 0 ? (
        <CatalogueStatus title="No draft client products">
          Run the draft import seed to load Johnson&apos;s baby-care photographs
          for internal review.
        </CatalogueStatus>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {read.data.map((product) => (
            <li key={product.sku}>
              <DraftProductPreview
                product={toDraftProductPreviewModel(product)}
              />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
