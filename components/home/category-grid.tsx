import Link from "next/link";

import { Container } from "@/components/ui/container";
import { storefrontCategories } from "@/lib/navigation";

function CategoryGlyph({ name }: { name: string }) {
  return (
    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
      <svg viewBox="0 0 32 32" className="size-7" fill="none" aria-hidden="true">
        {name === "Medicines" ? (
          <path d="M10 8h12v16H10zM14 4h4v4h-4zM13 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        ) : name === "Health Supplements" ? (
          <path d="M11 7h10v5H11zM13 12v13h6V12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        ) : name === "Baby & Child" ? (
          <circle cx="16" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        ) : name === "Skin Care" ? (
          <path d="M16 6c5 6 8 10 8 14a8 8 0 1 1-16 0c0-4 3-8 8-14Z" stroke="currentColor" strokeWidth="1.8" />
        ) : name === "Personal Care" ? (
          <path d="M12 7h8v18h-8zM14 4h4v3h-4z" stroke="currentColor" strokeWidth="1.8" />
        ) : name === "Hair Care" ? (
          <path d="M10 8c2 8 4 16 6 16s4-8 6-16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        ) : name === "Healthcare Devices" ? (
          <rect x="7" y="10" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        ) : (
          <path d="M8 16h16M16 8v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        )}
      </svg>
    </span>
  );
}

export function CategoryGrid() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Shop by Category
          </h2>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {storefrontCategories.map((category) => (
            <li key={category.navId} className="min-w-0">
              <Link
                href={category.href}
                className={`flex h-full min-w-0 flex-col items-center gap-3 rounded-2xl px-3 py-5 text-center shadow-[0_8px_24px_rgb(6_77_46_/_0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(6_77_46_/_0.1)] ${category.tone}`}
              >
                <CategoryGlyph name={category.name} />
                <span className="text-sm font-semibold break-words text-ink">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
