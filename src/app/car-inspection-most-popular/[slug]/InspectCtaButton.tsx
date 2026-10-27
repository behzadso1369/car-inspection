"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  pickCarGroup,
  searchTermsFromCarName,
  startInspectionForCar,
} from "@/lib/car-inspection/carGroupMatch";

export { pickCarGroup, searchTermsFromCarName };

interface InspectCtaButtonProps {
  /** نام نمایشی خودرو، مثل «پژو ۲۰۷» */
  carName: string;
  /**
   * عبارت جستجو برای پیدا کردن گروه خودرو در بک‌اند (مثل «پژو 207»).
   * اگر خالی باشد، از خود carName استفاده می‌شود.
   */
  searchTerm?: string;
  carGroupId?: number;
  carGroupName?: string;
  className?: string;
  label?: string;
  /** متن کوتاه‌تر موبایل؛ اگر نباشد همان label */
  labelMobile?: string;
  showChevron?: boolean;
  variant?: "default" | "compact";
}

/**
 * دکمه‌ی «شروع کارشناسی همین خودرو».
 * گروه خودرو را پیدا می‌کند، localStorage را پر می‌کند و به inspection-method می‌برد.
 */
export default function InspectCtaButton({
  carName,
  searchTerm,
  carGroupId,
  carGroupName,
  className = "",
  label,
  labelMobile,
  showChevron = false,
  variant = "default",
}: InspectCtaButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const startInspection = async () => {
    const term = (searchTerm || carName).trim();
    if (!carGroupId && !term) {
      router.push("/car-inspection");
      return;
    }

    setLoading(true);
    try {
      const result = await startInspectionForCar({
        carName,
        searchTerm: term,
        carGroupId,
        carGroupName,
      });

      if (!result.ok) {
        router.push("/car-inspection");
        return;
      }

      router.push("/car-inspection/inspection-method");
    } catch (err) {
      console.error("Error starting inspection:", err);
      router.push("/car-inspection");
    } finally {
      setLoading(false);
    }
  };

  const variantClass =
    variant === "compact"
      ? "h-8 w-fit max-w-full gap-1 rounded-full border border-[#3456bb]/25 bg-[#f0f3fc] px-3 text-[10px] font-bold text-[#3456bb] shadow-none hover:bg-[#3456bb] hover:text-white md:h-10 md:rounded-xl md:px-4 md:text-xs"
      : "bg-[#416CEA] text-white w-full h-12 rounded-3xl text-base font-medium";

  return (
    <Button
      type="button"
      onClick={startInspection}
      disabled={loading}
      className={`disabled:opacity-60 ${variantClass} ${className}`}
    >
      {loading ? (
        <span className="text-[10px] md:text-sm">در حال آماده‌سازی...</span>
      ) : (
        <>
          {labelMobile ? (
            <>
              <span className="md:hidden">{labelMobile}</span>
              <span className="hidden md:inline">
                {label || `شروع کارشناسی ${carName}`}
              </span>
            </>
          ) : (
            label || `شروع کارشناسی ${carName}`
          )}
          {showChevron ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M7.5 2.5 4 6l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </>
      )}
    </Button>
  );
}
