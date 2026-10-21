import Link from "next/link";

import { NavLink } from "@/components/nav/nav-link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { storefrontCategories } from "@/lib/navigation";

export function CategoryNav() {
  const trailingMenuCount = 3;

  return (
    <nav
      aria-label="Product categories"
      className="hidden border-t border-line bg-surface lg:block"
    >
      <Container>
        <ul className="flex items-stretch justify-between gap-1">
          {storefrontCategories.map((category, index) => {
            const alignEnd =
              index >= storefrontCategories.length - trailingMenuCount;

            return (
              <li key={category.navId} className="group relative">
                <NavLink
                  href={category.href}
                  className="flex min-h-12 items-center whitespace-nowrap px-2 text-[0.92rem] font-semibold text-ink/80 hover:text-brand"
                  activeClassName="text-brand"
                >
                  {category.name}
                </NavLink>
                <div
                  className={cn(
                    "invisible absolute top-full z-40 w-72 translate-y-1 rounded-2xl border border-line bg-surface p-4 opacity-0 shadow-[0_12px_32px_rgb(6_77_46_/_0.12)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                    alignEnd ? "right-0 left-auto" : "left-0",
                  )}
                >
                  <p className="text-sm font-semibold text-ink">{category.name}</p>
                  <p className="mt-1 text-sm leading-6 break-words text-muted">
                    {category.description}
                  </p>
                  <Link
                    href={category.href}
                    className="mt-3 inline-flex text-sm font-semibold text-brand hover:text-brand-deep"
                  >
                    Browse {category.name}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
