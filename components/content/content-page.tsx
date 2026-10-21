import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

type ContentPageProps = {
  title: string;
  children: React.ReactNode;
};

export const contentPageRobots: Metadata["robots"] = {
  index: false,
  follow: false,
};

export function ContentPage({ title, children }: ContentPageProps) {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
      <div className="mt-5 max-w-2xl space-y-4 text-sm leading-7 text-muted sm:text-base">
        {children}
      </div>
    </Container>
  );
}
