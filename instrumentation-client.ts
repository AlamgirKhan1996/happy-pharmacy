import { initClientAnalytics, trackEvent } from "@/lib/analytics";

initClientAnalytics();

export function onRouterTransitionStart(url: string) {
  trackEvent({
    name: "page_view",
    payload: { url },
  });
}
