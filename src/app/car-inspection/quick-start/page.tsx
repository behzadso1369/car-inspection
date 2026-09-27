"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import {
  pickCarGroup,
  searchTermsFromCarName,
} from "@/app/car-inspection-most-popular/[slug]/InspectCtaButton";

/**
 * لینک مستقیم به رزرو کارشناسی یک خودروی مشخص (مثلاً از بات تلگرام/بله).
 * دقیقاً همان کاری که InspectCtaButton روی کلیک انجام می‌دهد را
 * اینجا خودکار روی لود صفحه اجرا می‌کند: پیدا کردن گروه خودرو، ساخت سفارش،
 * ذخیره در localStorage و هدایت به inspection-method.
 *
 * استفاده: /car-inspection/quick-start?car=<نام خودرو>
 */
function QuickStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const carName = (searchParams.get("car") || "").trim();

    if (!carName) {
      router.replace("/car-inspection");
      return;
    }

    let cancelled = false;

    async function run() {
      try {
        let groups: any[] = [];
        for (const candidate of searchTermsFromCarName(carName)) {
          const searchRes: any = await instance.get(
            `${ApiHelper.get("GetAllData")}?terms=${encodeURIComponent(candidate)}`,
          );
          groups = (searchRes?.Results || []).filter(
            (item: any) => item.IsCarBrand === 0,
          );
          if (groups.length) break;
        }

        if (cancelled) return;

        const group = pickCarGroup(groups, carName);

        if (!group?.Id) {
          setFailed(true);
          return;
        }

        localStorage.setItem("CarGroupId", String(group.Id));
        localStorage.setItem("CarGroupName", String(group.Name));

        try {
          const orderRes: any = await instance.post(ApiHelper.get("CreateOrder"), {
            carGroupId: group.Id,
          });
          if (orderRes?.orderId) {
            localStorage.setItem("OrderId", orderRes.orderId);
          }
        } catch (orderErr) {
          console.error("Error creating order:", orderErr);
        }

        if (cancelled) return;
        router.replace("/car-inspection/inspection-method");
      } catch (err) {
        console.error("Error starting inspection:", err);
        if (!cancelled) setFailed(true);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  if (failed) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F3F5F8] px-4 text-center font-IranSans"
        dir="rtl"
      >
        <p className="text-sm text-[#55565A]">
          این خودرو پیدا نشد. لطفاً از صفحه‌ی کارشناسی به‌صورت دستی انتخاب کن.
        </p>
        <button
          type="button"
          onClick={() => router.push("/car-inspection")}
          className="rounded-2xl bg-[#3456bb] px-6 py-2.5 text-sm font-bold text-white"
        >
          رفتن به صفحه‌ی کارشناسی
        </button>
      </main>
    );
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#F3F5F8] font-IranSans"
      dir="rtl"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3456bb]/20 border-t-[#3456bb]" />
        <p className="text-sm text-[#6B6C70]">در حال آماده‌سازی کارشناسی...</p>
      </div>
    </main>
  );
}

export default function QuickStartPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F3F5F8]" dir="rtl" />}>
      <QuickStartContent />
    </Suspense>
  );
}
