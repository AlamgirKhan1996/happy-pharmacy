import Form from "next/form";

import { SearchIcon } from "@/components/icons/icons";
import { cn } from "@/lib/cn";

type SearchFieldProps = {
  id?: string;
  className?: string;
  autoFocus?: boolean;
  defaultValue?: string;
};

export function SearchField({
  id = "product-search",
  className,
  autoFocus = false,
  defaultValue = "",
}: SearchFieldProps) {
  return (
    <Form action="/search" className={cn("w-full", className)} role="search">
      <label htmlFor={id} className="sr-only">
        Search medicines, baby care, skincare and wellness
      </label>
      <div className="flex min-h-12 items-stretch overflow-hidden rounded-full border border-line bg-surface shadow-sm">
        <input
          key={defaultValue}
          id={id}
          type="search"
          name="q"
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder="Search medicines, baby care, skincare and wellness"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          <SearchIcon className="size-4" />
          <span className="hidden sm:inline">Search</span>
          <span className="sr-only sm:hidden">Search</span>
        </button>
      </div>
    </Form>
  );
}
