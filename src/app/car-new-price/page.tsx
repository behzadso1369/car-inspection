import Link from "next/link";
import { Suspense } from "react";
import CarNewPriceList from "@/components/car-new-price/CarNewPriceList";
import CarNewPriceSeoContent, {
  carNewPriceFaqs,
} from "@/components/car-new-price/CarNewPriceSeoContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { jalaliFullDate, tehranIsoDate } from "@/lib/jalali-date";

const PAGE_URL = `${BASE_URL}/car-new-price`;

export default function CarNewPricePage() {
  const todayFa = jalaliFullDate();
  const todayIso = tehranIsoDate();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "قیمت روز خودرو صفر",
      inLanguage: "fa-IR",
      dateModified: `${todayIso}T00:00:00+03:30`,
      isPartOf: { "@type": "WebSite", url: BASE_URL, name: "کارماچک" },
    },
    generateBreadcrumbSchema([
      { name: "کارماچک", path: "/" },
      { name: "قیمت روز خودرو صفر", path: "/car-new-price" },
    ]),
    generateFAQSchema([...carNewPriceFaqs]),
  ];

  return (
    <main
      className="relative min-h-screen bg-[#F3F5F8] pb-24 font-IranSans lg:pb-8"
      dir="rtl"
    >
      <JsonLd data={schemas} />
      <div className="relative mx-auto max-w-5xl px-3 pt-3 md:px-6 md:pt-6">
        <header className="mb-3 max-md:mb-2">
          <nav className="mb-2 text-xs text-[#6B6C70]">
            <a href="/" className="hover:text-[#3456bb]">
              کارماچک
            </a>
            <span className="mx-1.5">/</span>
            <span className="text-[#101117]">قیمت روز خودرو صفر</span>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-black leading-8 text-gradient md:text-3xl md:leading-[2.75rem]">
              قیمت روز خودرو صفر
            </h1>
            <Link
              href="/car-price"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-[#3456bb]/35 bg-white px-4 py-2.5 text-xs font-bold text-[#3456bb] shadow-sm transition-colors hover:border-[#3456bb] hover:bg-[#eef2fd] md:px-5 md:py-3 md:text-sm"
            >
              قیمت خودرو کارکرده
            </Link>
          </div>
          <p className="mt-2 hidden max-w-3xl text-xs leading-6 text-[#6B6C70] sm:block md:mt-3 md:text-sm md:leading-7">
            قیمت خودروهای صفر و بازار را بر اساس داده‌های به‌روز ببینید. برای
            هر مدل می‌توانید با یک کلیک همان خودرو را در فرآیند{" "}
            <a href="/car-inspection" className="font-semibold text-[#3456bb]">
              رزرو کارشناسی
            </a>{" "}
            انتخاب کنید.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="min-h-[50vh] rounded-3xl border border-[#E8ECF4] bg-white/80" />
          }
        >
          <CarNewPriceList
            lastUpdateFa={todayFa}
            lastUpdateIso={todayIso}
          />
        </Suspense>

        <CarNewPriceSeoContent />
      </div>
    </main>
  );
}
