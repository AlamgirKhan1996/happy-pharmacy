/**
 * REGULATED MEDICAL CAMPAIGN ASSET — DO NOT PUBLISH FROM THIS MODULE.
 *
 * This flu-vaccine artwork must not be made public merely by changing a
 * visibility field, robots flag, environment boolean, or route wrapper.
 * Do not import this module from the homepage, category pages, search,
 * product cards, advertisements, or any other public production route.
 *
 * Before any future publication, a licensed responsible person must confirm:
 * - DRAP registration/authorization
 * - licensed supplier and purchase invoice
 * - batch number and expiry
 * - 2–8°C cold-chain records
 * - current stock
 * - licensed pharmacy/business identity
 * - authorized vaccination location and healthcare professional
 * - client approval for all medical and promotional claims
 */
export const FLU_VACCINE_PENDING_APPROVAL_ASSET = {
  id: "flu-vaccine-2026-2027",
  src: "/images/campaigns/pending-approval/flu-vaccine-2026-2027-pending-approval.jpg",
  alt: "Client-supplied flu vaccine campaign artwork held for internal review.",
  width: 1024,
  height: 678,
} as const;

export const PENDING_REGULATORY_NOTICE =
  "Pending regulatory, licensing, stock and cold-chain verification.";

export const PENDING_PUBLICATION_CHECKLIST = [
  "DRAP registration/authorization",
  "licensed supplier and purchase invoice",
  "batch number and expiry",
  "2–8°C cold-chain records",
  "current stock",
  "licensed pharmacy/business identity",
  "authorized vaccination location and healthcare professional",
  "client approval for all medical and promotional claims",
] as const;
