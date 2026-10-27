"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { startInspectionForCar } from "@/lib/car-inspection/carGroupMatch";

/**
 * لینک مستقیم به رزرو کارشناسی یک خودروی مشخص.
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
        const result = await startInspectionForCar({ carName });
        if (cancelled) return;

        if (!result.ok) {
          setFailed(true);
          return;
        }

        router.replace("/car-inspection/inspection-method");
      } catch (err) {
        console.error("Error starting inspection:", err);
        if (!cancelled) setFailed(true);
      }
    }

    void run();

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
