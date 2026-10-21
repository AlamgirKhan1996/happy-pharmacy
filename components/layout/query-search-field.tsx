"use client";

import { useSearchParams } from "next/navigation";

import { SearchField } from "@/components/layout/search-field";

type QuerySearchFieldProps = {
  id?: string;
  className?: string;
};

export function QuerySearchField({ id, className }: QuerySearchFieldProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  return <SearchField id={id} className={className} defaultValue={query} />;
}
