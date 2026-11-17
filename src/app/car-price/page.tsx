import { Suspense } from "react";
import CarPriceForm from "@/components/car-price/CarPriceForm";
import CarPricingSeoContent from "@/components/car-price/CarPricingSeoContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600;

const PAGE_URL = `${BASE_URL}/car-price`;

export default function CarPricePage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "تخمین و محاسبه قیمت خودرو کارکرده",
      inLanguage: "fa-IR",
      isPartOf: { "@type": "WebSite", url: BASE_URL, name: "کارماچک" },
      mainEntity: { "@id": `${PAGE_URL}#app` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": `${PAGE_URL}#app`,
      name: "ابزار تخمین قیمت خودرو کارکرده کارماچک",
      url: PAGE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "fa-IR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "IRR" },
      provider: { "@type": "Organization", name: "کارماچک", url: BASE_URL },
    },
    generateBreadcrumbSchema([
      { name: "کارماچک", path: "/" },
      { name: "تخمین قیمت خودرو", path: "/car-price" },
    ]),
  ];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#F3F5F8] font-IranSans pb-24 lg:pb-8" dir="rtl">
      <JsonLd data={schemas} />
      <div className="relative mx-auto max-w-7xl px-3 pt-3 md:px-6 md:pt-6">
        <header className="mb-4 lg:mb-6">
          <h1 className="text-base font-black leading-7 text-gradient lg:text-3xl lg:leading-[2.75rem]">
            تخمین و محاسبه قیمت خودرو کارکرده
          </h1>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#D6F0E0] bg-[#EFFAF3] px-3 py-1 text-xs font-bold leading-5 text-[#1F7A45] lg:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#22A55B]" aria-hidden="true" />
            رایگان و بدون ثبت‌نام — نتیجه برآورد است، نه قیمت قطعی معامله
          </p>
          <p className="mt-2 text-xs leading-5 text-[#6B6C70] lg:text-sm lg:leading-7">
            اول خودرو را جستجو کنید، بعد سال، کارکرد و وضعیت رنگ و شاسی را وارد کنید تا بازهٔ تخمین را ببینید.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="min-h-[40vh] rounded-3xl border border-[#E8ECF4] bg-white/80" />
          }
        >
          <CarPriceForm embedded />
        </Suspense>

        <div className="mt-4 space-y-4 md:mt-6 md:space-y-6">
          <CarPricingSeoContent variant="intro" />
          <CarPricingSeoContent variant="details" />
        </div>

      </div>
    </main>
  );
}
