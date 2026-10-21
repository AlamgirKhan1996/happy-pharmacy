import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-16 sm:py-20">
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        This page is not available
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        The page you requested could not be found. Continue browsing the
        storefront or try search.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center font-semibold text-brand hover:text-ink"
      >
        Back to Happy Pharmacy
      </Link>
    </Container>
  );
}
