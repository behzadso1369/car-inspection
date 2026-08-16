"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const HEADER_ROUTES = new Set([
  "/",
  "/about-us",
  "/services",
  "/faq",
  "/regulations",
  "/new-service",
  "/contact-us",
  "/car-price",
  "/car-inspection",
  "/payment/success",
  "/payment/failed",
]);

const FOOTER_ROUTES = new Set([...HEADER_ROUTES, "/blog"]);

function isPublicChromePath(pathname: string, routes: Set<string>) {
  const isMostPopular =
    pathname === "/car-inspection-most-popular" ||
    pathname.startsWith("/car-inspection-most-popular/");
  const isTehran =
    pathname === "/car-inspection-tehran" ||
    pathname.startsWith("/car-inspection-tehran/");
  const isFlowStep = pathname.startsWith("/car-inspection/") && !isMostPopular;
  return (
    (routes.has(pathname) || isMostPopular || isTehran) &&
    !pathname.startsWith("/Profile") &&
    !isFlowStep
  );
}

type SiteChromeProps = {
  header: ReactNode;
  banner: ReactNode;
  mobileBar: ReactNode;
  mobileBarFixed: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function SiteChrome({
  header,
  banner,
  mobileBar,
  mobileBarFixed,
  footer,
  children,
}: SiteChromeProps) {
  const pathname = usePathname();
  const showHeader = isPublicChromePath(pathname, HEADER_ROUTES);
  const showFooter = isPublicChromePath(pathname, FOOTER_ROUTES);
  const isCarPrice = pathname === "/car-price";

  return (
    <>
      {showHeader ? (
        <>
          {banner}
          <div className="lg:hidden">{isCarPrice ? mobileBarFixed : mobileBar}</div>
          <div className="hidden lg:block px-20 mb-6 bg-transparent sticky top-11 z-10">
            {header}
          </div>
        </>
      ) : null}
      {children}
      {showFooter ? footer : null}
    </>
  );
}
