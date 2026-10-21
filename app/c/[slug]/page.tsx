import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CatalogueStatus } from "@/components/catalogue/catalogue-status";
import { ProductGrid } from "@/components/catalogue/product-grid";
import { SearchField } from "@/components/layout/search-field";
import { Container } from "@/components/ui/container";
import {
  listPublicProductsForNavSlug,
  tryCatalogueRead,
} from "@/lib/catalogue";
import { buildCategoryShelfView } from "@/lib/catalogue-view";
import { categories } from "@/lib/navigation";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/c/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return { title: "Category" };
  }

  return {
    title: category.name,
    description: category.description,
    robots: { index: false, follow: false },
  };
}

export default async function CategoryPage({ params }: PageProps<"/c/[slug]">) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const read = await tryCatalogueRead(() =>
    listPublicProductsForNavSlug(category.slug),
  );
  const shelf = buildCategoryShelfView(
    category.slug,
    read.ok ? { ok: true, products: read.data } : { ok: false },
  );

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">{category.description}</p>
      <div className="mt-6 max-w-xl">
        <SearchField id={`category-search-${category.slug}`} />
      </div>

      {shelf.kind === "unavailable" ? (
        <CatalogueStatus title="Products are unavailable right now">
          This category could not be loaded. Please try again shortly.
        </CatalogueStatus>
      ) : null}

      {shelf.kind === "unmapped" || shelf.kind === "empty" ? (
        <CatalogueStatus title="Products will appear here">
          Browse other categories or use search while this shelf is being
          reviewed.
        </CatalogueStatus>
      ) : null}

      {shelf.kind === "products" ? (
        <ProductGrid products={shelf.products} />
      ) : null}
    </Container>
  );
}
