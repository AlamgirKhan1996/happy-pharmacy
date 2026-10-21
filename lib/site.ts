export const siteConfig = {
  name: "Happy Pharmacy",
  shortName: "Happy",
  previewStatus: "Happy Pharmacy online store preview",
  tagline: "Health, wellness and everyday care",
  description:
    "Happy Pharmacy is a health-products storefront for Pakistan. Browse medicines, baby care, skincare and wellness products.",
  locale: "en-PK",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://happypharmacy.pk",
  currency: "PKR",
  currencyLocale: "en-PK",
  whatsappDisplay: "0336 5740324",
  whatsappNumber: "03365740324",
} as const;

export type SiteConfig = typeof siteConfig;
