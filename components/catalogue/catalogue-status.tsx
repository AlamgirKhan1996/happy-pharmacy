type CatalogueStatusProps = {
  title: string;
  children: React.ReactNode;
};

export function CatalogueStatus({ title, children }: CatalogueStatusProps) {
  return (
    <div
      className="mt-8 border border-line bg-surface px-4 py-5"
      role="status"
    >
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{children}</p>
    </div>
  );
}
