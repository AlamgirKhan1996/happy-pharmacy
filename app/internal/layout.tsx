import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isInternalPreviewAllowed } from "@/lib/internal-preview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isInternalPreviewAllowed()) {
    notFound();
  }

  return (
    <div>
      <div className="border-b border-line bg-surface-warm">
        <p className="mx-auto max-w-6xl px-4 py-3 text-sm font-semibold text-ink">
          Internal development preview — not indexed and not linked from public
          navigation.
        </p>
      </div>
      {children}
    </div>
  );
}
