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
  "/car-inspection",
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
  // صفحات راهنمای پرفروش + تهران؛ مراحل فلو کارشناسی فوتر سراسری ندارند
  const isCarInspectionMostPopular =
    pathname === "/car-inspection-most-popular" ||
    pathname.startsWith("/car-inspection-most-popular/");
  const isCarInspectionTehran =
    pathname === "/car-inspection-tehran" ||
    pathname.startsWith("/car-inspection-tehran/");
  const isCarInspectionFlowStep =
    pathname.startsWith("/car-inspection/") && !isCarInspectionMostPopular;

  const shouldShowFooter =
    (ROUTES_WITH_FOOTER.includes(pathname) ||
      isCarInspectionMostPopular ||
      isCarInspectionTehran) &&
    !pathname.startsWith("/Profile") &&
    !isCarInspectionFlowStep;

  if (!shouldShowFooter) {
    return null;
  }

  // پاس دادن MasterSiteData به Footer چون Footer انتظار دارد که Address, PhoneNumber, WorkingHours مستقیماً در data باشند
  return <Footer data={data?.MasterSiteData || data} />;
}
