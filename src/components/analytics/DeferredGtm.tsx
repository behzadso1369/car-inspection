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
 * Load GTM after first interaction or a short delay, but never on the click
 * itself — injecting on pointerdown would make that first tap a dead/slow INP.
 * Scroll is intentionally omitted so Lighthouse lab scrolls do not boot GTM.
 */
export function DeferredGtm({ id }: { id: string }) {
  useEffect(() => {
    let idleId: number | undefined;
    let microTimer: number | undefined;

    const boot = () => {
      const run = () => injectGtm(id);
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(run, { timeout: 2000 });
      } else {
        microTimer = window.setTimeout(run, 1);
      }
    };

    const opts: AddEventListenerOptions = { once: true, passive: true };
    const events = ["pointerdown", "keydown"] as const;
    events.forEach((event) => window.addEventListener(event, boot, opts));
    const timer = window.setTimeout(boot, 4000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, boot));
      window.clearTimeout(timer);
      if (microTimer !== undefined) window.clearTimeout(microTimer);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
    };
  }, [id]);

  return null;
}
