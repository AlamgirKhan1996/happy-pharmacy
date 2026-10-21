import Link from "next/link";

import { Logo } from "@/components/branding/logo";
import { WhatsAppIcon } from "@/components/icons/icons";
import { Container } from "@/components/ui/container";
import { footerHelpLinks, footerShopLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-deep text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-6 break-words text-white/75">
            Happy Pharmacy is a health-products storefront for everyday care,
            wellness and family essentials.
          </p>
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide">Shop</h2>
          <ul className="mt-4 space-y-2.5">
            {footerShopLinks.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  className="text-sm text-white/75 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide">Customer Care</h2>
          <ul className="mt-4 space-y-2.5">
            {footerHelpLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/75 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide">Connect</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li className="flex min-w-0 items-center gap-2">
              <WhatsAppIcon className="size-4 shrink-0" />
              <span className="min-w-0 break-words">WhatsApp: {siteConfig.whatsappDisplay}</span>
            </li>
            <li>Facebook</li>
            <li>TikTok</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 break-words">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="min-w-0 break-words">
            Product information is for general reference and is not a substitute
            for professional medical advice.
          </p>
        </Container>
      </div>
    </footer>
  );
}
