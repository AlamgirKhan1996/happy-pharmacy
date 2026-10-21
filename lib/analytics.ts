export type AnalyticsProvider = "ga4" | "meta" | "tiktok";

export type AnalyticsConfig = {
  ga4Id: string | null;
  metaPixelId: string | null;
  tiktokPixelId: string | null;
};

export type AnalyticsEventName =
  | "page_view"
  | "view_item"
  | "add_to_cart"
  | "begin_checkout"
  | "whatsapp_click";

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  payload?: Record<string, string | number | boolean>;
};

export function getAnalyticsConfig(): AnalyticsConfig {
  return {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? null,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? null,
    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? null,
  };
}

export function hasConfiguredProvider(config: AnalyticsConfig): boolean {
  return Boolean(config.ga4Id || config.metaPixelId || config.tiktokPixelId);
}

export function initClientAnalytics(): AnalyticsConfig {
  const config = getAnalyticsConfig();

  if (typeof window !== "undefined") {
    window.__HP_ANALYTICS__ = config;
  }

  return config;
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  const config = window.__HP_ANALYTICS__ ?? getAnalyticsConfig();
  if (!hasConfiguredProvider(config)) return;

  window.dispatchEvent(
    new CustomEvent("hp:analytics", {
      detail: { event, config },
    }),
  );
}

declare global {
  interface Window {
    __HP_ANALYTICS__?: AnalyticsConfig;
  }
}
