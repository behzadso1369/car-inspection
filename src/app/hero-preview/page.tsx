import { Suspense } from "react";
import { pageMetadata } from "@/lib/page-metadata";
import { getPopularInspectionBrands } from "@/lib/get-popular-inspection-brands";
import HeroPreviewClient from "../components/mobile/Home/HeroPreviewClient";

export const revalidate = 600;

export const metadata = pageMetadata("/hero-preview", {
  title: "پیش‌نمایش هیرو | کارماچک",
  description: "مقایسه چهار طرح فولد اول صفحه اصلی کارماچک",
  robots: { index: false, follow: false },
});

export default async function HeroPreviewPage() {
  const popularBrands = await getPopularInspectionBrands();

  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] bg-[#F3F5FA]" dir="rtl" />
      }
    >
      <HeroPreviewClient
        carBrands={popularBrands.cars}
        motorcycleBrands={popularBrands.motorcycles}
      />
    </Suspense>
  );
}
