import type { Metadata } from "next";

import { ContentPage, contentPageRobots } from "@/components/content/content-page";

export const metadata: Metadata = {
  title: "Terms",
  robots: contentPageRobots,
};

export default function TermsPage() {
  return (
    <ContentPage title="Terms">
      <p>
        These pages are provided for browsing the storefront. Full terms of use
        will be published before ordering opens.
      </p>
    </ContentPage>
  );
}
