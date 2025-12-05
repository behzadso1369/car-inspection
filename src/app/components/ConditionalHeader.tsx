"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Banner from "./mobile/Home/Banner";
import CallAction from "./mobile/Home/CallAction";
import { Header } from "./mobile/Home/Header";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";

// مسیرهایی که باید Header, Banner, CallAction نمایش داده شوند
const ROUTES_WITH_HEADER = [
  "/",
  "/about-us",
  "/services",
  "/faq",
  "/regulations",
  "/new-service",
  "/contact-us"
];

interface ConditionalHeaderProps {
  initialData?: any; // Data از server-side
}

export default function ConditionalHeader({ initialData }: ConditionalHeaderProps) {
  const pathname = usePathname();
  const [data, setData] = useState<any>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);

  // بررسی اینکه آیا مسیر فعلی باید header را نمایش دهد
  const shouldShowHeader = ROUTES_WITH_HEADER.includes(pathname) && !pathname.startsWith("/Profile");

  useEffect(() => {
    if (shouldShowHeader) {
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
          console.error("Error fetching data:", err);
          setIsLoading(false);
        });
    } else {
      // پاک کردن داده وقتی از مسیر خارج می‌شویم
      setData(null);
      setIsLoading(false);
    }
  }, [shouldShowHeader, pathname, initialData]);

  // اگه نباید header رو نشون بده، null برگردون
  if (!shouldShowHeader) {
    return null;
  }

  // اگه در حال loading هست و data نداریم، یک placeholder نشون بده (یا null)
  if (isLoading && !data) {
    return null; // یا می‌تونی یک loading skeleton نشون بدی
  }

  // اگه data نداریم (حتی بعد از loading)، null برگردون
  if (!data) {
    return null;
  }

  return (
    <>
      <Banner data={data?.MasterSiteData?.NavbarPhoneNumber} />
      <div className="block lg:hidden">
        <CallAction data={data} />
      </div>
      <div className="hidden lg:block px-20 mb-6 bg-transparent sticky top-11 z-10">
        <Header data={data} />
      </div>
    </>
  );
}

