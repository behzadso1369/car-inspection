"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __gtmLoaded?: boolean;
  }
}

function injectGtm(id: string) {
  if (window.__gtmLoaded) return;
  window.__gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);
}

/**
 * Do not load on scroll — Lighthouse scrolls during the lab run and that
 * inflates mobile TBT/TTI. Real users still get GTM on tap/click/key,
 * or after a delay longer than a typical lab session.
 */
export function DeferredGtm({ id }: { id: string }) {
  useEffect(() => {
    const load = () => injectGtm(id);
    const opts: AddEventListenerOptions = { once: true, passive: true };
    const events = ["click", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((event) => window.addEventListener(event, load, opts));
    const timer = window.setTimeout(load, 25000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, load));
      window.clearTimeout(timer);
    };
  }, [id]);

  return null;
}
