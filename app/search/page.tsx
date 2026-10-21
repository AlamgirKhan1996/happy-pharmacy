import type { Metadata } from "next";

import { CatalogueStatus } from "@/components/catalogue/catalogue-status";
import { ProductGrid } from "@/components/catalogue/product-grid";
import { SearchField } from "@/components/layout/search-field";
import { Container } from "@/components/ui/container";
import { searchPublicProducts, tryCatalogueRead } from "@/lib/catalogue";
import { buildSearchResultsView } from "@/lib/catalogue-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search",
  description: "Search medicines, baby care, skincare and wellness.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const read = query
    ? await tryCatalogueRead(() => searchPublicProducts(query))
    : null;
  const results = buildSearchResultsView(
    query,
    read ? (read.ok ? { ok: true, products: read.data } : { ok: false }) : null,
  );

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Search
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Find products by name across the public catalogue.
      </p>
      <div className="mt-6 max-w-xl">
        <SearchField id="search-page-field" autoFocus defaultValue={query} />
      </div>

      {results.kind === "idle" ? (
        <CatalogueStatus title="Start a search">
          Try a product name to see matching public catalogue items.
        </CatalogueStatus>
      ) : null}

      {results.kind === "unavailable" ? (
        <CatalogueStatus title="Search is unavailable right now">
          Please try again shortly.
        </CatalogueStatus>
      ) : null}

      {results.kind === "empty" ? (
        <CatalogueStatus title="No matching products">
          No public catalogue items matched “{results.query}”.
        </CatalogueStatus>
      ) : null}

      {results.kind === "results" ? (
        <>
          <p className="mt-8 text-sm text-ink">
            {results.products.length} result
            {results.products.length === 1 ? "" : "s"} for{" "}
            <span className="font-semibold">“{results.query}”</span>.
          </p>
          <ProductGrid products={results.products} />
        </>
      ) : null}
    </Container>
  );
}
