import { Suspense } from "react";
import CarPriceForm from "@/components/car-price/CarPriceForm";
import CarPricingSeoContent from "@/components/car-price/CarPricingSeoContent";

export default function CarPricePage() {
  return (
    <main className="relative min-h-screen bg-[#F3F5F8] font-IranSans pb-24 lg:pb-8" dir="rtl">
      <div className="relative mx-auto max-w-7xl px-3 pt-3 md:px-6 md:pt-6">
        <header className="mb-4 lg:mb-6">
          <h1 className="text-base font-black leading-7 text-gradient lg:text-3xl lg:leading-[2.75rem]">
            محاسبه قیمت خودرو کارکرده و قیمت‌گذاری آنلاین
          </h1>
          <p className="mt-1 text-xs leading-5 text-[#6B6C70] lg:mt-2 lg:text-sm lg:leading-7">
            اول خودرو را جستجو کن، بعد مشخصات را مرحله‌به‌مرحله وارد کن.
          </p>
          <p className="mt-2 text-xs leading-6 text-[#6B6C70] lg:text-sm">
            برای استفاده از محاسبه‌گر تعاملی، جاوااسکریپت مرورگر باید فعال باشد.
            متن راهنما و سوالات متداول در ادامه همین صفحه بدون نیاز به محاسبه
            قابل مطالعه است.
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
