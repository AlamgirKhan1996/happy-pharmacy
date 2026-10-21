export function isInternalPreviewAllowed(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return env.NODE_ENV !== "production";
}
