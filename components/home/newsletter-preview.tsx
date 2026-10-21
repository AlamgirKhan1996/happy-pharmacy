import { Container } from "@/components/ui/container";

export function NewsletterPreview() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="rounded-2xl bg-surface-warm px-5 py-8 sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Stay updated with Happy Pharmacy
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
            Receive store-launch and catalogue updates.
          </p>
          <form className="mt-6 flex max-w-xl min-w-0 flex-col gap-3 sm:flex-row" aria-label="Store updates">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              disabled
              placeholder="Email address"
              className="min-h-12 w-full min-w-0 flex-1 rounded-full border border-line bg-surface px-4 text-sm text-muted sm:w-auto"
            />
            <button
              type="button"
              disabled
              className="min-h-12 w-full shrink-0 rounded-full bg-brand px-5 text-sm font-semibold text-white opacity-80 sm:w-auto"
            >
              Coming soon
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
