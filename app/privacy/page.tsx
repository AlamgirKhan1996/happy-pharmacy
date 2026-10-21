import type { Metadata } from "next";

import { ContentPage, contentPageRobots } from "@/components/content/content-page";

export const metadata: Metadata = {
  title: "Privacy",
  robots: contentPageRobots,
};

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy">
      <p>
        Happy Pharmacy is built with modern privacy practices. A full privacy
        notice will be published before customer accounts and ordering open.
      </p>
    </ContentPage>
  );
}
