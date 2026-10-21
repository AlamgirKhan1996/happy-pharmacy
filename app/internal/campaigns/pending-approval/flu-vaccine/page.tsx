import type { Metadata } from "next";

import { PendingApprovalCampaignPreview } from "@/components/campaigns/pending-approval-preview";
import { Container } from "@/components/ui/container";

/**
 * Internal development preview only. Do not surface this route from public
 * navigation. The campaign artwork must not be published merely by changing
 * a visibility field.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pending campaign approval",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FluVaccinePendingApprovalPage() {
  return (
    <Container className="py-10 sm:py-14">
      <PendingApprovalCampaignPreview />
    </Container>
  );
}
