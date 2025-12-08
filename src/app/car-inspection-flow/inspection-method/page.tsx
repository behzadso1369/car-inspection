// SSR - این صفحه حالا Server Component است
// CarGroupId از URL query می‌خوانیم بجای localStorage

import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";
import { serverApiHelper } from "@/helper/server-fetcher";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "انتخاب روش کارشناسی | فرآیند کارشناسی خودرو | کارماچک",
  description: "انتخاب روش کارشناسی خودرو: کارشناسی در محل یا مرکز. همراه با قیمت و جزئیات هر روش.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/inspection-method`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function InspectionMethod() {
  // Note: در این مرحله، data از localStorage کاربر می‌آید
  // پس نیازی به server fetch نداریم
  // فقط structure SSR را حفظ می‌کنیم
  
  const initialData = { CarInspectionPage: [] };

  return <ClientWrapper initialData={initialData} />;
}
