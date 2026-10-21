import { Container } from "@/components/ui/container";
import { STORE_BENEFITS } from "@/lib/storefront";

export function StoreBenefits() {
  return (
    <section className="py-6">
      <Container>
        <ul className="grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4">
          {STORE_BENEFITS.map((item) => (
            <li key={item.title} className="flex min-w-0 gap-3">
              <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-surface-warm text-brand">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m8.8 12.2 2.1 2.1 4.3-4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-6 break-words text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
