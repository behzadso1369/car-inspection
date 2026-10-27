import { Suspense } from "react";
import CarNewPriceList from "@/components/car-new-price/CarNewPriceList";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/seo";
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
      name: "قیمت روز خودرو",
      inLanguage: "fa-IR",
      dateModified: `${todayIso}T00:00:00+03:30`,
      isPartOf: { "@type": "WebSite", url: BASE_URL, name: "کارماچک" },
    },
    generateBreadcrumbSchema([
      { name: "کارماچک", path: "/" },
      { name: "قیمت روز خودرو", path: "/car-new-price" },
    ]),
  ];

  return (
    <main
      className="relative min-h-screen bg-[#F3F5F8] pb-24 font-IranSans lg:pb-8"
      dir="rtl"
    >
      <JsonLd data={schemas} />
      <div className="relative mx-auto max-w-5xl px-3 pt-3 md:px-6 md:pt-6">
        <header className="mb-4 md:mb-6">
          <nav className="mb-2 text-xs text-[#6B6C70]">
            <a href="/" className="hover:text-[#3456bb]">
              کارماچک
            </a>
            <span className="mx-1.5">/</span>
            <span className="text-[#101117]">قیمت روز خودرو</span>
          </nav>
          <h1 className="text-xl font-black leading-8 text-gradient md:text-3xl md:leading-[2.75rem]">
            قیمت روز خودرو
          </h1>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#D6F0E0] bg-[#EFFAF3] px-3 py-1 text-xs font-bold text-[#1F7A45] md:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#22A55B]" aria-hidden="true" />
            آخرین به‌روزرسانی:{" "}
            <time dateTime={todayIso}>{todayFa}</time>
          </p>
          <p className="mt-3 max-w-3xl text-xs leading-6 text-[#6B6C70] md:text-sm md:leading-7">
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
          <CarNewPriceList />
        </Suspense>

        <section className="mt-10 rounded-2xl border border-[#E8ECF4] bg-white p-4 text-xs leading-7 text-[#55565A] md:rounded-3xl md:p-6 md:text-sm">
          <h2 className="mb-2 text-sm font-black text-[#101117] md:text-base">
            دربارهٔ قیمت‌های این صفحه
          </h2>
          <p>
            اعداد نمایش‌داده‌شده برای تصمیم‌گیری اولیه در نظر گرفته شده‌اند.
            قبل از خرید،
            کارشناسی فنی و بدنه توصیه می‌شود.
          </p>
        </section>
      </div>
    </main>
  );
}
