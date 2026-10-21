import Link from "next/link";

import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
};

export function Logo({
  className,
  compact = false,
  inverted = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex min-h-11 items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
        <svg
          viewBox="0 0 32 32"
          className="size-6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M16 6.5c2.8 3.1 7.4 8.2 7.4 12.4A7.4 7.4 0 0 1 8.6 18.9C8.6 14.7 13.2 9.6 16 6.5Z"
            fill="currentColor"
          />
          <path
            d="M16 12.2v8.4M13.2 16.4h5.6"
            stroke="#F7FAF8"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block text-lg font-bold tracking-tight sm:text-[1.35rem]",
            inverted ? "text-white" : "text-ink",
          )}
        >
          Happy
        </span>
        {compact ? null : (
          <span
            className={cn(
              "block text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
              inverted ? "text-brand-fresh" : "text-brand",
            )}
          >
            Pharmacy
          </span>
        )}
      </span>
    </Link>
  );
}
