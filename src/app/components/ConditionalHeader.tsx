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

export default function ConditionalHeader() {
  const pathname = usePathname();
  const [data, setData] = useState<any>(null);

  // بررسی اینکه آیا مسیر فعلی باید header را نمایش دهد
  const shouldShowHeader = ROUTES_WITH_HEADER.includes(pathname) && !pathname.startsWith("/Profile");

  useEffect(() => {
    if (shouldShowHeader) {
      // دریافت داده فقط در صورت نیاز
      instance
        .get(ApiHelper.get("GetMasterPageData"))
        .then((res: any) => {
          setData(res);
        })
        .catch((err: any) => {
          console.error("Error fetching data:", err);
        });
    } else {
      // پاک کردن داده وقتی از مسیر خارج می‌شویم
      setData(null);
    }
  }, [shouldShowHeader, pathname]);

  if (!shouldShowHeader || !data) {
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

