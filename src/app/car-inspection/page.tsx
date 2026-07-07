import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowLeft02Icon } from "hugeicons-react";
import { BASE_URL, COMMON_KEYWORDS } from "@/lib/seo";
import { CARS } from "./carsData";

export const metadata: Metadata = {
  title: "کارشناسی خودروهای پرفروش ایران | معایب و مزایا | کارماچک",
  description:
    "معایب و مزایای ۱۰ خودروی پرفروش ایران شامل پژو ۲۰۷، پارس، سمند، دنا، تارا، شاهین، کوییک، ساینا، پژو ۲۰۶ و رانا. راهنمای خرید و رزرو کارشناسی تخصصی در محل.",
  keywords: [
    "کارشناسی خودرو",
    "معایب و مزایای خودرو",
    "راهنمای خرید خودرو",
    "کارشناسی خودروهای پرفروش",
    ...COMMON_KEYWORDS,
  ],
  alternates: { canonical: `${BASE_URL}/car-inspection` },
  openGraph: {
    title: "کارشناسی خودروهای پرفروش ایران | معایب و مزایا",
    description: "معایب و مزایای ۱۰ خودروی پرفروش ایران و رزرو کارشناسی تخصصی در محل با کارماچک.",
    url: `${BASE_URL}/car-inspection`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
  },
};

export default function CarInspectionListPage() {
  return (
    <div className="px-4 font-IranSans py-4 max-w-6xl mx-auto" dir="rtl">
      <Breadcrumb
        items={[{ label: "خانه", href: "/" }, { label: "کارشناسی خودروها" }]}
        className="mb-4"
      />

      <h1 className="text-2xl md:text-3xl font-bold text-[#101117] mb-2">
        کارشناسی خودروهای پرفروش ایران
      </h1>
      <p className="text-[#55565A] leading-8 text-sm md:text-base mb-8 max-w-3xl">
        پیش از خرید خودرو، معایب و مزایای آن را بشناسید. در این صفحه راهنمای ۱۰ خودروی پرفروش
        بازار ایران را همراه با نکات مهم کارشناسی هر خودرو آماده کرده‌ایم. روی هر خودرو کلیک کنید
        تا جزئیات کامل را ببینید و کارشناسی تخصصی در محل را رزرو کنید.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARS.map((car) => (
          <Link
            key={car.slug}
            href={`/car-inspection/${car.slug}`}
            className="group rounded-2xl border border-[#EDEDED] overflow-hidden bg-white hover:shadow-lg hover:border-[#3456bb]/40 transition-all"
          >
            <div className="relative w-full aspect-[16/10] bg-[#F4F5F7]">
              <Image
                src={car.image}
                alt={`عکس ${car.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-[#3456bb] font-medium">{car.brand}</span>
              <h2 className="text-lg font-bold text-[#101117] mt-1">کارشناسی {car.name}</h2>
              <p className="text-sm text-[#55565A] leading-6 mt-1 line-clamp-2">{car.tagline}</p>
              <span className="inline-flex items-center gap-1 text-sm text-[#3456bb] font-medium mt-3 group-hover:gap-2 transition-all">
                مشاهده معایب و مزایا
                <ArrowLeft02Icon className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
