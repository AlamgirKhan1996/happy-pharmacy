import type { Metadata } from "next";

import { ContentPage, contentPageRobots } from "@/components/content/content-page";

export const metadata: Metadata = {
  title: "Delivery Information",
  robots: contentPageRobots,
};

export default function DeliveryPage() {
  return (
    <ContentPage title="Delivery Information">
      <p>
        Delivery options, coverage and timing will be published when ordering
        is available.
      </p>
    </ContentPage>
  );
}
