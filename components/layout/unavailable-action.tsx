import { cn } from "@/lib/cn";

type UnavailableActionProps = {
  children: React.ReactNode;
  className?: string;
};

export function UnavailableAction({
  children,
  className,
}: UnavailableActionProps) {
  return (
    <span
      className={cn(
        "inline-flex cursor-not-allowed items-center gap-2 text-sm font-semibold opacity-70",
        className,
      )}
      aria-disabled="true"
    >
      {children}
    </span>
  );
}
