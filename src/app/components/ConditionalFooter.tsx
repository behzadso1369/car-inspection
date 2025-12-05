"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./mobile/Home/Footer";

// مسیرهایی که باید Footer نمایش داده شود
const ROUTES_WITH_FOOTER = [
  "/",
  "/about-us",
  "/services",
  "/faq",
  "/regulations",
  "/new-service",
  "/contact-us",
];

export default function ConditionalFooter() {
  const pathname = usePathname();

  // بررسی اینکه آیا مسیر فعلی باید footer را نمایش دهد
  // مستثنی کردن مسیرهای Profile و Blog (که layout های خاص خود را دارند)
  // و همچنین car-inspection-flow (که layout خاص خود را دارد)
  const shouldShowFooter =
    ROUTES_WITH_FOOTER.includes(pathname) &&
    !pathname.startsWith("/Profile") &&
    !pathname.startsWith("/blog") &&
    !pathname.startsWith("/car-inspection-flow");

  if (!shouldShowFooter) {
    return null;
  }

  return <Footer />;
}

