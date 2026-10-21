import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedBrand } from "@/components/home/featured-brand";
import { HomeHeroCarousel } from "@/components/home/home-hero-carousel";
import { HomepageProductSection } from "@/components/home/homepage-product-section";
import { NewsletterPreview } from "@/components/home/newsletter-preview";
import { PromotionalMosaic } from "@/components/home/promotional-mosaic";
import { ShopByNeed } from "@/components/home/shop-by-need";
import { StoreBenefits } from "@/components/home/store-benefits";
import { Container } from "@/components/ui/container";
import { getHomepageDraftShowcase } from "@/lib/homepage-showcase";
import { HERO_SLIDES } from "@/lib/storefront";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const showcase = await getHomepageDraftShowcase();

  return (
    <>
      <HomeHeroCarousel slides={HERO_SLIDES} />
      <Container className="pt-8 sm:pt-10">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Health, wellness and everyday care
        </h1>
      </Container>
      <CategoryGrid />
      <HomepageProductSection products={showcase} />
      <PromotionalMosaic />
      <ShopByNeed />
      <FeaturedBrand products={showcase} />
      <StoreBenefits />
      <NewsletterPreview />
    </>
  );
}
