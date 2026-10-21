import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { HERO_SLIDES } from "@/lib/storefront";

export function PromotionalMosaic() {
  const [baby, skin, wellness] = HERO_SLIDES;

  if (!baby || !skin || !wellness) {
    return null;
  }

  return (
    <section className="py-4 sm:py-6">
      <Container>
        <div className="grid min-w-0 gap-4 lg:grid-cols-2">
          <Link
            href={baby.href}
            className="relative block min-w-0 overflow-hidden rounded-2xl shadow-[0_8px_24px_rgb(6_77_46_/_0.08)]"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={baby.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand">
              {baby.cta}
            </span>
          </Link>
          <div className="grid min-w-0 gap-4">
            {[skin, wellness].map((tile) => (
              <Link
                key={tile.id}
                href={tile.href}
                className="relative block min-w-0 overflow-hidden rounded-2xl shadow-[0_8px_24px_rgb(6_77_46_/_0.08)]"
              >
                <div className="relative aspect-[16/7]">
                  <Image
                    src={tile.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-3 left-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand">
                  {tile.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
