import { cloudinaryDeliveryUrl, type ProcessEnvLike } from "@/lib/cloudinary";
import { PRODUCT_VISIBILITY } from "@/lib/catalogue-query";

export const DRAFT_CLIENT_IMPORT_SKU_PREFIX = "DRAFT-IMPORT:";

export const JOHNSONS_BRAND = {
  slug: "johnsons",
  name: "Johnson's",
} as const;

export const MOTHER_BABY_PARENT_CATEGORY = {
  slug: "mother-baby",
  name: "Mother & baby",
  description: "",
  sortOrder: 40,
} as const;

export const BABY_CARE_CATEGORY = {
  slug: "baby-care",
  name: "Baby Care",
  description: "",
  sortOrder: 1,
} as const;

export type DraftClientImageImport = {
  url?: string;
  cloudinaryPublicId: string;
  alt: string;
  sortOrder: number;
  width: number;
  height: number;
  localPreviewPath: string;
};

export type DraftClientProductImport = {
  importKey: string;
  slug: string;
  name: string;
  images: readonly DraftClientImageImport[];
};

const SOAP_PHOTO: Omit<DraftClientImageImport, "alt"> = {
  cloudinaryPublicId:
    "happy-pharmacy/draft-client/johnsons-baby-soap-milk-and-original-75g",
  sortOrder: 0,
  width: 1016,
  height: 1024,
  localPreviewPath:
    "/draft-preview/johnsons/johnsons-baby-soap-milk-and-original-75g.jpg",
};

export const JOHNSONS_BABY_CARE_DRAFT_PRODUCTS: readonly DraftClientProductImport[] =
  [
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-baby-bath-200ml`,
      slug: "draft-johnsons-baby-bath-200ml",
      name: "Johnson's Baby Bath 200 ml",
      images: [
        {
          cloudinaryPublicId:
            "happy-pharmacy/draft-client/johnsons-baby-bath-200ml",
          alt: "Photograph of a Johnson's Baby Bath 200 ml bottle",
          sortOrder: 0,
          width: 1003,
          height: 1024,
          localPreviewPath: "/draft-preview/johnsons/johnsons-baby-bath-200ml.jpg",
        },
      ],
    },
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-baby-shampoo-200ml`,
      slug: "draft-johnsons-baby-shampoo-200ml",
      name: "Johnson's Baby Shampoo 200 ml",
      images: [
        {
          cloudinaryPublicId:
            "happy-pharmacy/draft-client/johnsons-baby-shampoo-200ml",
          alt: "Photograph of a Johnson's Baby Shampoo 200 ml bottle",
          sortOrder: 0,
          width: 1004,
          height: 1024,
          localPreviewPath:
            "/draft-preview/johnsons/johnsons-baby-shampoo-200ml.jpg",
        },
      ],
    },
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-no-more-tangles-shampoo-200ml`,
      slug: "draft-johnsons-no-more-tangles-shampoo-200ml",
      name: "Johnson's No More Tangles Shampoo 200 ml",
      images: [
        {
          cloudinaryPublicId:
            "happy-pharmacy/draft-client/johnsons-no-more-tangles-shampoo-200ml",
          alt: "Photograph of a Johnson's No More Tangles Shampoo 200 ml bottle",
          sortOrder: 0,
          width: 1015,
          height: 1024,
          localPreviewPath:
            "/draft-preview/johnsons/johnsons-no-more-tangles-shampoo-200ml.jpg",
        },
      ],
    },
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-baby-oil-200ml`,
      slug: "draft-johnsons-baby-oil-200ml",
      name: "Johnson's Baby Oil 200 ml",
      images: [
        {
          cloudinaryPublicId:
            "happy-pharmacy/draft-client/johnsons-baby-oil-200ml",
          alt: "Photograph of a Johnson's Baby Oil 200 ml bottle",
          sortOrder: 0,
          width: 1003,
          height: 1024,
          localPreviewPath: "/draft-preview/johnsons/johnsons-baby-oil-200ml.jpg",
        },
      ],
    },
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-baby-powder-200g`,
      slug: "draft-johnsons-baby-powder-200g",
      name: "Johnson's Baby Powder 200 g",
      images: [
        {
          cloudinaryPublicId:
            "happy-pharmacy/draft-client/johnsons-baby-powder-200g",
          alt: "Photograph of a Johnson's Baby Powder 200 g bottle",
          sortOrder: 0,
          width: 1001,
          height: 1024,
          localPreviewPath:
            "/draft-preview/johnsons/johnsons-baby-powder-200g.jpg",
        },
      ],
    },
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-baby-cream-100g`,
      slug: "draft-johnsons-baby-cream-100g",
      name: "Johnson's Baby Cream 100 g",
      images: [
        {
          cloudinaryPublicId:
            "happy-pharmacy/draft-client/johnsons-baby-cream-100g",
          alt: "Photograph of a Johnson's Baby Cream 100 g tube",
          sortOrder: 0,
          width: 1019,
          height: 1024,
          localPreviewPath:
            "/draft-preview/johnsons/johnsons-baby-cream-100g.jpg",
        },
      ],
    },
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-detangling-easy-comb-spray-200ml`,
      slug: "draft-johnsons-detangling-easy-comb-spray-200ml",
      name: "Johnson's Detangling/Easy-Comb Spray 200 ml",
      images: [
        {
          cloudinaryPublicId:
            "happy-pharmacy/draft-client/johnsons-detangling-easy-comb-spray-200ml",
          alt: "Photograph of a Johnson's detangling / easy-comb spray 200 ml bottle",
          sortOrder: 0,
          width: 1009,
          height: 1024,
          localPreviewPath:
            "/draft-preview/johnsons/johnsons-no-more-tangles-combing-spray-200ml.jpg",
        },
      ],
    },
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-milk-baby-soap-75g`,
      slug: "draft-johnsons-milk-baby-soap-75g",
      name: "Johnson's Milk Baby Soap 75 g",
      images: [
        {
          ...SOAP_PHOTO,
          alt: "Photograph of Johnson's Milk Baby Soap 75 g, shown with Johnson's Baby Soap in the same client photo",
        },
      ],
    },
    {
      importKey: `${DRAFT_CLIENT_IMPORT_SKU_PREFIX}johnsons-baby-soap-75g`,
      slug: "draft-johnsons-baby-soap-75g",
      name: "Johnson's Baby Soap 75 g",
      images: [
        {
          ...SOAP_PHOTO,
          alt: "Photograph of Johnson's Baby Soap 75 g, shown with Johnson's Milk Baby Soap in the same client photo",
        },
      ],
    },
  ];

export const DRAFT_CLIENT_IMPORT_VISIBILITY = PRODUCT_VISIBILITY.DRAFT;

export const UNSET_DRAFT_PRICE_PKR_MINOR = 0;

export function resolveDraftClientImageUrl(
  image: DraftClientImageImport,
  env: ProcessEnvLike = process.env,
): string {
  const explicit = image.url?.trim();

  if (explicit) {
    return explicit;
  }

  return (
    cloudinaryDeliveryUrl(image.cloudinaryPublicId, env) ??
    image.localPreviewPath
  );
}

export function johnsonsDraftImportKeys(): readonly string[] {
  return JOHNSONS_BABY_CARE_DRAFT_PRODUCTS.map((product) => product.importKey);
}
