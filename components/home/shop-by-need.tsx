import Link from "next/link";

import { Container } from "@/components/ui/container";
import { NEED_CARDS } from "@/lib/storefront";

export function ShopByNeed() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Shop by need
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEED_CARDS.map((card) => (
            <li key={card.title} className="min-w-0">
              <Link
                href={card.href}
                className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-surface p-5 shadow-[0_8px_24px_rgb(6_77_46_/_0.06)] transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_12px_28px_rgb(6_77_46_/_0.1)]"
              >
                <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {card.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
