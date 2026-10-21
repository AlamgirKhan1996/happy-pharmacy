export const DEMO_CATEGORY_SLUG_BY_NAV_SLUG = {
  wellness: "demo-wellness",
  devices: "demo-devices",
  "first-aid": "demo-first-aid",
  "personal-care": "demo-personal-care",
} as const;

export type NavCategorySlugWithDemo =
  keyof typeof DEMO_CATEGORY_SLUG_BY_NAV_SLUG;

export function resolveDemoCategorySlug(navSlug: string): string | null {
  if (navSlug in DEMO_CATEGORY_SLUG_BY_NAV_SLUG) {
    return DEMO_CATEGORY_SLUG_BY_NAV_SLUG[
      navSlug as NavCategorySlugWithDemo
    ];
  }

  return null;
}

export function navSlugsWithDemoFixtures(): readonly string[] {
  return Object.keys(DEMO_CATEGORY_SLUG_BY_NAV_SLUG);
}
