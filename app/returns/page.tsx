import type { Metadata } from "next";

import { ContentPage, contentPageRobots } from "@/components/content/content-page";

export const metadata: Metadata = {
  title: "Returns Policy",
  robots: contentPageRobots,
};

export default function ReturnsPage() {
  return (
    <ContentPage title="Returns Policy">
      <p>
        Returns and replacement details will be published when ordering is
        available.
      </p>
    </ContentPage>
  );
}
