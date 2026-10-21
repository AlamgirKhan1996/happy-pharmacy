import type { Metadata } from "next";

import { ContentPage, contentPageRobots } from "@/components/content/content-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  robots: contentPageRobots,
};

export default function ContactPage() {
  return (
    <ContentPage title="Help & Support">
      <p>
        For store-preview questions, you can reach Happy Pharmacy on WhatsApp
        at {siteConfig.whatsappDisplay}.
      </p>
      <p>
        Ordering support and additional contact channels will be published when
        they are available.
      </p>
    </ContentPage>
  );
}
