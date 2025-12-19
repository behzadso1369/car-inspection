"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "./mobile/Home/Footer";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";

// مسیرهایی که باید Footer نمایش داده شود
const ROUTES_WITH_FOOTER = [
  "/",
  "/about-us",
  "/services",
  "/faq",
  "/regulations",
  "/new-service",
  "/contact-us",
  "/car-inspection-flow/select-car-group",
  "/payment/success",
  "/payment/failed",
];

interface ConditionalFooterProps {
  data?: any; // Data از server-side (اختیاری)
}

export default function ConditionalFooter({ data }: ConditionalFooterProps) {
  const pathname = usePathname();

  // بررسی اینکه آیا مسیر فعلی باید footer را نمایش دهد
  // مستثنی کردن مسیرهای Profile و Blog (که layout های خاص خود را دارند)
  // و همچنین car-inspection-flow (که layout خاص خود را دارد)
  const shouldShowFooter =
    ROUTES_WITH_FOOTER.includes(pathname) &&
    !pathname.startsWith("/Profile") &&
    !pathname.startsWith("/blog") 


  if (!shouldShowFooter) {
    return null;
  }

  // پاس دادن MasterSiteData به Footer چون Footer انتظار دارد که Address, PhoneNumber, WorkingHours مستقیماً در data باشند
  return <Footer data={data?.MasterSiteData || data} />;
}






