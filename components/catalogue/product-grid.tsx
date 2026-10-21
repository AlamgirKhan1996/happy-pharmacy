import { ProductCard } from "@/components/catalogue/product-card";
import type { ProductCardModel } from "@/lib/catalogue-view";

type ProductGridProps = {
  products: readonly ProductCardModel[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.sku} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
