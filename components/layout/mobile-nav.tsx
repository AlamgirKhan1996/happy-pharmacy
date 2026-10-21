"use client";

import {
  GridIcon,
  HeartIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons/icons";
import { NavLink } from "@/components/nav/nav-link";
import type { AppPath } from "@/lib/navigation";

const items: ReadonlyArray<{
  href: AppPath;
  label: string;
  icon: typeof HomeIcon;
}> = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/c/medicines", label: "Shop", icon: GridIcon },
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/wishlist", label: "Wishlist", icon: HeartIcon },
  { href: "/account", label: "Account", icon: UserIcon },
];

export function MobileNav() {
  return (
    <nav
      aria-label="Mobile primary"
      className="fixed bottom-0 left-0 right-0 z-50 w-auto max-w-full border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <NavLink
                href={item.href}
                className="flex min-h-14 flex-col items-center justify-center gap-1 text-[0.65rem] font-semibold text-muted"
                activeClassName="text-brand"
              >
                <Icon className="size-5" />
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
