import Image from "next/image";

import {
  FLU_VACCINE_PENDING_APPROVAL_ASSET,
  PENDING_PUBLICATION_CHECKLIST,
  PENDING_REGULATORY_NOTICE,
} from "@/lib/campaigns/pending-approval";

/**
 * Internal review only. Do not import this component from public routes.
 * Changing a visibility field must not publish the campaign artwork.
 */

export function PendingApprovalCampaignPreview() {
  return (
    <section className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        Internal campaign review
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        Flu vaccine campaign
      </h1>
      <p className="mt-4 rounded-md border border-line bg-surface-warm px-4 py-3 text-sm font-semibold text-ink">
        {PENDING_REGULATORY_NOTICE}
      </p>
      <p className="mt-4 text-sm leading-6 text-muted">
        Client-supplied artwork is shown here for internal review only. This
        page does not offer a product, price, stock, booking, or ordering
        action. Medical and promotional claims on the artwork are not site copy.
      </p>
      <div className="mt-8 overflow-hidden rounded-md border border-line bg-surface">
        <Image
          src={FLU_VACCINE_PENDING_APPROVAL_ASSET.src}
          alt={FLU_VACCINE_PENDING_APPROVAL_ASSET.alt}
          width={FLU_VACCINE_PENDING_APPROVAL_ASSET.width}
          height={FLU_VACCINE_PENDING_APPROVAL_ASSET.height}
          className="h-auto w-full"
        />
      </div>
      <h2 className="mt-8 font-display text-2xl text-ink">
        Required before any future publication
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
        {PENDING_PUBLICATION_CHECKLIST.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
