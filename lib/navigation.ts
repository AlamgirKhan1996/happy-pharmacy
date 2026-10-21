export type AppPath =
  | "/"
  | "/search"
  | "/account"
  | "/wishlist"
  | "/cart"
  | "/checkout"
  | "/admin"
  | "/about"
  | "/contact"
  | "/delivery"
  | "/returns"
  | "/privacy"
  | "/terms"
  | `/c/${string}`;

export type NavItem = {
  href: AppPath;
  label: string;
  description?: string;
};

export type CategoryItem = {
  slug: string;
  name: string;
  href: `/c/${string}`;
  description: string;
};

export const categories: readonly CategoryItem[] = [
  {
    slug: "medicines",
    name: "Medicines",
    href: "/c/medicines",
    description: "Everyday medicines and pharmacy products.",
  },
  {
    slug: "wellness",
    name: "Wellness",
    href: "/c/wellness",
    description: "Daily essentials for a balanced routine.",
  },
  {
    slug: "nutrition",
    name: "Health Supplements",
    href: "/c/nutrition",
    description: "Vitamins and nutritional products.",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    href: "/c/personal-care",
    description: "Cleansing, moisturising and personal-care essentials.",
  },
  {
    slug: "mother-baby",
    name: "Baby & Child",
    href: "/c/mother-baby",
    description: "Gentle care products for babies and families.",
  },
  {
    slug: "skin-hair",
    name: "Skin Care",
    href: "/c/skin-hair",
    description: "Skincare and hair-care products.",
  },
  {
    slug: "devices",
    name: "Healthcare Devices",
    href: "/c/devices",
    description: "Useful monitoring and home-care equipment.",
  },
  {
    slug: "first-aid",
    name: "First Aid",
    href: "/c/first-aid",
    description: "First-aid and home-care supplies.",
  },
] as const;

export type StorefrontCategory = CategoryItem & {
  navId: string;
  tone: string;
};

export const storefrontCategories: readonly StorefrontCategory[] = [
  {
    navId: "medicines",
    slug: "medicines",
    name: "Medicines",
    href: "/c/medicines",
    description: "Everyday medicines and pharmacy products.",
    tone: "bg-[#e7f6ee]",
  },
  {
    navId: "health-supplements",
    slug: "nutrition",
    name: "Health Supplements",
    href: "/c/nutrition",
    description: "Vitamins and nutritional products.",
    tone: "bg-[#eef8e4]",
  },
  {
    navId: "baby-child",
    slug: "mother-baby",
    name: "Baby & Child",
    href: "/c/mother-baby",
    description: "Gentle care products for babies and families.",
    tone: "bg-[#fdecef]",
  },
  {
    navId: "skin-care",
    slug: "skin-hair",
    name: "Skin Care",
    href: "/c/skin-hair",
    description: "Cleansing and moisturising essentials.",
    tone: "bg-[#f3eef8]",
  },
  {
    navId: "personal-care",
    slug: "personal-care",
    name: "Personal Care",
    href: "/c/personal-care",
    description: "Personal-care essentials for daily routines.",
    tone: "bg-[#e8f3fb]",
  },
  {
    navId: "hair-care",
    slug: "skin-hair",
    name: "Hair Care",
    href: "/c/skin-hair",
    description: "Hair-care products on the skin and hair shelf.",
    tone: "bg-[#fff1e6]",
  },
  {
    navId: "devices",
    slug: "devices",
    name: "Healthcare Devices",
    href: "/c/devices",
    description: "Useful monitoring and home-care equipment.",
    tone: "bg-[#e6f7f4]",
  },
  {
    navId: "first-aid",
    slug: "first-aid",
    name: "First Aid",
    href: "/c/first-aid",
    description: "First-aid and home-care supplies.",
    tone: "bg-[#fdecec]",
  },
] as const;

export const accountLinks: readonly NavItem[] = [
  { href: "/account", label: "Account" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
] as const;

export const footerShopLinks: readonly NavItem[] = storefrontCategories.map(
  (category) => ({
    href: category.href,
    label: category.name,
  }),
);

export const footerHelpLinks: readonly NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/delivery", label: "Delivery Information" },
  { href: "/returns", label: "Returns Policy" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const mobileNavItems: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/c/medicines", label: "Shop" },
  { href: "/search", label: "Search" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/account", label: "Account" },
] as const;
