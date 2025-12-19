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
  "/contact-us",
  "/car-inspection-flow/select-car-group",
  "/payment/success",
  "/payment/failed",
];

interface ConditionalHeaderProps {
  data?: any; // Data از server-side
}

export default function ConditionalHeader({ data }: ConditionalHeaderProps) {
  const pathname = usePathname();

  // بررسی اینکه آیا مسیر فعلی باید header را نمایش دهد
  const shouldShowHeader = ROUTES_WITH_HEADER.includes(pathname) && !pathname.startsWith("/Profile");


  // اگه نباید header رو نشون بده، null برگردون
  if (!shouldShowHeader) {
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

