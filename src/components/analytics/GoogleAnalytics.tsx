"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * SPA pageviews via dataLayer only.
 * GTM (lazyOnload in root layout) loads gtag / Clarity after the page is interactive,
 * so we do not inject a second copy of gtag.js on the critical path.
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <Suspense fallback={null}>
      <RouteChangeTracker />
    </Suspense>
  );
}
