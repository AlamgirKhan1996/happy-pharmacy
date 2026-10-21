import Link from "next/link";

import { WhatsAppIcon } from "@/components/icons/icons";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="bg-brand text-white">
      <p className="px-4 py-2 text-center text-[0.78rem] font-medium sm:hidden">
        {siteConfig.previewStatus}
      </p>
      <Container className="hidden min-h-9 items-center justify-between gap-6 py-1.5 text-xs sm:flex">
        <p className="font-medium">{siteConfig.previewStatus}</p>
        <div className="flex items-center gap-5">
          <p className="inline-flex items-center gap-1.5 font-medium">
            <WhatsAppIcon className="size-3.5" />
            <span>WhatsApp: {siteConfig.whatsappDisplay}</span>
          </p>
          <Link
            href="/contact"
            className="font-medium text-white/90 hover:text-white"
          >
            Help &amp; Support
          </Link>
        </div>
      </Container>
    </div>
  );
}
