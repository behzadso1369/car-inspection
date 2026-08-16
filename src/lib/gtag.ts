export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-NFNHGPBKP7";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export function pageview(url: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view", page_path: url });
  if (GA_MEASUREMENT_ID && typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
  }
}

export function gtagEvent(
  action: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: action, ...(params ?? {}) });
  if (GA_MEASUREMENT_ID && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}
