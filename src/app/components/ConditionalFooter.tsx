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
];

interface ConditionalFooterProps {
  data?: any; // Data از server-side (اختیاری)
}

export default function ConditionalFooter({ data: initialData }: ConditionalFooterProps) {
  const pathname = usePathname();
  const [data, setData] = useState<any>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);

  // بررسی اینکه آیا مسیر فعلی باید footer را نمایش دهد
  // مستثنی کردن مسیرهای Profile و Blog (که layout های خاص خود را دارند)
  // و همچنین car-inspection-flow (که layout خاص خود را دارد)
  const shouldShowFooter =
    ROUTES_WITH_FOOTER.includes(pathname) &&
    !pathname.startsWith("/Profile") &&
    !pathname.startsWith("/blog") &&
    !pathname.startsWith("/car-inspection-flow");

  useEffect(() => {
    if (shouldShowFooter) {
      // اگه initialData موجود بود، از اون استفاده کن
      if (initialData) {
        setData(initialData);
        setIsLoading(false);
        return;
      }

      // در غیر این صورت، از API fetch کن
      setIsLoading(true);
      instance
        .get(ApiHelper.get("GetMasterPageData"))
        .then((res: any) => {
          setData(res);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.error("Error fetching footer data:", err);
          setIsLoading(false);
        });
    } else {
      // پاک کردن داده وقتی از مسیر خارج می‌شویم
      setData(null);
      setIsLoading(false);
    }
  }, [shouldShowFooter, pathname, initialData]);

  if (!shouldShowFooter) {
    return null;
  }

  // اگه در حال loading هست و data نداریم، null برگردون
  if (isLoading && !data) {
    return null;
  }

  // اگه data نداریم (حتی بعد از loading)، null برگردون
  if (!data) {
    return null;
  }

  // پاس دادن MasterSiteData به Footer چون Footer انتظار دارد که Address, PhoneNumber, WorkingHours مستقیماً در data باشند
  return <Footer data={data?.MasterSiteData || data} />;
}





