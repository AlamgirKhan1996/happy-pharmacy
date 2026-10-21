import type { Metadata } from "next";

import { ContentPage, contentPageRobots } from "@/components/content/content-page";

export const metadata: Metadata = {
  title: "About",
  robots: contentPageRobots,
};

export default function AboutPage() {
  return (
    <ContentPage title="About Happy Pharmacy">
      <p>
        Happy Pharmacy is a health-products storefront for everyday care,
        wellness and family essentials.
      </p>
      <p>
        Product listings are shown for browsing and review. Ordering, delivery
        and clinical services are published separately when they are ready.
      </p>
    </ContentPage>
  );
}
