import { Suspense } from "react";

import { Logo } from "@/components/branding/logo";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CategoryNav } from "@/components/layout/category-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { QuerySearchField } from "@/components/layout/query-search-field";
import { SearchField } from "@/components/layout/search-field";
import { UtilityLinks } from "@/components/layout/utility-links";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface/95 shadow-sm backdrop-blur-md">
      <AnnouncementBar />
      <div className="relative">
        <Container className="flex min-w-0 flex-col gap-3 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <MobileMenu />
            <Logo className="mr-auto shrink-0 lg:mr-0" />
            <Suspense
              fallback={
                <SearchField className="hidden min-w-0 max-w-2xl flex-1 lg:block" />
              }
            >
              <QuerySearchField className="hidden min-w-0 max-w-2xl flex-1 lg:block" />
            </Suspense>
            <UtilityLinks className="hidden md:flex" />
            <UtilityLinks
              className="md:hidden"
              showLabels={false}
              showAccount={false}
              showWishlist={false}
            />
          </div>
          <Suspense
            fallback={
              <SearchField id="product-search-mobile" className="lg:hidden" />
            }
          >
            <QuerySearchField id="product-search-mobile" className="lg:hidden" />
          </Suspense>
        </Container>
        <CategoryNav />
      </div>
    </header>
  );
}
