import Link from "next/link";

import { BagIcon, HeartIcon, UserIcon } from "@/components/icons/icons";
import { cn } from "@/lib/cn";

type UtilityLinksProps = {
  className?: string;
  showLabels?: boolean;
  showAccount?: boolean;
  showWishlist?: boolean;
};

const controlClass =
  "inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-xl text-ink hover:bg-surface-warm hover:text-brand";

export function UtilityLinks({
  className,
  showLabels = true,
  showAccount = true,
  showWishlist = true,
}: UtilityLinksProps) {
  return (
    <div className={cn("flex shrink-0 items-center gap-0.5", className)}>
      {showAccount ? (
        <Link href="/account" className={controlClass}>
          <UserIcon />
          {showLabels ? (
            <span className="text-[0.65rem] font-semibold tracking-wide">
              Account
            </span>
          ) : (
            <span className="sr-only">Account</span>
          )}
        </Link>
      ) : null}
      {showWishlist ? (
        <Link href="/wishlist" className={controlClass}>
          <HeartIcon />
          {showLabels ? (
            <span className="text-[0.65rem] font-semibold tracking-wide">
              Wishlist
            </span>
          ) : (
            <span className="sr-only">Wishlist</span>
          )}
        </Link>
      ) : null}
      <Link href="/cart" className={cn(controlClass, "relative")}>
        <BagIcon />
        <span
          className="absolute right-1.5 top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[0.62rem] font-bold text-white"
          aria-hidden="true"
        >
          0
        </span>
        {showLabels ? (
          <span className="text-[0.65rem] font-semibold tracking-wide">Cart</span>
        ) : (
          <span className="sr-only">Cart, 0 items</span>
        )}
      </Link>
    </div>
  );
}
