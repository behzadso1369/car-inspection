"use client";

import dynamic from "next/dynamic";

const ShowAddressClient = dynamic(() => import("./ClientWrapper"), {
  ssr: false,
  loading: () => (
    <div className="py-16 text-center font-IranSans text-[#55565A]">در حال بارگذاری...</div>
  ),
});

export default function ShowAddressPage() {
  return <ShowAddressClient />;
}
