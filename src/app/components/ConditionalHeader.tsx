"use client";

import { usePathname } from "next/navigation";
import Banner from "./mobile/Home/Banner";
import CallAction from "./mobile/Home/CallAction";
import { Header } from "./mobile/Home/Header";

// مسیرهایی که باید Header, Banner, CallAction نمایش داده شوند
const ROUTES_WITH_HEADER = [
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
];

interface ConditionalHeaderProps {
  data?: any; // Data از server-side
}

export default function ConditionalHeader({ data }: ConditionalHeaderProps) {
  const pathname = usePathname();

  // صفحات راهنمای خودروهای پرفروش — نه مراحل فلو کارشناسی
  const isCarInspectionMostPopular =
    pathname === "/car-inspection-most-popular" ||
    pathname.startsWith("/car-inspection-most-popular/");
  const isCarInspectionTehran =
    pathname === "/car-inspection-tehran" ||
    pathname.startsWith("/car-inspection-tehran/");
  // مراحل فلو (مثل /car-inspection/inspection-method) هدر سراسری ندارند
  const isCarInspectionFlowStep =
    pathname.startsWith("/car-inspection/") && !isCarInspectionMostPopular;

  // بررسی اینکه آیا مسیر فعلی باید header را نمایش دهد
  const shouldShowHeader =
    (ROUTES_WITH_HEADER.includes(pathname) ||
      isCarInspectionMostPopular ||
      isCarInspectionTehran) &&
    !pathname.startsWith("/Profile") &&
    !isCarInspectionFlowStep;

  // اگه نباید header رو نشون بده، null برگردون
  if (!shouldShowHeader) {
    return null;
  }

  const isCarPrice = pathname === "/car-price";

  return (
    <>
      <Banner data={data?.MasterSiteData?.NavbarPhoneNumber} />
      <div className="block lg:hidden">
        <CallAction data={data} fixed={isCarPrice} />
      </div>
      <div className="hidden lg:block px-20 mb-6 bg-transparent sticky top-11 z-10">
        <Header data={data} />
      </div>
    </>
  );
}
