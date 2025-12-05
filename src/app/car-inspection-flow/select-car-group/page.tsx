// SSR - Server Side Rendering
// این صفحه با traffic بالا حالا SSR است برای:
// 1. SEO بهتر
// 2. Initial Load سریع‌تر
// 3. Google indexing
// Client interactions در ClientWrapper نگهداری می‌شوند

import { serverApiHelper } from "@/helper/server-fetcher";
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

// ISR برای این صفحه
export const revalidate = 600; // 10 minutes

// SEO Metadata
export const metadata: Metadata = {
  title: "انتخاب خودرو | فرآیند کارشناسی خودرو | کارچک",
  description: "انتخاب نوع خودرو برای شروع فرآیند کارشناسی تخصصی. انواع خودروهای سواری، SUV و... را با کارشناسان مجرب کارچک بررسی کنید.",
  keywords: [
    "انتخاب خودرو برای کارشناسی",
    "کارشناسی خودرو",
    "رزرو کارشناسی",
    "کارچک",
    "انتخاب مدل خودرو"
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/select-car-group`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Server-side data fetching
async function getMasterPageData() {
  return await serverApiHelper.get("GetMasterPageData", 600);
}

export default async function CarInspectionFlow() {
  // Server-side: Fetch data قبل از render
  const initialData = await getMasterPageData();

  // Pass data به Client Component
  return <ClientWrapper initialData={initialData} />;
}