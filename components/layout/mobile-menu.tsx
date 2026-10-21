"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/icons/icons";
import { SearchField } from "@/components/layout/search-field";
import { storefrontCategories } from "@/lib/navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(true);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-xl text-ink hover:bg-surface-warm"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full z-40 max-h-[80vh] overflow-y-auto border-b border-line bg-surface shadow-[0_16px_40px_rgb(6_77_46_/_0.12)]"
        >
          <nav aria-label="Mobile categories" className="px-4 py-4 sm:px-6">
            <SearchField id="mobile-menu-search" />
            <button
              type="button"
              className="mt-4 flex min-h-12 w-full items-center justify-between rounded-2xl bg-surface-warm px-3 text-sm font-semibold text-ink"
              aria-expanded={shopOpen}
              onClick={() => setShopOpen((current) => !current)}
            >
              Shop by category
              <ChevronDownIcon
                className={`size-5 transition ${shopOpen ? "rotate-180" : ""}`}
              />
            </button>
            {shopOpen ? (
              <ul className="mt-2 grid grid-cols-1 gap-1">
                {storefrontCategories.map((category) => (
                  <li key={category.navId}>
                    <Link
                      href={category.href}
                      className="block rounded-2xl px-3 py-3 hover:bg-surface-warm"
                      onClick={() => setOpen(false)}
                    >
                      <span className="block text-sm font-semibold text-ink">
                        {category.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {category.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4">
              <Link
                href="/account"
                className="rounded-2xl bg-surface-warm px-3 py-3 text-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                Account
              </Link>
              <Link
                href="/wishlist"
                className="rounded-2xl bg-surface-warm px-3 py-3 text-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                Wishlist
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
