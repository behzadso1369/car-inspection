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
  "/car-price",
  "/car-inspection-flow/select-car-group",
  "/payment/success",
  "/payment/failed",
  "/blog",
];

interface ConditionalFooterProps {
  data?: any; // Data از server-side (اختیاری)
}

export default function ConditionalFooter({ data }: ConditionalFooterProps) {
  const pathname = usePathname();

  // بررسی اینکه آیا مسیر فعلی باید footer را نمایش دهد
  // مستثنی کردن مسیرهای Profile و Blog (که layout های خاص خود را دارند)
  // و همچنین car-inspection-flow (که layout خاص خود را دارد)
  // صفحات راهنمای خودرو (car-inspection و زیرمجموعه‌ها) - به جز car-inspection-flow
  const isCarInspection =
    pathname === "/car-inspection" || pathname.startsWith("/car-inspection/");
  const isCarInspectionTehran =
    pathname === "/car-inspection-tehran" ||
    pathname.startsWith("/car-inspection-tehran/");

  const shouldShowFooter =
    (ROUTES_WITH_FOOTER.includes(pathname) ||
      isCarInspection ||
      isCarInspectionTehran) &&
    !pathname.startsWith("/Profile");

  if (!shouldShowFooter) {
    return null;
  }

  // پاس دادن MasterSiteData به Footer چون Footer انتظار دارد که Address, PhoneNumber, WorkingHours مستقیماً در data باشند
  return <Footer data={data?.MasterSiteData || data} />;
}
