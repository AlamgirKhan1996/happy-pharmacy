import type { AppPath } from "@/lib/navigation";

export type HeroSlide = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  href: AppPath;
  cta: string;
};

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "baby-and-child",
    src: "/images/home/category-banner-baby-and-child.jpg",
    width: 1024,
    height: 783,
    alt: "Baby and child care products arranged for the Happy Pharmacy storefront",
    href: "/c/mother-baby",
    cta: "Explore Baby & Child",
  },
  {
    id: "skin-care",
    src: "/images/home/category-banner-skin-care.jpg",
    width: 1024,
    height: 823,
    alt: "Skin-care products arranged for the Happy Pharmacy storefront",
    href: "/c/skin-hair",
    cta: "Explore Skin Care",
  },
  {
    id: "health-supplements",
    src: "/images/home/category-banner-health-supplements.jpg",
    width: 1024,
    height: 796,
    alt: "Health supplement products arranged for the Happy Pharmacy storefront",
    href: "/c/wellness",
    cta: "Explore Wellness",
  },
] as const;

export const NEED_CARDS = [
  {
    href: "/c/wellness" as const,
    title: "Everyday Wellness",
    description: "Daily essentials for a balanced routine.",
  },
  {
    href: "/c/mother-baby" as const,
    title: "Baby Care",
    description: "Gentle care products for babies and families.",
  },
  {
    href: "/c/personal-care" as const,
    title: "Skin & Personal Care",
    description: "Cleansing, moisturising and personal-care essentials.",
  },
  {
    href: "/c/devices" as const,
    title: "Health Devices",
    description: "Useful monitoring and home-care equipment.",
  },
] as const;

export const STORE_BENEFITS = [
  {
    title: "Easy Browsing",
    description: "Find products by category or search.",
  },
  {
    title: "Clear Product Information",
    description: "Review available product details before ordering.",
  },
  {
    title: "Customer Assistance",
    description: "Contact information will be available when ordering opens.",
  },
  {
    title: "Secure Experience",
    description: "Built with modern privacy and security practices.",
  },
] as const;
